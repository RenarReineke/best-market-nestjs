export type UserResponse = {
  user: string;
  token: string;
  message: string;
  success: boolean;
};

export type LoginResponse = {
  refreshToken: string;
  res: UserResponse;
};

export type RefreshResponse = UserResponse;
