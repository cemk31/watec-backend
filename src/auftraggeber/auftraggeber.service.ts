import { CreateAuftraggeberDto } from './dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Auftraggeber } from '@prisma/client';
import { UpdateAuftraggeberDto } from './dto/update-auftraggeber.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuftraggeberService {
  constructor(private prisma: PrismaService) {}

  async createAuftraggeber(userId: number, dto: CreateAuftraggeberDto) {
    const auftraggeber = await this.prisma.auftraggeber.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return auftraggeber;
  }

    async getAuftraggeber(id: number): Promise<Auftraggeber> {
      const auftraggeber = await this.prisma.auftraggeber.findUnique({
        where: { id: id },
      });
    
      if (!auftraggeber) {
        throw new NotFoundException(`Auftraggeber with ID ${id} not found`);
      }
    
      return auftraggeber;
    }
    
    async deleteAuftraggeber(id: number): Promise<void> {
      const auftraggeber = await this.prisma.auftraggeber.findUnique({
        where: { id: id },
      });
    
      if (!auftraggeber) {
        throw new NotFoundException(`Auftraggeber with ID ${id} not found`);
      }
    
      await this.prisma.auftraggeber.delete({
        where: { id: id },
      });
    }

    async updateAuftraggeber(id: number, updateAuftraggeberDto: UpdateAuftraggeberDto): Promise<Auftraggeber> {
      const auftraggeber = await this.prisma.auftraggeber.findUnique({
        where: { id: id },
      });
    
      if (!auftraggeber) {
        throw new NotFoundException(`Auftraggeber with ID ${id} not found`);
      }
    
      return this.prisma.auftraggeber.update({
        where: { id: id },
        data: updateAuftraggeberDto,
      });
    }

    async search(auftraggebername: string): Promise<Auftraggeber[]> {
      return this.prisma.auftraggeber.findMany({
        where: {
          auftraggebername: {
            contains: auftraggebername,
          },
        },
      });
    }

    async getAllAuftraggeber(): Promise<Auftraggeber[]> {
      return this.prisma.auftraggeber.findMany();
    }
    
}
