import { INPROGRESS_STATUS } from 'src/common/constants/order.constant';
import IPayOut from './interfaces/payout.interface';

export default class StripePayout implements IPayOut {
  amount: number;
  payoutInfor: any;

  pay(): string {
    return INPROGRESS_STATUS;
  }

  getAmount(): number {
    return this.amount;
  }

  setAmount(_amount: number): void {
    this.amount = _amount;
  }

  setPayoutInformation(_payoutInfor: any): void {
    this.payoutInfor = _payoutInfor;
  }

  getPayoutInformation(): any {
    return this.payoutInfor;
  }
}
