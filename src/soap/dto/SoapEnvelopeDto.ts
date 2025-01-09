import { ApiProperty } from '@nestjs/swagger';
import { ReportOrderStatusRequestDto } from './ReportOrderStatusRequestDto';

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
