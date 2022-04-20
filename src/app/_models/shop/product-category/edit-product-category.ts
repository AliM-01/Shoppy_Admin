import {CreateProductCategoryModel} from "./create-product-category";

export class EditProductCategoryModel extends CreateProductCategoryModel {
  id: string;
  imagePath: string;
  imageFileUploaded: boolean;

  constructor(
    id: string,
    title: string,
    description: string,
    imageFileUploaded: boolean,
    imageFile: File,
    imageAlt: string,
    imageTitle: string,
    metaKeywords: string,
    metaDescription: string
  ) {
    super(title, description, imageFile, imageAlt, imageTitle, metaKeywords, metaDescription);
    this.id = id;
    this.imageFileUploaded = imageFileUploaded;
  }
}
