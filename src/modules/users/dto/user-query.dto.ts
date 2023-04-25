import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsString, IsOptional } from 'class-validator';

import PagingQueryDto from 'src/common/query/paging.query';

export class UserQueryDto extends PagingQueryDto {}
