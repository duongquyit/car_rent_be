import IPayOut from './interfaces/payout.interface';

export default class StripePayout implements IPayOut {
  amount: number;
  payoutInfor: any;

  pay(): boolean {
    return true;
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
