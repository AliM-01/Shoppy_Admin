export class EditAccountModel {
    constructor(
         public id: string,
         public firstName: string,
         public lastName: string,
         public email: string,
         public imagePath: any,
         public imageFileUploaded: boolean,
         public imageFile: any
     ){}
 }