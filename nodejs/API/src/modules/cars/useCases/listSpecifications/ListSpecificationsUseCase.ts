import { inject, injectable } from "tsyringe";

import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationRespository";

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
