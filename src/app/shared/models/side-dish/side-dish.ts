import { MealSizeOption } from "src/app/api/models";
import { FileHandle } from "../../file-input/file-handle.model";

export interface sideDish {
    sideDishID?:string
    name: string,
    image?: FileHandle
    sideDishOptions: sideDishOption[]
}

export interface sideDishOption {
    sideDishSizeOption: MealSizeOption;
    price: number;
    availableQuantity: number;
}