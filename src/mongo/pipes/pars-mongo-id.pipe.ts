import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class ParesMongoIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const isValedMongoId = /^[0-9a-fA-F]{24}$/.test(value);
    if (!isValedMongoId) {
      throw new BadRequestException(`"${value}" is not a valid mongo id`);
    }
    return value;
  }
}
