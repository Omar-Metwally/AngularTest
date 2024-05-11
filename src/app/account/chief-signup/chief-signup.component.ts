import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService, PhoneValidator, UniqueEmailValidator } from '../account.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/api/services/auth.service';
import { AddressService } from 'src/app/address/address.service';
import { Option } from 'src/app/shared/models/address/option';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/app/shared/shared.module';
import { SelectInputComponent } from "../../shared/select-input/select-input.component";
import { AuthChiefSignUpPost$Plain$Params } from 'src/app/api/fn/auth/auth-chief-sign-up-post-plain';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
    selector: 'app-chief-signup',
    standalone: true,
    templateUrl: './chief-signup.component.html',
    styleUrl: './chief-signup.component.css',
    imports: [MatCheckboxModule, MatButtonModule, NgbAccordionModule, MatCardModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, SharedModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatGridListModule, SelectInputComponent]
})
export class ChiefSignupComponent {

  districts: Option[] = []
  streets: Option[] = []
  buildings: Option[] = []
  
  district: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });
  street: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });
  building: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });

  email: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.email, Validators.pattern('\\b\\S+@(gmail|hotmail|yahoo|outlook)\\.com\\b')],
    asyncValidators: [this.uniqueEmailValidator.validate.bind(this.uniqueEmailValidator)],
    updateOn: 'blur'
  });

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

  password: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@\$]).{8,}$')],
  });

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AuthService,
    private uniqueEmailValidator: UniqueEmailValidator,
    private router: Router,
    private addressService: AddressService,
    private phoneValidator: PhoneValidator,
    private sharedService: SharedService
  ) {
    this.district.valueChanges.subscribe((newValue) => {
      this.street.setValue('')
      this.building.setValue('')
      this.street.disable();
      this.building.disable();
      if (newValue.id != null) this.getStreets(newValue.id);
    });
    this.street.valueChanges.subscribe((newValue) => {
      this.building.setValue('')
      this.building.disable();
      if (newValue.id != null) this.getBuildings(newValue.id);
    });
  }


  signupForm: FormGroup = new FormGroup({});
  submitted = false;
  errorMessages: string[] = [];
  returnUrl: string | null = null;

  hide: any;

  ngOnInit(): void {
    this.initializeForm();
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
  }

  signup() {
    this.submitted = true;
    this.errorMessages = [];
    if (this.signupForm.valid) {
      const signupParams: AuthChiefSignUpPost$Plain$Params = {
        body: {
          'Email': this.signupForm.value.email,
          'Password': this.signupForm.value.password,
          'FirstName': this.signupForm.value.firstName,
          'LastName': this.signupForm.value.lastName,
          'PhoneNumber': this.signupForm.value.phone,
          'BuildingID': this.signupForm.value.building.id,
        }
      };
      this.sharedService.showLoadingSpinner()
      this.accountService.authChiefSignUpPost(signupParams).subscribe({
        next: next => {
          this.sharedService.hideLoadingSpinner()
          this.sharedService.showPopUp('success','your application is under review, for support contact us at support@TaamBiet.com')
        },
        error: error => {
          if (error.error.errors) {
            this.sharedService.hideLoadingSpinner()
            this.sharedService.showPopUp('danger','error while your sign up, please refresh your page')
            this.errorMessages = error.error.errors;
          } else {
            this.errorMessages.push(error.error);
          }
        }
      })
    }
  }

  initializeForm() {
    this.signupForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      district: this.district,
      street: this.street,
      building: this.building
    })
  }

  getDistricts(id: string) {
    this.addressService.getDistricts(id).subscribe({
      next: (districts: Option[]) => {
        this.districts = districts;
        this.district.enable();
      },
      error: (error) => {
      }
    });
  }

  getStreets(id: string) {
    this.addressService.getStreets(id).subscribe({
      next: (streets: Option[]) => {
        this.streets = streets;
        this.street.enable();
      },
      error: (error) => {
      }
    });
  }

  getBuildings(id: string) {
    this.addressService.getBuildings(id).subscribe({
      next: (buildings: Option[]) => {
        this.buildings = buildings;
        this.building.enable();
      },
      error: (error) => {
      }
    });
  }
}
