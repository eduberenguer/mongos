import { Schema, model } from 'mongoose';
import { Dog } from '../../entities/dog';

const dogSchema = new Schema<Dog>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  registerDate: { type: Date, required: true },
  age: { type: String, required: true },
  size: { type: String, required: true, enum: ['small', 'medium', 'large', 'extra large', 'giant'] },
  chipNumber: { type: Number, required: true },
  shelter: { type: String, ref: 'Shelter' },
  personality: {
    type: [String],
    required: true,
    enum: ['calm', 'aggressive', 'reactive', 'anxious', 'child friendly', 'dog tested', 'cat tested', 'active'],
  },
  views: { type: Number, required: true },
  requests: { type: Number, required: true },
  adoptedBy: { type: String, required: false },
  hasBreed: { type: Boolean, required: true },
  breed: { type: String, required: false },
  description: { type: String, required: true },
});

dogSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

export const DogModel = model('Dog', dogSchema, 'dogs');
