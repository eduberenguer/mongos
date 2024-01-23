export type Shelter = {
  id: string;
  shelterName: string;
  email: string;
  password: string;
  avatar: File | string | null | undefined;
  address: string;
  province: string;
  registerDate: Date;
  role: string;
};
