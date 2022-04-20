import {CreateArticleModel} from "./create-article";
export class EditArticleModel extends CreateArticleModel {

  id: string;
  imagePath: string;
  imageFileUploaded: boolean;

  constructor(
    id: string,
    title: string,
    summary: string,
    text: string,
    categoryId: string,
    imageFileUploaded: boolean,
    imageFile: File,
    imageAlt: string,
    imageTitle: string,
    metaKeywords: string,
    metaDescription: string,
    canonicalAddress: string
  ) {
    super(title, summary, text, categoryId, imageFile, imageAlt, imageTitle, metaKeywords, metaDescription, canonicalAddress);
    this.id = id;
    this.imageFileUploaded = imageFileUploaded;
  }
}
