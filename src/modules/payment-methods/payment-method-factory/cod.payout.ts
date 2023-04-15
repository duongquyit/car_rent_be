import IPayOut from './interfaces/payout.interface';

export default class CODPayout implements IPayOut {
  amount: number;
  errorMessage: string;
  payoutInfor: any;

  pay(): boolean {
    return true;
  }

  setAmount(_amount: number): void {
    this.amount = _amount;
  }

  getAmount(): number {
    return this.amount;
  }

  setPayoutInformation(_payoutInfor: any): void {
    this.payoutInfor = _payoutInfor;
  }

  getPayoutInformation(): any {
    return this.payoutInfor;
  }
}
