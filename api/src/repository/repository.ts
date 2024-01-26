import { User } from '../entities/user';

interface UserWithFavourites extends User {
  favourites: string[];
}

export interface Repository<T extends { id: string | number }> {
  create: (data: Omit<T, 'id'>) => Promise<T>;
  queryAll: () => Promise<T[]>;
  search: (query: { key: string; value: unknown }) => Promise<T>;
  searchByOptions: (queries: { key: string; value: unknown }[]) => Promise<T[]>;
  queryById: (id: T['id']) => Promise<T>;
  delete: (id: T['id']) => Promise<T>;
  update: T extends User
    ? (id: T['id'], data: Partial<UserWithFavourites>) => Promise<T>
    : (id: T['id'], data: Partial<T>) => Promise<T>;
}
