import { ArticleCategoryModel } from "./article-category";
import { IPaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder } from '../../_common/IPaging';

export class FilterArticleCategoryModel implements IPaging {

    pageId: number;
    dataCount: number;
    takePage: number;
    sortCreationDateOrder: PagingDataSortCreationDateOrder;
    sortIdOrder: PagingDataSortIdOrder;
    title: string;
    articleCategories: ArticleCategoryModel[];

   constructor(
        title: string,
        articleCategories: ArticleCategoryModel[],
        pageId: number,
        takePage: number,
        sortCreationDateOrder: PagingDataSortCreationDateOrder,
        sortIdOrder: PagingDataSortIdOrder
        ){
        this.title = title;
        this.articleCategories = articleCategories;
        this.pageId = pageId;
        this.takePage = takePage;
        this.sortCreationDateOrder = sortCreationDateOrder;
        this.sortIdOrder = sortIdOrder;
    }
}
