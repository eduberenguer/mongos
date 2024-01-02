export interface Repository<T extends { id: string | number }> {
  create: (data: Omit<T, 'id'>) => Promise<T>;
  queryAll: () => Promise<T[]>;
}
