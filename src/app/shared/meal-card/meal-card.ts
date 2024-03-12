import { MealSizeOption } from "src/app/api/models"

export interface mealCard {
    mealID: string,
    chiefID: string,
    title: string,
    chiefName: string,
    chiefImage: string,
    rating: number,
    reviewsCount: number,
    mealCardOptions: mealCardOption[]

}

export interface mealCardOption {
    mealOptionID: string,
    mealOptionSize: number,
    mealOptionImage: string,
    mealOptionPrice: number
    IsAvailable: boolean
    mealSideDishes: mealSideDish[]
}

export interface mealSideDish{
    mealSideDishID: string,
    isFree: boolean,
    isTopping: boolean,
    mealSideDishOptions: mealSideDishOption[]

}

export interface mealSideDishOption{
    sideDishID: string,
    sideDishSizeOption: MealSizeOption,
    name: string,
    price: number,
    quantity: number
}