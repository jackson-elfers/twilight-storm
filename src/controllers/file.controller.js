module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async uploadResume(data) {
    await this.method.errors.file.uploadResume(data);
    // check user_profile ownership
    if (
      (await this.method.services.user_profile.readByOwnership({ _id: data.parent_id, owner_id: data.owner_id }))
        .results.length === 0
    ) {
      throw new Error("must be owner of user_profile to upload resume");
    }
    return await this.method.services.file.uploadResume(data);
  }

  async readByParentId(data) {
    await this.method.errors.file.readByParentId(data);
    return await this.method.services.file.readByParentId(data);
  }

  async readByStorageName(data) {
    await this.method.errors.file.readByStorageName(data);
    return await this.method.services.file.readByStorageName(data);
  }

  async remove(data) {
    await this.method.errors.file.remove(data);
    return await this.method.services.file.remove(data);
  }
};
