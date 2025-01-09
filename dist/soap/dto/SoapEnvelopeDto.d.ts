import { ReportOrderStatusRequestDto } from './ReportOrderStatusRequestDto';
export declare class SoapEnvelopeDto {
    'soapenv:Header': any;
    'soapenv:Body': {
        'ins:reportOrderStatusRequest': ReportOrderStatusRequestDto;
    };
}
