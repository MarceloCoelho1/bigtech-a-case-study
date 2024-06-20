export class UserActivation {
  constructor(
    public id: string,
    public token: string,
    public user_id: string,
    public expiration_date: Date,
  ) {}
}
  