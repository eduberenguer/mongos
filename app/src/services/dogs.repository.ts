import { Dog } from '../models/dog.type';
import { apiUrl } from '../config';

export type ApiResponseDataDog = Dog[];
export type ApiResponseDog = Dog;

export class DogRepository {
  async getAll() {
    const urlFinal = `${apiUrl}dog`;
    const data = await fetch(urlFinal);
    const response: ApiResponseDataDog = await data.json();
    return response;
  }

  async getDogsByShelter(shelterId: string, showArchivedDogs: boolean) {
    const urlFinal = `${apiUrl}dog/dogByShelter/${shelterId}/${showArchivedDogs}`;
    const data = await fetch(urlFinal);
    const response: ApiResponseDataDog = await data.json();
    return response;
  }

  async addDog(dog: Partial<Dog>, token: string) {
    const urlFinal = `${apiUrl}dog`;
    const data = await fetch(urlFinal, {
      method: 'POST',
      body: JSON.stringify(dog),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    const response: ApiResponseDog = await data.json();
    return response;
  }
}
