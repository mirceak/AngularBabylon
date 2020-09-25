declare abstract class BaseController {
    abstract model: any;
    getRouter(): any;
    getAll: (req: any, res: any) => Promise<any>;
    count: (req: any, res: any) => Promise<any>;
    insert: (req: any, res: any) => Promise<any>;
    get: (req: any, res: any) => Promise<any>;
    update: (req: any, res: any) => Promise<any>;
    delete: (req: any, res: any) => Promise<any>;
}
export default BaseController;
//# sourceMappingURL=base.controller.d.ts.map