import { SoapService } from './soap.service';
import { User } from '@prisma/client';
import { SyncDto } from './dto/SyncDto';
import { SoapEnvelopeDto } from './dto/SoapEnvelopeDto';
import { Response } from 'express';
export declare class SoapController {
    private readonly soapService;
    constructor(soapService: SoapService);
    polling(body: SoapEnvelopeDto, user: User): Promise<void>;
    pollingWithMockData(res: Response): Promise<Response<any, Record<string, any>>>;
    updateStatus(syncDTO: SyncDto, user: User): Promise<void>;
}
