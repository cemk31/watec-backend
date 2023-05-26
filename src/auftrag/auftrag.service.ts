import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateAuftragDTO } from "./dto/create-auftrag.dto";
import { EditAuftragDTO } from "./dto/edit-auftrag.dto";

@Injectable()
export class AuftragService {
    constructor(private prisma: PrismaService) {}

  getAuftraege(userId: number) {
    return this.prisma.auftrag.findMany({
      where: {
        userId,
      },
    });
  }

  getAuftragById(
    userId: number,
    auftragId: number,
  ) {
    return this.prisma.auftrag.findFirst({
      where: {
        id: auftragId,
        userId,
      },
    });
  }

  async createAuftrag(
    userId: number,
    dto: CreateAuftragDTO,
  ) {
    if(!dto.terminiertZum) {
      dto.terminiertZum = new Date();
    }
    if(!dto.uhrzeit) {
      dto.uhrzeit = new Date();
    }
    if(!dto.reNr) {
      dto.reNr ="";
    }
    if(!dto.reBetrag)  {
      dto.reBetrag = 100;
    }
    if(!dto.auftraggeber) {
      dto.auftraggeber = "";
    }
    const auftrag =
      await this.prisma.auftrag.create({
        data: {
          userId,
          ...dto,
        },
      });

    return auftrag;
  }

  async editAuftragById(
    userId: number,
    auftragId: number,
    dto: EditAuftragDTO,
  ) {
    // get the auftrag by id
    const auftrag =
      await this.prisma.auftrag.findUnique({
        where: {
          id: auftragId,
        },
      });

    // check if user owns the auftrag
    if (!auftrag || auftrag.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    return this.prisma.auftrag.update({
      where: {
        id: auftragId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteAuftragById(
    userId: number,
    auftragId: number,
  ) {
    const auftrag =
      await this.prisma.auftrag.findUnique({
        where: {
          id: auftragId,
        },
      });

    // check if user owns the auftrag
    if (!auftrag || auftrag.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    await this.prisma.auftrag.delete({
      where: {
        id: auftragId,
      },
    });
  }
}