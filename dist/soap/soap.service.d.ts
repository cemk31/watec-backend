export declare class SoapService {
    private soapUrl;
    reportOrderReceived(orderNo: string, currentDateTime: string): Promise<string>;
    xmlToJson(xml: string): Promise<any>;
}
