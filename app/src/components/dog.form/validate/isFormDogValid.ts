import { Dog } from '../../../models/dog.type';

export const isFormDogValid = (formDataDog: Partial<Dog>) => {
  const {
    name,
    gender,
    years,
    months,
    size,
    chipNumber,
    hasBreed,
    breed,
    description,
    image,
    personality,
  } = formDataDog;
  if (
    name &&
    gender &&
    years &&
    years > 0 &&
    months &&
    months > 0 &&
    months < 13 &&
    size &&
    chipNumber?.toString().length === 15 &&
    description &&
    image &&
    personality!.length > 0 &&
    (hasBreed === false || (hasBreed && breed))
  ) {
    return true;
  }
  return false;
};
