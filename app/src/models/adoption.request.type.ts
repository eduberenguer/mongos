type State = 'pending' | 'accepted' | 'rejected';

export type ShelterInfo = {
  id: string;
  shelterName: string;
  email: string;
};

export type DogInfo = {
  id: string;
  name: string;
  image: string;
};

export type UserInfo = {
  id: string;
  userName: string;
  email: string;
};

export type AdoptionRequest = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  dog: DogInfo;
  user: UserInfo;
  shelter: ShelterInfo;
  text: string;
  hasDogs: boolean;
  hasCats: boolean;
  hasGarden: boolean;
  hasExperience: boolean;
  hasChildren: boolean;
  status: State;
  isRead: boolean;
};

export type AdoptionRequestResponse = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  dogId: DogInfo;
  userId: UserInfo;
  shelterId: ShelterInfo;
  text: string;
  hasDogs: boolean;
  hasCats: boolean;
  hasGarden: boolean;
  hasExperience: boolean;
  hasChildren: boolean;
  status: State;
  isRead: boolean;
};

export type AdoptionRequestInput = {
  dogId: string;
  userId: string;
  shelterId: string;
  text: string;
  hasDogs: boolean;
  hasCats: boolean;
  hasGarden: boolean;
  hasExperience: boolean;
  hasChildren: boolean;
};
