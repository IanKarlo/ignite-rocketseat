import { Router } from "express";

import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticateUserController = new AuthenticateUserController();

const authenticateRoutes = Router();

authenticateRoutes.use("/sessions", authenticateUserController.handle);

export { authenticateRoutes };
