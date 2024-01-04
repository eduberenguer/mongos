import { Dog } from '../../models/dog.type';

export const Card = (dog: Dog) => {
  return (
    <div>
      <p>{dog.name}</p>
      <p>{dog.description}</p>
      <p>{dog.shelter.shelterName}</p>
    </div>
  );
};
