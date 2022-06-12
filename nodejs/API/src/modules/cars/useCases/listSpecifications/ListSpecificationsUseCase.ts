import { inject, injectable } from "tsyringe";

import { Specification } from "@modules/cars/entities/Specification";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationRespository";

@injectable()
class ListSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private SpecificationsRepository: ISpecificationsRepository
  ) {}

  async execute(): Promise<Specification[]> {
    const list = await this.SpecificationsRepository.list();
    return list;
  }
}

export { ListSpecificationUseCase };
