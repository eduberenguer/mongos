import controller from './user.controller';

describe('getUsers', () => {
  it('should return "Hola usuarios"', () => {
    const req = {};
    const res = {
      send: jest.fn(),
    };

    controller.users(req, res);

    expect(res.send).toHaveBeenCalledWith('Hola usuarios');
  });
});
