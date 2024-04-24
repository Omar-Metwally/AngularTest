import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { ChiefService } from 'src/app/api/services';
import { ChiefPost$Params } from 'src/app/api/fn/chief/chief-post';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { raceWith } from 'rxjs';



@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [CommonModule, SharedModule, SelectInputComponent, NgbTimepickerModule, FormsModule, MatRadioButton, MatRadioModule, FileInputComponent, MatFormFieldModule, MatInputModule]
})
export class ProfileComponent{


  constructor(private formBuilder: FormBuilder,
    private addressService: AddressService,
    private phoneValidator: PhoneValidator,
    private nationalIDValidator: NationalIDValidator,
    private startTimeValidator: StartTimeValidator,
    private endTimeValidator: EndTimeValidator,
    private chiefService: ChiefService){
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

    // console.log(this.startTime.value,this.endTime.value)
    this.startTimeValidator.setStartTime(this.endTime.value)
    this.endTimeValidator.setEndTime(this.startTime.value)

    this.district.disable();
    this.street.disable();
    this.building.disable();
    this.floor.disable();
    this.apartment.disable();

    this.addressService.getDistricts("cf9bcb15-258e-48ba-a9f6-fd1767413b46").subscribe({
      next: (districts: Option[]) => {
        this.districts = districts;
        this.district.enable();
      },
      error: (error) => {
      }
    });

    this.floor.valueChanges.subscribe((newValue) => {
      this.apartment.setValue('')
      this.apartment.disable();
      if (newValue != '') this.apartment.enable();
    });

    this.chiefService.chiefGetChiefProfileDataGet().subscribe({
      next: async (response) => {
        console.log(response);
        this.coverImage.setValue({url: response.coverImage})
        this.chiefImage.setValue({url: response.chiefImage})
        this.firstName.setValue(response.firstName);
        this.lastName.setValue(response.lastName);
        this.phone.setValue(response.phoneNumber);
        this.description.setValue(response.description);
        this.dailyShiftAvailable = true;
        this.startTime.setValue(this.convertToNgbTime(response.startTime ?? "08:00:00"));
        this.endTime.setValue(this.convertToNgbTime(response.closeTime ?? "21:00:00"));
        this.district.setValue(this.districts.find(x => x.id == response.districtID));
        await this.districtOptionSelected();
        this.street.setValue(this.streets.find(x => x.id == response.streetID));
        await this.streetOptionSelected();
        this.building.setValue(this.buildings.find(x => x.id == response.buildingID));
        this.buildingOptionSelected();
        this.floor.setValue(response.floorNumber);
        this.apartment.setValue(response.apartmentNumber);
        this.nationalID.setValue(response.governmentID)
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
  description: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator, Validators.minLength(3), Validators.maxLength(255)],
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
  chiefImage: FormControl = new FormControl({url: ''});
  coverImage: FormControl = new FormControl({url: ''});
  healthCert: FormControl = new FormControl({url: ''});
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

  UpsertForm(){
    console.log(this.upsertChiefDataForm, this.startTime)
    if(this.upsertChiefDataForm.valid && this.startTime.valid){
      const chiefPostPrams: ChiefPost$Params = {
        body: {
          apartmentNumber: this.apartment.value,
          buildingID: this.building.value.id,
          chiefImage: this.chiefImageFileHandle.file,
          closeTime: this.convertToApiTime(this.startTime.value),
          coverImage: this.coverImageFileHandle.file,
          description: this.description.value,
          firstName: this.firstName.value,
          floorNumber: this.floor.value,
          healthCertImage: this.healthCertImageFileHandle.file,
          lastName: this.lastName.value,
          phoneNumber: this.phone.value,
          startTime: this.convertToApiTime(this.endTime.value),
          governmentID: this.nationalID.value
        }
      }
      this.chiefService.chiefPost(chiefPostPrams).subscribe({
        next:(response) => {
          console.log(response)
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
  }


  districtOptionSelected = () => {
    return new Promise<void>((resolve, reject) => {
      this.street.setValue('');
      this.building.setValue('');
      this.street.disable();
      this.building.disable();
      if (this.district.value != null && this.district.value.id !== null) {
        this.addressService.getStreets(this.district.value.id).subscribe({
          next: (streets: Option[]) => {
            this.streets = streets;
            this.street.enable();
            resolve();
          },
          error: (error) => {
            reject(error);
          }
        });
      } else {
        resolve();
      }
    });
  };

  streetOptionSelected = () => {
    return new Promise<void>((resolve, reject) => {
      this.building.setValue('');
      this.building.disable();
      if (this.street.value != null && this.street.value.id !== null) {
        this.addressService.getBuildings(this.street.value.id).subscribe({
          next: (buildings: Option[]) => {
            this.buildings = buildings;
            this.building.enable();
            resolve();
          },
          error: (error) => {
            reject(error);
          }
        });
      } else {
        resolve();
      }
    });
  };
  

  buildingOptionSelected = () => {
    this.floor.setValue('')
    this.floor.disable();
    if (this.building.value != null && this.building.value.id !== null) this.floor.enable();
  }

  display(){
    console.log(this.startTime, this.endTime);
  }

  convertToMinutes(time: NgbTimeStruct): number {
    return time.hour * 60 + time.minute;
  }

  convertToApiTime(time: NgbTimeStruct): string {
    let hour = time.hour.toString();
    let minute = time.minute.toString();

    if (time.hour < 10){
       hour = `0${time.hour}`
    }
    if (time.minute < 10){
       minute = `0${time.minute}`
    }
    return `${hour}:${minute}:00`
  }
  
  convertToNgbTime(time: string): NgbTimeStruct {
    const [hourStr, minuteStr, secondStr] = time.split(':');

    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    const second = parseInt(secondStr, 10);


    const angularTime: NgbTimeStruct = {
        hour: hour,
        minute: minute,
        second: second
    };

    return angularTime;
}
}
