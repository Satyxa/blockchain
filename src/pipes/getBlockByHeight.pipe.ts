import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class GetBlockByHeightDto {
  @Type(() => Number)
  @IsInt({ message: 'height must be an integer' })
  @Min(0, { message: 'height must be a positive number' })
  height: number;
}
