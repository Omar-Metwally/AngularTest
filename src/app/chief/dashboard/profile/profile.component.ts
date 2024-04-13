import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AddressService } from 'src/app/address/address.service';
import { FileHandle } from 'src/app/shared/file-input/file-handle.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { Option } from 'src/app/shared/models/address/option';
import { SelectInputComponent } from 'src/app/shared/select-input/select-input.component';
import { EndTimeValidator, PhoneValidator, StartTimeValidator } from 'src/app/account/account.service';
import { NationalIDValidator } from 'src/app/account/account.service';
import { NgbTimepickerModule, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { FileInputComponent } from "../../../shared/file-input/file-input.component";



@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [CommonModule, SharedModule, SelectInputComponent, NgbTimepickerModule, FormsModule, MatRadioButton, MatRadioModule, FileInputComponent]
})
export class ProfileComponent {


  constructor(private formBuilder: FormBuilder,
    private addressService: AddressService,
    private phoneValidator: PhoneValidator,
    private nationalIDValidator: NationalIDValidator,
    private startTimeValidator: StartTimeValidator,
    private endTimeValidator: EndTimeValidator){
    this.upsertChiefDataForm = this.formBuilder.group({
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      buildingID: this.building,
      chiefImage: this.chiefImage,
      coverImage: this.coverImage,
      healthCert: this.healthCert,
      startTime: this.startTime,
      endTime: this.endTime
    })

    this.startTimeValidator.setStartTime(this.endTime.value)
    this.endTimeValidator.setEndTime(this.startTime.value)

    this.district.disable();
    this.street.disable();
    this.building.disable();
    this.floor.disable();
    this.apartment.disable();

    this.coverImage.setValue({url: "/assets/images/akl.jpg"})
    this.addressService.getDistricts("cf9bcb15-258e-48ba-a9f6-fd1767413b46").subscribe({
      next: (districts: Option[]) => {
        this.districts = districts;
        this.district.enable();
      },
      error: (error) => {
      }
    });
  }
  firstName: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator, Validators.minLength(3), Validators.maxLength(20)],
  });
  lastName: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator, Validators.minLength(3), Validators.maxLength(20)],
  });
  phone: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator, Validators.minLength(9), Validators.maxLength(13),
      this.phoneValidator.validate.bind(this.phoneValidator)],
  });
  district: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });
  street: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });
  building: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });
  floor: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });
  apartment: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });
  nationalID: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator,
      this.nationalIDValidator.validate.bind(this.nationalIDValidator)],
  });
  
  startTime: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator,
      this.startTimeValidator.validate.bind(this.startTimeValidator)],
  });
  endTime: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator,
      this.endTimeValidator.validate.bind(this.endTimeValidator)],
  });
  chiefImage: FormControl = new FormControl('', {  });
  coverImage: FormControl = new FormControl('', {  });
  healthCert: FormControl = new FormControl('', {  });
  chiefImageFileHandle: FileHandle = {}
  coverImageFileHandle: FileHandle = {}
  healthCertImageFileHandle: FileHandle = {}
  dailyShiftAvailable = false;

  upsertChiefDataForm: FormGroup;

  districts: Option[] = [];
  streets: Option[] = [];
  buildings: Option[] = [];

  startTimeStruct: NgbTimeStruct = { hour: 8, minute: 0, second: 0 };
  endTimeStruct: NgbTimeStruct = { hour: 21, minute: 0, second: 0 };

	hourStep = 1;
	minuteStep = 15;

  UpsertForm(){
    if(this.upsertChiefDataForm.valid && this.startTime.valid){
      
    }
  }


  districtOptionSelected = () => {
    this.street.setValue('')
    this.building.setValue('')
    this.street.disable();
    this.building.disable();
    if (this.district.value != null && this.district.value.id !== null){
      this.addressService.getStreets(this.district.value.id).subscribe({
        next: (streets: Option[]) => {
          this.streets = streets;
          this.street.enable();
        },
        error: (error) => {
        }
      });
    }
  }

  streetOptionSelected = () => {
    this.building.setValue('')
    this.building.disable();
    if (this.street.value != null && this.street.value.id !== null){
      this.addressService.getBuildings(this.street.value.id).subscribe({
        next: (buildings: Option[]) => {
          this.buildings = buildings;
          this.building.enable();
        },
        error: (error) => {
        }
      });
    }
  }

  buildingOptionSelected = () => {
    this.floor.setValue('')
    this.floor.disable();
    if (this.building.value != null && this.building.value.id !== null) this.floor.enable();
  }

  validateTimes() {
    if (this.startTime.value && this.endTime.value) {
      const startTimeInMinutes = this.convertToMinutes(this.startTime.value);
      const endTimeInMinutes = this.convertToMinutes(this.endTime.value);
  
      if (startTimeInMinutes > endTimeInMinutes) {
        this.startTime.setErrors({ invalidTime: `you cannot end your shift before starting it` })
        this.endTime.setErrors({ invalidTime: `you cannot end your shift before starting it` })
      }
      else{
        this.startTime.setErrors({ invalidTime: null })
        this.endTime.setErrors({ invalidTime: null })      
      }
    }
  }

  display(){
    console.log(this.convertToApiTime(this.startTime.value));
  }

  convertToMinutes(time: NgbTimeStruct): number {
    return time.hour * 60 + time.minute;
  }

  convertToApiTime(time: NgbTimeStruct): string {
    return `${time.hour}:${time.minute}`
  }
}
