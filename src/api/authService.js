// // src/api/authService.js
// import api from "./axiosInstance";
// import { setAccessToken, clearAccessToken } from "./tokenStore";
// import { AUTH } from "./endpoints";

// export async function login(credentials) {
//   // server should return accessToken in JSON and set httpOnly refresh cookie
//   const resp = await api.post(AUTH.LOGIN, credentials);
//   const accessToken = resp.data?.accessToken;
//   if (accessToken) setAccessToken(accessToken);
//   return resp.data;
// }

// export async function tryRefreshOnLoad() {
//   try {
//     const resp = await api.post(AUTH.REFRESH, null, { withCredentials: true });
//     const accessToken = resp.data?.accessToken;
//     if (accessToken) setAccessToken(accessToken);
//     return accessToken;
//   } catch (err) {
//     clearAccessToken();
//     return null;
//   }
// }

// export async function logout() {
//   try {
//     await api.post(AUTH.LOGOUT, null, { withCredentials: true });
//   } finally {
//     clearAccessToken();
//   }
// }