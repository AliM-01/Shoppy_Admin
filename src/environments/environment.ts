export const baseApiUrl = "https://localhost:5001";

export const environment = {
  production: false,

  // api urls
  authBaseApiUrl: baseApiUrl + "/api/account",
  shopBaseApiUrl: baseApiUrl + "/api/admin/shop",
  discountBaseApiUrl: baseApiUrl + "/api/admin/discount",
  inventoryBaseApiUrl: baseApiUrl + "/api/admin/inventory",
  commentBaseApiUrl: baseApiUrl + "/api/admin/comment",
  blogBaseApiUrl: baseApiUrl + "/api/admin/blog",
  accountBaseApiUrl: baseApiUrl + "/api/admin/account",
  orderBaseApiUrl: baseApiUrl + "/api/admin/order",
  reportBaseApiUrl: baseApiUrl + "/api/admin/report",

  ckeditorImgUploadUrl: baseApiUrl + "/upload/img-upload/",

  // image paths
  avatarBaseImagePath: baseApiUrl + "/upload/avatar",
  productCategoryBaseImagePath: baseApiUrl + "/upload/product_category",
  productBaseImagePath: baseApiUrl + "/upload/product",
  productPictureBaseImagePath: baseApiUrl + "/upload/product_picture",
  sliderBaseImagePath: baseApiUrl + "/upload/slider",
  articleCategoryBaseImagePath: baseApiUrl + "/upload/article_category",
  articleBaseImagePath: baseApiUrl + "/upload/article"
};
