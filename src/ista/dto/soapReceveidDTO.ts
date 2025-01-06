import { ApiProperty } from '@nestjs/swagger';

export class CustomerContact {
  @ApiProperty({
    example: '2020-09-09T16:27:05',
    description: 'Time of the contact attempt',
  })
  customerContactAttemptOn: string;

  @ApiProperty({
    example: 'Max',
    description: 'Name of the contact person at the customer',
    required: false,
  })
  contactPersonCustomer?: string;

  @ApiProperty({
    example: 'Agent a',
    description: 'Agent who made the contact attempt',
  })
  agentCP: string;

  @ApiProperty({
    example: 'APNE',
    description: 'Result of the contact attempt',
  })
  result: string;

  @ApiProperty({
    example: 'Bemerkung von Dorothy ü ö ä ß',
    description: 'Additional remarks',
    required: false,
  })
  remark?: string;
}

export class Order {
  @ApiProperty({ example: '12345', description: 'Order number' })
  number: string;
}

export class Received {
  @ApiProperty({ type: Order, description: 'Order details' })
  order: Order;

  @ApiProperty({ example: '007', description: 'Order status type' })
  orderstatusType: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Time when the status was set',
  })
  setOn: string;

  @ApiProperty({
    type: [CustomerContact],
    description: 'List of customer contacts',
  })
  customerContacts: CustomerContact[];
}

export class ReportOrderStatusRequestDto {
  @ApiProperty({
    example: 'Development',
    description: 'Environment of the operation',
    default: 'Development',
  })
  environment: string;

  @ApiProperty({ example: 'DE', description: 'Language used', default: 'DE' })
  language: string;

  @ApiProperty({ example: 'soapUI', description: 'Consumer of the service' })
  consumer: string;

  @ApiProperty({ type: Received, description: 'Received data' })
  received: Received;
}

export class SoapEnvelopeDto {
  @ApiProperty({
    type: Object,
    description: 'SOAP Envelope header',
    required: false,
  })
  'soapenv:Header': any;

  @ApiProperty({
    type: ReportOrderStatusRequestDto,
    description: 'SOAP Body containing the request data',
  })
  'soapenv:Body': {
    'ins:reportOrderStatusRequest': ReportOrderStatusRequestDto;
  };
}
