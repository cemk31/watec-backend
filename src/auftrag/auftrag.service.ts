import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateAuftragDTO } from "./dto/create-auftrag.dto";
import { Auftrag, Auftraggeber, AuftragsBestaetigung, Email, Objekt, Prisma, Vw } from "@prisma/client";
import { CreateEmailDto } from "./dto/create-email.dto";
import { CreateObjektDto } from "./dto/create-objekt.dto";
import { UpdateObjektDto } from "./dto/update-objekt.dto";
import { CreateVwDto } from "./dto/create-vw.dto";
import { UpdateVwDto } from "./dto/update-vw.dto";
import { CreateAuftragsBestaetigungDto } from "./dto/create-auftragsbestatigung.dto";
import { UpdateAuftragsBestaetigungDto } from "./dto/update-auftragsbestatigung.dto";
import { UpdateAuftragDTO } from "./dto/update-auftrag.dto";


@Injectable()
export class AuftragService {
    constructor(private prisma: PrismaService) {}

    async getAllAuftraege(): Promise<Auftrag[]> {
      return this.prisma.auftrag.findMany();
    }
  
    async getSingleAuftrag(auftragId: number): Promise<Auftrag> {
      const auftrag = await this.prisma.auftrag.findUnique({
        where: { id: auftragId },
      });
      if (!auftrag) {
        throw new NotFoundException('Auftrag nicht gefunden');
      }
      return auftrag; 
    }

    async createAuftrag(dto: CreateAuftragDTO) {

      // Verwenden Sie Prisma Service zum Erstellen eines Auftrags mit verschachtelten Daten
      await this.prisma.auftrag.create({
        data: {
          done: dto?.done,
          emailEingang: dto?.emailEingang,
          bemerkung: dto?.bemerkung,
          vorgemerkt: dto?.vorgemerkt,

          objekt: {
            create: { 
              liNr: dto.objekt?.liNr,
              adresseLi: dto.objekt?.adresseLi,
              plzLi: dto.objekt?.plzLi,
              ortLi: dto.objekt?.ortLi,
            },
          },
          auftraggeber: {
            create: {
              userId: dto.auftraggeber?.userId,
              ap: dto.auftraggeber?.ap,
              email: dto.auftraggeber?.email,
              ort: dto.auftraggeber?.ort,
              plz: dto.auftraggeber?.plz,
              strasse: dto.auftraggeber?.strasse,
              tel: dto.auftraggeber?.tel,
              auftraggebername: dto.auftraggeber?.auftraggebername,
            },
          },
          auftragsBestaetigung: {
            create: {
              auftragbestatigung: dto.auftragsbestaetigung?.auftragbestatigung,
              vwBestatigung: dto.auftragsbestaetigung?.vwBestatigung,
              terminiertZum: dto.auftragsbestaetigung?.terminiertZum,
              uhrzeit: dto.auftragsbestaetigung?.uhrzeit,
              aushang: dto.auftragsbestaetigung?.aushang,
              datumAushang: dto.auftragsbestaetigung?.datumAushang,
              agInformiert: dto.auftragsbestaetigung?.agInformiert,
              bgb: dto.auftragsbestaetigung?.bgb,
              bgbBericht: dto.auftragsbestaetigung?.bgbBericht,
              ssa: dto.auftragsbestaetigung?.ssa,
              bericht: dto.auftragsbestaetigung?.bericht,
              umb: dto.auftragsbestaetigung?.umb,
              ber: dto.auftragsbestaetigung?.ber,
              reNr: dto.auftragsbestaetigung?.reNr,
              reBetrag: dto.auftragsbestaetigung?.reBetrag,
              reNr2: dto.auftragsbestaetigung?.reNr2,
              reBetrag2: dto.auftragsbestaetigung?.reBetrag2,
              reNr2Erhalten: dto.auftragsbestaetigung?.reNr2Erhalten,
              dateien: dto.auftragsbestaetigung?.dateien,
              mahnung: dto.auftragsbestaetigung?.mahnung,
              mahnung1: dto.auftragsbestaetigung?.mahnung1,
              mahnungErhaten: dto.auftragsbestaetigung?.mahnungErhalten,
            },
          },
          email: { create: { 
            emailBetreff: dto.email?.emailBetreff,
            emailAnhang: dto.email?.emailAnhang,
            bestatigungVersendet: dto.email?.bestatigungVersendet,
            anfrageThema: dto.email?.anfrageThema,
            anfrageBestatigt: dto.email?.anfrageBestatigt,
            angebotErstellt: dto.email?.angebotErstellt,
            angebotsnummer: dto.email?.angebotsnummer,
            angebot: dto.email?.angebot,
          } },
          vwStatisch: { create: { 
            vwBuro: dto.vwStatisch?.vwBuro,
            vwMa: dto.vwStatisch?.vwMa,
            mailadresseVw: dto.vwStatisch?.mailadresseVw,
            telVw: dto.vwStatisch?.telVw,
           } },
          vwDynamisch: { create: { 
            vwBuro: dto.vwStatisch?.vwBuro,
            vwMa: dto.vwStatisch?.vwMa,
            mailadresseVw: dto.vwStatisch?.mailadresseVw,
            telVw: dto.vwStatisch?.telVw,
           } },
          user: { connect: { id: 1 } }, // Verbinden des Benutzers
          // user: { connect: { id: dto.userId } }, // Verbinden des Benutzers
        },
      });
    }
    
    
    // async updateAuftrag(auftragId: number, data: UpdateAuftragDTO): Promise<Auftrag> {
    //   return this.prisma.auftrag.update({
    //     where: { id: auftragId },
    //     data: {
    //       ...data,
    //       objektId: data?.objektId,

          
    //       // We assume the DTO object names match the Prisma object field names
    //     },
    //     include: {
    //       objekt: true,          // Include nested 'objekt' in the returned object if needed
    //       auftraggeber: true,     // Include nested 'auftraggeber' in the returned object if needed
    //       vwStatisch: true,       // Include nested 'vwStatisch' in the returned object if needed
    //       vwDynamisch: true,      // Include nested 'vwDynamisch' in the returned object if needed
    //       auftragsBestaetigung: true, // Include nested 'auftragsBestaetigung' in the returned object if needed
    //     }
    //   });
    // }
  
