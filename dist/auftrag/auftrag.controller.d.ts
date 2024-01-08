import { AuftragService } from "src/auftrag/auftrag.service";
import { CreateAuftragDTO } from "./dto/create-auftrag.dto";
export declare class AuftragController {
    private readonly auftragService;
    constructor(auftragService: AuftragService);
    create(createAuftragDto: CreateAuftragDTO): Promise<void>;
    findAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        done: boolean;
        emailEingang: Date;
        bemerkung: string;
        vorgemerkt: string;
        hmName: string;
        hmTel: string;
        mail: string;
        emailId: number;
        objektId: number;
        auftraggeberId: number;
        vwStatischId: number;
        vwDynamischId: number;
    }, unknown, never> & {})[]>;
    findOne(id: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        done: boolean;
        emailEingang: Date;
        bemerkung: string;
        vorgemerkt: string;
        hmName: string;
        hmTel: string;
        mail: string;
        emailId: number;
        objektId: number;
        auftraggeberId: number;
        vwStatischId: number;
        vwDynamischId: number;
    }, unknown, never> & {}>;
    remove(id: string): Promise<void>;
}
