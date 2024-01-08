import { Dog } from '../models/dog.type';

export type ApiResponseDataDog = Dog[];
export type ApiResponseDog = Dog;

const urlBase = 'http://localhost:3000/';

export class DogRepository {
  async getAll() {
    const urlFinal = `${urlBase}dog`;
    const data = await fetch(urlFinal);
    const response: ApiResponseDataDog = await data.json();
    return response;
  }

  async getDogsByShelter(shelterId: string) {
    const urlFinal = `${urlBase}dog/dogByShelter/${shelterId}`;
    const data = await fetch(urlFinal);
    const response: ApiResponseDataDog = await data.json();
    return response;
  }

  async addDog(dog: Partial<Dog>, token: string) {
    const urlFinal = `${urlBase}dog`;
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
