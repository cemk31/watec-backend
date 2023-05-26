import { UseGuards, Controller, Body, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guard";
import { AuftragService } from "src/auftrag/auftrag.service";
import { CreateAuftragDTO } from "./dto/create-auftrag.dto";
import { EditAuftragDTO } from "./dto/edit-auftrag.dto";

@UseGuards(JwtGuard)
@Controller('auftrag')
export class AuftragController {
    constructor(
        private auftragService: AuftragService,
      ) {}
    
      @Get()
      getAuftrage(@GetUser('id') userId: number) {
        return this.auftragService.getAuftraege(
          userId,
        );
      }
    
      @Get(':id')
      getAuftragById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) auftragId: number,
      ) {
        return this.auftragService.getAuftragById(
          userId,
          auftragId,
        );
      }
    
      @Post()
      createAuftrag(
        @GetUser('id') userId: number,
        @Body() dto: CreateAuftragDTO,
      ) {
        return this.auftragService.createAuftrag(
          userId,
          dto,
        );
      }
    
      @Patch(':id')
      editAuftragById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) auftragId: number,
        @Body() dto: EditAuftragDTO,
      ) {
        return this.auftragService.editAuftragById(
          userId,
          auftragId,
          dto,
        );
      }
    
      @HttpCode(HttpStatus.NO_CONTENT)
      @Delete(':id')
      deleteAuftragById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) auftragId: number,
      ) {
        return this.auftragService.deleteAuftragById(
          userId,
          auftragId,
        );
      }
}