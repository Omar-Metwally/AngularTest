import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { mealSideDish } from '../meal-card/meal-card';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AccountService } from 'src/app/account/account.service';
import { GetCartItemRequest } from 'src/app/api/models';

interface MealChoiceData {
  mealOptionID: string
  mealSideDishes: mealSideDish[];
  mealOptionPrice: number;
}

interface SelectedSideDishes {
  sideDishID: string;
  sideDishOptionID: string;
  price?: number;
}

@Component({
  selector: 'app-meal-choice-popup',
  standalone: true,
  imports: [CommonModule, SharedModule, MatDialogModule, MatRadioModule, MatDividerModule, FormsModule, MatButtonModule, MatIconModule, MatIconButton],
  templateUrl: './meal-choice-popup.component.html',
  styleUrl: './meal-choice-popup.component.css'
})
export class MealChoicePopupComponent {
  mealSideDishes: mealSideDish[] = [];
  mealToppings: mealSideDish[] = [];
  // selectedSideDishes: SelectedSideDishes[] = []
  mealOptionPrice: number = 0;
  mealSubtotal: number = 0;
  constructor(
    public dialogRef: MatDialogRef<MealChoicePopupComponent>,
    private accountService: AccountService,
    @Inject(MAT_DIALOG_DATA) private data: MealChoiceData
  ) {
    this.mealOptionPrice = data.mealOptionPrice;
    data.mealSideDishes.forEach(sideDish => {
      if(sideDish.isTopping){
        this.mealToppings.push(sideDish)
      }
      else{
        this.mealSideDishes.push(sideDish)
      }
    });
  }

// selectedToppings: { [key: string]: [string, number ]} = {};
selectedSideDishes: { [key: string]: [string, number ] } = {};

calculateTotal() {
  let total = this.mealOptionPrice;
  
  // // Calculate subtotal for toppings
  // for (const toppingId in this.selectedToppings) {
  //   const selectedTopping = this.mealToppings.find(topping => topping.mealSideDishID === toppingId);
  //   if (selectedTopping && this.selectedToppings[toppingId]) {
  //     const selectedOption = selectedTopping.mealSideDishOptions.find(option => option.sideDishID === this.selectedToppings[toppingId][0] && option.sideDishSizeOption === this.selectedToppings[toppingId][1]);
  //     if (selectedOption) {
  //       total += selectedOption.price;
  //     }
  //   }
  // }
  
  // Calculate subtotal for side dishes
  for (const sideDishId in this.selectedSideDishes) {
    const selectedSideDish = this.data.mealSideDishes.find(sideDish => sideDish.mealSideDishID === sideDishId);
    if (selectedSideDish && this.selectedSideDishes[sideDishId] && !selectedSideDish.isFree) {
      const selectedOption = selectedSideDish.mealSideDishOptions.find(option => option.sideDishID === this.selectedSideDishes[sideDishId][0] && option.sideDishSizeOption === this.selectedSideDishes[sideDishId][1]);
      if (selectedOption) {
        total += selectedOption.price;
      }
    }
  }
  
  return total;
}

  // trackCustomerChoice(event: MatRadioChange){
  //   this.selectedSideDishes.push({
  //     sideDishID: event.source.name,
  //     sideDishOptionID: event.value,
  //     price: 0
  //   })
  // }
  trackByFunction(index: number, item: any) {
    return index;
  }

  close(){
    this.dialogRef.close()
  }

  addToCart(){
    let itemToAdd: GetCartItemRequest = {
      mealOptionID: this.data.mealOptionID,
      quantity: 1,
      cartItemOptions: [],
    }
    Object.entries(this.selectedSideDishes).forEach(([key, value]) => {
      // Create an object representing the option and add it to cartItemOptions
      itemToAdd.cartItemOptions ? itemToAdd.cartItemOptions.push({
        mealSideDishID: key,
        mealSideDishOptionID: value[0],
        sideDishSizeOption: value[1]
      })
      :
      []
    });
    this.accountService.addItemToCart(itemToAdd)
  }
  
}
