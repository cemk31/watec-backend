import { SupportDTO } from './dto/supportDTO';
import { SupportService } from './support.service';
export declare class SupportController {
    private readonly supportService;
    constructor(supportService: SupportService);
    sendSupport(dto: SupportDTO): Promise<{
        message: string;
    }>;
}
