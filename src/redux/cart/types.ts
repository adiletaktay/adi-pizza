export type CartItem = {
  id: string
  title: string
  type: string
  price: number
  size: number
  image: string
  count: number
}

export interface CartSliceState {
  totalPrice: number
  items: CartItem[]
}
