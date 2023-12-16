import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { CreateAuftraggeberDto } from './dto/create-auftraggeber.dto';
import { AuftraggeberService } from './auftraggeber.service';
import { GetUser } from 'src/auth/decorator';
import { UpdateAuftraggeberDto } from './dto/update-auftraggeber.dto';

@ApiTags('auftraggeber')
@UseGuards(JwtGuard)
@Controller('auftraggeber')
export class AuftraggeberController {

  constructor(
    private auftraggeberService: AuftraggeberService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create auftraggeber' })
  @ApiResponse({ status: 201, description: 'The auftraggeber has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  @ApiBody({ type: CreateAuftraggeberDto })
  create(@GetUser('id') userId: number,
        @Body() dto: CreateAuftraggeberDto) {
    this.auftraggeberService.createAuftraggeber(userId, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get auftraggeber' })
  @ApiResponse({ status: 200, description: 'The auftraggeber has been successfully retrieved.'})
  @ApiResponse({ status: 404, description: 'Not found.'})
  getAuftraggeber(@Param('id') id: number) {
    return this.auftraggeberService.getAuftraggeber(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete auftraggeber' })
  @ApiResponse({ status: 200, description: 'The auftraggeber has been successfully deleted.'})
  @ApiResponse({ status: 404, description: 'Not found.'})
  deleteAuftraggeber(@Param('id') id: number) {
    return this.auftraggeberService.deleteAuftraggeber(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update auftraggeber' })
  @ApiResponse({ status: 200, description: 'The auftraggeber has been successfully updated.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  @ApiResponse({ status: 404, description: 'Not found.'})
  @ApiBody({ type: UpdateAuftraggeberDto })
  updateAuftraggeber(@Param('id') id: number,
                    @Body() dto: UpdateAuftraggeberDto) {
    return this.auftraggeberService.updateAuftraggeber(id, dto);
  }

  @Get('/search')
  @ApiOperation({ summary: 'Search auftraggebers' })
  @ApiResponse({ status: 200, description: 'The search has been successfully executed.' })
  search(@Query('auftraggeber') auftraggeber: string) {
    return this.auftraggeberService.search(auftraggeber);
  }

  @Get()
  @ApiOperation({ summary: 'Get all auftraggebers' })
  @ApiResponse({ status: 200, description: 'The auftraggebers have been successfully retrieved.'})
  getAllAuftraggeber() {
    return this.auftraggeberService.getAllAuftraggeber();
  }
}
