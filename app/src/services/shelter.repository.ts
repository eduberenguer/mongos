const urlBase = 'http://localhost:3000/';

export class AccountRepository {
  async create(item: any) {
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
}
