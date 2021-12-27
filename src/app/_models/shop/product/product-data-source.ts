import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { ProductService } from "@app_services/shop/product/product.service";
import { BehaviorSubject, Observable, of } from "rxjs";
import { FilterProductModel, ProductModel} from "./_index";
import { catchError, finalize } from 'rxjs/operators';
import { IResponse } from '@app_models/common/IResponse';

export class ProductDataSource implements DataSource<ProductModel> {

    private productsSubject = new BehaviorSubject<ProductModel[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(true);
    public pageId: number = 1;
    public loading$ = this.loadingSubject.asObservable();
    public length : number = 0;

    constructor(private productService: ProductService) {}

    connect(collectionViewer: CollectionViewer=null): Observable<ProductModel[]> {
        return this.productsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer=null): void {
        this.productsSubject.complete();
        this.loadingSubject.complete();
    }

    loadProducts(filterProducts: FilterProductModel) {

        this.loadingSubject.next(true);

        this.productService.filterProduct(filterProducts)
        .pipe(catchError(() => of([])),finalize(() => this.loadingSubject.next(true)))
        .subscribe((res : IResponse<FilterProductModel>) => {
            console.log(res);
            
            setInterval(() => {

                this.length = res.data.allPagesCount;
                this.pageId = res.data.pageId;
                this.productsSubject.next(res.data.products);
                
                this.loadingSubject.next(false);
            }, 500)
        });

    }    
}

