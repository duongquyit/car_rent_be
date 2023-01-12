export default interface IPayOut {
  readonly amount: number;

  setAmount(amount: number): void;
  getAmount(): number;

  pay(): Boolean;
}
