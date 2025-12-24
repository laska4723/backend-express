import { FindAllTasksDto } from '../modules/task/dto';

export const oneTaskCacheKey = (id: number) => `task_${id}`;
export const allTaskCacheKeys = (params: FindAllTasksDto) => {
  const { limit, offset, search, sortBy, sortDirection } = params;
  return `tasks_${limit}_${offset}_${search}_${sortBy}_${sortDirection}`;
};