    async deleteAuftrag(auftragId: number): Promise<void> {
      await this.prisma.auftrag.delete({
        where: { id: auftragId },
      });
    }

  // Erstellen einer neuen E-Mail
  async createEmail(data: CreateEmailDto): Promise<Email> {
    return this.prisma.email?.create({
      data,
    });
  }

  // Abrufen einer E-Mail nach ID
  async getEmailById(id: number): Promise<Email | null> {
    return this.prisma.email?.findUnique({
      where: { id },
    });
  }

  // Abrufen aller E-Mails
  async getAllEmails(): Promise<Email[]> {
    return this.prisma.email?.findMany();
  }
  
   // Erstellen eines neuen Objekts
   async createObjekt(data: CreateObjektDto): Promise<Objekt> {
    return this.prisma.objekt.create({
      data,
    });
  }

  // Abrufen eines Objekts nach ID
  async getObjektById(id: number): Promise<Objekt | null> {
    return this.prisma.objekt.findUnique({
      where: { id },
    });
  }

  // Abrufen aller Objekte
  async getAllObjekte(): Promise<Objekt[]> {
    return this.prisma.objekt.findMany();
  }

  // Aktualisieren eines Objekts
  async updateObjekt(id: number, data: UpdateObjektDto): Promise<Objekt> {
    return this.prisma.objekt.update({
      where: { id },
      data,
    });
  }

  // Löschen eines Objekts
  async deleteObjekt(id: number): Promise<Objekt> {
    return this.prisma.objekt.delete({
      where: { id },
    });
  }

  // Erstellen eines neuen Vw-Datensatzes
  async createVw(data: CreateVwDto): Promise<Vw> {
    return this.prisma.vw.create({
      data,
    });
  }

  // Abrufen eines Vw-Datensatzes nach ID
  async getVwById(id: number): Promise<Vw | null> {
    return this.prisma.vw.findUnique({
      where: { id },
      include: {
        auftraegeStatisch: true,   // Optional: Je nach Anforderung einschließen
        auftraegeDynamisch: true,  // Optional: Je nach Anforderung einschließen
      }
    });
  }

  // Abrufen aller Vw-Datensätze
  async getAllVws(): Promise<Vw[]> {
    return this.prisma.vw.findMany({
      include: {
        auftraegeStatisch: true,   // Optional: Je nach Anforderung einschließen
        auftraegeDynamisch: true,  // Optional: Je nach Anforderung einschließen
      }
    });
  }

  // Aktualisieren eines Vw-Datensatzes
  async updateVw(id: number, data: UpdateVwDto): Promise<Vw> {
    return this.prisma.vw.update({
      where: { id },
      data,
    });
  }

  // Löschen eines Vw-Datensatzes
  async deleteVw(id: number): Promise<Vw> {
    return this.prisma.vw.delete({
      where: { id },
    });
  }

  // Erstellen einer neuen Auftragsbestätigung
  async createAuftragsBestaetigung(data: CreateAuftragsBestaetigungDto): Promise<AuftragsBestaetigung> {
    return this.prisma.auftragsBestaetigung.create({
      data,
    });
  }

  // Abrufen einer Auftragsbestätigung nach ID
  async getAuftragsBestaetigungById(id: number): Promise<AuftragsBestaetigung | null> {
    return this.prisma.auftragsBestaetigung.findUnique({
      where: { id },
    });
  }

  // Abrufen aller Auftragsbestätigungen
  async getAllAuftragsBestaetigungen(): Promise<AuftragsBestaetigung[]> {
    return this.prisma.auftragsBestaetigung.findMany();
  }

  // Aktualisieren einer Auftragsbestätigung
  async updateAuftragsBestaetigung(id: number, data: UpdateAuftragsBestaetigungDto): Promise<AuftragsBestaetigung> {
    return this.prisma.auftragsBestaetigung.update({
      where: { id },
      data,
    });
  }

  // Löschen einer Auftragsbestätigung
  async deleteAuftragsBestaetigung(id: number): Promise<AuftragsBestaetigung> {
    return this.prisma.auftragsBestaetigung.delete({
      where: { id },
    });
  }

  // async createAuftraggeber(dto: CreateAuftraggeberDto): Promise<Auftraggeber> {
  //   return this.prisma.auftraggeber?.create({
  //     data: dto,

  //   });
  // }

  async getAuftraggeberById(id: number): Promise<Auftraggeber | null> {
    return this.prisma.auftraggeber?.findUnique({
      where: { id },
      include: {
        auftraege: true, // Related auftraege are included in the result
      },
    });
  }

  async getAllAuftraggeber(): Promise<Auftraggeber[]> {
    return this.prisma.auftraggeber?.findMany({
      include: {
        auftraege: true, // Related auftraege are included in the result
      },
    });
  }

  // async updateAuftraggeber(id: number, dto: UpdateAuftraggeberDto): Promise<Auftraggeber> {
  //   return this.prisma.auftraggeber?.update({
  //     where: { id },
  //     data: dto,
  //   });
  // }

  async deleteAuftraggeber(id: number): Promise<Auftraggeber> {
    return this.prisma.auftraggeber?.delete({
      where: { id },
    });
  }
}