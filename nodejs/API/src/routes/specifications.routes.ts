import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/createSpecifications";
import { listSpecificationController } from "../modules/cars/useCases/listSpecifications";

const specificationsRoutes = Router();

specificationsRoutes.post("/", async (request, response) => {
  return createSpecificationController.handle(request, response);
});

specificationsRoutes.get("/", async (request, response) => {
  return listSpecificationController.handle(request, response);
});

export { specificationsRoutes };
