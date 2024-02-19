import { filter } from 'rxjs/operators';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { GetMealRequest, GetMealTableRequest } from 'src/app/api/models';
import { MealsService } from 'src/app/api/services';
import {MatFormField, MatInputModule, MatLabel} from '@angular/material/input';
import { SharedModule } from "../../shared/shared.module";
import { SelectInputComponent } from "../../shared/select-input/select-input.component"; 
import { MealsGet$Params } from 'src/app/api/fn/meals/meals-get';
import { Option } from 'src/app/shared/models/address/option';


@Component({
    selector: 'app-meals-table',
    standalone: true,
    templateUrl: './meals-table.component.html',
    styleUrl: './meals-table.component.css',
    imports: [MatTableModule, MatSortModule, MatButtonModule, MatAutocomplete, MatFormField, MatLabel, FormsModule,
        MatInputModule, SharedModule, SelectInputComponent]
})
export class MealsTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  categoryOptions: Option[] = [];
  spiceLevelOptions: Option[] = [];
  tagsOptions: Option[] = [];


  searchText: FormControl = new FormControl('');
  sortBy: FormControl = new FormControl('', {
  });
  category: FormControl = new FormControl('', {
  });
  spiceLevel: FormControl = new FormControl('', {
  });
  tags: FormControl = new FormControl('', {
  });
  startPrice: FormControl = new FormControl('',{
    validators: [Validators.min(0), Validators.max(5000)]
  })
  endPrice: FormControl = new FormControl('',{
    validators: [Validators.min(0), Validators.max(5000)]
  })
  filterForm: FormGroup = new FormGroup({});
  mealGetRequest: MealsGet$Params = {
    PageNumber:1,
    PageSize:5,
    SortBy:1,
  }

  displayedColumns: string[] = ['title', 'category', 'spiceLevel', 'totalSold', 'isAvailable', 'rating', 'button'];
  getMealTableRequest: GetMealTableRequest[] = []
  dataSource = new MatTableDataSource(this.getMealTableRequest);
  errorMessages: string[] = [];

  constructor(private _liveAnnouncer: LiveAnnouncer,private mealsService: MealsService) {
    this.categoryOptions.push({ id: '0', name: 'Main Dish' }, { id: '1', name: 'Side Dish' }, { id: '2', name: 'Appetizer' });
    this.spiceLevelOptions.push({ id: '0', name: 'Not Spicy' }, { id: '1', name: 'Mild' }, { id: '2', name: 'Medium' }, { id: '3', name: 'Hot' }, { id: '4', name: 'Very Hot' });
    this.tagsOptions.push({ id: '1', name: 'Healthy' }, { id: '3', name: 'Keto' }, { id: '6cea3c8b-ae0c-44a8-ad6d-4f2ff7f7e1df', name: 'Not Healthy' }, { id: '6cea3c8b-ae0c-44a8-ad6d-4f2ff7f7e1dc', name: 'Wrong ID' }, { id: '4', name: 'Very Hot' });
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
