import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { SharedModule } from "../../shared/shared.module";
import { SelectInputComponent } from "../../shared/select-input/select-input.component";
import { ChipsAutoCompleteInputComponent } from "../../shared/chips-auto-complete-input/chips-auto-complete-input.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MealsService } from 'src/app/api/services/meals.service';
import { MealsPost$Params } from 'src/app/api/fn/meals/meals-post';
import { MatStepperModule, StepperOrientation } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FileInputComponent } from "../../shared/file-input/file-input.component";
import { MealOptionPost$Params } from 'src/app/api/fn/meal-option/meal-option-post';
import { MealOptionService } from 'src/app/api/services/meal-option.service';
import { MealsPut$Params } from 'src/app/api/fn/meals/meals-put';
import { Meal } from 'src/app/shared/models/meal/meal';
import { mealOption, mealSideDish, mealSideDishOption, usedIngredient } from 'src/app/shared/models/meal/mealOption';
import { MatIconModule } from '@angular/material/icon';
import { MealOptionPut$Params } from 'src/app/api/fn/meal-option/meal-option-put';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner.component';
import { MealsMealIdGet$Params } from 'src/app/api/fn/meals/meals-meal-id-get';
import { Option } from 'src/app/shared/models/address/option';
import { GetMealRequest } from 'src/app/api/models/get-meal-request';
import { AddIngredient, AddMealSideDish, AddMealSideDishOption, FoodIngredient, GetChiefIngredientRequest, GetMealSideDishOptionRequest, MealCategory, MealSpiceLevel, MealStyle, MealTag, UsedIngredient } from 'src/app/api/models';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FileHandle } from 'src/app/shared/file-input/file-handle.model';
import { SharedService } from 'src/app/shared/shared.service';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { ChiefService, SideDishOptionService } from 'src/app/api/services';

interface Ingredient extends Option {
  pricePerKilo?: number
}

@Component({
  selector: 'app-add-meal',
  standalone: true,
  templateUrl: './add-meal.component.html',
  styleUrl: './add-meal.component.css',
  imports: [MatRadioModule, MatCheckboxModule, MatSelectModule, MatIconModule, CommonModule, MatButtonToggleModule, AsyncPipe, MatButtonModule, MatStepperModule, FormsModule, MatFormFieldModule, MatInputModule, SharedModule, SelectInputComponent, ChipsAutoCompleteInputComponent, FileInputComponent]
})
export class AddMealComponent implements OnInit {

