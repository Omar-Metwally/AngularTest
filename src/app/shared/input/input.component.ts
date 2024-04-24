import { Component, Input,EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent  {

  @Input() control: FormControl = new FormControl()
  @Input() type = 'text'
  @Input() placeholder = ''
  @Input() label = ''
  @Input() format = ''
  @Input() prefix = ''
  @Input() suffix = ''
  @Input() endText = ''
  @Input() icon = ''
  @Input() style = ''
  @Input() class = ''
  @Input() ngModel = ''
  @Input() hide: any = ''
  @Input() isDisabled: boolean = true
  @Input() blurMethod!: () => void;
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter<any>();

  onInputChange(newValue: any) {
    this.ngModel = newValue;
    this.ngModelChange.emit(newValue);
  }

}
