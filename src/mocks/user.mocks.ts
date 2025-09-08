import { faker } from '@faker-js/faker';

export type MockUser = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export const getMockUser = (): MockUser => {
  return {
    id: faker.number.int({ min: 1, max: 100000 }),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};
