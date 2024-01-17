import { Dog } from '../models/dog.type';
import { apiUrl } from '../config';

export type ApiResponseDataDog = Dog[];
export type ApiResponseDog = Dog;

export class DogRepository {
  private getApiUrl() {
    if (process.env.NODE_ENV === 'test') {
      return 'http://localhost:3000/';
    }
    return apiUrl;
  }

  async getAll() {
    const urlFinal = `${this.getApiUrl()}dog`;
    const data = await fetch(urlFinal);
    const response: ApiResponseDataDog = await data.json();
    return response;
  }

  async getDogsByShelter(shelterId: string, showArchivedDogs: boolean) {
    const urlFinal = `${this.getApiUrl()}dog/dogByShelter/${shelterId}/${showArchivedDogs}`;
    const data = await fetch(urlFinal);
    const response: ApiResponseDataDog = await data.json();
    return response;
  }

  async addDog(dog: Partial<Dog>, token: string) {
    const urlFinal = `${this.getApiUrl()}dog`;
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

  async updateDog(dogId: string, dog: Partial<Dog>, token: string) {
    const urlFinal = `${this.getApiUrl()}dog/${dogId}`;
    const data = await fetch(urlFinal, {
      method: 'PATCH',
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
