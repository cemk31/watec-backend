import { CreateAuftraggeberDto } from './create-auftraggeber.dto';
import { CreateAuftragsBestaetigungDto } from './create-auftragsbestatigung.dto';
import { CreateObjektDto } from './create-objekt.dto';
import { CreateVwDto } from './create-vw.dto';
import { CreateEmailDto } from './create-email.dto';
export declare class CreateAuftragDTO {
    done: boolean;
    emailEingang: Date;
    bemerkung?: string;
    vorgemerkt?: string;
    email: CreateEmailDto;
    userId: number;
    objekt?: CreateObjektDto;
    auftragsbestaetigung: CreateAuftragsBestaetigungDto;
    vwStatisch: CreateVwDto;
    vwDynamisch: CreateVwDto;
    auftraggeber: CreateAuftraggeberDto;
}
