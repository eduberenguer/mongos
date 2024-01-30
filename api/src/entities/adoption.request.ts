type State = 'pending' | 'accepted' | 'rejected';

export type AdoptionRequest = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  dogId: string;
  userId: string;
  userMail: string;
  shelterId: string;
  text: string;
  state: State;
  isRead: boolean;
};
