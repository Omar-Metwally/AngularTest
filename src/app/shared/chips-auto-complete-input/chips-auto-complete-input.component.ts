import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {AsyncPipe} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Option } from '../models/address/option';

@Component({
  selector: 'app-chips-auto-complete-input',
  standalone: true,
  templateUrl: './chips-auto-complete-input.component.html',
  styleUrl: './chips-auto-complete-input.component.css',
  imports: [FormsModule, MatFormFieldModule, MatChipsModule, MatIconModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe],
})

export class ChipsAutoCompleteInputComponent {
  
  @ViewChild('input')
  input!: ElementRef<HTMLInputElement>;
  filteredOptions: Option[] = [];
  //separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input() SelectedOptions: Option[] = [];
  @Input() control: FormControl = new FormControl('')
  @Input() type = 'text'
  @Input() placeholder = ''
  @Input() label = ''
  @Input() format = ''
  @Input() icon = ''
  @Input() style = ''
  @Input() class = ''
  @Input() options: Option[] = []
  @Input() optionSelected!:() => void;

  
  remove(option: Option): void {
    const index = this.SelectedOptions.indexOf(option);
    this.options.push(option);
    if (index >= 0) {
      this.SelectedOptions.splice(index, 1);
    }
    this.control.setValue(this.SelectedOptions);
    this.optionSelected;
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.SelectedOptions.push(event.option.value);
    const index = this.options.indexOf(event.option.value);
    if (index >= 0) this.options.splice(index, 1);
    this.input.nativeElement.value = '';

    this.optionSelected;
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter(o => o.name.toLowerCase().includes(filterValue));
  }

}