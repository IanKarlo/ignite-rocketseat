import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppErrort";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  repsonse: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(token, "Secret") as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User does not exists", 401);
    }

    request.userId = user.id;
  } catch (err) {
    throw new AppError("Invalid token", 401);
  }

  return next();
}
