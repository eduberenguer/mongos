import { Shelter } from '../models/shelter.type';
import { User } from '../models/user.type';

const urlBase = 'http://localhost:3000/';

export class AccountRepository {
  async create(item: Partial<Shelter | User>) {
    const urlFinal = `${urlBase}${item.role}/register`;
    const data = await fetch(urlFinal, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    return data.json();
  }

  async login(item: Partial<Shelter | User>) {
    const urlFinal = `${urlBase}${item.role}/login`;
    const data = await fetch(urlFinal, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    return data.json();
  }
}
