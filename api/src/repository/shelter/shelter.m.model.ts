import { Schema, model } from 'mongoose';
import { Shelter } from '../../entities/shelter';

const shelterSchema = new Schema<Shelter>({
  shelterName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  address: { type: String, required: true },
  registerDate: { type: Date, required: true },
});

shelterSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

export const ShelterModel = model('Shelter', shelterSchema, 'shelters');
