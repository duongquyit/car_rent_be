import {
  COD_METHOD,
  STRIPE_METHOD,
} from 'src/common/constants/payment-method.constant';
import CODPayout from './cod.payout';
import IPayOut from './interfaces/payout.interface';
import StripePayout from './stripe.payout';

export default class PayoutFactory {
  public static generatePayout(type: string): IPayOut {
    switch (type.toLocaleUpperCase()) {
      case COD_METHOD:
        return new CODPayout();
      case STRIPE_METHOD:
        return new StripePayout();
      default:
        break;
    }
  }
}
