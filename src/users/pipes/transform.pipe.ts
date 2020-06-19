import { PipeTransform } from '@nestjs/common';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export class TransformPipe implements PipeTransform {
    transform(data: CreateUserDto | UpdateUserDto): any {
        ['phone', 'city', 'novaPoshtaDep'].forEach(field => {
            if (data[field] === '') {
                data[field] = null;
            }
        });
        return data;
    }
}
