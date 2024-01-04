import { Dog } from '../models/dog.type';

export type ApiResponseDataDog = Dog[];

const urlBase = 'http://localhost:3000/';

export class DogRepository {
  async getAll() {
    const urlFinal = `${urlBase}dog`;
    const data = await fetch(urlFinal);
    const response: ApiResponseDataDog = await data.json();
    return response;
  }
}
