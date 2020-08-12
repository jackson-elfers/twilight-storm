module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async _s3Upload(data) {}

  async _s3Delete(data) {}

  async uploadResume(data) {
    if (this.method.mime.lookup(data.file_name) !== "application/pdf") {
      throw new Error("resume must be of type application/pdf");
    }
  }

  async readByParentId(data) {}

  async readByStorageName(data) {}

  async remove(data) {}

  async removeByParentId(data) {}

  async removeByOwnerId(data) {}
};
