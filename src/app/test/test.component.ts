import { Component } from '@angular/core';
import { User, UserColumns } from './user';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from './user.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [MatButtonModule,MatInputModule , FormsModule ,CommonModule, SharedModule, MatTableModule, MatCheckboxModule, MatFormFieldModule, MatNativeDateModule , MatDatepickerModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

  ingredientQuantityControl: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator, Validators.min(5), Validators.max(5000)],
  });
  ingredientOptionControl: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });

  ingredientData: User[] = [{id: 0, isSelected: false, ingredient: {id: "0", name: ''}, IsEdit: true, quantity: 5},{id: 1, isSelected: false, ingredient: {id: "0", name: ''}, IsEdit: true, quantity: 5}]



  displayedColumns: string[] = UserColumns.map((col) => col.key)
  columnsSchema: any = UserColumns
  dataSource = new MatTableDataSource<User>()
  valid: any = {}

  constructor(public dialog: MatDialog, private userService: UserService) {}

  ngOnInit() {
    // this.userService.getUsers().subscribe((res: any) => {
      this.dataSource.data = this.ingredientData
    // })0
  }

  editRow(row: User) {
    if (row.id === 0) {
      this.userService.addUser(row).subscribe((newUser: User) => {
        row.id = newUser.id
      })
    } else {
      // this.userService.updateUser(row).subscribe(() => (row.isEdit = false))
    }
  }

  addRow() {
    const newRow: User = {
      id: 0,
      isSelected: false,
      ingredient: {
        id: '',
        name: ''
      },
      quantity: 5,
      IsEdit: false
    }
    this.dataSource.data = [newRow, ...this.dataSource.data]
    console.log(this.dataSource.data)
  }

  removeRow(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (u: User) => u.id !== id,
      )
    })
  }

  removeSelectedRows() {
    const users = this.dataSource.data.filter((u: User) => u.isSelected)
    // this.dialog
    //   .open(ConfirmDialogComponent)
    //   .afterClosed()
    //   .subscribe((confirm) => {
    //     if (confirm) {
    //       this.userService.deleteUsers(users).subscribe(() => {
    //         this.dataSource.data = this.dataSource.data.filter(
    //           (u: User) => !u.isSelected,
    //         )
    //       })
    //     }
    //   })
  }

  inputHandler(e: any, id: number, key: string) {
    console.log(`Input value for element ${id} - key ${key}: ${e.target.value}`);
    console.log(e)
    if (!this.valid[id]) {
      this.valid[id] = {}
    }
    this.valid[id][key] = e.target.validity.valid
  }

  disableSubmit(id: number) {
    console.log(id)
    console.log('hello0')
    if (this.valid[id]) {
      console.log('hello1')
      return Object.values(this.valid[id]).every((item) => item === false)
    }
    console.log('hello2')
    return true
  }

  isAllSelected() {
    return this.dataSource.data.every((item) => item.isSelected)
  }

  isAnySelected() {
    return this.dataSource.data.some((item) => item.isSelected)
  }

  selectAll(event: any) {
    this.dataSource.data = this.dataSource.data.map((item) => ({
      ...item,
      isSelected: event.checked,
    }))
  }

}
