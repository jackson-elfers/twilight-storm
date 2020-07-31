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
    resolve: "/api/user_profile/resolve",
    update: "/api/user_profile/update",
    search: "/api/user_profile/search"
  },
  job_profile: {
    create: "/api/job_profile/create",
    read: "/api/job_profile/read",
    readByOwnerId: "/api/job_profile/read/owner",
    update: "/api/job_profile/update",
    remove: "/api/job_profile/delete",
    search: "/api/job_profile/search"
  },
  file: {
    uploadResume: "/api/file/upload/resume",
    readByParentId: "/api/file/read/parent_id",
    readByStorageName: "/api/file/read",
    remove: "/api/file/delete"
  }
};
