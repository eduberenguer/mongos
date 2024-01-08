export interface Repository<T extends { id: string | number }> {
  create: (data: Omit<T, 'id'>) => Promise<T>;
  queryAll: () => Promise<T[]>;
  search: (query: { key: string; value: unknown }) => Promise<T>;
  searchByOptions: (query: { key: string; value: unknown }) => Promise<T[]>;
  queryById: (id: T['id']) => Promise<T>;
}
