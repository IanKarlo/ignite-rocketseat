import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSpecificationUseCase } from "./ListSpecificationsUseCase";

class ListSpecificationController {
  async handle(_: Request, response: Response): Promise<Response> {
    const listSpecificationUseCase = container.resolve(
      ListSpecificationUseCase
    );

    const list = await listSpecificationUseCase.execute();
    return response.status(200).json(list);
  }
}

export { ListSpecificationController };
