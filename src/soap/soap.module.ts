import { Module } from '@nestjs/common';
import { SoapController } from './soap.controller';
import { SoapService } from './soap.service';
// import { SoapModule } from 'nestjs-soap';
import { UserService } from 'src/user/user.service';
import { SoapHelperService } from './soap.helper.service';

@Module({
  controllers: [SoapController],
  providers: [SoapService, UserService, SoapHelperService],
  imports: [
    // SoapModule.register({
    //   clientName: 'MY_SOAP_CLIENT',
    //   uri: 'http://10.49.139.248:18080/dws_webservices/InstallationServiceImpl?wsdl',
    // }),
  ],
})
export class SoapM {}
