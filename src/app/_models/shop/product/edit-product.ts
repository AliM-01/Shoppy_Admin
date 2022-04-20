import {CreateProductModel} from "./create-product";

export class EditProductModel extends CreateProductModel {
  id: string;
  code: string;
  imagePath: string;
  imageFileUploaded: boolean;

  constructor(
    id: string,
    categoryId: string,
    title: string,
    shortDescription: string,
    description: string,
    imageFile: File,
    imageFileUploaded: boolean,
    imageAlt: string,
    imageTitle: string,
    metaKeywords: string,
    metaDescription: string
  ) {
    super(categoryId, title, shortDescription, description, imageFile, imageTitle, imageAlt, metaKeywords, metaDescription);
    this.id = id;
    this.imageFileUploaded = imageFileUploaded;
  }
}
