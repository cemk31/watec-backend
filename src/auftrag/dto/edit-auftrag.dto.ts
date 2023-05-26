// edit-auftrag.dto.ts
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class EditAuftragDTO {
  @IsBoolean()
  @IsOptional()
  done?: boolean;

  @IsDate()
  @IsOptional()
  emailEingang?: Date;

  @IsString()
  @IsOptional()
  bemerkung?: string;

  @IsString()
  @IsOptional()
  vorgemerkt?: string;

  @IsString()
  @IsOptional()
  liNr?: string;

  @IsString()
  @IsOptional()
  adresseLi?: string;

  @IsString()
  @IsOptional()
  plzLi?: string;

  @IsString()
  @IsOptional()
  ortLi?: string;

  @IsString()
  @IsOptional()
  vwBuro?: string;

  @IsString()
  @IsOptional()
  vwMa?: string;

  @IsString()
  @IsOptional()
  mailadresseVw?: string;

  @IsString()
  @IsOptional()
  telVw?: string;

  @IsString()
  @IsOptional()
  hmName?: string;

  @IsString()
  @IsOptional()
  hmTel?: string;

  @IsString()
  @IsOptional()
  emailBetreff?: string;

  @IsString()
  @IsOptional()
  emailAnhang?: string;

  @IsBoolean()
  @IsOptional()
  bestatigungVersendet?: boolean;

  @IsString()
  @IsOptional()
  anfrageThema?: string;

  @IsBoolean()
  @IsOptional()
  anfrageBestatigt?: boolean;

  @IsBoolean()
  @IsOptional()
  angebotErstellt?: boolean;

  @IsString()
  @IsOptional()
  angebotsnummer?: string;

  @IsString()
  @IsOptional()
  angebot?: string;

  @IsBoolean()
  @IsOptional()
  auftragbestatigung?: boolean;

  @IsString()
  @IsOptional()
  vwBestatigung?: string;

  @IsDate()
  @IsOptional()
  terminiertZum?: Date;

  @IsDate()
  @IsOptional()
  uhrzeit?: Date;

  @IsBoolean()
  @IsOptional()
  aushang?: boolean;

  @IsDate()
  @IsOptional()
  datumAushang?: Date;

  @IsBoolean()
  @IsOptional()
  agInformiert?: boolean;

  @IsBoolean()
  @IsOptional()
  bgb?: boolean;

  @IsBoolean()
  @IsOptional()
  bgbBericht?: boolean;

  @IsBoolean()
  @IsOptional()
  ssa?: boolean;

  @IsBoolean()
  @IsOptional()
  bericht?: boolean;

  @IsBoolean()
  @IsOptional()
  umb?: boolean;

  @IsBoolean()
  @IsOptional()
  ber?: boolean;

  @IsString()
  @IsOptional()
  reNr?: string;

  @IsNumber()
  @IsOptional()
  reBetrag?: number;

  @IsBoolean()
  @IsOptional()
  reErhalten?: boolean;

  @IsString()
  @IsOptional()
  reNr2?: string;

  @IsNumber()
  @IsOptional()
  reBetrag2?: number;

  @IsBoolean()
  @IsOptional()
  reNr2Erhalten?: boolean;

    // Continuing the EditAuftragDTO
    @IsOptional()
    dateien?: string;

    @IsBoolean()
    @IsOptional()
    mahnung?: boolean;

    @IsBoolean()
    @IsOptional()
    mahnung1?: boolean;

    @IsBoolean()
    @IsOptional()
    mahnungErhaten?: boolean;

    @IsString()
    @IsOptional()
    auftraggeber?: string;

    @IsString()
    @IsOptional()
    ap?: string;

    @IsString()
    @IsOptional()
    strasse?: string;

    @IsString()
    @IsOptional()
    plz?: string;

    @IsString()
    @IsOptional()
    ort?: string;

    @IsString()
    @IsOptional()
    tel?: string;

    @IsString()
    @IsOptional()
    email?: string;
}