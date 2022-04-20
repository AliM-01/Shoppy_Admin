import {CreateSliderModel} from "./create-slider";

export class EditSliderModel extends CreateSliderModel {
  id: string;
  imageFileUploaded: boolean;
  imagePath: string;

  constructor(
    id: string,
    heading: string,
    text: string,
    imageFile: File,
    imageFileUploaded: boolean,
    imageAlt: string,
    imageTitle: string,
    btnLink: string,
    btnText: string
  ) {
    super(heading, text, imageFile, imageAlt, imageTitle, btnLink, btnText);
    this.id = id;
    this.imageFileUploaded = imageFileUploaded;
  }
}
