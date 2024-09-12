import { SoapService } from './soap.service';
import { SoapEnvelopeDto } from 'src/ista/dto/soapReceveidDTO';
import { User } from '@prisma/client';
export declare class SoapController {
    private readonly soapService;
    constructor(soapService: SoapService);
    polling(body: SoapEnvelopeDto, user: User): Promise<void>;
}
