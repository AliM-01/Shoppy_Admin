import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { FilterProductPictureModel, ProductPictureModel} from "./_index";
import { catchError, finalize } from 'rxjs/operators';
import { IResponse } from '../common/IResponse';
import { ProductPictureService } from "@app_services/product-picture/product-category.service";

export class ProductPictureDataSource implements DataSource<ProductPictureModel> {

    private productPicturesSubject = new BehaviorSubject<ProductPictureModel[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(true);

    public loading$ = this.loadingSubject.asObservable();
    public length : number = 0;

    constructor(private productPictureService: ProductPictureService) {}

    connect(collectionViewer: CollectionViewer=null): Observable<ProductPictureModel[]> {
        return this.productPicturesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer=null): void {
        this.productPicturesSubject.complete();
        this.loadingSubject.complete();
    }

    loadProductPictures(filterProductPictures: FilterProductPictureModel) {

        this.loadingSubject.next(true);

        this.productPictureService.filterProductPictures(filterProductPictures)
        .pipe(catchError(() => of([])),finalize(() => this.loadingSubject.next(true)))
        .subscribe((res : IResponse<any>) => {
            

            setInterval(() => {
                
                this.length = res.data.productPictures.length;

                this.productPicturesSubject.next(res.data.productPictures);
                
                this.loadingSubject.next(false);
            }, 500)
        });

    }    
}

