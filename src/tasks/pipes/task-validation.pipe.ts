import { BadGatewayException, BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';
import { UpdateTaskDto } from '../dto/update-task.dto';

export class TaskValidation implements PipeTransform {
    readonly statuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ];
    transform(value: UpdateTaskDto): UpdateTaskDto {
        if (value.status && !this.statuses.includes(value.status)) {
            throw new BadRequestException();
        }

        return value;
    }
}
