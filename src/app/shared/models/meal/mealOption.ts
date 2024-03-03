import { MealSizeOption } from "src/app/api/models/meal-size-option";
import { FileHandle } from "../../file-input/file-handle.model";

export interface mealOption{
    mealOptionID : string;
    MealSizeOption: MealSizeOption;
    isAvailable : boolean;
    price: number;
    availableQuantity: number;
    saveQuantitySetting: boolean;
    image?: FileHandle
    sideDishes? :sideDish[]
    // imagePath: string;
    // imageFile?: Blob;
}

export interface sideDish{
    isFree: boolean;
    isTopping: boolean;
    sideDishOptions: sideDishOption[]
}

export interface sideDishOption{
    sideDishID: string;
    sideDishSizeOption: MealSizeOption;
    price: number;
    availableQuantity: number;
}

