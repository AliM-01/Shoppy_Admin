import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { ProductCategoryService } from "@app_services/shop/product-category/product-category.service";
import { BehaviorSubject, Observable, of } from "rxjs";
import { FilterProductCategoryModel, ProductCategoryModel} from "./_index";
import { catchError, finalize } from 'rxjs/operators';
import { IResponse } from '@app_models/common/IResponse';

export class ProductCategoryDataSource implements DataSource<ProductCategoryModel> {

    private productCategoriesSubject = new BehaviorSubject<ProductCategoryModel[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(true);

    public loading$ = this.loadingSubject.asObservable();
    public length : number = 0;

    constructor(private productCategoryService: ProductCategoryService) {}

    connect(collectionViewer: CollectionViewer=null): Observable<ProductCategoryModel[]> {
        return this.productCategoriesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer=null): void {
        this.productCategoriesSubject.complete();
        this.loadingSubject.complete();
    }

    loadProductCategories(filterProductCategories: FilterProductCategoryModel) {

        this.loadingSubject.next(true);

        this.productCategoryService.filterProductCategory(filterProductCategories)
        .pipe(catchError(() => of([])),finalize(() => this.loadingSubject.next(true)))
        .subscribe((res : IResponse<any>) => {
            

            setInterval(() => {
                
                this.length = res.data.productCategories.length;

                this.productCategoriesSubject.next(res.data.productCategories);
                
                this.loadingSubject.next(false);
            }, 500)
        });

    }    
}