  title: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator, Validators.minLength(3), Validators.maxLength(20)],
  });
  category: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });
  spiceLevel: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });
  style: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });
  tags: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });
  description: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator, Validators.minLength(3), Validators.maxLength(200)],
  });

  mealSize: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });

  price: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator, Validators.min(5), Validators.max(5000)],
  });

  saveQuantitySetting: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });

  isAvailable: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });

  quantity: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator, Validators.min(5), Validators.max(100)],
  });

  image: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });

  sideDishControl: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });

  imagePath: FormControl = new FormControl('');

  file: Blob | null = null
  sideDishInputs: mealSideDish[] = []
  //private mealId = inject(ActivatedRoute);
  addMealForm: FormGroup = new FormGroup({});
  addMealOptionForm: FormGroup = new FormGroup({});
  submitted = false;
  errorMessages: string[] = [];
  returnUrl: string | null = null;
  stepperOrientation: Observable<StepperOrientation>;
  @Input() mealID: string | null = ''
  smallMealOptionID: string | null = ''
  mediumMealOptionID: string | null = ''
  largeMealOptionID: string | null = ''
  categoryOptions: Option[] = [];
  spiceLevelOptions: Option[] = [];
  styleOptions: Option[] = [];
  tagsOptions: Option[] = [];
  ingredientsList: usedIngredient[] = []
  usedIngredientsList: usedIngredient[] = []
  isMealAdded: boolean = false;
  isSmallMealOptionAdded: boolean = false;
  isMediumMealOptionAdded: boolean = false;
  isLargeMealOptionAdded: boolean = false;
  ingredientCTRL: FormControl = new FormControl('');
  AddOrEdit: string = 'Add'
  selectedTags: Option[] = []
  chiefSideDishOption: mealSideDishOption[] = []
  meal: Meal = {
    title: '',
    mealID: '',
    description: '',
    mealOptions: []
  }
  previousMealSize: number
  currentMealOption: mealOption = {
    mealOptionID: '',
    MealSizeOption: 0,
    isAvailable: false,
    price: 0,
    availableQuantity: 0,
    saveQuantitySetting: false,
    sideDishes: []
  }
  fileHandle: FileHandle = {}
  //imagePath: string = '';
  mealSpiceLevel = MealSpiceLevel
  mealCategory = MealCategory
  mealStyle = MealStyle

  ngOnInit() {
    if (this.mealID != null) {
      const mealsMealIdGet$Params: MealsMealIdGet$Params = {
        MealID: this.mealID
      }
      let dialogRef: MatDialogRef<LoadingSpinnerComponent> = this.dialog.open(LoadingSpinnerComponent, {
        panelClass: '',
        disableClose: true
      });
      this.mealsService.mealsMealIdGet(mealsMealIdGet$Params).subscribe({
        next: (body) => {
          dialogRef.close()
          this.loadMeal(body)
          this.isMealAdded = true;
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
    else {
      this.toggleQuantityInput(false)
    }
    this.chiefService.chiefGetIngredientsGet().subscribe({
      next: (response) => {
        this.fillIngredientList(response);
      },
      error: (error) => {
        
      }
    })
  }
  constructor(private mealsService: MealsService,
    private chiefService: ChiefService,
    private mealOptionService: MealOptionService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private sharedService: SharedService,
    private sideDishOptionService: SideDishOptionService,
    breakpointObserver: BreakpointObserver) {

    this.categoryOptions.push({ id: '0', name: 'Main Dish' }, { id: '1', name: 'Side Dish' }, { id: '2', name: 'Appetizer' });
    this.spiceLevelOptions.push({ id: '0', name: 'Not Spicy' }, { id: '1', name: 'Mild' }, { id: '2', name: 'Medium' }, { id: '3', name: 'Hot' }, { id: '4', name: 'Very Hot' });
    this.tagsOptions.push(
      { id: '0', name: 'Koshry' },
      { id: '1', name: 'SeaFood' },
      { id: '2', name: 'Deep Fried' },
      { id: '3', name: 'Vegan' },
      { id: '4', name: 'Diet Friendly' },
      { id: '5', name: 'Keto Friendly' },
      { id: '6', name: 'Natural Butter' },
      { id: '7', name: 'Sweats' },
      { id: '8', name: 'Gluten Free' },
      { id: '9', name: 'Slow Cooked' },
      { id: '10', name: 'Natural Colors' },
      { id: '11', name: 'Biscuits' },
      { id: '12', name: 'Cookies' },
      { id: '13', name: 'Cake' },
      { id: '14', name: 'Beef' },
      { id: '15', name: 'Lamb' },
      { id: '16', name: 'Ribs' },);
    this.styleOptions.push({ id: '0', name: 'Egyptian' }, { id: '1', name: 'Syrian' }, { id: '2', name: 'Lebanese' }, { id: '3', name: 'Western' }, { id: '4', name: 'Asian' }, { id: '5', name: 'Indian' })



    this.addMealForm = this.formBuilder.group({
      title: this.title,
      category: this.category,
      spiceLevel: this.spiceLevel,
      style: this.style,
      tags: this.tags,
      description: this.description,
    })

    this.addMealOptionForm = this.formBuilder.group({
      mealID: this.mealID,
      SizeOption: this.mealSize,
      price: this.price,
      saveQuantitySetting: this.saveQuantitySetting,
      isAvailable: this.isAvailable,
      quantity: this.quantity,
      image: this.image
    })




    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));



    this.previousMealSize = this.mealSize.value;


    this.sideDishOptionService.sideDishOptionChiefIdGet().subscribe({
      next: (response) => {
        response.forEach(sideDishOption => {
          this.chiefSideDishOption.push({
            sideDishID: sideDishOption.sideDishID ?? '',
            sideDishSizeOption: sideDishOption.sideDishSizeOption ?? 0,
            name: sideDishOption.name ?? '',
            price: sideDishOption.price ?? 0,
            availableQuantity: sideDishOption.availableQuantity ?? 0
          });
        })

      },
      error: error => {
        if (error.error.errors) {
          this.errorMessages = error.error.errors;
        } else {
          this.errorMessages.push(error.error);
        }
        this.sharedService.showSnackBar(this.errorMessages[0])
      }
    });
  }

  ChangeAddOrEdit() {
    switch (this.mealSize.value) {
      case 0:
        this.AddOrEdit = this.isSmallMealOptionAdded ? 'Edit' : 'Add';
        break;
      case 1:
        this.AddOrEdit = this.isMediumMealOptionAdded ? 'Edit' : 'Add';
        break;
      case 2:
        this.AddOrEdit = this.isLargeMealOptionAdded ? 'Edit' : 'Add';
        break;
      default:
        this.AddOrEdit = 'Add'
        break;
    }
  }

  saveMeal() {
    this.meal = {
      title: this.addMealForm.value.title,
      mealID: this.mealID ?? '',
      mealCategory: this.addMealForm.value.category,
      mealSpiceLevel: this.addMealForm.value.spiceLevel,
      mealStyle: this.addMealForm.value.style,
      description: this.addMealForm.value.description,
      mealOptions: []
    }
  }

  loadMeal(getMealRequest: GetMealRequest) {
    let mealCategoryIndex = getMealRequest.mealCategory ?? 0
    let mealSpiceLevelIndex = getMealRequest.mealSpiceLevel ?? 0
    let mealStyleIndex = getMealRequest.mealStyle ?? 0

    this.meal = {
      title: getMealRequest.title ?? '',
      mealID: getMealRequest.mealID ?? '',
      mealCategory: this.categoryOptions.find(x => +x.id == (mealCategoryIndex)),
      mealSpiceLevel: this.spiceLevelOptions.find(x => +x.id == (mealSpiceLevelIndex)),
      mealStyle: this.styleOptions.find(x => +x.id == (mealStyleIndex)),
      description: getMealRequest.description ?? '',
      //error
      tagsID: this.tagsOptions.filter(tagOption => getMealRequest.mealTags?.some(mealTag => mealTag.toFixed() === tagOption.id)),
      //tagsID: this.tagsOptions.filter(x => getMealRequest.mealTags?.map(y => y.tagID).includes(x.id)), //getMealRequest.mealTags?.flatMap(x => x.tagID !== undefined ? [x.tagID] : []),
      mealOptions: []
    }

    getMealRequest.getMealOptionsRequest?.forEach(mealOption => {

      const sideDishes: mealSideDish[] = [];

      mealOption.getMealSideDishesRequest?.forEach(mealSideDish => {
        sideDishes.push({
          isFree: mealSideDish.isFree ?? false,
          isTopping: mealSideDish.isTopping ?? false,
          sideDishOptions: mealSideDish.getMealSideDishOptionsRequest?.map((option: GetMealSideDishOptionRequest) => ({
            sideDishID: option.sideDishID ?? '',
            sideDishSizeOption: option.sideDishSizeOption ?? 0,
            name: option.name ?? '',
            price: option.price ?? 0,
            availableQuantity: option.quantity ?? 0,
          })) ?? [],
        });
      });

      const usedIngredients: usedIngredient[] = []

      mealOption.usedIngredients?.forEach(usedIngredient => {
        usedIngredients.push({
          id: usedIngredient.ingredient?.toString() ?? '',
          usedGrams: usedIngredient.amountInGrams?.toString() ?? '',
          name: FoodIngredient[usedIngredient.ingredient ?? 5],
          pricePerKilo: this.ingredientsList.find(x => x.id == usedIngredient.ingredient?.toString())?.pricePerKilo ?? 0
           ?? [],
        });
      });


      this.meal.mealOptions.push({
        mealOptionID: mealOption.mealOptionID ?? '',
        MealSizeOption: mealOption.mealSizeOption ?? 0,
        isAvailable: mealOption.isAvailable ?? false,
        price: mealOption.price ?? 0,
        availableQuantity: mealOption.quantity ?? 0,
        saveQuantitySetting: mealOption.saveQuantity ?? false,
        sideDishes: sideDishes,
        usedIngredients: usedIngredients ?? []
      })
    })

    console.log(this.meal)
    this.loadForm(this.meal)
  }

  loadForm(meal: Meal) {
    this.smallMealOptionID = meal.mealOptions.find(x => x.MealSizeOption == 0)?.mealOptionID ?? ''
    if (this.smallMealOptionID) this.isSmallMealOptionAdded = true
    this.mediumMealOptionID = meal.mealOptions.find(x => x.MealSizeOption == 1)?.mealOptionID ?? ''
    if (this.mediumMealOptionID) this.isMediumMealOptionAdded = true
    this.largeMealOptionID = meal.mealOptions.find(x => x.MealSizeOption == 2)?.mealOptionID ?? ''
    if (this.largeMealOptionID) this.isLargeMealOptionAdded = true
    this.title.setValue(meal.title)
    this.description.setValue(meal.description)
    this.category.setValue(meal.mealCategory)
    this.spiceLevel.setValue(meal.mealSpiceLevel)
    this.style.setValue(meal.mealStyle)
    this.tags.setValue(meal.tagsID)
    this.selectedTags = meal.tagsID ?? []

    let mealOption: mealOption | undefined = meal.mealOptions.at(0)

    if (mealOption) {
      this.currentMealOption = {
        mealOptionID: mealOption.mealOptionID,
        MealSizeOption: mealOption.MealSizeOption,
        isAvailable: mealOption.isAvailable,
        price: mealOption.price,
        availableQuantity: mealOption.availableQuantity,
        saveQuantitySetting: mealOption.saveQuantitySetting,
        image: mealOption.image,
        sideDishes: mealOption.sideDishes,
        usedIngredients: mealOption.usedIngredients
      }
      setTimeout(() => {
        this.mealSize.setValue(mealOption?.MealSizeOption);
        this.price.setValue(mealOption?.price);
        this.isAvailable.setValue(mealOption?.isAvailable);
        this.toggleQuantityInput(mealOption?.isAvailable ?? false);
        this.saveQuantitySetting.setValue(mealOption?.saveQuantitySetting);
        this.sideDishControl.setValue(mealOption?.sideDishes);
        this.sideDishInputs = mealOption?.sideDishes ?? [];
        this.quantity.setValue(mealOption?.availableQuantity);
        this.usedIngredientsList = mealOption?.usedIngredients ?? []
      }, 2000);
    }
    console.log(mealOption, this.usedIngredientsList)
    
  }

  saveMealOption(mealOptionID: string | null) {
    this.currentMealOption = {
      mealOptionID: mealOptionID || this.meal.mealOptions[0].mealOptionID,
      MealSizeOption: this.previousMealSize,
      isAvailable: this.isAvailable.value,
      price: this.price.value,
      availableQuantity: this.quantity.value,
      saveQuantitySetting: this.saveQuantitySetting.value,
      image: this.image.value,
      sideDishes: this.sideDishInputs,
      usedIngredients: this.ingredientsList
    }
    let index = this.meal.mealOptions?.findIndex(x => x.MealSizeOption == this.previousMealSize);

    if (index !== -1 && index !== undefined) {
      // Object exists, update it
      this.meal.mealOptions[index] = this.currentMealOption;
    } else {
      // Object does not exist, push new object
      this.meal.mealOptions?.push(this.currentMealOption);
    }
    console.log(this.currentMealOption)
  }

  mealForm() {
    if (this.addMealForm.valid && !this.isMealAdded) {
      const createMealRequest: MealsPost$Params = {
        body: {
          'name': this.addMealForm.value.title,
          'description': this.addMealForm.value.description,
          'mealCategory': +this.addMealForm.value.category.id,
          'mealSpiceLevel': +this.addMealForm.value.spiceLevel.id,
          'mealStyle': +this.addMealForm.value.style.id,
          'tagsID': this.addMealForm.value.tags.map((o: { id: number, name: string }) => +o.id),
        }
      }
      let dialogRef: MatDialogRef<LoadingSpinnerComponent> = this.dialog.open(LoadingSpinnerComponent, {
        panelClass: '',
        disableClose: true
      });
      this.mealsService.mealsPost$Response(createMealRequest).subscribe({
        next: (response: HttpResponse<any>) => {
          dialogRef.close()
          this.mealID = response.headers.get('Location');
          this.saveMeal()
          this.isMealAdded = true;
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
    else if (this.addMealForm.valid && this.isMealAdded) {
      const updateMealRequest: MealsPut$Params = {
        body: {
          'MealID': this.mealID ?? '',
          'Name': this.addMealForm.value.title,
          'Description': this.addMealForm.value.description,
          'MealCategory': this.addMealForm.value.category.id,
          'MealSpiceLevel': this.addMealForm.value.spiceLevel.id,
          'MealStyle': this.addMealForm.value.style.id,
          'TagsID': this.addMealForm.value.tags.map((o: Option) => o.id),
        }
      }
      this.mealsService.mealsPut(updateMealRequest).subscribe({
        next: () => {
          this.saveMeal()
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
  }

  mealOptionForm() {
    console.log(this.currentMealOption)
    type MealSizeValues = 0 | 1 | 2;
    const mealSizeActions = {
      0: this.isSmallMealOptionAdded,
      1: this.isMediumMealOptionAdded,
      2: this.isLargeMealOptionAdded,
    };
    const action = mealSizeActions[this.mealSize.value as MealSizeValues];
    if (action) {
      this.putMealOption();
    } else {
      this.postMealOption();
    }
  }


  postMealOption() {
    const addMealSideDish: AddMealSideDish[] = [];
    this.sideDishInputs.forEach(sideDish => {
      addMealSideDish.push({
        isFree: sideDish.isFree,
        isTopping: sideDish.isTopping,
        sideDishOptions: sideDish.sideDishOptions.map((option: mealSideDishOption) => ({
          sideDishID: option.sideDishID,
          sideDishSizeOption: option.sideDishSizeOption,
        }))
      });
    });

    const addIngredients: AddIngredient[] = []
    this.usedIngredientsList.forEach(ingredient => {
      addIngredients.push({
        foodIngredient: +ingredient.id,
        amountInGrams: +ingredient.usedGrams
      })
    })

    const createMealOptionRequest: MealOptionPost$Params = {
      body: {
        'mealID': this.mealID ?? '',
        'mealSizeOption': this.mealSize.value,
        'isAvailable': this.isAvailable.value,
        'price': this.price.value,
        'availableQuantity': this.quantity.value,
        'saveQuantitySetting': this.saveQuantitySetting.value,
        'image': this.fileHandle.file,
        'mealSideDishes': addMealSideDish,
        'addIngredients': addIngredients
      }
    };
    console.log(createMealOptionRequest)

    let dialogRef: MatDialogRef<LoadingSpinnerComponent> = this.dialog.open(LoadingSpinnerComponent, {
      panelClass: '',
      disableClose: true
    });
    
    this.mealOptionService.mealOptionPost(createMealOptionRequest).subscribe({
      next: (mealOptionID) => {

        dialogRef.close()

        if (this.mealSize.value === 0) {
          this.isSmallMealOptionAdded = true
          this.smallMealOptionID = mealOptionID[0]
        }
        else if (this.mealSize.value === 1) {
          this.isMediumMealOptionAdded = true
          this.mediumMealOptionID = mealOptionID[0]
        }
        else if (this.mealSize.value === 2) {
          this.isLargeMealOptionAdded = true
          this.largeMealOptionID = mealOptionID[0]
        }
        this.ChangeAddOrEdit()
        this.saveMealOption(mealOptionID)
        console.log(this.meal)
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

  putMealOption() {
    console.log(this.currentMealOption)
    const addMealSideDish: AddMealSideDish[] = [];
    this.sideDishInputs.forEach(sideDish => {
      addMealSideDish.push({
        isFree: sideDish.isFree,
        isTopping: sideDish.isTopping,
        sideDishOptions: sideDish.sideDishOptions.map((option: mealSideDishOption) => ({
          sideDishID: option.sideDishID,
          sideDishSizeOption: option.sideDishSizeOption,
        }))
      });
    });

    const addIngredients: AddIngredient[] = []
    this.usedIngredientsList.forEach(ingredient => {
      addIngredients.push({
        foodIngredient: +ingredient.id,
        amountInGrams: +ingredient.usedGrams
      })
    })
    const updateMealOptionRequest: MealOptionPut$Params = {
      body: {
        'mealOptionID': this.currentMealOption.mealOptionID ?? '',
        'isAvailable': this.isAvailable.value,
        'price': this.price.value,
        'availableQuantity': this.quantity.value,
        'saveQuantitySetting': this.saveQuantitySetting.value,
        'image': this.fileHandle.file,
        'mealSideDishes': addMealSideDish,
        'addIngredients': addIngredients
      }
    }
    this.mealOptionService.mealOptionPut(updateMealOptionRequest).subscribe({
      next: () => {
        if (this.mealSize.value === 0) {
          this.isSmallMealOptionAdded = true
        }
        else if (this.mealSize.value === 1) {
          this.isMediumMealOptionAdded = true
        }
        else if (this.mealSize.value === 2) {
          this.isLargeMealOptionAdded = true
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

  toggleQuantityInput(yes: boolean) {
    if (yes) {
      this.quantity.enable()
      this.quantity.reset()
      this.saveQuantitySetting.enable()
      this.saveQuantitySetting.reset()
    }
    else {
      this.quantity.disable()
      this.quantity.reset()
      this.saveQuantitySetting.disable()
      this.saveQuantitySetting.reset()
    }
  }

  addNewSideDish() {
    this.sideDishInputs.push({
      isFree: false,
      isTopping: false,
      sideDishOptions: []
    })
  }

  removeSideDish(index: number) {
    this.sideDishInputs.splice(index, 1)
  }


  changeCurrentMealOption(currentMealSize: MatRadioChange){
    this.previousMealSize = currentMealSize.value;
    let index = this.meal.mealOptions?.findIndex(x => x.MealSizeOption == currentMealSize.value);

    if (index !== -1 && index !== undefined) {      
      this.currentMealOption = this.meal.mealOptions[index]
      console.log(this.currentMealOption, this.meal)
      this.mealSize.setValue(currentMealSize.value, { emitEvent: false })
      this.price.setValue(this.currentMealOption.price)
      this.isAvailable.setValue(this.currentMealOption.isAvailable)
      this.image.setValue(this.currentMealOption.image);
      this.sideDishInputs = this.currentMealOption.sideDishes ?? [];
      this.usedIngredientsList = this.currentMealOption.usedIngredients ?? [];
      this.sideDishControl.setValue(this.currentMealOption.sideDishes);
      if (!this.currentMealOption.isAvailable) {
        this.toggleQuantityInput(false)
      }
      else {
        this.toggleQuantityInput(true)
      }
      this.saveQuantitySetting.setValue(this.currentMealOption.saveQuantitySetting)
      this.quantity.setValue(this.currentMealOption.availableQuantity)
    }
    else {
      this.price.reset()
      this.saveQuantitySetting.reset()
      this.isAvailable.reset()
      this.quantity.reset()
      this.image.reset()
      this.sideDishControl.reset()
      this.toggleQuantityInput(false)
    }
    console.log(this.currentMealOption)
    this.ChangeAddOrEdit()
  }

  optionSelected = (ChiefIngredients?: GetChiefIngredientRequest[]) => {
    if(!ChiefIngredients){
      const selectedOption = this.ingredientCTRL.value;
      const usedIngredient: usedIngredient = {
        id: selectedOption.id,
        name: selectedOption.name,
        pricePerKilo: 0,
        usedGrams: ''
      }
      this.ingredientCTRL.setValue('');
  
      const index = this.ingredientsList.indexOf(selectedOption);
      if (index !== -1) {
        this.ingredientsList.splice(index, 1);
        this.usedIngredientsList.push(usedIngredient);
      }
    }
    else{
      ChiefIngredients.forEach(Ingredient => {
        const IngredientListItem = this.ingredientsList.find(x => x.id == Ingredient.ingredient?.toString())
        const usedIngredient: usedIngredient = {
          id: Ingredient.ingredient?.toString() ?? '',
          name: IngredientListItem?.name ?? '',
          pricePerKilo: Ingredient.pricePerKilo ?? 0,
          usedGrams: ''
        }
        this.ingredientCTRL.setValue('');
    
        if(IngredientListItem){
          const index = this.ingredientsList.indexOf(IngredientListItem);
          if (index !== -1) {
            this.ingredientsList.splice(index, 1);
            this.usedIngredientsList.push(usedIngredient);
          }
        }
      })
    }
  };

  fillIngredientList(ChiefIngredients?: GetChiefIngredientRequest[]){
    if(ChiefIngredients){
      ChiefIngredients.forEach(ingredient => {
        this.ingredientsList.push({
          id: ingredient.ingredient?.toString() ?? '',
          name: FoodIngredient[ingredient.ingredient ?? 500],
          usedGrams: '',
          pricePerKilo: ingredient.pricePerKilo
        })
      })
    }
  }
  removeIngredient(ingredient: usedIngredient){
    const index = this.usedIngredientsList.indexOf(ingredient);
    if (index !== -1) {
      this.usedIngredientsList.splice(index, 1);
      this.ingredientsList.push(ingredient);
      this.ingredientsList.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
    }
  }


}
