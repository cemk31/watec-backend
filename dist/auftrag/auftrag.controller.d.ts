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
        done: boolean;
        emailEingang: Date;
        bemerkung: string;
        vorgemerkt: string;
        hmName: string;
        hmTel: string;
        userId: number;
        auftraggeberId: number;
        emailId: number;
        objektId: number;
        vwDynamischId: number;
        vwStatischId: number;
        mail: string;
    }, unknown, never> & {})[]>;
    findOne(id: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        done: boolean;
        emailEingang: Date;
        bemerkung: string;
        vorgemerkt: string;
        hmName: string;
        hmTel: string;
        userId: number;
        auftraggeberId: number;
        emailId: number;
        objektId: number;
        vwDynamischId: number;
        vwStatischId: number;
        mail: string;
    }, unknown, never> & {}>;
    remove(id: string): Promise<void>;
}
