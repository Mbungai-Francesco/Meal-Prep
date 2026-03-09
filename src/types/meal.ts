import type { Item } from "./"

export interface Meal{
  id : string
  name : string
  localName : string
  items : Ingredient[]
}

export interface MealDto{
  name : string
  localName : string
  items : Ingredient[]
}

export interface Ingredient{
  quantity : number
  weight ?: number
  unit ?: Units
  item : Item
}

export const Units = {
  TSP: 'tsp',
  GRAMS: 'g',
  TBSP: 'tbsp',
  UNIT: 'unit',
} as const;
export type Units = typeof Units[keyof typeof Units];