export class CreateSliderModel {
    constructor(
         public heading: string,
         public text: string,
         public imageFile: File,
         public imageAlt: string,
         public imageTitle: string,
         public btnLink: string,
         public btnText: string
     ){}
 }
