import { CreateCartDTO } from "../../http/dtos/createCartDTO";

export interface ICartRepository {
    create(data: CreateCartDTO): Promise<void>
}