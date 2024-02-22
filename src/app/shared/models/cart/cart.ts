import { Time } from "@angular/common";

export interface Cart {
    mealOptionID: string,
    quantity: number,
    timeOfDelivery?: Time,
}