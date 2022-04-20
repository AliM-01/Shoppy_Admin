export class CreateArticleCategoryModel {
  constructor(
    public title: string,
    public description: string,
    public orderShow: number,
    public imageFile: File,
    public imageAlt: string,
    public imageTitle: string,
    public metaKeywords: string,
    public metaDescription: string,
    public canonicalAddress: string
  ) { }
}
