import * as xml2js from 'xml2js';

export class SoapService {

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
    
      async reportOrderStatus(xml: string): Promise<any> {
        const jsonPayload = await this.xmlToJson(xml);
        // Verarbeiten Sie den JSON-Payload hier
        return {
          message: 'Order status reported',
        };
      }
}