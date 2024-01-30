import { Schema, model } from 'mongoose';
import { Dog } from '../../entities/dog';

const dogSchema = new Schema<Dog>({
  name: { type: String, required: true },
  gender: { type: String, require: true, enum: ['male', 'female'] },
  image: { type: String, required: true },
  registerDate: { type: Date, required: true },
  years: { type: Number, required: true },
  months: { type: Number, required: true },
  size: { type: String, required: true, enum: ['small', 'medium', 'large', 'extra large', 'giant'] },
  chipNumber: { type: Number, required: true },
  shelter: { type: String, required: true, ref: 'Shelter' },
  personality: {
    type: [String],
    required: true,
    enum: ['calm', 'aggressive', 'anxious', 'child friendly', 'dog tested', 'cat tested', 'active', 'familiar'],
  },
  views: { type: Number, required: true },
  requests: { type: Number, required: true },
  adoptedBy: { type: String, required: false },
  hasBreed: { type: Boolean, required: true },
  breed: { type: String, required: false },
  description: { type: String, required: true },
  archived: { type: Boolean, required: true },
});

dogSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
    delete returnedObject._id;
  },
});

export const DogModel = model('Dog', dogSchema, 'dogs');
