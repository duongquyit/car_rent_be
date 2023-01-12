import IPaymentMethod from './payout.interface';

export default interface IPaymentMethodFactory {
  createPaymentMethod(): IPaymentMethod;
}
