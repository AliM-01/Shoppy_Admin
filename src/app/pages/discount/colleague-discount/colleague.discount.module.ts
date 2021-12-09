import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button'; 
import { ToastrModule } from 'ngx-toastr';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { DirectivesModule } from '@app_directives/directives.module';
import { ColleagueDiscountService } from '@app_services/discount/colleague-discount/colleague-discount.service';
import { ColleagueDiscountRoutingModule } from './colleague.discount.routing.module';
import { FilterColleagueDiscountComponent } from './filter-colleague-discount/filter-colleague-discount.component';
import { DefineColleagueDiscountComponent } from './define-colleague-discount/define-colleague-discount.component';
import { EditColleagueDiscountComponent } from './edit-colleague-discount/edit-colleague-discount.component';

@NgModule({
  declarations: [
    FilterColleagueDiscountComponent,
    DefineColleagueDiscountComponent,
    EditColleagueDiscountComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ComponentsModule,
    FormsModule,
    ColleagueDiscountRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    DirectivesModule
  ],
  exports: [FilterColleagueDiscountComponent],
  schemas: [],
  providers: [ColleagueDiscountService]
})
export class ColleagueDiscountModule { }
