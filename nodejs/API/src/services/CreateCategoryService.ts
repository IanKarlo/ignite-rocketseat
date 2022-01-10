import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

class CreateCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

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
