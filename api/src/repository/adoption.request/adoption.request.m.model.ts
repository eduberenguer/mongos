import { Schema, model } from 'mongoose';
import { AdoptionRequest } from '../../entities/adoption.request';

const adoptionRequestSchema = new Schema<AdoptionRequest>({
  dogId: { type: String, required: true, ref: 'Dog' },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  userId: { type: String, required: true, ref: 'User' },
  shelterId: { type: String, required: true, ref: 'Shelter' },
  text: { type: String, required: true },
  state: { type: String, required: true, enum: ['pending', 'accepted', 'rejected'] },
  isRead: { type: Boolean, required: true },
});

adoptionRequestSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});

export const AdoptionRequestModel = model('AdoptionRequest', adoptionRequestSchema, 'adoptionRequests');
