import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressService } from 'src/app/address/address.service';
import { FileHandle } from 'src/app/shared/file-input/file-handle.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { Option } from 'src/app/shared/models/address/option';
import { SelectInputComponent } from 'src/app/shared/select-input/select-input.component';
import { PhoneValidator } from 'src/app/account/account.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, SharedModule, SelectInputComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {


  constructor(private formBuilder: FormBuilder,
    private addressService: AddressService,
    private phoneValidator: PhoneValidator){
    this.upsertChiefDataForm = this.formBuilder.group({
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      buildingID: this.building,
      chiefImage: this.chiefImage,
      coverImage: this.coverImage,
      healthCert: this.healthCert
    })

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
  startTime: FormControl = new FormControl('', {});
  endTime: FormControl = new FormControl('', {});
  chiefImage: FormControl = new FormControl('', {  });
  coverImage: FormControl = new FormControl('', {  });
  healthCert: FormControl = new FormControl('', {  });
  chiefImageFileHandle: FileHandle = {}
  coverImageFileHandle: FileHandle = {}
  healthCertImageFileHandle: FileHandle = {}

  upsertChiefDataForm: FormGroup;

  districts: Option[] = [];
  streets: Option[] = [];
  buildings: Option[] = [];

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

}
