import { UserStore } from '../src/models/user';

process.env.ENV='test';

const store = new UserStore();

describe('User Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });

  it('should have a show method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(store.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await store.create({
      firstname: 'Maggie',
      lastname: 'Amin',
      password: 'D440AED189A13FF970DAC7E7E8F987B2',
    });
    expect(result).toEqual({
      id: 1,
      firstname: 'Maggie',
      lastname: 'Amin',
      password: 'D440AED189A13FF970DAC7E7E8F987B2',
    });
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result).toEqual([{
      id: 1 ,
      firstname: 'Maggie',
      lastname: 'Amin' ,
      password: 'D440AED189A13FF970DAC7E7E8F987B2' ,
    }]);
 });

 it('show method should return the correct user', async () => {
  const result = await store.show("1");
  expect(result).toEqual({
    id: 1,
    firstname: 'Maggie',
    lastname: 'Amin' ,
    password: 'D440AED189A13FF970DAC7E7E8F987B2' ,
    });
  });

  it('delete method should remove the user', async () => {
    await store.delete(1);
    const result = await store.index()

    expect(result).toEqual([]);
  });
});