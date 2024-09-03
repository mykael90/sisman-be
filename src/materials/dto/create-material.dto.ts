import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMaterialDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  id: number;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  specification?: string | null;

  @IsString()
  unit: string;
}
