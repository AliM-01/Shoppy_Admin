import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { ProductCategoryService } from "@app_services/product-category/product-category.service";
import { BehaviorSubject, Observable, of } from "rxjs";
import { FilterProductCategory, ProductCategory} from "./_index";
import { catchError, finalize } from 'rxjs/operators';
import { IResponse } from '../common/IResponse';

export class ProductCategoryDataSource implements DataSource<ProductCategory> {

    private productCategoriesSubject = new BehaviorSubject<ProductCategory[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    public length : number = 0;

    constructor(private productCategoryService: ProductCategoryService) {}

    connect(collectionViewer: CollectionViewer=null): Observable<ProductCategory[]> {
        return this.productCategoriesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer=null): void {
        this.productCategoriesSubject.complete();
        this.loadingSubject.complete();
    }

    loadProductCategories(filterProductCategories: FilterProductCategory) {

        this.loadingSubject.next(false);

        this.productCategoryService.filterProductCategory(filterProductCategories)
        .pipe(catchError(() => of([])),finalize(() => this.loadingSubject.next(false)))
        .subscribe((res : IResponse<any>) => {
            this.length = res.data.productCategories.length;

            this.productCategoriesSubject.next(res.data.productCategories);
            
            this.loadingSubject.next(true);
        });

    }    
}

