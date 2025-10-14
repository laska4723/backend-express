import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { IdNumberDto } from '../../shared';
import { validate } from '../../validation';
import { CreateTaskDto, FindAllTasksDto, UpdateTaskDto } from './dto';
import { TaskService } from './task.service';

@injectable()
export class TaskController {
  public readonly router = Router();

  constructor(
    @inject(TaskService)
    private readonly taskService: TaskService,
  ) {
    // Create
    this.router.post('/', (req: Request, res: Response) => this.create(req, res));

    // Read
    this.router.get('/', (req: Request, res: Response) => this.getList(req, res));
    this.router.get('/:id', (req: Request, res: Response) => this.getOne(req, res));

    // Update
    this.router.put('/:id', (req: Request, res: Response) => this.updateOne(req, res));

    // Delete
    this.router.delete('/:id', (req: Request, res: Response) => this.deleteOne(req, res));
  }

  async create(req: Request, res: Response) {
    const body = validate(CreateTaskDto, req.body);

    const task = await this.taskService.create(body);

    res.json(task);
  }

  async getList(req: Request, res: Response) {
    const query = validate(FindAllTasksDto, req.query);

    const tasks = await this.taskService.getList(query);

    res.json(tasks);
  }

  async getOne(req: Request, res: Response) {
    const { id } = validate(IdNumberDto, req.params);

    const task = await this.taskService.getOne(id);

    res.json(task);
  }

  async updateOne(req: Request, res: Response) {
    const { id } = validate(IdNumberDto, req.params);
    const body = validate(UpdateTaskDto, req.body);

    const task = await this.taskService.updateOne(id, body);

    res.json(task);
  }

  async deleteOne(req: Request, res: Response) {
    const { id } = validate(IdNumberDto, req.params);

    await this.taskService.deleteOne(id);

    res.json({ success: true });
  }
}
