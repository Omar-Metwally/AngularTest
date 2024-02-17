import { filter } from 'rxjs/operators';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { GetMealRequest, GetMealTableRequest } from 'src/app/api/models';
import { MealsService } from 'src/app/api/services';
import { FilterPipe } from 'src/app/filter.pipe';
import {MatFormField, MatInputModule, MatLabel} from '@angular/material/input';
import { SharedModule } from "../../shared/shared.module"; 

@Component({
    selector: 'app-meals-table',
    standalone: true,
    templateUrl: './meals-table.component.html',
    styleUrl: './meals-table.component.css',
    imports: [MatTableModule, MatSortModule, MatButtonModule, MatAutocomplete, MatFormField, MatLabel, FormsModule,
        MatInputModule, SharedModule]
})
export class MealsTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  searchText: FormControl = new FormControl('');


  displayedColumns: string[] = ['title', 'category', 'spiceLevel', 'totalSold', 'isAvailable', 'rating', 'button'];
  getMealTableRequest: GetMealTableRequest[] = []
  dataSource = new MatTableDataSource(this.getMealTableRequest);
  errorMessages: string[] = [];

  constructor(private _liveAnnouncer: LiveAnnouncer,private mealsService: MealsService) {
    this.getMealsData()
  }

  getMealsData(){
    this.mealsService.mealsChiefMealsGet().subscribe({
      next: (body) => {
        console.log(body)
        this.dataSource = new MatTableDataSource<GetMealTableRequest>(body)
        ///this.dataSource.paginator = this.paginatior;
        this.dataSource.sort = this.sort;
      },
      error: error => {
        if (error.error.errors) {
          this.errorMessages = error.error.errors;
        } else {
          this.errorMessages.push(error.error);
        }
      }
    })
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {

    console.log(sortState)
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

applyFilter() {
  this.dataSource.filter = this.searchText.value.trim().toLowerCase();
}
}
