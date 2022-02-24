import { ArticleModel } from "./article";
import { IPaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder } from '../../_common/IPaging';

export class FilterArticleModel implements IPaging {

    pageId: number;
    allPagesCount: number;
    takePage: number;
    sortCreationDateOrder: PagingDataSortCreationDateOrder;
    sortIdOrder: PagingDataSortIdOrder;
    title: string;
    categoryId: string;
    articles: ArticleModel[];

   constructor(
        title: string,
        categoryId: string,
        articles: ArticleModel[],
        pageId: number,
        takePage: number,
        sortCreationDateOrder: PagingDataSortCreationDateOrder,
        sortIdOrder: PagingDataSortIdOrder
        ){
        this.title = title;
        this.categoryId = categoryId;
        this.articles = articles;
        this.pageId = pageId;
        this.takePage = takePage;
        this.sortCreationDateOrder = sortCreationDateOrder;
        this.sortIdOrder = sortIdOrder;
    }
}