import { faker } from '@faker-js/faker';

export type MockTask = {
  id: number;
  title: string;
  description: string;
};

export const getMockTask = (maxCount = 1): MockTask | MockTask[] | {} => {
  if (!maxCount) {
    return {};
  }

  if (maxCount === 1) {
    return {
      id: faker.number.int({ min: 1, max: 100000 }),
      title: faker.lorem.words({ min: 1, max: 5 }),
      description: faker.lorem.paragraphs(),
    };
  }

  const tasks: MockTask[] = [];
  const count = faker.number.int({ min: 1, max: maxCount });

  for (let i = 0; i < count; i++) {
    tasks.push({
      id: faker.number.int({ min: 1, max: 100000 }),
      title: faker.lorem.words({ min: 1, max: 5 }),
      description: faker.lorem.paragraphs(),
    });
  }

  return tasks;
};
