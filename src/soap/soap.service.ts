import { Injectable } from '@nestjs/common';
import * as xml2js from 'xml2js';
import axios from 'axios';

@Injectable()
export class SoapService {
  private soapUrl =
    'http://10.49.139.248:18080/dws_webservices/InstallationServiceImpl';

  async reportOrderReceived(
    orderNo: string,
    currentDateTime: string,
  ): Promise<string> {
    const soapEnvelope = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ins="http://www.ista.com/DrinkingWaterSystem/InstallationService" xmlns:com="http://www.ista.com/CommonTypes">
          <soapenv:Header/>
          <soapenv:Body>
            <ins:reportOrderStatusRequest>
              <com:environment>Development</com:environment>
              <com:language>DE</com:language>
              <com:consumer>soapUI</com:consumer>
              <received>
                <order>
                  <number>${orderNo}</number>
                </order>
                <orderstatusType>007</orderstatusType>
                <setOn>${currentDateTime}</setOn>
                <customerContacts>
                  <customerContact>
                    <customerContactAttemptOn>2020-09-09T16:27:05</customerContactAttemptOn>
                    <contactPersonCustomer>Max</contactPersonCustomer>
                    <agentCP>Agent a</agentCP>
                    <result>APNE</result>
                    <remark>Bemerkung von Dorothy ü ö ä ß </remark>
                  </customerContact>
                  <customerContact>
                    <customerContactAttemptOn>2020-09-07T07:27:05</customerContactAttemptOn>
                    <contactPersonCustomer>Tim</contactPersonCustomer>
                    <agentCP>Agent b</agentCP>
                    <result>KONF</result>
                    <remark>Bemerkung</remark>
                  </customerContact>
                </customerContacts>
              </received>
            </ins:reportOrderStatusRequest>
          </soapenv:Body>
        </soapenv:Envelope>
      `;

    const response = await axios.post(this.soapUrl, soapEnvelope, {
      headers: {
        'Content-Type': 'text/xml',
        SOAPAction: '',
      },
    });

    return response.data;
  }

  async xmlToJson(xml: string): Promise<any> {
    return new Promise((resolve, reject) => {
      xml2js.parseString(xml, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}
