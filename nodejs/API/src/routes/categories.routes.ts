import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/useCases/createCategories/CreateCategoryController";
import { ImportCategoryController } from "../modules/cars/useCases/importCategories/ImportCategoryController";
import { ListCategoryController } from "../modules/cars/useCases/listCategories/ListCategoryController";

const categoriesRoutes = Router();

const upload = multer({ dest: "./tmp" });

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoryController();
const importCategoriesController = new ImportCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoriesController.handle
);

export { categoriesRoutes };
