import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppErrort";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationRespository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest) {
    const alreadySpecification = await this.specificationsRepository.findByName(
      name
    );
    if (alreadySpecification) {
      throw new AppError("Specification already exists");
    }
    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
