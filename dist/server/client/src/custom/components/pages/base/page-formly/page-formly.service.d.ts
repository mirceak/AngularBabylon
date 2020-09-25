import { FormlyFieldConfig } from '@ngx-formly/core';
export declare class PageFormlyService {
    requiredValidator: {
        expression: (c: any) => boolean;
        message: (error: any, field: FormlyFieldConfig) => string;
    };
    emailValidator: {
        expression: (c: any) => boolean;
        message: (error: any, field: FormlyFieldConfig) => string;
    };
    minLengthValidator: (count: any) => {
        expression: (c: any) => boolean;
        message: (error: any, field: FormlyFieldConfig) => string;
    };
    minValidator: (value: any) => {
        expression: (c: any) => boolean;
        message: (error: any, field: FormlyFieldConfig) => string;
    };
    constructor();
}
//# sourceMappingURL=page-formly.service.d.ts.map