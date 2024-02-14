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

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

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
  // searchText: string = '';

  // categoryFilter: number | null = null; // Changed to number type
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA); // Assuming ELEMENT_DATA is your data source

  // searchText: any;
  // categoryFilter: any;


  displayedColumns: string[] = ['title', 'category', 'spiceLevel', 'totalSold', 'isAvailable', 'rating', 'button'];
  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
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

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    console.log(sortState)
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  // searchText='';

//    productContainer=[];
//    searchProduct(item) {
//     let box=``;
//     for(var i=0; i < productContainer.length; i++){
//       if (productContainer[i].name.toLowerCase().includes(item.toLowerCase()) == true)
//       { }
//     }
// }

// myDataSource:any;
// findProductByName(name:HTMLInputElement){
//   this.applyFilter(name.value);
// }

//   applyFilter(filterValue:string){
//     filterValue=filterValue.trim();
//     filterValue=filterValue.toLowerCase();
//     this.myDataSource.filter=filterValue;
//   }
applyFilter() {
  this.dataSource.filter = this.searchText.value.trim().toLowerCase();
}
// applyFilter() {
//   this.dataSource.filterPredicate = (data, filter: string) => {
//     const searchTextLowerCase = this.searchText.trim().toLowerCase();
//     if (this.categoryFilter !== null) {
//       return (
//         data.title.toLowerCase().includes(searchTextLowerCase) &&
//         data.category === this.categoryFilter
//       );
//     } else {
//       return data.title.toLowerCase().includes(searchTextLowerCase);
//     }
//   };
//   this.dataSource.filter = 'triggerFilter';
// }

}
