// import { Component, Input, ViewChild, ElementRef } from '@angular/core';
// import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Option } from '../models/address/option';
// import { AsyncPipe } from '@angular/common';
// import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { NgxMaskDirective } from 'ngx-mask';

// @Component({
//   selector: 'app-select-input',
//   templateUrl: './select-input.component.html',
//   styleUrl: './select-input.component.css',
//   standalone: true,
//   imports:[    
//     FormsModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatAutocompleteModule,
//     ReactiveFormsModule,
//     AsyncPipe,
//     NgxMaskDirective,
//     MatAutocomplete
//   ],
// })
// export class SelectInputComponent {

//   @Input() control: FormControl = new FormControl()
//   @Input() type = 'text'
//   @Input() placeholder = ''
//   @Input() label = ''
//   @Input() format = ''
//   @Input() icon = ''
//   @Input() style = ''
//   @Input() class = ''
//   @Input() options: Option[] = []
//   @Input() selectedGovernorate: string ='';

//   constructor() {
//     this.filteredOptions = this.options.slice();
//    }

//   @ViewChild('input')
//   input!: ElementRef<HTMLInputElement>;
//   filteredOptions: Option[];

//   filter(): void {
//     const filterValue = this.input.nativeElement.value.toLowerCase();
//     this.filteredOptions = this.options.filter(o => o.name.toLowerCase().includes(filterValue));
//   }

//   displayFn(option: Option): string {
//     this.selectedGovernorate = option.id
//     return option && option.name ? option.name : '';
//   }
// }

import {Component, ElementRef, Input, ViewChild, input} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe, CommonModule} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Option } from 'src/app/shared/models/address/option';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.css',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatIconModule,
    CommonModule,
  ],
})
export class SelectInputComponent {
  @ViewChild('input')
  input!: ElementRef<HTMLInputElement>;
  myControl = new FormControl('');
  filteredOptions: Option[];
  @Input() control: FormControl = new FormControl()
  @Input() type = 'text'
  @Input() placeholder = ''
  @Input() label = ''
  @Input() format = ''
  @Input() icon = ''
  @Input() style = ''
  @Input() class = ''
  @Input() options: Option[] = []
  @Input() optionSelected: () => void = () => {};

  constructor() {
    this.filteredOptions = this.options;
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter(o => o.name.toLowerCase().includes(filterValue));
    //.map(o => o.name);
  }

  displayFn(option: Option): string {
    return option && option.name ? option.name : '';
  }

  hg(){
    console.log('hello')
    console.log(this.optionSelected)
    this.optionSelected()
  }
}
