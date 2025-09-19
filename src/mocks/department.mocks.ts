import { faker } from '@faker-js/faker';

export type MockDepartment = {
  id: number;
  title: string;
  phone: number;
};

export const getMockDepartment = () => {
  return {
    id: faker.number.int({ min: 1, max: 100 }),
    title: faker.lorem.words({ min: 1, max: 5 }),
    phone: faker.phone.number(),
  };
};
