import { ProductService } from "@app_services/shop/product/product.service";
import { of } from "rxjs";
import { FilterProductModel, ProductModel} from "./_index";
import { catchError, finalize } from 'rxjs/operators';
import { IResponse } from '@app_models/common/IResponse';

export class ProductDataSource {

    public data: ProductModel[] = [];
    public resultsLength = 0;
    public isLoadingResults = true;
    public pageId: number = 1;

    constructor(private productService: ProductService) {}

    loadProducts(filterProducts: FilterProductModel) {

        this.isLoadingResults = true;

        this.productService.filterProduct(filterProducts)
        .pipe(catchError(() => of([])),finalize(() => {
            this.isLoadingResults = true;
        }))
        .subscribe((res : IResponse<FilterProductModel>) => {
            setTimeout(() => {
                this.data = res.data.products;
                this.resultsLength = res.data.allPagesCount;
                this.isLoadingResults = false;
                this.pageId = res.data.pageId;
            }, 750)
        });

    }    
}

