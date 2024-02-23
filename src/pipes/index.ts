import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import Joi from 'joi';

export default class JoiValidationPipe implements PipeTransform {
    constructor( private schema: Joi.ObjectSchema){}

    transform(value: any, metadata: ArgumentMetadata) {

        const parsed_value = this.schema.validate( value, { abortEarly: false } );

        if (parsed_value.error) {
          const errorMessages = parsed_value.error.details
            .map((d) => d.message)
            .join();
          throw new BadRequestException(errorMessages);
        }

        return parsed_value.value

    }

} 