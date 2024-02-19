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
}