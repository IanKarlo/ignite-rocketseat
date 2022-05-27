import { Request, Response } from "express";

import { ListSpecificationUseCase } from "./ListSpecificationsUseCase";

class ListSpecificationController {
  constructor(private listSpecificationUseCase: ListSpecificationUseCase) {}

  async handle(_: Request, response: Response): Promise<Response> {
    const list = await this.listSpecificationUseCase.execute();
    return response.status(200).json(list);
  }
}

export { ListSpecificationController };
