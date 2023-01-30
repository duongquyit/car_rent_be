export class ErrorDto {
  property: string;
  children: ErrorDto[];
  constraints: object[];
}
