import { CreateAuftraggeberDto } from './dto/create-auftraggeber.dto';
import { AuftraggeberService } from './auftraggeber.service';
import { UpdateAuftraggeberDto } from './dto/update-auftraggeber.dto';
export declare class AuftraggeberController {
    private auftraggeberService;
    constructor(auftraggeberService: AuftraggeberService);
    create(userId: number, dto: CreateAuftraggeberDto): void;
    getAuftraggeber(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        ap: string;
        email: string;
        ort: string;
        plz: number;
        strasse: string;
        tel: string;
        auftraggebername: string;
    }, unknown, never> & {}>;
    deleteAuftraggeber(id: number): Promise<void>;
    updateAuftraggeber(id: number, dto: UpdateAuftraggeberDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        ap: string;
        email: string;
        ort: string;
        plz: number;
        strasse: string;
        tel: string;
        auftraggebername: string;
    }, unknown, never> & {}>;
    search(auftraggeber: string): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        ap: string;
        email: string;
        ort: string;
        plz: number;
        strasse: string;
        tel: string;
        auftraggebername: string;
    }, unknown, never> & {})[]>;
    getAllAuftraggeber(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        ap: string;
        email: string;
        ort: string;
        plz: number;
        strasse: string;
        tel: string;
        auftraggebername: string;
    }, unknown, never> & {})[]>;
}
