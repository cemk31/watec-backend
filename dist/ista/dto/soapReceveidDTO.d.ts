export declare class CustomerContact {
    customerContactAttemptOn: string;
    contactPersonCustomer?: string;
    agentCP: string;
    result: string;
    remark?: string;
}
export declare class Order {
    number: string;
}
export declare class Received {
    order: Order;
    orderstatusType: string;
    setOn: string;
    customerContacts: CustomerContact[];
}
export declare class ReportOrderStatusRequestDto {
    environment: string;
    language: string;
    consumer: string;
    received: Received;
}
export declare class SoapEnvelopeDto {
    'soapenv:Header': any;
    'soapenv:Body': {
        'ins:reportOrderStatusRequest': ReportOrderStatusRequestDto;
    };
}
