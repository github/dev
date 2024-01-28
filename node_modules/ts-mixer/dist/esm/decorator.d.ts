import { Class } from './types';
type ObjectOfDecorators<T extends PropertyDecorator | MethodDecorator> = {
    [key: string]: T[];
};
export type PropertyAndMethodDecorators = {
    property?: ObjectOfDecorators<PropertyDecorator>;
    method?: ObjectOfDecorators<MethodDecorator>;
};
type Decorators = {
    class?: ClassDecorator[];
    static?: PropertyAndMethodDecorators;
    instance?: PropertyAndMethodDecorators;
};
export declare const deepDecoratorSearch: (...classes: Class[]) => Decorators;
export declare const directDecoratorSearch: (...classes: Class[]) => Decorators;
export declare const getDecoratorsForClass: (clazz: Class) => Decorators;
export declare const decorate: <T extends PropertyDecorator | MethodDecorator | ClassDecorator>(decorator: T) => T;
export {};
