// create-bar.dto.ts
import { IsString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class DayHoursDto {
  @IsOptional()
  @IsString()
  open?: string;

  @IsOptional()
  @IsString()
  close?: string;
}

class HoursDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => DayHoursDto)
  monday?: DayHoursDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => DayHoursDto)
  tuesday?: DayHoursDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => DayHoursDto)
  wednesday?: DayHoursDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => DayHoursDto)
  thursday?: DayHoursDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => DayHoursDto)
  friday?: DayHoursDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => DayHoursDto)
  saturday?: DayHoursDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => DayHoursDto)
  sunday?: DayHoursDto;
}

class SocialLinksDto {
  @IsOptional()
  @IsString()
  facebook?: string;

  @IsOptional()
  @IsString()
  instagram?: string;

  [key: string]: any;
}

export class CreateBarDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  ownerId?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => SocialLinksDto)
  socialLinks?: SocialLinksDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => HoursDto)
  hours?: HoursDto;
}
