import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { IdNumberDto } from '../../shared';
import { validate } from '../../validation';
import { CreateTaskDto } from './dto';
import { TaskService } from './task.service';

@injectable()
export class TaskController {
  public readonly router = Router();

  constructor(
    @inject(TaskService)
    private readonly taskService: TaskService,
  ) {
    this.router.post('/', (req: Request, res: Response) => this.create(req, res));
    this.router.get('/', (req: Request, res: Response) => this.getList(req, res));
    this.router.get('/:id', (req: Request, res: Response) => this.getOne(req, res));
    this.router.put('/:id', (req: Request, res: Response) => this.updateOne(req, res));
    this.router.delete('/:id', (req: Request, res: Response) => this.deleteOne(req, res));
  }

  create(req: Request, res: Response) {
    const body = validate(CreateTaskDto, req.body);

    const task = this.taskService.create(body);

    res.json(task);
  }

  getList(req: Request, res: Response) {
    const tasks = this.taskService.getList();

    res.json(tasks);
  }

  getOne(req: Request, res: Response) {
    const { id } = validate(IdNumberDto, req.params);

    const task = this.taskService.updateOne(id);

    res.json(task);
  }

  updateOne(req: Request, res: Response) {
    const { id } = validate(IdNumberDto, req.params);

    const task = this.taskService.updateOne(id);

    res.json(task);
  }

  deleteOne(req: Request, res: Response) {
    const { id } = validate(IdNumberDto, req.params);

    const success = this.taskService.deleteOne(id);

    res.json(success);
  }
}
