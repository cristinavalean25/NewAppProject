export type User = {
  id: number;
  email: string;
  name: string;
  avatar: string;
  role: string;
  password: string;
};

export type UserRegister = {
  name: string;
  email: string;
  password: string;
};
