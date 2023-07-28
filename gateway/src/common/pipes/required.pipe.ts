import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';

@Injectable()
export class RequiredPipe implements PipeTransform {
    public transform(value: any, metadata: ArgumentMetadata) {
        if (!value) {
            throw new BadRequestException(
                `Field "${metadata?.data}" is required`,
            );
        }

        return value;
    }
}
