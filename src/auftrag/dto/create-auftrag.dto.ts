// create-auftrag.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Auftraggeber } from '@prisma/client';
import { IsBoolean, IsDate, IsDateString, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { CreateAuftraggeberDto } from './create-auftraggeber.dto';
import { Type } from 'class-transformer';
import { CreateAuftragsBestaetigungDto } from './create-auftragsbestatigung.dto';
import { CreateObjektDto } from './create-objekt.dto';
import { CreateVwDto } from './create-vw.dto';
import { CreateEmailDto } from './create-email.dto';

export class CreateAuftragDTO {
  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  done: boolean = false;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  emailEingang: Date;

  @IsString()
  @IsOptional()
  @ApiProperty()
  bemerkung?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  vorgemerkt?: string;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // liNr: string;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // adresseLi: string;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // plzLi: string;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // ortLi: string;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // vwBuro: string;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // vwMa: string;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // mailadresseVw: string;

  // @IsString()
  // @ApiProperty()
  // telVw: string;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // hmName: string;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // hmTel: string;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // emailBetreff: string;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // emailAnhang?: string;

  // @IsBoolean()
  // @IsOptional()
  // @ApiProperty()
  // bestatigungVersendet: boolean = false;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // anfrageThema: string;

  // @IsBoolean()
  // @IsOptional()
  // @ApiProperty()
  // anfrageBestatigt: boolean = false;

  // @IsBoolean()
  // @IsOptional()
  // @ApiProperty()
  // angebotErstellt: boolean = false;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // angebotsnummer?: string;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // angebot?: string;

  // @IsBoolean()
  // @ApiProperty()
  // auftragbestatigung: boolean = false;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // vwBestatigung?: string;

  // @IsDateString()
  // @IsOptional()
  // @ApiProperty()
  // terminiertZum?: Date = new Date();

  // @IsDate()
  // @IsOptional()
  // @ApiProperty()
  // uhrzeit?: Date;

  // @IsBoolean()
  // @IsOptional()
  // @ApiProperty()
  // aushang: boolean = false;

  // @IsDate()
  // @IsOptional()
  // @ApiProperty()
  // datumAushang?: Date;

  // @IsBoolean()
  // @IsOptional()
  // @ApiProperty()
  // agInformiert: boolean = false;

  // @IsBoolean()
  // @IsOptional()
  // @ApiProperty()
  // bgb: boolean = false;

  // @IsBoolean()
  // @IsOptional()
  // @ApiProperty()
  // bgbBericht: boolean = false;

  // @IsBoolean()
  // @IsOptional()
  // @ApiProperty()
  // ssa: boolean = false;

  // @IsBoolean()
  // @IsOptional()
  // @ApiProperty()
  // bericht: boolean = false;

  // @IsBoolean()
  // @IsOptional()
  // @ApiProperty()
  // umb: boolean = false;

  // @IsBoolean()
  // @IsOptional()
  // @ApiProperty()
  // ber: boolean = false;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // reNr: string;

  // @IsNumber()
  // @IsOptional()
  // @ApiProperty()
  // reBetrag: number;

  // @IsBoolean()
  // @IsOptional()
  // @ApiProperty()
  // reErhalten: boolean = false;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // reNr2?: string;

  // @IsNumber()
  // @IsOptional()
  // @ApiProperty()
  // reBetrag2?: number;

  // @IsBoolean()
  // @IsOptional()
  // @ApiProperty()
  // reNr2Erhalten?: boolean = false;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // dateien?: string;

  // @IsBoolean()
  // @IsOptional()
  // @ApiProperty()
  // mahnung: boolean = false;

  // @IsBoolean()
  // @IsOptional()
  // @ApiProperty()
  // mahnung1: boolean = false;

  // @IsBoolean()
  // @IsOptional()
  // @ApiProperty()
  // mahnungErhaten: boolean = false;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // ap: string;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // strasse: string;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // plz: string;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // ort: string;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // tel: string;

  @IsOptional()
  @ApiProperty({ type: () => CreateEmailDto })
  email: CreateEmailDto;

  // @IsNumber()
  // @IsOptional()
  // @ApiProperty()
  // objektId: number;
  // auftraggeberId: number;
  // vwStatischId: number;
  // vwDynamischId: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  userId: number;

  @IsOptional()
  @ApiProperty()
  @Type(() => CreateObjektDto)
  objekt?: CreateObjektDto;

  @IsOptional()
  @ApiProperty({ type: () => CreateAuftragsBestaetigungDto })
  auftragsbestaetigung: CreateAuftragsBestaetigungDto;

  @IsOptional()
  @ApiProperty( { type: () => CreateVwDto })
  vwStatisch: CreateVwDto;

  @IsOptional()
  @ApiProperty( { type: () => CreateVwDto })
  vwDynamisch: CreateVwDto;

  @IsOptional()
  @ApiProperty( { type: () => CreateAuftraggeberDto })
  auftraggeber: CreateAuftraggeberDto;
}
