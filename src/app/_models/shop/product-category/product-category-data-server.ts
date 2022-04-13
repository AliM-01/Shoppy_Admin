import { ProductCategoryService } from "@app_services/shop/product-category/product-category.service";
import { of } from "rxjs";
import { FilterProductCategoryModel, ProductCategoryModel} from "./_index";
import { catchError, finalize } from 'rxjs/operators';

export class ProductCategoryDataServer {

    public data: ProductCategoryModel[] = [];
    public resultsLength = 0;
    public isLoadingResults = true;
    public pageId: number = 1;

    constructor(private productCategoryService: ProductCategoryService) {}

    loadProductCategories(filterProductCategories: FilterProductCategoryModel) {

        this.isLoadingResults = true;

        this.productCategoryService.filterProductCategory(filterProductCategories)
        .pipe(catchError(() => of([])),finalize(() => {
            this.isLoadingResults = true;
        }))
        .subscribe((res : FilterProductCategoryModel) => {
            setTimeout(() => {
                this.data = res.productCategories;
                this.resultsLength = res.allPagesCount;
                this.isLoadingResults = false;
                this.pageId = res.pageId;
            }, 750)
        });

    }
}

