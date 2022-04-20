import {FilterProductFeatureModel, ProductFeatureModel} from "./_index";
import {catchError, finalize} from 'rxjs/operators';
import {ProductFeatureService} from "@app_services/shop/product-feature/product-feature.service";
import {of} from "rxjs";

export class ProductFeatureDataServer {

    public data: ProductFeatureModel[] = [];
    public resultsLength = 0;
    public isLoadingResults = true;
    public pageId = 1;

    constructor(private productFeatureService: ProductFeatureService) {}

    loadProductFeatures(filterProductFeatures: FilterProductFeatureModel): void {

        this.isLoadingResults = true;

        this.productFeatureService.filterProductFeature(filterProductFeatures)
        .pipe(catchError(() => of([])), finalize(() => {
            this.isLoadingResults = true;
        }))
        .subscribe((res : FilterProductFeatureModel) => {
            setTimeout(() => {
                this.data = res.productFeatures;
                this.resultsLength = res.dataCount;
                this.isLoadingResults = false;
                this.pageId = res.pageId;
            }, 750)
        });

    }
}

