export type User = {
  _id: string,
  username: string;
  email: string;
  password: string;
  role: string;
  firstname: string;
  lastname: string;
  mobileNumber: string;
  isLogin: boolean;
  lastLogin: string;
  isActive: boolean;
  refreshToken: string;
  accessToken: string;
};
