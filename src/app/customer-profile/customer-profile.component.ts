import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PhoneValidator } from '../account/account.service';
import { Option } from 'src/app/shared/models/address/option';
import { AddressService } from 'src/app/address/address.service';
import { FileHandle } from 'src/app/shared/file-input/file-handle.model';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { AuthService } from '../api/services';
import { AuthCustomerSignUpPost$Params } from '../api/fn/auth/auth-customer-sign-up-post';
import { AuthCustomerProfilePost$Params } from '../api/fn/auth/auth-customer-profile-post';
import { SharedService } from '../shared/shared.service';
import { FileInputComponent } from "../shared/file-input/file-input.component";
import { SelectInputComponent } from "../shared/select-input/select-input.component";



@Component({
    selector: 'app-customer-profile',
    standalone: true,
    templateUrl: './customer-profile.component.html',
    styleUrl: './customer-profile.component.css',
    imports: [SharedModule, CommonModule, FileInputComponent, SelectInputComponent]
})
export class CustomerProfileComponent {

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
  customerImage: FormControl = new FormControl({url: ''});
  customerImageFileHandle: FileHandle = {}

  upsertCustomerDataForm: FormGroup;

  districts: Option[] = [];
  streets: Option[] = [];
  buildings: Option[] = [];

  constructor(private formBuilder: FormBuilder,
    private addressService: AddressService,
    private phoneValidator: PhoneValidator,
    private authService: AuthService,
    private sharedService: SharedService){
    this.upsertCustomerDataForm = this.formBuilder.group({
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      buildingID: this.building,
      chiefImage: this.customerImage,
    })

    this.district.disable();
    this.street.disable();
    this.building.disable();

    this.addressService.getDistricts("cf9bcb15-258e-48ba-a9f6-fd1767413b46").subscribe({
      next: (districts: Option[]) => {
        this.districts = districts;
        this.district.enable();
      },
      error: (error) => {
      }
    });
    this.sharedService.showLoadingSpinner()
    this.authService.authCustomerProfileGet().subscribe({

      next: async (response) => {
        setTimeout(async() => {
          this.customerImage.setValue({url: response.image})
          this.firstName.setValue(response.firstName);
          this.lastName.setValue(response.lastName);
          this.phone.setValue(response.phoneNumber);
          this.district.setValue(this.districts.find(x => x.id == response.districtID));
          await this.districtOptionSelected();
          this.street.setValue(this.streets.find(x => x.id == response.streetID));
          await this.streetOptionSelected();
          this.building.setValue(this.buildings.find(x => x.id == response.buildingID));
          this.sharedService.hideLoadingSpinner()
        }, 2000);
      },
      error: (error) => {
        this.sharedService.hideLoadingSpinner()
      }
    });
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

  UpsertForm(){
    console.log(this.upsertCustomerDataForm)
    if(this.upsertCustomerDataForm.valid){
      const chiefPostPrams: AuthCustomerProfilePost$Params = {
        body: {
          buildingID: this.building.value.id,
          firstName: this.firstName.value,
          lastName: this.lastName.value,
          phoneNumber: this.phone.value,
          image: this.customerImageFileHandle.file
        }
      }
      this.sharedService.showLoadingSpinner()
      this.authService.authCustomerProfilePost(chiefPostPrams).subscribe({
        next:(response) => {
          this.sharedService.hideLoadingSpinner()
          this.sharedService.showPopUp('success','Profile Updated')
          console.log(response)
        },
        error: (error) => {
          this.sharedService.hideLoadingSpinner()
          this.sharedService.showPopUp('danger','Failure, please try refreshing your page')
          console.log(error)
        }
      })
    }
  }

}
