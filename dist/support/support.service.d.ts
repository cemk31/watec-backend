import { SupportDTO } from './dto/supportDTO';
export declare class SupportService {
    sendSupportEmail(dto: SupportDTO): Promise<string>;
}
