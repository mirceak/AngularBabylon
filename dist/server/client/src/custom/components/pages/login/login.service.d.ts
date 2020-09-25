import { PageFormlyService } from '../base/page-formly/page-formly.service';
export declare class LoginService {
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
            email: {
                expression: (c: any) => boolean;
                message: (error: any, field: import("@ngx-formly/core").FormlyFieldConfig) => string;
            };
            required: {
                expression: (c: any) => boolean;
                message: (error: any, field: import("@ngx-formly/core").FormlyFieldConfig) => string;
            };
            minLength?: undefined;
        };
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
                message: (error: any, field: import("@ngx-formly/core").FormlyFieldConfig) => string;
            };
            required: {
                expression: (c: any) => boolean;
                message: (error: any, field: import("@ngx-formly/core").FormlyFieldConfig) => string;
            };
            email?: undefined;
        };
    })[];
}
//# sourceMappingURL=login.service.d.ts.map