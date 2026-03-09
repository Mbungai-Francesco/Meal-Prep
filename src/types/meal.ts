import type { Item } from "./item"

export interface Meal{
  id : string
  name : string
  localName : string
  items : Ingredient[]
}

export interface Ingredient{
  quantity : number
  weight ?: Units
  item : Item
}

export const Units = {
  TSP: 'tsp',
  grams: 'gr',
  TBSP: 'tbsp',
} as const;
export type Units = typeof Units[keyof typeof Units];