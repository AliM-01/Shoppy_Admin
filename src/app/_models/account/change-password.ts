export class ChangePasswordModel {
    constructor(
         public userId: string,
         public newPassword: string,
         public confirmPassword: string
     ){}
 }