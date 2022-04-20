export class AccountModel {
  constructor(
    public id: string,
    public roles: string[],
    public fullName: string,
    public email: string,
    public avatarPath: string,
    public registerDate: string
  ) { }
}
