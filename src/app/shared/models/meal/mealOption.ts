import { MealSizeOption } from "src/app/api/models/meal-size-option";
import { FileHandle } from "../../file-input/file-handle.model";
import { FoodIngredient } from "src/app/api/models";
import { Option } from "../address/option";

export interface mealOption{
    mealOptionID : string;
    MealSizeOption: MealSizeOption;
    isAvailable : boolean;
    price: number;
    availableQuantity: number;
    saveQuantitySetting: boolean;
    image?: FileHandle
    sideDishes? :mealSideDish[]
    usedIngredients? : usedIngredient[]
    // imagePath: string;
    // imageFile?: Blob;
}
export interface usedIngredient extends Option {
    pricePerKilo?: number,
    usedGrams: string
  }
export interface mealSideDish{
    isFree: boolean;
    isTopping: boolean;
    sideDishOptions: mealSideDishOption[]
}

export interface mealSideDishOption{
    sideDishID: string;
    sideDishSizeOption: MealSizeOption;
    name: string;
    price: number;
    availableQuantity: number;
}

