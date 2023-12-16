import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { SoapService } from "./soap.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "src/auth/guard";

@UseGuards(JwtGuard)
@ApiTags('SOAP')
@Controller('soap')
export class SoapController {

    constructor(private readonly soapService: SoapService) {}

    @Post('reportOrderStatus')
    @ApiOperation({ summary: 'Report Order Status' })
    @ApiResponse({ status: 200, description: 'Successful operation' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    reportOrderStatus(@Body() body: any): Promise<any> {
      return this.soapService.reportOrderStatus(body);
    }
}