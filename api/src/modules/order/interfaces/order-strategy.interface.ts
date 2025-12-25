export interface IOrderStrategy {
  calculateTotalAmount(dto: any): number;
}

export const ORDER_STRATEGY = Symbol('IOrderStrategy');
