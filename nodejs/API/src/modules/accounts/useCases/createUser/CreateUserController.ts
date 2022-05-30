import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, driver_license, password } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);
    try {
      await createUserUseCase.execute({
        name,
        email,
        driver_license,
        password,
      });
    } catch (err) {
      return response.status(400).json({
        message: "Error while register user",
      });
    }

    return response.status(201).end();
  }
}

export { CreateUserController };
