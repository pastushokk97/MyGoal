import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength
} from 'class-validator';

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(86)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(4)
  countryCode: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(86)
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(86)
  email: string;

  @IsString()
  @IsOptional()
  @MaxLength(4)
  countryCode: string;

  @IsString()
  @IsOptional()
  password: string;
}

export class EmailDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(86)
  email: string;
}
