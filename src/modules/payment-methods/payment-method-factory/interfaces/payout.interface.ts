export default interface IPayOut {
  readonly amount: number;

  setAmount(amount: number): void;
  getAmount(): number;
  getPayoutInformation(): any;
  setPayoutInformation(payoutInfor: any): void;

  pay(): string | boolean;
}
