import { getRepository, Repository } from "typeorm";

import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  // eslint-disable-next-line no-use-before-define
  private static INSTANCE: CategoriesRepository;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const categoryAlreadyExists = await this.findByName(name);
    if (!categoryAlreadyExists) {
      const category = this.repository.create({
        name,
        description,
      });

      await this.repository.save(category);
    } else {
      throw new Error("Category already exists");
    }
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await this.repository.findOne({
      name,
    });
    return category;
  }
}

export { CategoriesRepository };
