import { FormlyFieldConfig } from '@ngx-formly/core';
import { PageFormlyService } from '../base/page-formly/page-formly.service';
export declare class RegisterService {
    private pageFormlyService;
    constructor(pageFormlyService: PageFormlyService);
    fields: ({
        key: string;
        type: string;
        templateOptions: {
            label: string;
            placeholder: string;
            required: boolean;
        };
        validators: {
            minLength: {
                expression: (c: any) => boolean;
                message: (error: any, field: FormlyFieldConfig) => string;
            };
            required: {
                expression: (c: any) => boolean;
                message: (error: any, field: FormlyFieldConfig) => string;
            };
            email?: undefined;
            min?: undefined;
        };
        hooks?: undefined;
    } | {
        key: string;
        type: string;
        templateOptions: {
            label: string;
            placeholder: string;
            required: boolean;
        };
        validators: {
            email: {
                expression: (c: any) => boolean;
                message: (error: any, field: FormlyFieldConfig) => string;
            };
            required: {
                expression: (c: any) => boolean;
                message: (error: any, field: FormlyFieldConfig) => string;
            };
            minLength?: undefined;
            min?: undefined;
        };
        hooks?: undefined;
    } | {
        key: string;
        type: string;
        templateOptions: {
            label: string;
            required: boolean;
            placeholder?: undefined;
        };
        validators: {
            minLength: {
                expression: (c: any) => boolean;
                message: (error: any, field: FormlyFieldConfig) => string;
            };
            required: {
                expression: (c: any) => boolean;
                message: (error: any, field: FormlyFieldConfig) => string;
            };
            email?: undefined;
            min?: undefined;
        };
        hooks?: undefined;
    } | {
        key: string;
        type: string;
        templateOptions: {
            label: string;
            required: boolean;
            placeholder?: undefined;
        };
        hooks: {
            onInit: (field?: FormlyFieldConfig) => void;
        };
        validators: {
            min: {
                expression: (c: any) => boolean;
                message: (error: any, field: FormlyFieldConfig) => string;
            };
            required: {
                expression: (c: any) => boolean;
                message: (error: any, field: FormlyFieldConfig) => string;
            };
            minLength?: undefined;
            email?: undefined;
        };
    })[];
}
//# sourceMappingURL=register.service.d.ts.map