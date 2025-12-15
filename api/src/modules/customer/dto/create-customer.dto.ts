import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone_number: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  gender?: boolean;

  @IsNotEmpty()
  address: string;

  @IsOptional()
  note?: string;
}
