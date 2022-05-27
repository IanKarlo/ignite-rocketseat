import { ISpecificationRepository } from "../../repositories/ISpecificationRespository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationsRepository: ISpecificationRepository) {}

  async execute({ name, description }: IRequest) {
    const alreadySpecification = await this.specificationsRepository.findByName(
      name
    );
    if (alreadySpecification) {
      throw new Error("Specification already exists");
    }
    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
