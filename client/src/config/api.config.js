module.exports = {
  user: {
    login: "/api/user/login",
    logout: "/api/user/logout",
    readSingleId: "/api/user/read/id",
    emailExists: "/api/user/exists/email",
    info: "/api/user/info",
    register: "/api/user/register",
    updateEmail: "/api/user/update/email",
    updatePassword: "/api/user/update/password",
    unregister: "/api/user/unregister"
  },
  admin: {
    login: "/api/admin/login",
    validate: "/api/admin/validate"
  },
  user_profile: {
    read: "/api/user_profile/read",
    update: "/api/user_profile/update",
    search: "/api/user_profile/search"
  },
  job_profile: {
    create: "/api/job/create",
    read: "/api/job/read",
    readByOwnerId: "/api/job/read/owner",
    update: "/api/job/update",
    remove: "/api/job/delete",
    search: "/api/job/search"
  },
  file: {
    uploadResume: "/api/file/upload/resume",
    readByParentId: "/api/file/read/parent_id",
    readByStorageName: "/api/file/read",
    remove: "/api/file/delete"
  }
};
