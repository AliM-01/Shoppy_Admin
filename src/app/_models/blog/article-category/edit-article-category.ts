import {CreateArticleCategoryModel} from "./create-article-category";

export class EditArticleCategoryModel extends CreateArticleCategoryModel {
  id: string;
  imagePath: string;
  imageFileUploaded: boolean;

  constructor(
    id: string,
    title: string,
    description: string,
    orderShow: number,
    imageFileUploaded: boolean,
    imageFile: File,
    imageAlt: string,
    imageTitle: string,
    metaKeywords: string,
    metaDescription: string,
    canonicalAddress: string
  ) {
    super(title, description, orderShow, imageFile, imageAlt, imageTitle, metaKeywords, metaDescription, canonicalAddress);
    this.id = id;
    this.imageFileUploaded = imageFileUploaded;
  }
}
