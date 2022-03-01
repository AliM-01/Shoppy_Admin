export class AuthUser {
  constructor(
    public userId: string,
    public userName: string,
    public displayName: string,
    public roles: string[] | null,) { }

}
