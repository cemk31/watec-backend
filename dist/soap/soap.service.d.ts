export declare class SoapService {
    private soapUrl;
    reportOrderStatus(orderNo: string, currentDateTime: string): Promise<string>;
    xmlToJson(xml: string): Promise<any>;
}
