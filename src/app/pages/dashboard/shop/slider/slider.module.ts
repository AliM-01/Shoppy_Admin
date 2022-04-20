import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ComponentsModule} from '@app_components/components.module';
import {SliderListPage} from './slider-list/slider-list.page';
import {SliderRoutingModule} from './slider.routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CreateSliderDialog} from './create-slider/create-slider.dialog';
import {EditSliderDialog} from './edit-slider/edit-slider.dialog';
import {SliderService} from '@app_services/shop/slider/slider.service';
import {DirectivesModule} from '@app_directives/directives.module';
import {AppMaterialModule} from '@appapp-material.module';

@NgModule({
  declarations: [
    SliderListPage,
    CreateSliderDialog,
    EditSliderDialog
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SliderRoutingModule,
    AppMaterialModule,
    ComponentsModule,
    DirectivesModule
  ],
  exports: [
    SliderListPage
  ],
  schemas: [],
  providers: [SliderService]
})
export class SliderModule { }
