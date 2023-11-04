import { UseGuards, Controller, Body, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guard";
import { AuftragService } from "src/auftrag/auftrag.service";
import { CreateAuftragDTO } from "./dto/create-auftrag.dto";
import { EditAuftragDTO } from "./dto/edit-auftrag.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Auftrag')
@UseGuards(JwtGuard)
@Controller('auftrag')
export class AuftragController {
    constructor(
        private readonly auftragService: AuftragService,
      ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Auftrag' })
  create(@Body() createAuftragDto: CreateAuftragDTO) {
    return this.auftragService.createAuftrag(createAuftragDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all Auftraege' })
  findAll() {
    return this.auftragService.getAllAuftraege();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single Auftrag by id' })
  findOne(@Param('id') id: string) {
    return this.auftragService.getSingleAuftrag(+id);
  }

  // @Put(':id')
  // @ApiOperation({ summary: 'Update an Auftrag' })
  // update(@Param('id') id: string, @Body() updateAuftragDto: CreateAuftragDTO) {
  //   return this.auftragService.updateAuftrag(+id, updateAuftragDto);
  // }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an Auftrag' })
  remove(@Param('id') id: string) {
    return this.auftragService.deleteAuftrag(+id);
  }
}