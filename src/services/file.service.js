module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async _s3Upload(data) {
    await this.method.errors.file._s3Upload(data);
    return new Promise((resolve, reject) => {
      this.method.AWS.config.update({ region: process.env.AWS_REGION });
      const s3 = new this.method.AWS.S3({
        params: {
          ACL: "public-read",
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: data.Key,
          ContentType: data.ContentType
        }
      });
      s3.upload({ Body: data.body }).send((error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  async _s3Delete(data) {
    await this.method.errors.file._s3Delete(data);
    return new Promise((resolve, reject) => {
      const s3 = new this.method.AWS.S3({
        params: {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: data.Key
        }
      });
      s3.deleteObject().send((error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  async uploadResume(data) {
    await this.method.errors.file.uploadResume(data);
    const response = await this.method.db.file.create(data);
    try {
      await this._s3Upload({
        Key: response.info.storage_name,
        body: data.body,
        ContentType: response.info.content_type
      });
    } catch (e) {
      await this.method.db.file.remove(response.info);
      throw e;
    }
    return response;
  }

  async readByParentId(data) {
    await this.method.errors.file.readByParentId(data);
    return await this.method.db.file.readByParentId(data);
  }

  async readByStorageName(data) {
    const url = `https://${process.env.AWS_BUCKET_NAME}.s3-${process.env.AWS_REGION}.amazonaws.com/${data.storage_name}`;
    return this.method.request.get(url);
  }

  async remove(data) {
    await this.method.errors.file.remove(data);
    await this._s3Delete({ Key: data.storage_name });
    await this.method.db.file.remove(data);
  }

  async removeByParentId(data) {
    await this.method.errors.removeByParentId(data);
    const response = await this.method.db.file.readByParentId(data);
    if (response.results.length === 0) {
      return;
    }
    for (var i = 0; i < response.results.length; ++i) {
      await this.remove(response.results[i]);
    }
  }

  async removeByOwnerId(data) {
    await this.method.errors.removeByOwnerId(data);
    const response = await this.method.db.file.readByOwnerId(data);
    if (response.results.length === 0) {
      return;
    }
    for (var i = 0; i < response.results.length; ++i) {
      await this.remove(response.results[i]);
    }
  }
};
