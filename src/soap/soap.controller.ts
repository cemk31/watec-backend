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
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

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

  @Post('/polling')
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
    const soapBody = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ins="http://www.ista.com/DrinkingWaterSystem/InstallationService" xmlns:com="http://www.ista.com/CommonTypes">
      <soapenv:Header/>
      <soapenv:Body>
        <ins:pollInstallationOrdersRequest>
          <com:environment>Development</com:environment>
          <com:language>EN</com:language>
          <com:consumer>soapUI</com:consumer>
        </ins:pollInstallationOrdersRequest>
      </soapenv:Body>
    </soapenv:Envelope>
    `;

    const config = {
      headers: {
        'Content-Type': 'text/xml',
      },
      auth: {
        username: process.env.SOAP_USERNAME,
        password: process.env.SOAP_PASSWORD,
      },
    };

    try {
      const response = await axios.post(
        'https://services-test.ista.com/DrinkingWaterSystem/InstallationService',
        soapBody,
        config,
      );
      this.soapService.polling(response.data);
      console.log(response.data); // Verarbeite die SOAP-Antwort
    } catch (error) {
      console.error('Fehler beim Senden des SOAP-Requests:', error);
    }
  }

  @Get('/pollingMockupData')
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
  @ApiOperation({ summary: 'Mocked SOAP Response' })
  @ApiResponse({ status: 200, description: 'Successful operation' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async pollingWithMockData(@Res() res: Response) {
    const mockSoapResponse = `
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <ns3:pollInstallationOrdersResponse xmlns:ns2="http://www.ista.com/CommonTypes" xmlns:ns3="http://www.ista.com/DrinkingWaterSystem/InstallationService">
          <ns2:environment>ap-isa-194-0.oediv.lan</ns2:environment>
          <ns2:language>EN</ns2:language>
          <ns2:provider>DrinkingWaterSystem</ns2:provider>
         <orders>
            <order>
               <number>40138201</number>
               <customer>
                  <number>7059185</number>
                  <salutation>7</salutation>
                  <name1>Lochnerstraße 4</name1>
                  <name2>vertr. d. Verwalter Udo Neuhaus</name2>
                  <street>Rosenstraße</street>
                  <streetnumber>49</streetnumber>
                  <postcode>40882</postcode>
                  <city>Ratingen</city>
                  <country>DE</country>
                  <telephone>02102-844503</telephone>
                  <contactPerson>
                     <salutation>3</salutation>
                     <name>Mann</name>
                     <forename>Muster</forename>
                     <telephone>3333 4444</telephone>
                     <telephoneMobile>1111 2222</telephoneMobile>
                     <role>14</role>
                  </contactPerson>
               </customer>
               <serviceType>3</serviceType>
               <executionFlag>false</executionFlag>
               <releasedOn>2024-08-28</releasedOn>
               <drinkingWaterFacility>
                  <consecutiveNumber>44143</consecutiveNumber>
                  <usageType>GEW</usageType>
                  <usageTypeOthers>2 Gewerbe</usageTypeOthers>
                  <numberSuppliedUnits>10</numberSuppliedUnits>
                  <numberDrinkingWaterHeater>1</numberDrinkingWaterHeater>
                  <totalVolumeLitres>500</totalVolumeLitres>
                  <pipingSystemType_Circulation>true</pipingSystemType_Circulation>
                  <pipingSystemType_Waterbranchline>false</pipingSystemType_Waterbranchline>
                  <pipingSystemType_Pipetraceheater>false</pipingSystemType_Pipetraceheater>
                  <pipingVolumeGr3Litres>true</pipingVolumeGr3Litres>
                  <deadPipeKnown>false</deadPipeKnown>
                  <numberAscendingPipes>2</numberAscendingPipes>
                  <aerosolformation>true</aerosolformation>
                  <explanation>PNV beim Zirkulation unterhalb von Zirkulationpumpe eingebaut</explanation>
                  <numberSuppliedPersons>20</numberSuppliedPersons>
                  <pipeworkSchematicsAvailable>false</pipeworkSchematicsAvailable>
                  <numberColdWaterLegs>2</numberColdWaterLegs>
                  <numberHotWaterLegs>2</numberHotWaterLegs>
                  <temperatureCirculationDWH_A>0</temperatureCirculationDWH_A>
                  <temperatureCirculationDWH_B>0</temperatureCirculationDWH_B>
                  <heatExchangerSystem_central>false</heatExchangerSystem_central>
                  <heatExchangerSystem_districtheating>false</heatExchangerSystem_districtheating>
                  <heatExchangerSystem_continuousflowprinciple>false</heatExchangerSystem_continuousflowprinciple>
                  <drinkingWaterHeaters>
                     <drinkingWaterHeater>
                        <consecutiveNumber>1</consecutiveNumber>
                        <inletTemperatureDisplayPresent>false</inletTemperatureDisplayPresent>
                        <inletTemperature>1</inletTemperature>
                        <outletTemperatureDisplayPresent>false</outletTemperatureDisplayPresent>
                        <outletTemperature>1</outletTemperature>
                        <pipeDiameterOutlet>DN25</pipeDiameterOutlet>
                        <pipeMaterialtypeOutlet>ES</pipeMaterialtypeOutlet>
                        <volumeLitre>500</volumeLitre>
                        <roomType>HR</roomType>
                        <roomPosition>0</roomPosition>
                        <unit>
                           <floor>1</floor>
                           <storey>UG</storey>
                           <position>1</position>
                           <generalUnit>true</generalUnit>
                           <building>
                              <address>
                                 <street>Salzburger Str.</street>
                                 <streetnumber>6</streetnumber>
                                 <postcode>83404</postcode>
                                 <city>Ainring</city>
                                 <country>DE</country>
                              </address>
                           </building>
                        </unit>
                     </drinkingWaterHeater>
                  </drinkingWaterHeaters>
                  <ascendingPipes/>
                  <samplingPoints>
                     <samplingPoint>
                        <consecutiveNumber>1</consecutiveNumber>
                        <id_healthAuthorities>222</id_healthAuthorities>
                        <pipingSystemType>AUS</pipingSystemType>
                        <remoteSamplingPoint>false</remoteSamplingPoint>
                        <roomType>ZU</roomType>
                        <roomPosition>0</roomPosition>
                        <unit>
                           <floor>1</floor>
                           <storey>UG</storey>
                           <position>1</position>
                           <generalUnit>true</generalUnit>
                           <building>
                              <address>
                                 <street>Salzburger Str.</street>
                                 <streetnumber>6</streetnumber>
                                 <postcode>83404</postcode>
                                 <city>Ainring</city>
                                 <country>DE</country>
                              </address>
                           </building>
                        </unit>
                     </samplingPoint>
                     <samplingPoint>
                        <consecutiveNumber>2</consecutiveNumber>
                        <id_healthAuthorities>222</id_healthAuthorities>
                        <pipingSystemType>ZIR</pipingSystemType>
                        <remoteSamplingPoint>false</remoteSamplingPoint>
                        <roomType>ZU</roomType>
                        <roomPosition>0</roomPosition>
                        <unit>
                           <floor>1</floor>
                           <storey>UG</storey>
                           <position>1</position>
                           <generalUnit>true</generalUnit>
                           <building>
                              <address>
                                 <street>Salzburger Str.</street>
                                 <streetnumber>6</streetnumber>
                                 <postcode>83404</postcode>
                                 <city>Ainring</city>
                                 <country>DE</country>
                              </address>
                           </building>
                        </unit>
                     </samplingPoint>
                     <samplingPoint>
                        <consecutiveNumber>3</consecutiveNumber>
                        <id_healthAuthorities>222</id_healthAuthorities>
                        <pipingSystemType>KW</pipingSystemType>
                        <remoteSamplingPoint>true</remoteSamplingPoint>
                        <roomType>ZU</roomType>
                        <roomPosition>0</roomPosition>
                        <unit>
                           <floor>3</floor>
                           <storey>OG</storey>
                           <position>1</position>
                           <userName>Tonon Paola</userName>
                           <generalUnit>false</generalUnit>
                           <building>
                              <address>
                                 <street>Salzburger Str.</street>
                                 <streetnumber>6</streetnumber>
                                 <postcode>83404</postcode>
                                 <city>Ainring</city>
                                 <country>DE</country>
                              </address>
                           </building>
                        </unit>
                     </samplingPoint>
                     <samplingPoint>
                        <consecutiveNumber>4</consecutiveNumber>
                        <id_healthAuthorities>222</id_healthAuthorities>
                        <pipingSystemType>STS</pipingSystemType>
                        <remoteSamplingPoint>true</remoteSamplingPoint>
                        <roomType>ZU</roomType>
                        <roomPosition>0</roomPosition>
                        <unit>
                           <floor>3</floor>
                           <storey>OG</storey>
                           <position>2</position>
                           <userName>Schikh</userName>
                           <generalUnit>false</generalUnit>
                           <building>
                              <address>
                                 <street>Salzburger Str.</street>
                                 <streetnumber>6</streetnumber>
                                 <postcode>83404</postcode>
                                 <city>Ainring</city>
                                 <country>DE</country>
                              </address>
                           </building>
                        </unit>
                     </samplingPoint>
                  </samplingPoints>
               </drinkingWaterFacility>
               <property>
                  <number>6140301009</number>
                  <id_HealthAuthorities>222</id_HealthAuthorities>
                  <contactPerson>
                     <salutation>1</salutation>
                     <name>Muster</name>
                     <forename>Heiko</forename>
                     <telephone>3333 44443</telephone>
                     <telephoneMobile>1111 22223</telephoneMobile>
                     <mail>tes2t@ista.de</mail>
                     <role>14</role>
                  </contactPerson>
                  <address>
                     <street>Lochnerstraße</street>
                     <streetnumber>4</streetnumber>
                     <postcode>40878</postcode>
                     <city>Ratingen</city>
                     <country>DE</country>
                  </address>
                  <userAddresses>
                     <userAddress>
                        <salutation>Herr/Frau/Firma</salutation>
                        <name>Allgemein</name>
                        <street>Lochnerstraße</street>
                        <postcode>40878</postcode>
                        <city>Ratingen</city>
                     </userAddress>
                     <userAddress>
                        <salutation>Herr/Frau/Firma</salutation>
                        <name>Anett Knöfel</name>
                        <street>Lochnerstraße</street>
                        <streetnumber>4</streetnumber>
                        <postcode>40878</postcode>
                        <city>Ratingen</city>
                     </userAddress>
                     <userAddress>
                        <salutation>Herr/Frau/Firma</salutation>
                        <name>Calcagnile, Vito</name>
                        <street>Lochnerstraße</street>
                        <streetnumber>4</streetnumber>
                        <postcode>40878</postcode>
                        <city>Ratingen</city>
                     </userAddress>
                     <userAddress>
                        <salutation>Herr/Frau/Firma</salutation>
                        <name>Gehlen,Iris</name>
                        <street>Lochnerstraße</street>
                        <streetnumber>4</streetnumber>
                        <postcode>40878</postcode>
                        <city>Ratingen</city>
                     </userAddress>
                     <userAddress>
                        <salutation>Herr/Frau/Firma</salutation>
                        <name>Kater/Leethaus</name>
                        <street>Lochnerstraße</street>
                        <streetnumber>4</streetnumber>
                        <postcode>40878</postcode>
                        <city>Ratingen</city>
                     </userAddress>
                     <userAddress>
                        <salutation>Herr/Frau/Firma</salutation>
                        <name>Kim</name>
                        <street>Lochnerstraße</street>
                        <streetnumber>4</streetnumber>
                        <postcode>40878</postcode>
                        <city>Ratingen</city>
                     </userAddress>
                     <userAddress>
                        <salutation>Herr/Frau/Firma</salutation>
                        <name>Lamczyk</name>
                        <street>Lochnerstraße</street>
                        <streetnumber>4</streetnumber>
                        <postcode>40878</postcode>
                        <city>Ratingen</city>
                     </userAddress>
                     <userAddress>
                        <salutation>Herr/Frau/Firma</salutation>
                        <name>Thiemann, Anna</name>
                        <street>Lochnerstraße</street>
                        <streetnumber>4</streetnumber>
                        <postcode>40878</postcode>
                        <city>Ratingen</city>
                     </userAddress>
                  </userAddresses>
                  <building>
                     <building>
                        <address>
                           <street>Trinkwasserstr.</street>
                           <streetnumber>17</streetnumber>
                           <postcode>40882</postcode>
                           <city>Ratingen</city>
                           <country>DE</country>
                        </address>
                     </building>
                     <building>
                        <address>
                           <street>Milanstraße</street>
                           <streetnumber>31</streetnumber>
                           <postcode>56626</postcode>
                           <city>Andernach</city>
                           <country>DE</country>
                        </address>
                     </building>
                     <building>
                        <address>
                           <street>Milanstraße</street>
                           <streetnumber>30</streetnumber>
                           <postcode>56626</postcode>
                           <city>Andernach</city>
                           <country>DE</country>
                        </address>
                     </building>
                     <building>
                        <address>
                           <street>Musterstraße</street>
                           <streetnumber>30</streetnumber>
                           <postcode>56626</postcode>
                           <city>Andernach</city>
                           <country>DE</country>
                        </address>
                     </building>
                     <building>
                        <address>
                           <street>Musterstraße</street>
                           <streetnumber>30</streetnumber>
                           <postcode>56627</postcode>
                           <city>Andernach</city>
                           <country>DE</country>
                        </address>
                     </building>
                     <building>
                        <address>
                           <street>Trinkwasserstr.</street>
                           <streetnumber>17</streetnumber>
                           <postcode>40878</postcode>
                           <city>Ratingen</city>
                           <country>DE</country>
                        </address>
                     </building>
                     <building>
                        <address>
                           <street>Trinkwasserstraße</street>
                           <streetnumber>11</streetnumber>
                           <postcode>45131</postcode>
                           <city>Trinkwasserhausen ü ö ä ß</city>
                           <country>DE</country>
                        </address>
                     </building>
                     <building>
                        <address>
                           <street>Milanstraße</street>
                           <streetnumber>30</streetnumber>
                           <postcode>40882</postcode>
                           <city>Ratingen</city>
                           <country>DE</country>
                        </address>
                     </building>
                     <building>
                        <address>
                           <street>Calle de los Legionelles</street>
                           <streetnumber>123</streetnumber>
                           <postcode>45130</postcode>
                           <city>Essen</city>
                           <country>DE</country>
                        </address>
                     </building>
                     <building>
                        <address>
                           <street>Trinkwasserstr.</street>
                           <streetnumber>11</streetnumber>
                           <postcode>45131</postcode>
                           <city>Trinkwasserhausen</city>
                           <country>DE</country>
                        </address>
                     </building>
                     <building>
                        <address>
                           <street>Salzburger Str.</street>
                           <streetnumber>6</streetnumber>
                           <postcode>83404</postcode>
                           <city>Ainring</city>
                           <country>DE</country>
                        </address>
                     </building>
                  </building>
               </property>
            </order>
            <order>
               <number>40138212</number>
               <customer>
                  <number>7274219</number>
                  <salutation>1</salutation>
                  <name1>Holger Michel</name1>
                  <street>Gartenstr.</street>
                  <streetnumber>2</streetnumber>
                  <postcode>35080</postcode>
                  <city>Bad Endbach</city>
                  <country>DE</country>
                  <telephone>0171-9100787</telephone>
                  <telephoneMobile>0176 34513265</telephoneMobile>
                  <contactPerson>
                     <salutation>3</salutation>
                     <name>sgweg</name>
                     <forename>4ewefwe</forename>
                     <telephone>23535555</telephone>
                     <telephoneMobile>2352335</telephoneMobile>
                     <telefax>2353253</telefax>
                     <mail>edyta.serafinska@ista.com</mail>
                     <role>1</role>
                  </contactPerson>
               </customer>
               <serviceType>3</serviceType>
               <executionFlag>false</executionFlag>
               <releasedOn>2024-08-28</releasedOn>
               <property>
                  <number>7035530651</number>
                  <id_HealthAuthorities>8003</id_HealthAuthorities>
                  <numberUnits>4</numberUnits>
                  <contactPerson>
                     <salutation>1</salutation>
                     <name>Michel</name>
                     <forename>Holger</forename>
                     <telephone>02776 323</telephone>
                     <role>11</role>
                  </contactPerson>
                  <address>
                     <street>Gartenstr.</street>
                     <streetnumber>2</streetnumber>
                     <postcode>35080</postcode>
                     <city>Bad Endbach</city>
                     <country>DE</country>
                  </address>
                  <userAddresses/>
                  <building>
                     <building>
                        <address>
                           <street>Gartenstr</street>
                           <streetnumber>2</streetnumber>
                           <postcode>35080</postcode>
                           <city>Bad Endbach</city>
                           <country>DE</country>
                        </address>
                     </building>
                     <building>
                        <address>
                           <street>TrinkwasserstrALT</street>
                           <streetnumber>14a</streetnumber>
                           <postcode>35080</postcode>
                           <city>Bad Endbach</city>
                           <country>DE</country>
                        </address>
                     </building>
                  </building>
               </property>
            </order>
            <order>
               <number>40138359</number>
               <customer>
                  <number>7059185</number>
                  <salutation>7</salutation>
                  <name1>Lochnerstraße 4</name1>
                  <name2>vertr. d. Verwalter Udo Neuhaus</name2>
                  <street>Rosenstraße</street>
                  <streetnumber>49</streetnumber>
                  <postcode>40882</postcode>
                  <city>Ratingen</city>
                  <country>DE</country>
                  <telephone>02102-844503</telephone>
                  <contactPerson>
                     <salutation>3</salutation>
                     <name>Mann</name>
                     <forename>Muster</forename>
                     <telephone>3333 4444</telephone>
                     <telephoneMobile>1111 2222</telephoneMobile>
                     <role>14</role>
                  </contactPerson>
               </customer>
               <serviceType>3</serviceType>
               <executionFlag>false</executionFlag>
               <releasedOn>2024-08-28</releasedOn>
               <property>
                  <number>6140301009</number>
                  <id_HealthAuthorities>222</id_HealthAuthorities>
                  <contactPerson>
                     <salutation>1</salutation>
                     <name>Muster</name>
                     <forename>Heiko</forename>
                     <telephone>3333 44443</telephone>
                     <telephoneMobile>1111 22223</telephoneMobile>
                     <mail>tes2t@ista.de</mail>
                     <role>14</role>
                  </contactPerson>
                  <address>
                     <street>Lochnerstraße</street>
                     <streetnumber>4</streetnumber>
                     <postcode>40878</postcode>
                     <city>Ratingen</city>
                     <country>DE</country>
                  </address>
                  <userAddresses/>
                  <building>
                     <building>
                        <address>
                           <street>Trinkwasserstr.</street>
                           <streetnumber>17</streetnumber>
                           <postcode>40882</postcode>
                           <city>Ratingen</city>
                           <country>DE</country>
                        </address>
                     </building>
                     <building>
                        <address>
                           <street>Milanstraße</street>
                           <streetnumber>31</streetnumber>
                           <postcode>56626</postcode>
                           <city>Andernach</city>
                           <country>DE</country>
                        </address>
                     </building>
                     <building>
                        <address>
                           <street>Milanstraße</street>
                           <streetnumber>30</streetnumber>
                           <postcode>56626</postcode>
                           <city>Andernach</city>
                           <country>DE</country>
                        </address>
                     </building>
                     <building>
                        <address>
                           <street>Musterstraße</street>
                           <streetnumber>30</streetnumber>
                           <postcode>56626</postcode>
                           <city>Andernach</city>
                           <country>DE</country>
                        </address>
                     </building>
                     <building>
                        <address>
                           <street>Musterstraße</street>
                           <streetnumber>30</streetnumber>
                           <postcode>56627</postcode>
                           <city>Andernach</city>
                           <country>DE</country>
                        </address>
                     </building>
                     <building>
                        <address>
                           <street>Trinkwasserstr.</street>
                           <streetnumber>17</streetnumber>
                           <postcode>40878</postcode>
                           <city>Ratingen</city>
                           <country>DE</country>
                        </address>
                     </building>
                     <building>
                        <address>
                           <street>Trinkwasserstraße</street>
                           <streetnumber>11</streetnumber>
                           <postcode>45131</postcode>
                           <city>Trinkwasserhausen ü ö ä ß</city>
                           <country>DE</country>
                        </address>
                     </building>
                     <building>
                        <address>
                           <street>Milanstraße</street>
                           <streetnumber>30</streetnumber>
                           <postcode>40882</postcode>
                           <city>Ratingen</city>
                           <country>DE</country>
                        </address>
                     </building>
                     <building>
                        <address>
                           <street>Calle de los Legionelles</street>
                           <streetnumber>123</streetnumber>
                           <postcode>45130</postcode>
                           <city>Essen</city>
                           <country>DE</country>
                        </address>
                     </building>
                     <building>
                        <address>
                           <street>Trinkwasserstr.</street>
                           <streetnumber>11</streetnumber>
                           <postcode>45131</postcode>
                           <city>Trinkwasserhausen</city>
                           <country>DE</country>
                        </address>
                     </building>
                     <building>
                        <address>
                           <street>Salzburger Str.</street>
                           <streetnumber>6</streetnumber>
                           <postcode>83404</postcode>
                           <city>Ainring</city>
                           <country>DE</country>
                        </address>
                     </building>
                  </building>
               </property>
            </order>
         </orders>
        </ns3:pollInstallationOrdersResponse>
      </soap:Body>
    </soap:Envelope>`;

    // Übergabe an den Service, um den Response zu verarbeiten
    await this.soapService.polling(mockSoapResponse);

    // return res
    //   .status(200)
    //   .send({ message: 'Mock SOAP response processed successfully' });
  }

  // @Post('/planned')
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
  // async planned(
  //   @Param('id', ParseIntPipe) statusId: number,
  //   @GetUser() user: User,
  // ) {
  //   const planned = await this.soapService.reportOrderPlanned(statusId, user);
  //   return planned;
  // }
}
