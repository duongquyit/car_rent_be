import IPayOut from './interfaces/payout.interface';

export default class StripePayout implements IPayOut {
  amount: number;

  pay(): Boolean {
    return true;
  }

  getAmount(): number {
    return this.amount;
  }

  setAmount(_amount: number): void {
    this.amount = _amount;
  }
}
