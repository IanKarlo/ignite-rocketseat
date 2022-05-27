import { Request, Response } from "express";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

  async handle(request: Request, response: Response) {
    const { file } = request;

    this.importCategoryUseCase.execute(file);

    return response.end();
  }
}

export { ImportCategoryController };
