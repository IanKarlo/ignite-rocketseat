import { Specification } from "../model/Specification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({ description, name }: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification | null>;
  list(): Promise<Specification[]>;
}

export { ISpecificationRepository, ICreateSpecificationDTO };