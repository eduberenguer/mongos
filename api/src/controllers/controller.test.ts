import { UserController } from './user.controller';

describe('getUsers', () => {
  it('should return "Hola usuarios"', () => {
    const controller = new UserController('/users');

    expect(controller.getAll).toHaveBeenCalledWith('test123');
  });
});
