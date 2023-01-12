import IPayOut from './interfaces/payout.interface';

export default class CODPayout implements IPayOut {
  amount: number;
  errorMessage: string;

  pay(): boolean {
    return true;
  }

  setAmount(_amount: number): void {
    this.amount = _amount;
  }

  getAmount(): number {
    return this.amount;
  }
}
