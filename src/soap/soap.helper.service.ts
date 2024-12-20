import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CANCELLED } from 'dns';
import { Client } from 'soap';
import { GetUser } from 'src/auth/decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import axios from 'axios';
import { stat } from 'fs';

@Injectable()
export class SoapHelperService {
  constructor(
    @Inject('MY_SOAP_CLIENT') private readonly client: Client,
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  // Hauptmethode zur Verarbeitung eines Status
  async processStatus(statusType: string, statusId: number, user: User) {
    const statusData = await this.getStatus(statusType, statusId);
    if (!statusData) {
      throw new Error(
        `No data found for statusType: ${statusType} and statusId: ${statusId}`,
      );
    }

    // Dynamische Payload-Erstellung
    const payload = this.createPayload(statusType, statusData);
    const cleanPayload = payload.replace(/\n/g, '').trim();

    // SOAP-Request senden
    return await this.sendSoapRequest(cleanPayload, statusType, user);

    // Antwort überprüfen und speichern
    // return await this.handleResponse(statusType, response, user);
  }

  private async getStatus(statusType: string, statusId: number) {
    // Mapping von Status-Typen zu Prisma-Modellen
    const statusModelMap: Record<string, any> = {
      RECEIVED: this.prisma.received,
      PLANNED: this.prisma.planned,
      DONE: this.prisma.done,
      CANCELLED: this.prisma.cancelled,
      NOTPOSSIBLE: this.prisma.notPossible,
      POSTPONED: this.prisma.postponed,
      REJECTED: this.prisma.rejected,
      EXECUTIONONSITENOTPOSSIBLE: this.prisma.executionOnSiteNotPossible,
    };

    // Prüfe, ob der statusType gültig ist
    const model = statusModelMap[statusType];
    if (!model) {
      throw new Error(`Invalid status type: ${statusType}`);
    }

    // Führe die Anfrage aus
    return model.findUnique({
      where: { id: statusId },
    });
  }

  // Dynamische Erstellung der SOAP-Payload
  private createPayload(statusType: string, statusData: any): string {
    // Standardisiertes Datumsformat
    const formatDate = (date: string | Date): string => {
      if (!date) return '';
      return new Date(date).toISOString(); // ISO-Format: YYYY-MM-DDTHH:mm:ss.sssZ
    };

    // Templates für die Payload
    const templates: Record<string, (data: any) => string> = {
      RECEIVED: (data) => `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ins="http://www.ista.com/DrinkingWaterSystem/InstallationService" xmlns:com="http://www.ista.com/CommonTypes">
           <soapenv:Header/>
           <soapenv:Body>
              <ins:reportOrderStatusRequest>
                 <com:environment>Development</com:environment>
                 <com:language>DE</com:language>
                 <com:consumer>soapUI</com:consumer>
                 <received>
                    <order>
                       <number>${data.number || 'UNDEFINED'}</number>
                    </order>
                    <orderstatusType>007</orderstatusType>
                    <setOn>${formatDate(data.setOn)}</setOn>
                 </received>
              </ins:reportOrderStatusRequest>
           </soapenv:Body>
        </soapenv:Envelope>
      `,
      PLANNED: (data) => `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ins="http://www.ista.com/DrinkingWaterSystem/InstallationService" xmlns:com="http://www.ista.com/CommonTypes">
           <soapenv:Header/>
           <soapenv:Body>
              <ins:reportOrderStatusRequest>
                 <com:environment>Development</com:environment>
                 <com:language>DE</com:language>
                 <com:consumer>soapUI</com:consumer>
                 <planned>
                    <order>
                       <number>${data.number || 'UNDEFINED'}</number>
                       <remarkExternal>${
                         data.remarkExternal || ''
                       }</remarkExternal>
                    </order>
                    <orderstatusType>020</orderstatusType>
                    <setOn>${formatDate(data.setOn)}</setOn>
                 </planned>
              </ins:reportOrderStatusRequest>
           </soapenv:Body>
        </soapenv:Envelope>
      `,
      // Weitere Status-Typen können hier leicht hinzugefügt werden
    };

    // Template auswählen
    const templateFn = templates[statusType];
    if (!templateFn) {
      throw new Error(`No template defined for status type: ${statusType}`);
    }

    // Payload generieren
    return templateFn(statusData);
  }

  // Methode zum Senden des SOAP-Requests
  private async sendSoapRequest(
    payload: string,
    statusType: string,
    user: User,
  ): Promise<any> {
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
      console.log(payload); // Logge die SOAP-Payload
      const response = await axios.post(
        'https://services-test.ista.com/DrinkingWaterSystem/InstallationService',
        payload,
        config,
      );
      console.log(payload); // Logge die SOAP-Payload
      console.log(response.data); // Verarbeite die SOAP-Antwort
      return this.handleResponse(statusType, response.data, user);
    } catch (error) {
      console.error('Fehler beim Senden des SOAP-Requests:', error);
      return this.handleResponse(statusType, error, user);
    }
  }

  private async updateStatusWithSyncId(
    statusType: string,
    statusId: number,
    syncId: number,
  ) {
    // Mapping von Status-Typen zu Prisma-Modellen
    const statusModelMap: Record<string, any> = {
      RECEIVED: this.prisma.received,
      PLANNED: this.prisma.planned,
      DONE: this.prisma.done,
      CANCELLED: this.prisma.cancelled,
      NOTPOSSIBLE: this.prisma.notPossible,
      POSTPONED: this.prisma.postponed,
      REJECTED: this.prisma.rejected,
      EXECUTIONONSITENOTPOSSIBLE: this.prisma.executionOnSiteNotPossible,
    };

    // Prüfe, ob der statusType gültig ist
    const model = statusModelMap[statusType];
    if (!model) {
      throw new Error(`Invalid status type: ${statusType}`);
    }

    // Status-Eintrag mit der syncId aktualisieren
    await model.update({
      where: { id: statusId },
      data: { syncDataId: syncId },
    });
  }

  // Verarbeitung der SOAP-Antwort
  private async handleResponse(statusType: string, response: any, user: User) {
    // Sync-Eintrag erstellen, auch wenn die Response fehlerhaft ist
    const sync = await this.prisma.sync.create({
      data: {
        statusType: statusType.toString(),
        syncStatus: JSON.stringify(response), // Die gesamte Response (auch fehlerhaft) speichern
        syncError: response?.errorMessage || 'Unbekannter Fehler', // Fehler-Message speichern
        userId: user.id,
      },
    });

    // Wenn die Response fehlerhaft ist, beende den Prozess
    if (!response || !response.success) {
      return sync; // Den fehlerhaften Sync-Eintrag zurückgeben
    }

    // Status mit der syncId aktualisieren
    await this.updateStatusWithSyncId(statusType, response.statusId, sync.id);

    // Erfolgreichen Sync zurückgeben
    return sync;
  }
}
