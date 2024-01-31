type State = 'pending' | 'accepted' | 'rejected';

export type AdoptionRequest = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  dogId: string;
  userId: string;
  shelterId: string;
  text: string;
  hasDogs: boolean;
  hasCats: boolean;
  hasGarden: boolean;
  hasExperience: boolean;
  hasChildren: boolean;
  status: State;
  isRead: boolean;
};
