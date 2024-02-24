import { MealCategory, MealSpiceLevel } from "src/app/api/models";
import { mealOption } from "./mealOption";
import { Option } from "../address/option";

export interface Meal {
    mealID: string;
    title: string;
    description: string;
    mealCategory?: Option;
    mealSpiceLevel?: Option;
    mealStyle?: Option,
    tagsID?: Array<Option>;
    mealOptions: Array<mealOption>;
}