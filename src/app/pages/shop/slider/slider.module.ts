import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { SliderListPage } from './slider-list/slider-list.page';
import { SliderRoutingModule } from './slider.routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { CreateSliderDialog } from './create-slider/create-slider.dialog';
import { EditSliderDialog } from './edit-slider/edit-slider.dialog';
import { SliderService } from '@app_services/shop/slider/slider.service';
import { DirectivesModule } from '@app_directives/directives.module';

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
    ComponentsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    DirectivesModule
  ],
  exports: [
    SliderListPage
  ],
  schemas: [],
  providers: [SliderService]
})
export class SliderModule { }
