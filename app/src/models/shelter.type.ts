export type Shelter = {
  _id: string;
  shelterName: string;
  email: string;
  password: string;
  avatar: File | string | null | undefined;
  address: string;
  registerDate: Date;
  role: string;
};
