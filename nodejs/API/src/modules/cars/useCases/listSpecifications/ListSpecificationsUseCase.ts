import { Specification } from "../../entities/Specification";
import { ISpecificationRepository } from "../../repositories/ISpecificationRespository";

class ListSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationRepository) {}

  async execute(): Promise<Specification[]> {
    return this.specificationRepository.list();
  }
}

export { ListSpecificationUseCase };
