import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SideDishService, SideDishOptionService } from 'src/app/api/services';
import { SharedService } from 'src/app/shared/shared.service';
import { MatStepperModule, StepperOrientation } from '@angular/material/stepper';
import { Observable, map } from 'rxjs';
import { sideDish, sideDishOption } from 'src/app/shared/models/side-dish/side-dish';
import { GetSideDishRequest, MealSizeOption } from 'src/app/api/models';
import { SideDishSideDishIdGet$Params } from 'src/app/api/fn/side-dish/side-dish-side-dish-id-get';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner.component';
import { SideDishCreateSideDishPost$Params } from 'src/app/api/fn/side-dish/side-dish-create-side-dish-post';
import { SideDishUpdateSideDishPut$Params } from 'src/app/api/fn/side-dish/side-dish-update-side-dish-put';
import { HttpResponse } from '@angular/common/http';
import { SideDishOptionCreateSideDishOptionPost$Params } from 'src/app/api/fn/side-dish-option/side-dish-option-create-side-dish-option-post';
import { FileInputComponent } from "../../shared/file-input/file-input.component";
import { SharedModule } from "../../shared/shared.module";
import { FileHandle } from 'src/app/shared/file-input/file-handle.model';
import { SelectInputComponent } from "../../shared/select-input/select-input.component";
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';


@Component({
    selector: 'app-add-side-dish',
    standalone: true,
    templateUrl: './add-side-dish.component.html',
    styleUrl: './add-side-dish.component.css',
    imports: [MatRadioModule,MatCheckboxModule,MatStepperModule, FileInputComponent, SharedModule, SelectInputComponent, CommonModule]
})
export class AddSideDishComponent implements OnInit {

