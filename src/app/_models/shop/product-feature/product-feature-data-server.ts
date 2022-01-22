import { FilterProductFeatureModel, ProductFeatureModel} from "./_index";
import { catchError, finalize } from 'rxjs/operators';
import { IResponse } from '@app_models/common/IResponse';
import { ProductFeatureService } from "@app_services/shop/product-feature/product-feature.service";
import { of } from "rxjs";

export class ProductFeatureDataServer {

    public data: ProductFeatureModel[] = [];
    public resultsLength = 0;
    public isLoadingResults = true;
    public pageId: number = 1;

    constructor(private productFeatureService: ProductFeatureService) {}

    loadProductCategories(filterProductFeatures: FilterProductFeatureModel) {

        this.isLoadingResults = true;

        this.productFeatureService.filterProductFeature(filterProductFeatures)
        .pipe(catchError(() => of([])),finalize(() => {
            this.isLoadingResults = true;
        }))
        .subscribe((res : IResponse<FilterProductFeatureModel>) => {
            setTimeout(() => {
                this.data = res.data.productFeatures;
                this.resultsLength = res.data.allPagesCount;
                this.isLoadingResults = false;
                this.pageId = res.data.pageId;
            }, 750)
        });

    } 
}

