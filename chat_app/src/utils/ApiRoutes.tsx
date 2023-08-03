const host = "http://localhost:6001";
const registerRoute = host + "/api/auth/register";
const loginRoute = host + "/api/auth/login";
const authRoute = host + "/api/auth";
const avatarRoute = host + "/api/auth/avatarId";
const avatarUpdateRoute = host + "/api/auth/avatarUpdate";
const getAvatarRoute = host + "/api/auth/getAvatar";
const getAllUsers = host + "/api/auth/getAllUsers";
const sendMessage = host + "/api/auth/sendMessage";
const getAllMessage = host + "/api/auth/getMessage";

export default host;
export {
  registerRoute,
  loginRoute,
  authRoute,
  avatarRoute,
  avatarUpdateRoute,
  getAvatarRoute,
  getAllUsers,
  sendMessage,
  getAllMessage,
};