  constructor(private sideDishService: SideDishService,
    private sideDishOptionService: SideDishOptionService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private sharedService: SharedService,
    breakpointObserver: BreakpointObserver) {

    this.addSideDishForm = this.formBuilder.group({
      title: this.nameControl,
      image: this.imageControl,
    })

    this.addSideDishOptionForm = this.formBuilder.group({
      sideDishID: this.sideDishID,
      sideDishSize: this.sideDishSizeControl,
      price: this.priceControl,
      quantity: this.quantityControl,
    })

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));



    this.previousSideDishSize = this.addSideDishOptionForm.get('sideDishSize')?.value;
    this.addSideDishOptionForm.get('sideDishSize')?.valueChanges.subscribe((currentSideDishSize) => {
      this.saveSideDishOption(this.currentSideDishOption.sideDishSizeOption)
      this.previousSideDishSize = currentSideDishSize;

      let index = this.sideDish.sideDishOptions?.findIndex(x => x.sideDishSizeOption == currentSideDishSize);

      if (index !== -1 && index !== undefined) {
        this.currentSideDishOption = this.sideDish.sideDishOptions[index]
        this.sideDishSizeControl.setValue(currentSideDishSize, { emitEvent: false })
        this.priceControl.setValue(this.currentSideDishOption.price)
        this.quantityControl.setValue(this.currentSideDishOption.availableQuantity)
      }
      else {
        this.priceControl.reset()
        this.quantityControl.reset()
      }
      this.ChangeAddOrEdit()
    });


  }

  addSideDishForm: FormGroup = new FormGroup({});
  addSideDishOptionForm: FormGroup = new FormGroup({});

  @Input() sideDishID: string | null = ''
  previousSideDishSize: number

  nameControl: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator, Validators.minLength(3), Validators.maxLength(20)],
  });
  imageControl: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });
  sideDishSizeControl: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });
  priceControl: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator, Validators.min(5), Validators.max(5000)],
  });
  quantityControl: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator, Validators.min(5), Validators.max(100)],
  });

  fileHandle: FileHandle = {};


  sideDish: sideDish = {
    name: '',
    sideDishOptions: []
  }

  currentSideDishOption: sideDishOption = {
    sideDishSizeOption: 1,
    price: 0,
    availableQuantity: 0
  }

  stepperOrientation: Observable<StepperOrientation>;

  AddOrEdit: string = 'Add'
  isSmallSideDishAdded: boolean = false;
  isMediumSideDishAdded: boolean = false;
  isLargeSideDishAdded: boolean = false;
  isSideDishAdded: boolean = false;

  errorMessages: string[] = []

  ngOnInit(): void {
    if (this.sideDishID != null) {
      const sideDishSideDishIdGet$Params: SideDishSideDishIdGet$Params = {
        SideDishID: this.sideDishID
      }
      let dialogRef: MatDialogRef<LoadingSpinnerComponent> = this.dialog.open(LoadingSpinnerComponent, {
        panelClass: '',
        disableClose: true
      });
      this.sideDishService.sideDishSideDishIdGet(sideDishSideDishIdGet$Params).subscribe({
        next: (body) => {
          dialogRef.close()
          this.loadSideDish(body)
          this.isSideDishAdded = true;
        },
        error: error => {
          dialogRef.close()
          if (error.error.errors) {
            this.errorMessages = error.error.errors;
          } else {
            this.errorMessages.push(error.error);
          }
          this.sharedService.showSnackBar(this.errorMessages[0])
        }
      })
    }
  }

  loadSideDish(getSideDishRequest: GetSideDishRequest) {

    this.sideDish = {
      sideDishID: getSideDishRequest.sideDishID ?? '',
      name: getSideDishRequest.name ?? '',
      //image: getSideDishRequest.fullScreenImage?? '',
      sideDishOptions: []
    }

    getSideDishRequest.getSideDishOptions?.forEach(sideDishOption => {

      const sideDishOptions: sideDishOption[] = [];

      sideDishOptions.push({
        sideDishSizeOption: sideDishOption.sideDishSizeOption ?? 0,
        price: sideDishOption.price ?? 0,
        availableQuantity: sideDishOption.availableQuantity ?? 0
      })
    })

    this.loadForm(this.sideDish)
  }
  loadForm(sideDish: sideDish) {
    if(sideDish.sideDishOptions.find(x => x.sideDishSizeOption == 0)) this.isSmallSideDishAdded = true
    if(sideDish.sideDishOptions.find(x => x.sideDishSizeOption == 1)) this.isMediumSideDishAdded = true
    if(sideDish.sideDishOptions.find(x => x.sideDishSizeOption == 2)) this.isLargeSideDishAdded = true

    this.nameControl.setValue(sideDish.name)
    this.imageControl.setValue(sideDish.image)

    let sideDishOption: sideDishOption | undefined = sideDish.sideDishOptions.at(0)

    if(sideDishOption){
      this.priceControl.setValue(sideDishOption.price)
      this.quantityControl.setValue(sideDishOption.availableQuantity)
      this.sideDishSizeControl.setValue(sideDishOption.sideDishSizeOption)
    }

  }

  saveSideDishOption(SideDishSizeOption: MealSizeOption | null) {
    this.currentSideDishOption = {
      sideDishSizeOption: SideDishSizeOption ?? 0,
      price: this.currentSideDishOption.price,
      availableQuantity: this.currentSideDishOption.availableQuantity
    }
    let index = this.sideDish.sideDishOptions?.findIndex(x => x.sideDishSizeOption == this.previousSideDishSize);

    if (index !== -1 && index !== undefined) {
      this.sideDish.sideDishOptions[index] = this.currentSideDishOption;
    } else {
      this.sideDish.sideDishOptions?.push(this.currentSideDishOption);
    }
  }

  sideDishForm() {
    if (this.addSideDishForm.valid && !this.isSideDishAdded) {
      const createSideDishRequest: SideDishCreateSideDishPost$Params = {
        body: {
          'name': this.addSideDishForm.value.title,
          'image': this.fileHandle.file,
        }
      }
      let dialogRef: MatDialogRef<LoadingSpinnerComponent> = this.dialog.open(LoadingSpinnerComponent, {
        panelClass: '',
        disableClose: true
      });
      this.sideDishService.sideDishCreateSideDishPost$Response(createSideDishRequest).subscribe({
        next: (response: HttpResponse<any>) => {
          dialogRef.close()
          this.sideDishID = response.headers.get('Location');
          this.saveSideDish()
          this.isSideDishAdded = true;
        },
        error: error => {
          dialogRef.close()
          if (error.error.errors) {
            this.errorMessages = error.error.errors;
          } else {
            this.errorMessages.push(error.error);
          }
          this.sharedService.showSnackBar(this.errorMessages[0])
        }
      });
    }
    else if (this.addSideDishForm.valid && this.isSideDishAdded) {
      const updateSideDishRequest: SideDishUpdateSideDishPut$Params = {
        body: {
          id: this.sideDish.sideDishID,
          name: this.sideDish.name,
          image: this.sideDish.image?.file
        }
      }
      let dialogRef: MatDialogRef<LoadingSpinnerComponent> = this.dialog.open(LoadingSpinnerComponent, {
        panelClass: '',
        disableClose: true
      });
      this.sideDishService.sideDishUpdateSideDishPut(updateSideDishRequest).subscribe({
        next: () => {
          this.saveSideDish()
          dialogRef.close()
        },
        error: error => {
          if (error.error.errors) {
            this.errorMessages = error.error.errors;
          } else {
            this.errorMessages.push(error.error);
          }
          this.sharedService.showSnackBar(this.errorMessages[0])
          dialogRef.close()
        }
      })
    }
  }

  sideDishOptionForm() {
    type SideDishSizeValues = 0 | 1 | 2;
    const sideDishOptionActions = {
      0: this.isSmallSideDishAdded,
      1: this.isMediumSideDishAdded,
      2: this.isLargeSideDishAdded,
    };

    const action = sideDishOptionActions[this.sideDishSizeControl.value as SideDishSizeValues];
    console.log(action)
    if (action) {
      this.putSideDishOption();
    } else {
      this.postSideDishOption();
    }
  }


  postSideDishOption() {

    const createSizeOptionRequest: SideDishOptionCreateSideDishOptionPost$Params = {
      body: {
        price: this.priceControl.value,
        quantity: this.quantityControl.value,
        sideDishID: this.sideDish.sideDishID,
        sideDishSizeOption: this.sideDishSizeControl.value,
      }
    }
    let dialogRef: MatDialogRef<LoadingSpinnerComponent> = this.dialog.open(LoadingSpinnerComponent, {
      panelClass: '',
      disableClose: true
    });
    this.sideDishOptionService.sideDishOptionCreateSideDishOptionPost(createSizeOptionRequest).subscribe({
      next: () => {

        dialogRef.close()

        if (this.sideDishSizeControl.value === 0) {
          this.isSmallSideDishAdded = true
        }
        else if (this.sideDishSizeControl.value === 1) {
          this.isMediumSideDishAdded = true
        }
        else if (this.sideDishSizeControl.value === 2) {
          this.isLargeSideDishAdded = true
        }
        this.ChangeAddOrEdit()
        this.saveSideDishOption(this.sideDishSizeControl.value)
      },
      error: error => {

        dialogRef.close()

        if (error.error.errors) {
          this.errorMessages = error.error.errors;
        } else {
          this.errorMessages.push(error.error);
        }
        this.sharedService.showSnackBar(this.errorMessages[0])
      }
    })
  }

  putSideDishOption() {

    const updateMealOptionRequest: SideDishOptionCreateSideDishOptionPost$Params = {
      body: {
        price: this.priceControl.value,
        quantity: this.quantityControl.value,
        sideDishID: this.sideDish.sideDishID,
        sideDishSizeOption: this.sideDishSizeControl.value,
      }
    }
    this.sideDishOptionService.sideDishOptionUpdateSideDishOptionPut(updateMealOptionRequest).subscribe({
      next: () => {
        if (this.sideDishSizeControl.value === 0) {
          this.isSmallSideDishAdded = true
        }
        else if (this.sideDishSizeControl.value === 1) {
          this.isMediumSideDishAdded = true
        }
        else if (this.sideDishSizeControl.value === 2) {
          this.isLargeSideDishAdded = true
        }
      },
      error: error => {
        if (error.error.errors) {
          this.errorMessages = error.error.errors;
        } else {
          this.errorMessages.push(error.error);
        }
        this.sharedService.showSnackBar(this.errorMessages[0])
      }
    })
  }

  saveSideDish() {
    this.sideDish = {
      name: this.nameControl.value,
      sideDishID: this.sideDishID ?? '',
      sideDishOptions: []
    }
  }

  ChangeAddOrEdit() {
    switch (this.sideDishSizeControl.value) {
      case 0:
        this.AddOrEdit = this.isSmallSideDishAdded ? 'Edit' : 'Add';
        break;
      case 1:
        this.AddOrEdit = this.isMediumSideDishAdded ? 'Edit' : 'Add';
        break;
      case 2:
        this.AddOrEdit = this.isLargeSideDishAdded ? 'Edit' : 'Add';
        break;
      default:
        this.AddOrEdit = 'Add'
        break;
    }
  }

}
