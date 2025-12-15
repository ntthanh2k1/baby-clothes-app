import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsOptional()
  image?: string;

  @IsNotEmpty()
  phone_number: string;

  @IsOptional()
  email?: string;

  @IsNotEmpty()
  citizen_id: string;

  @IsNotEmpty()
  tax_number: string;

  @IsOptional()
  gender?: boolean;

  @IsOptional()
  birth_date?: Date;

  @IsNotEmpty()
  address: string;

  @IsOptional()
  note?: string;
}
