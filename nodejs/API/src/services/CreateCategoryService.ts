import { CategoriesRepository } from "../repositories/CategoriesRepository";

class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({ name, description }) {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new Error("Category already exists");
    }

    await this.categoriesRepository.create({ name, description });
    return true;
  }
}

export { CreateCategoryService };
