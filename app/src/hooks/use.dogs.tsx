import { useReducer, useState } from 'react';
import { initialStateDogs } from '@/mocks/initial.state.reducer';
import { DogRepository } from '@/services/dogs/dogs.repository';
import { dogReducer } from '@/store/reducers/dogs.reducer';
import * as ac from '@/store/actions.creators/dogs.action.creator';
import { Dog } from '@/models/dog.type';
import { handleImageUpload } from '@/services/files/files.cloudinary.repository';

export function useDogs() {
  const repo = new DogRepository();
  const [stateDogs, dispatch] = useReducer(dogReducer, initialStateDogs);
  const [loading, setLoading] = useState<boolean>(false);

  const getDogs = async () => {
    const response = await repo.getAll();
    dispatch(ac.loadDogs(response));
    return response;
  };

  const getDogsByShelter = async (
    shelterId: string,
    showArchivedDogs: boolean
  ) => {
    const response = await repo.getDogsByShelter(shelterId, showArchivedDogs);
    dispatch(ac.loadByShelter(response));
    return response;
  };

  const addDog = async (dog: Partial<Dog>, token: string) => {
    try {
      setLoading(true);
      const urlImage = await handleImageUpload(dog.image as File);
      dog.image = urlImage;
      const response = await repo.addDog(dog, token);
      dispatch(ac.addDog(response));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateDog = async (dogId: string, dog: Partial<Dog>, token: string) => {
    try {
      const response = await repo.updateDog(dogId, dog, token);
      dispatch(ac.updateDog(response));
    } catch (error) {
      console.log(error);
    }
  };

  const addNewViewDog = async (dogId: string) => {
    try {
      const response = await repo.updateDogViews(dogId);
      dispatch(ac.updateDog(response));
    } catch (error) {
      console.log(error);
    }
  };

  const addNewRequestDog = async (dogId: string) => {
    try {
      const response = await repo.updateDogRequests(dogId);
      dispatch(ac.updateDog(response));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDog = async (dogId: string, token: string) => {
    try {
      await repo.deleteDog(dogId, token);
      dispatch(ac.deleteDog(dogId));
    } catch (error) {
      console.log(error);
    }
  };

  const getDogById = async (dogId: string) => {
    try {
      const response = await repo.retrievedDogById(dogId);
      dispatch(ac.loadDog(response));
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const getDogsByIds = async (dogsIds: string[]) => {
    const newDogInfoArray = await Promise.all(
      dogsIds.map(async (dogId) => {
        try {
          const dogInfo = await getDogById(dogId);
          return dogInfo;
        } catch (error) {
          console.error(`Error with ${dogId}`, error);
          return null;
        }
      })
    );
    const filteredDogInfoArray = newDogInfoArray.filter(
      (dogInfo): dogInfo is Dog => dogInfo !== null
    );

    return filteredDogInfoArray;
  };

  return {
    stateDogs,
    getDogs,
    getDogsByShelter,
    addDog,
    updateDog,
    deleteDog,
    loading,
    getDogById,
    addNewViewDog,
    getDogsByIds,
    addNewRequestDog,
  };
}
