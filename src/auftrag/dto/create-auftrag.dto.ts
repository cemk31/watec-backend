// create-auftrag.dto.ts
import { IsBoolean, IsDate, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAuftragDTO {
  @IsBoolean()
  @IsOptional()
  done: boolean = false;

  @IsDateString({ message: 'emailEingang must be a valid date string' })
  @IsOptional()
  emailEingang: Date;

  @IsString()
  @IsOptional()
  bemerkung?: string;

  @IsString()
  @IsOptional()
  vorgemerkt?: string;

  @IsString()
  @IsOptional()
  liNr: string;

  @IsString()
  @IsOptional()
  adresseLi: string;

  @IsString()
  @IsOptional()
  plzLi: string;

  @IsString()
  @IsOptional()
  ortLi: string;

  @IsString()
  @IsOptional()
  vwBuro: string;

  @IsString()
  @IsOptional()
  vwMa: string;

  @IsString()
  @IsOptional()
  mailadresseVw: string;

  @IsString()
  telVw: string;

  @IsString()
  @IsOptional()
  hmName: string;

  @IsString()
  @IsOptional()
  hmTel: string;

  @IsString()
  @IsOptional()
  emailBetreff: string;

  @IsString()
  @IsOptional()
  emailAnhang?: string;

  @IsBoolean()
  @IsOptional()
  bestatigungVersendet: boolean = false;

  @IsString()
  @IsOptional()
  anfrageThema: string;

  @IsBoolean()
  @IsOptional()
  anfrageBestatigt: boolean = false;

  @IsBoolean()
  @IsOptional()
  angebotErstellt: boolean = false;

  @IsString()
  @IsOptional()
  angebotsnummer?: string;

  @IsString()
  @IsOptional()
  angebot?: string;

  @IsBoolean()
  auftragbestatigung: boolean = false;

  @IsString()
  @IsOptional()
  vwBestatigung?: string;

  @IsDateString()
  @IsOptional()
  terminiertZum?: Date = new Date();

  @IsDate()
  @IsOptional()
  uhrzeit?: Date;

  @IsBoolean()
  @IsOptional()
  aushang: boolean = false;

  @IsDate()
  @IsOptional()
  datumAushang?: Date;

  @IsBoolean()
  @IsOptional()
  agInformiert: boolean = false;

  @IsBoolean()
  @IsOptional()
  bgb: boolean = false;

  @IsBoolean()
  @IsOptional()
  bgbBericht: boolean = false;

  @IsBoolean()
  @IsOptional()
  ssa: boolean = false;

  @IsBoolean()
  @IsOptional()
  bericht: boolean = false;

  @IsBoolean()
  @IsOptional()
  umb: boolean = false;

  @IsBoolean()
  @IsOptional()
  ber: boolean = false;

  @IsString()
  @IsOptional()
  reNr: string;

  @IsNumber()
  @IsOptional()
  reBetrag: number;

  @IsBoolean()
  @IsOptional()
  reErhalten: boolean = false;

  @IsString()
  @IsOptional()
  reNr2?: string;

  @IsNumber()
  @IsOptional()
  reBetrag2?: number;

  @IsBoolean()
  @IsOptional()
  reNr2Erhalten?: boolean = false;

  @IsString()
  @IsOptional()
  dateien?: string;

  @IsBoolean()
  @IsOptional()
  mahnung: boolean = false;

  @IsBoolean()
  @IsOptional()
  mahnung1: boolean = false;

  @IsBoolean()
  @IsOptional()
  mahnungErhaten: boolean = false;

  @IsString()
  @IsOptional()
  auftraggeber: string;

  @IsString()
  @IsOptional()
  ap: string;

  @IsString()
  @IsOptional()
  strasse: string;

  @IsString()
  @IsOptional()
  plz: string;

  @IsString()
  @IsOptional()
  ort: string;

  @IsString()
  @IsOptional()
  tel: string;

  @IsString()
  email: string;
}
