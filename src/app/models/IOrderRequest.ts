export interface IOrderRequest {
    cartId: number,
    finalPrice: number,
    shippingCity: string,
    shippingStreet: string,
    shippingDate: Date,
    paymentLastDigits: string,
}