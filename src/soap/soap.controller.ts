import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SoapService } from './soap.service';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import * as xml2js from 'xml2js';
import { Received, SoapEnvelopeDto } from 'src/ista/dto/soapReceveidDTO';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@ApiTags('SOAP API')
@Controller('soap')
export class SoapController {
  constructor(private readonly soapService: SoapService) {}

  // @Post('/received')
  // @ApiConsumes(
  //   'application/json',
  //   'application/xml',
  //   'text/xml',
  //   'application/soap+xml',
  // )
  // @ApiProduces(
  //   'application/json',
  //   'application/xml',
  //   'text/xml',
  //   'application/soap+xml',
  // )
  // @ApiOperation({ summary: 'Report Order Status' })
  // @ApiResponse({ status: 200, description: 'Successful operation' })
  // @ApiResponse({ status: 400, description: 'Bad request' })
  // @ApiBody({ type: Received })
  // async handleRequest(@Body() body: Received, @Req() req, @Res() res) {
  //   console.log('Received request:', body);
  //   if (req.headers['content-type'] === 'application/xml') {
  //     const parser = new xml2js.Parser();
  //     const result = await parser.parseStringPromise(req.body);
  //     result.console.log('Parsed XML:', result);
  //     this.soapService.createOrderReceived(body);
  //     res.set('Content-Type', 'application/xml');
  //     res.send(`
  //       <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
  //         <soapenv:Body>
  //           <Response>Success</Response>
  //         </soapenv:Body>
  //       </soapenv:Envelope>
  //     `);
  //   } else {
  //     this.soapService.createOrderReceived(body);
  //     // Handle JSON request
  //     res.json({ message: 'Success', data: body });
  //   }
  // }

  @Post('/planned')
  @ApiConsumes(
    'application/json',
    'application/xml',
    'text/xml',
    'application/soap+xml',
  )
  @ApiProduces(
    'application/json',
    'application/xml',
    'text/xml',
    'application/soap+xml',
  )
  @ApiOperation({ summary: 'Report Order Status' })
  @ApiResponse({ status: 200, description: 'Successful operation' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async polling(@Body() body: SoapEnvelopeDto, @GetUser() user: User) {
    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ins="http://www.ista.com/DrinkingWaterSystem/InstallationService" xmlns:com="http://www.ista.com/CommonTypes">
            <soapenv:Header/>
            <soapenv:Body>
                <ins:pollInstallationOrdersRequest>
                  <com:environment>Development</com:environment>
                  <com:language>EN</com:language>
                  <com:consumer>soapUI</com:consumer>
                </ins:pollInstallationOrdersRequest>
            </soapenv:Body>
          </soapenv:Envelope>`;
  }

  @Post('/planned')
  @ApiConsumes(
    'application/json',
    'application/xml',
    'text/xml',
    'application/soap+xml',
  )
  @ApiProduces(
    'application/json',
    'application/xml',
    'text/xml',
    'application/soap+xml',
  )
  @ApiOperation({ summary: 'Report Order Status' })
  @ApiResponse({ status: 200, description: 'Successful operation' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async planned(
    @Param('id', ParseIntPipe) statusId: number,
    @GetUser() user: User,
  ) {
    const planned = await this.soapService.reportOrderPlanned(statusId, user);
    return planned;
  }
}
