export class User {
  constructor(
    public id: string,
    public email: string,
    public name: string,
    public passwordHash: string,
    public createdAt: Date,
    public is_verified: boolean
  ) {}
}