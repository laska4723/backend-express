import { faker } from '@faker-js/faker';

export type MockTask = {
  id: number;
  title: string;
  description: string;
};

export const getMockTask = (maxCount = 1): MockTask[] => {
  const tasks: MockTask[] = [];
  const count = Math.floor(Math.random() * (maxCount + 1));

  for (let i = 0; i < count; i++) {
    tasks.push({
      id: faker.number.int({ min: 1, max: 100000 }),
      title: faker.lorem.words({ min: 1, max: 5 }),
      description: faker.lorem.paragraphs(),
    });
  }

  return tasks;
};
