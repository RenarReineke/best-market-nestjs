import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class validationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('Pipe is workimg...');
    if (metadata.type === 'query' && value) {
      return value;
    } else {
      throw new BadRequestException('Erorsssssssssssss');
    }
  }
}
