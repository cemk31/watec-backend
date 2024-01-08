import { SoapService } from "./soap.service";
export declare class SoapController {
    private readonly soapService;
    constructor(soapService: SoapService);
    reportOrderStatus(body: any): Promise<any>;
}
