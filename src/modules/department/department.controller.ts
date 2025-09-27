import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { IdNumberDto } from '../../shared';
import { validate } from '../../validation';
import { DepartmentService } from './department.service';
import { CreateDepartmentBodyDto } from './dto';

@injectable()
export class DepartmentController {
  public readonly router = Router();

  constructor(
    @inject(DepartmentService)
    private readonly DepartmentService: DepartmentService,
  ) {
    this.router.post('/', (req: Request, res: Response) => this.create(req, res));
    this.router.get('/', (req: Request, res: Response) => this.getList(req, res));
    this.router.get('/:id', (req: Request, res: Response) => this.getOne(req, res));
    this.router.put('/:id', (req: Request, res: Response) => this.updateOne(req, res));
    this.router.delete('/:id', (req: Request, res: Response) => this.deleteOne(req, res));
  }

  create(req: Request, res: Response) {
    const body = validate(CreateDepartmentBodyDto, req.body);

    const department = this.DepartmentService.create(body);

    res.json(department);
  }

  getList(req: Request, res: Response) {
    const departments = this.DepartmentService.getList();

    res.json(departments);
  }

  getOne(req: Request, res: Response) {
    const { id } = validate(IdNumberDto, req.params);

    const department = this.DepartmentService.updateOne(id);

    res.json(department);
  }

  updateOne(req: Request, res: Response) {
    const { id } = validate(IdNumberDto, req.params);

    const department = this.DepartmentService.updateOne(id);

    res.json(department);
  }

  deleteOne(req: Request, res: Response) {
    const { id } = validate(IdNumberDto, req.params);

    const success = this.DepartmentService.deleteOne(id);

    res.json(success);
  }
}
