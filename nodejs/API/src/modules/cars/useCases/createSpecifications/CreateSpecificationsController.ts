import { Request, Response } from "express";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    try {
      this.createSpecificationUseCase.execute({ name, description });
    } catch (err) {
      return response.status(400).json({
        error: err.message,
      });
    }

    return response.status(201).end();
  }
}

export { CreateSpecificationController };
