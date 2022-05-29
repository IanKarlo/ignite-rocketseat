import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  // constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    try {
      const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
      await createCategoryUseCase.execute({ name, description });
    } catch (err) {
      return response.status(400).json({
        error: err.message,
      });
    }

    return response.status(201).end();
  }
}

export { CreateCategoryController };
