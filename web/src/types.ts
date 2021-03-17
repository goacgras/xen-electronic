export interface Product {
    createdAt: string;
    updatedAt: string;
    name: string;
    category: string;
    price: number;
}

export interface OrderInput {
    name: string;
    quantity: number;
}

export interface OrderResponse {
    invoiceNumber: string;
    accumulativePrice?: number;
    newOrders?: newOrders[];
}

export interface newOrders {
    invoiceNumber: string;
    totalPrice: number;
    status: string;
    quantity: number;
    productName: Product;
    createdAt: string;
    updatedAt: string;
}
