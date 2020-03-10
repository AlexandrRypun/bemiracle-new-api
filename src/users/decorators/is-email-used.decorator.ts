import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';
import { UserRepository } from '../user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { FindConditions, Not } from 'typeorm';

@ValidatorConstraint({ name: 'IsEmailUsed', async: true })
@Injectable()
export class IsEmailUsedConstraint implements ValidatorConstraintInterface {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) {}

    async validate(email: string, args: ValidationArguments) {
        const query: FindConditions<{id?: number, email: string}> = { email };
        const id: number | undefined = (args.object as any).id;
        if (id) {
            query.id = Not(id);
        }
        const user = await this.userRepository.findOne(query, { select: ['id'] });
        return !user;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'email already in use';
    }
}

export function IsEmailUsed(validationOptions?: ValidationOptions) {
    return (object: object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailUsedConstraint
        });
    };
}
