const HttpCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
}

const Role = {
  STARTER: "starter", 
  PRO: "pro",
  BUSINESS: "business",
}

const MaxReqBodySize = {
  LIMIT: 10000,
}

const FOLDER_CLOUD_AVATAR = 'avatars';

module.exports = { HttpCode, Role, MaxReqBodySize, FOLDER_CLOUD_AVATAR }