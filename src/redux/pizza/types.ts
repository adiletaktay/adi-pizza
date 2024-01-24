export type Pizza = {
    id: string;
    title: string;
    type: number[];
    price: number;
    size: number[];
    image: string;
    rating: number;
};

export enum Status {
    LOADING = "loading",
    SUCCES = "succes",
    ERROR = "error",
};

export interface PizzaSliceState {
    items: Pizza[];
    status: Status;
};

export type SearchPizzaParams = {
    order: string;
    sortBy: string;
    category: string;
    search: string;
    currentPage: string;
};
