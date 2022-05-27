import { Request, Response } from "express";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    try {
      await this.createCategoryUseCase.execute({ name, description });
    } catch (err) {
      return response.status(400).json({
        error: err.message,
      });
    }

    return response.status(201).end();
  }
}

export { CreateCategoryController };
