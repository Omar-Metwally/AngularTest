import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Option } from 'src/app/shared/models/address/option';
import { SharedModule } from 'src/app/shared/shared.module';
import { SelectInputComponent } from "../../../shared/select-input/select-input.component";
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { ChiefService } from 'src/app/api/services';
import { ChiefAddIngredientsPost$Params } from 'src/app/api/fn/chief/chief-add-ingredients-post';
import { FoodIngredient, GetChiefIngredientRequest, UpsertIngredientRequest } from 'src/app/api/models';
import { ChiefRemoveIngredientsDelete$Params } from 'src/app/api/fn/chief/chief-remove-ingredients-delete';
import { SharedService } from 'src/app/shared/shared.service';

interface usedIngredient {
  id: string,
  name: string,
  PricePerKilo: string
}
@Component({
  selector: 'app-ingredients',
  standalone: true,
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css',
  imports: [CommonModule, SharedModule, SelectInputComponent, MatIconModule, MatIconButton, MatButtonModule, FormsModule]
})
export class IngredientsComponent implements OnInit {
  ingredientsList: Option[] = []
  usedIngredientsList: usedIngredient[] = []
  ingredientCTRL: FormControl = new FormControl('');
  optionSelected = (ChiefIngredients?: GetChiefIngredientRequest[]) => {
    if (!ChiefIngredients) {
      const selectedOption = this.ingredientCTRL.value as Option;
      const usedIngredient: usedIngredient = {
        id: selectedOption.id,
        name: selectedOption.name,
        PricePerKilo: ''
      }
      this.ingredientCTRL.setValue('');

      const index = this.ingredientsList.indexOf(selectedOption);
      if (index !== -1) {
        this.ingredientsList.splice(index, 1);
        this.usedIngredientsList.push(usedIngredient);
      }
    }
    else {
      ChiefIngredients.forEach(Ingredient => {
        const IngredientListItem = this.ingredientsList.find(x => x.id == Ingredient.ingredient?.toString())
        const usedIngredient: usedIngredient = {
          id: Ingredient.ingredient?.toString() ?? '',
          name: IngredientListItem?.name ?? '',
          PricePerKilo: Ingredient.pricePerKilo?.toString() ?? ''
        }
        this.ingredientCTRL.setValue('');

        if (IngredientListItem) {
          const index = this.ingredientsList.indexOf(IngredientListItem);
          if (index !== -1) {
            this.ingredientsList.splice(index, 1);
            this.usedIngredientsList.push(usedIngredient);
          }
        }
      })
    }


  };

  removeIngredient(ingredient: usedIngredient) {
    const index = this.usedIngredientsList.indexOf(ingredient);
    if (index !== -1) {
      this.usedIngredientsList.splice(index, 1);
      this.ingredientsList.push(ingredient);
      this.ingredientsList.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
    }
    const request: ChiefRemoveIngredientsDelete$Params = {
      ingredient: +ingredient.id
    }
    this.chiefService.chiefRemoveIngredientsDelete(request).subscribe()
  }

  constructor(private chiefService: ChiefService,
    private sharedService: SharedService
  ) {

    this.sharedService.showLoadingSpinner()
    this.chiefService.chiefGetIngredientsGet().subscribe({
      next: (response) => {
        this.optionSelected(response);
      },
      error: (error) => {

      }
    })
    this.sharedService.hideLoadingSpinner()
  }
  ngOnInit(): void {
    this.LoadIngredientsList()
  }

  LoadIngredientsList() {
    const keys = Object.keys(FoodIngredient);
    for (const key of keys) {
      if (!isNaN(Number(key))) { // Check if the key is numeric
        const id = key; // ID is the string representation of the numeric key
        this.ingredientsList.push({
          id: id,
          name: FoodIngredient[parseInt(key, 10)]
        });
      }
    }
  }

  postIngredients = (remove: boolean): void => {
    let ingredients: UpsertIngredientRequest[] = []
    this.usedIngredientsList.forEach(ingredient => {
      ingredients.push({
        ingredient: +ingredient.id,
        delete: !remove,
        pricePerKilo: +(ingredient.PricePerKilo ?? '')
      })
    })
    const request: ChiefAddIngredientsPost$Params = {
      body: ingredients
    }
    this.sharedService.showLoadingSpinner()
    this.chiefService.chiefAddIngredientsPost(request).subscribe({
      next: (response) => {
        this.sharedService.hideLoadingSpinner()
        this.sharedService.showPopUp('success', 'Ingredient updated')
      },
      error: (error) => {
        this.sharedService.hideLoadingSpinner()
        this.sharedService.showPopUp('danger', 'Ingredient update failed, refresh your page')
      }
    })
  }


  // ngOnInit(): void {

