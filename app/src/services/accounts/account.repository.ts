import { apiUrl } from '@/config';
import { Shelter } from '@/models/shelter.type';
import { User } from '@/models/user.type';
import { LocaStorage } from '@/services/accounts/local.storage';

const urlBase = 'http://localhost:3000/';

export class AccountRepository {
  userStore = new LocaStorage<{ token: string; role: string }>('user');

  private getApiUrl() {
    if (process.env.NODE_ENV === 'test') {
      return 'http://localhost:3000/';
    }
    return apiUrl;
  }

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
    const response = await fetch(urlFinal, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.error);
    }

    return response.json();
  }

  async loginWithToken({ token, role }: { token: string; role: string }) {
    const urlFinal = `${urlBase}${role}/login`;
    const response = await fetch(urlFinal, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error');
    }
    return response.json();
  }

  async retrievedShelterById(shelterId: string) {
    const urlFinal = `${this.getApiUrl()}shelter/${shelterId}`;
    const data = await fetch(urlFinal);

    const response = await data.json();

    return response;
  }

  async updateDogFavourite(dogId: string, userId: string) {
    const token = this.userStore.get()?.token;
    const apiUrlFinal = `${this.getApiUrl()}user/${userId}/${dogId}/favourite`;
    const data = await fetch(apiUrlFinal, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await data.json();

    return response;
  }
}
