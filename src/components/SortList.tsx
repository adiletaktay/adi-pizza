import { SortPropertyEnum } from "../redux/filter/types"

export type SortItem = {
  name: string
  sortProperty: SortPropertyEnum
}

export const sortList: SortItem[] = [
  { name: "популярности ᐃ", sortProperty: SortPropertyEnum.RATING_DESC },
  { name: "популярности ᐁ", sortProperty: SortPropertyEnum.RATING_ASC },
  { name: "цене ᐃ", sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: "цене ᐁ", sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: "алфавиту ᐃ", sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: "алфавиту ᐁ", sortProperty: SortPropertyEnum.TITLE_ASC },
]
