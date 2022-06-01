import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUSerAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response) {
    const { userId } = request;

    const avatarFile = request.file.filename;

    const updateUseAvatarUseCase = container.resolve(UpdateUSerAvatarUseCase);

    await updateUseAvatarUseCase.execute({ userId, avatarFile });

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };
