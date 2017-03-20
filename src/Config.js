export const WarungImageDir = 'http://wrg.baliprocom.com/src/public/img/';
export const WarungLikeText = 'Sukai Warung Ini';
export const WarungLikedText = 'Anda Menyukai Warung Ini';

export const userIdKey = "userId";
export const userNameKey = "userName";
export const userEmailKey = "userEmail";
export const isUserLogedInKey = "isUserLogedIn";

//Ubah base url sesuai dengan server host API
const baseURL = 'http://10.0.2.2/warungsapi/';
export const EndpointURL = {
  GET_WARUNG: `${baseURL}warung`,
  LOGIN: `${baseURL}user/login`,
  LIKE: `${baseURL}warung/like`,
}
export const ImageURL = `http://wrg.baliprocom.com/src/public/img/`;

//Untuk key LocalStorage gunakan prefix entitas
export const LocalStorage = {
  userId: 'userId',
  userName: 'userName',
  userEmail: 'userEmail',
  userAccessToken: 'userAccessToken',
  isUserLogedIn: 'isUserLogedIn',
}
