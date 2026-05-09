import { registerDecorator, type ValidationOptions, type ValidationArguments } from "class-validator";

export function StartsWith(
    prefix: string, 
    validationOptions?: ValidationOptions
) {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            name: 'startsWith', 
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                // 1. Сама логика валидации (возвращает true или false)
                validate(value: any, args: ValidationArguments) {
                    // Проверяем, что значение вообще строка, и что оно начинается с нужного префикса
                    return typeof value === 'string' && value.startsWith(prefix);
                },
                
                // 2. Сообщение об ошибке по умолчанию (если пользователь не передал свое)
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} должно начинаться с префикса "${prefix}"`;
                }
            }
        });
    };
}