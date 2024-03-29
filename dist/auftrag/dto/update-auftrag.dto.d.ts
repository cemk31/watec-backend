import { CreateAuftraggeberDto } from './create-auftraggeber.dto';
export declare class UpdateAuftragDTO {
    done: boolean;
    emailEingang: Date;
    bemerkung?: string;
    vorgemerkt?: string;
    liNr: string;
    adresseLi: string;
    plzLi: string;
    ortLi: string;
    vwBuro: string;
    vwMa: string;
    mailadresseVw: string;
    telVw: string;
    hmName: string;
    hmTel: string;
    emailBetreff: string;
    emailAnhang?: string;
    bestatigungVersendet: boolean;
    anfrageThema: string;
    anfrageBestatigt: boolean;
    angebotErstellt: boolean;
    angebotsnummer?: string;
    angebot?: string;
    auftragbestatigung: boolean;
    vwBestatigung?: string;
    terminiertZum?: Date;
    uhrzeit?: Date;
    aushang: boolean;
    datumAushang?: Date;
    agInformiert: boolean;
    bgb: boolean;
    bgbBericht: boolean;
    ssa: boolean;
    bericht: boolean;
    umb: boolean;
    ber: boolean;
    reNr: string;
    reBetrag: number;
    reErhalten: boolean;
    reNr2?: string;
    reBetrag2?: number;
    reNr2Erhalten?: boolean;
    dateien?: string;
    mahnung: boolean;
    mahnung1: boolean;
    mahnungErhaten: boolean;
    auftraggeberObject: CreateAuftraggeberDto;
    auftraggeber: string;
    ap: string;
    strasse: string;
    plz: string;
    ort: string;
    tel: string;
    email: string;
    objektId: number;
    auftraggeberId: number;
    vwStatischId: number;
    vwDynamischId: number;
    userId: number;
}
