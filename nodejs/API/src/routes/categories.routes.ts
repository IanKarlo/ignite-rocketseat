import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/useCases/createCategories/CreateCategoryController";
import { importCategoryController } from "../modules/cars/useCases/importCategories";
import { ListCategoryController } from "../modules/cars/useCases/listCategories/ListCategoryController";

const categoriesRoutes = Router();

const upload = multer({ dest: "./tmp" });

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  async (request, response) => {
    return importCategoryController.handle(request, response);
  }
);

export { categoriesRoutes };
