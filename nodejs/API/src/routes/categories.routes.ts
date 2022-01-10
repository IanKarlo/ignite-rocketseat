import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";
import { CreateCategoryService } from "../services/CreateCategoryService";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", async (request, response) => {
  const { name, description } = request.body;
  const createCategoryService = new CreateCategoryService(categoriesRepository);
  try {
    await createCategoryService.execute({ name, description });
  } catch (err) {
    return response.status(400).json({
      error: err.message,
    });
  }

  return response.status(201).end();
});

categoriesRoutes.get("/", async (request, response) => {
  const list = await categoriesRepository.list();

  return response.status(200).json(list);
});

export { categoriesRoutes };
