import { Specification } from "../../model/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "../ISpecificationRespository";

class SpecificationRepository implements ISpecificationRepository {
  private specifications: Specification[];

  // eslint-disable-next-line no-use-before-define
  private static INSTANCE: SpecificationRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance() {
    if (!SpecificationRepository.INSTANCE) {
      SpecificationRepository.INSTANCE = new SpecificationRepository();
    }
    return SpecificationRepository.INSTANCE;
  }

  async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
    const specification = new Specification(name, description);
    this.specifications.push(specification);
  }

  async findByName(name: string): Promise<Specification | null> {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );
    if (!specification) return null;
    return specification;
  }

  async list(): Promise<Specification[]> {
    return this.specifications;
  }
}

export { SpecificationRepository };