  //   this.ingredientsList.push(
  //     { id: "0", name: "Rice" },
  //     { id: "1", name: "Wheat" },
  //     { id: "2", name: "Lentils" },
  //     { id: "3", name: "Chickpeas" },
  //     { id: "4", name: "FavaBeans" },
  //     { id: "5", name: "Bulgur" },
  //     { id: "6", name: "Barley" },
  //     { id: "7", name: "Figs" },
  //     { id: "8", name: "Dates" },
  //     { id: "9", name: "Pomegranates" },
  //     { id: "10", name: "Olives" },
  //     { id: "11", name: "Onions" },
  //     { id: "12", name: "Garlic" },
  //     { id: "13", name: "Leeks" },
  //     { id: "14", name: "Scallions" },
  //     { id: "15", name: "Parsley" },
  //     { id: "16", name: "Cilantro" },
  //     { id: "17", name: "Dill" },
  //     { id: "18", name: "Mint" },
  //     { id: "19", name: "Basil" },
  //     { id: "20", name: "Thyme" },
  //     { id: "21", name: "Rosemary" },
  //     { id: "22", name: "Sage" },
  //     { id: "23", name: "Cumin" },
  //     { id: "24", name: "Coriander" },
  //     { id: "25", name: "Cardamom" },
  //     { id: "26", name: "Cloves" },
  //     { id: "27", name: "Nutmeg" },
  //     { id: "28", name: "Cinnamon" },
  //     { id: "29", name: "Allspice" },
  //     { id: "30", name: "BayLeaves" },
  //     { id: "31", name: "MustardSeeds" },
  //     { id: "32", name: "FenugreekSeeds" },
  //     { id: "33", name: "SesameSeeds" },
  //     { id: "34", name: "PoppySeeds" },
  //     { id: "35", name: "SunflowerSeeds" },
  //     { id: "36", name: "NigellaSeeds" },
  //     { id: "37", name: "AniseSeeds" },
  //     { id: "38", name: "CarawaySeeds" },
  //     { id: "39", name: "Saffron" },
  //     { id: "40", name: "Turmeric" },
  //     { id: "41", name: "Ginger" },
  //     { id: "42", name: "ChiliPeppers" },
  //     { id: "43", name: "BellPeppers" },
  //     { id: "44", name: "Eggplant" },
  //     { id: "45", name: "Tomatoes" },
  //     { id: "46", name: "Cucumbers" },
  //     { id: "47", name: "Zucchini" },
  //     { id: "48", name: "Squash" },
  //     { id: "49", name: "Artichokes" },
  //     { id: "50", name: "Okra" },
  //     { id: "51", name: "Spinach" },
  //     { id: "52", name: "SwissChard" },
  //     { id: "53", name: "Fennel" },
  //     { id: "54", name: "GreenBeans" },
  //     { id: "55", name: "Peas" },
  //     { id: "56", name: "Carrots" },
  //     { id: "57", name: "Radishes" },
  //     { id: "58", name: "Turnips" },
  //     { id: "59", name: "Beets" },
  //     { id: "60", name: "Potatoes" },
  //     { id: "61", name: "SweetPotatoes" },
  //     { id: "62", name: "Yams" },
  //     { id: "63", name: "Pumpkin" },
  //     { id: "64", name: "Cauliflower" },
  //     { id: "65", name: "Broccoli" },
  //     { id: "66", name: "Cabbage" },
  //     { id: "67", name: "BrusselsSprouts" },
  //     { id: "68", name: "Kale" },
  //     { id: "69", name: "Mushrooms" },
  //     { id: "70", name: "Egg" },
  //     { id: "71", name: "Yogurt" },
  //     { id: "72", name: "Cheese" },
  //     { id: "73", name: "Butter" },
  //     { id: "74", name: "Ghee" },
  //     { id: "75", name: "Labneh" },
  //     { id: "76", name: "Cream" },
  //     { id: "77", name: "Milk" },
  //     { id: "78", name: "Fish" },
  //     { id: "79", name: "Shrimp" },
  //     { id: "80", name: "Crab" },
  //     { id: "81", name: "Lobster" },
  //     { id: "82", name: "Calamari" },
  //     { id: "83", name: "Octopus" },
  //     { id: "84", name: "Mussels" },
  //     { id: "85", name: "Clams" },
  //     { id: "86", name: "Beef" },
  //     { id: "87", name: "Lamb" },
  //     { id: "88", name: "Chicken" },
  //     { id: "89", name: "Duck" },
  //     { id: "90", name: "Turkey" },
  //     { id: "91", name: "Veal" },
  //     { id: "92", name: "CamelMeat" },
  //     { id: "93", name: "Rabbit" },
  //     { id: "94", name: "Quail" },
  //     { id: "95", name: "Pigeon" },
  //     { id: "96", name: "GoatMeat" },
  //     { id: "97", name: "Sausages" },
  //     { id: "98", name: "Liver" },
  //     { id: "99", name: "Kidney" },
  //     { id: "100", name: "Tripe" },
  //     { id: "101", name: "Tamarind" },
  //     { id: "102", name: "Molokhia" },
  //     { id: "103", name: "Samna" },
  //     { id: "104", name: "Tahini" },
  //     { id: "105", name: "Vinegar" },
  //     { id: "106", name: "Lemon" },
  //     { id: "107", name: "Lime" },
  //     { id: "108", name: "Orange" },
  //     { id: "109", name: "Grapefruit" },
  //     { id: "110", name: "Mango" },
  //     { id: "111", name: "Guava" },
  //     { id: "112", name: "Bananas" },
  //     { id: "113", name: "Watermelon" },
  //     { id: "114", name: "Cantaloupe" },
  //     { id: "115", name: "Honeydew" },
  //     { id: "116", name: "Strawberries" },
  //     { id: "117", name: "Melons" },
  //     { id: "118", name: "Oranges" },
  //     { id: "119", name: "Lemons" },
  //     { id: "120", name: "Grapefruits" },
  //     { id: "121", name: "PomegranateMolasses" },
  //     { id: "122", name: "WhiteVinegar" },
  //     { id: "123", name: "RedWineVinegar" },
  //     { id: "124", name: "AppleCiderVinegar" },
  //     { id: "125", name: "BalsamicVinegar" },
  //     { id: "126", name: "RiceVinegar" },
  //     { id: "127", name: "DateVinegar" },
  //     { id: "128", name: "PalmVinegar" },
  //     { id: "129", name: "Cornstarch" },
  //     { id: "130", name: "Flour" },
  //     { id: "131", name: "Semolina" },
  //     { id: "132", name: "Farina" },
  //     { id: "133", name: "Durum" },
  //     { id: "134", name: "Almonds" },
  //     { id: "135", name: "Walnuts" },
  //     { id: "136", name: "Pistachios" },
  //     { id: "137", name: "Hazelnuts" },
  //     { id: "138", name: "Cashews" },
  //     { id: "139", name: "MacadamiaNuts" },
  //     { id: "140", name: "PineNuts" },
  //     { id: "141", name: "Peanuts" },
  //     { id: "142", name: "SunflowerOil" },
  //     { id: "143", name: "OliveOil" },
  //     { id: "144", name: "CornOil" },
  //     { id: "145", name: "VegetableOil" },
  //     { id: "146", name: "CanolaOil" },
  //     { id: "147", name: "SesameOil" },
  //     { id: "148", name: "CoconutOil" },
  //     { id: "149", name: "PalmOil" },
  //     { id: "150", name: "ClarifiedButter" },
  //     { id: "151", name: "CornMeal" },
  //     { id: "152", name: "Molasses" },
  //     { id: "153", name: "DateSyrup" },
  //     { id: "154", name: "RoseWater" },
  //     { id: "155", name: "OrangeBlossomWater" },
  //     { id: "156", name: "JasmineWater" },
  //     { id: "157", name: "CoconutWater" },
  //     { id: "158", name: "AlmondMilk" },
  //     { id: "159", name: "CoconutMilk" },
  //     { id: "160", name: "CondensedMilk" },
  //     { id: "161", name: "EvaporatedMilk" },
  //     { id: "162", name: "CoconutCream" },
  //     { id: "163", name: "SourCream" },
  //     { id: "164", name: "CreamCheese" },
  //     { id: "165", name: "GoudaCheese" },
  //     { id: "166", name: "FetaCheese" },
  //     { id: "167", name: "ParmesanCheese" },
  //     { id: "168", name: "MozzarellaCheese" },
  //     { id: "169", name: "RicottaCheese" },
  //     { id: "170", name: "CottageCheese" },
  //     { id: "171", name: "BrieCheese" },
  //     { id: "172", name: "CamembertCheese" },
  //     { id: "173", name: "BlueCheese" },
  //     { id: "174", name: "GorgonzolaCheese" },
  //     { id: "175", name: "RomanoCheese" },
  //     { id: "176", name: "AsiagoCheese" },
  //     { id: "177", name: "HavartiCheese" },
  //     { id: "178", name: "EmmentalCheese" },
  //     { id: "179", name: "GruyereCheese" },
  //     { id: "180", name: "PepperJackCheese" },
  //     { id: "181", name: "MuensterCheese" },
  //     { id: "182", name: "FontinaCheese" },
  //     { id: "183", name: "ProvoloneCheese" },
  //     { id: "184", name: "CheddarCheese" },
  //     { id: "185", name: "SwissCheese" },
  //     { id: "186", name: "MonterreyJackCheese" },
  //     { id: "187", name: "ColbyCheese" },
  //     { id: "188", name: "BrickCheese" },
  //     { id: "189", name: "LimburgerCheese" }
  //   )
  // }
}

