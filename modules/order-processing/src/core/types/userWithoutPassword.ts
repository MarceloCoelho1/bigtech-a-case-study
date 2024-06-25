import { User } from "../entities/user";

export type UserWithoutPassword = Omit<User, 'password'>;
