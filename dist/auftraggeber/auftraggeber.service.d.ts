import { CreateAuftraggeberDto } from './dto';
import { Auftraggeber } from '@prisma/client';
import { UpdateAuftraggeberDto } from './dto/update-auftraggeber.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AuftraggeberService {
    private prisma;
    constructor(prisma: PrismaService);
    createAuftraggeber(userId: number, dto: CreateAuftraggeberDto): Promise<import("@prisma/client/runtime").GetResult<{
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
    getAuftraggeber(id: number): Promise<Auftraggeber>;
    deleteAuftraggeber(id: number): Promise<void>;
    updateAuftraggeber(id: number, updateAuftraggeberDto: UpdateAuftraggeberDto): Promise<Auftraggeber>;
    search(auftraggebername: string): Promise<Auftraggeber[]>;
    getAllAuftraggeber(): Promise<Auftraggeber[]>;
}
