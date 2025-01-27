import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import axios from 'axios';

@Injectable()
export class SoapHelperService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  // Hauptmethode zur Verarbeitung eines Status
  async processStatus(statusType: string, statusId: number, user: User) {
    const statusData = await this.getStatus(statusType, statusId);
    const orderData = await this.prisma.order.findUnique({
      where: { id: statusData.orderId },
    });
    if (!statusData) {
      throw new Error(
        `No data found for statusType: ${statusType} and statusId: ${statusId}`,
      );
    }
    const orderNumberIsta = orderData.orderNumberIsta;
    // Dynamische Payload-Erstellung
    const payload = this.createPayload(statusType, statusData, orderNumberIsta);
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
  private createPayload(
    statusType: string,
    statusData: any,
    orderNumberIsta: BigInt, // Typ angepasst
  ): string {
    // Standardisiertes Datumsformat
    const formatDate = (date: string | Date): string => {
      if (!date) return '';
      const d = new Date(date);

      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      const seconds = String(d.getSeconds()).padStart(2, '0');

      // Format ohne Millisekunden und ohne Z
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
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
                     <number>${data.orderNumberIsta || 'UNDEFINED'}</number>
                  </order>
                  <orderstatusType>007</orderstatusType>
                  <setOn>${formatDate(data.setOn)}</setOn>
                  <customerContacts>
                    ${
                      data.customerContacts && data.customerContacts.length > 0
                        ? data.customerContacts
                            .map(
                              (contact) => `
                      <customerContact>
                        <customerContactAttemptOn>${
                          contact.customerContactAttemptOn || ''
                        }</customerContactAttemptOn>
                        <contactPersonCustomer>${
                          contact.contactPersonCustomer || ''
                        }</contactPersonCustomer>
                        <agentCP>${contact.agentCP || ''}</agentCP>
                        <result>${contact.result || ''}</result>
                        <remark>${contact.remark || ''}</remark>
                      </customerContact>
                      `,
                            )
                            .join('')
                        : ''
                    }
                  </customerContacts>
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
                     <number>${orderNumberIsta || 'UNDEFINED'}</number>
                     <remarkExternal>${
                       data.remarkExternal || ''
                     }</remarkExternal>
                  </order>
                  <orderstatusType>020</orderstatusType>
                  <setOn>${formatDate(data.setOn)}</setOn>
                  <customerContacts>
                    ${
                      data.customerContacts && data.customerContacts.length > 0
                        ? data.customerContacts
                            .map(
                              (contact) => `
                      <customerContact>
                        <customerContactAttemptOn>${
                          contact.customerContactAttemptOn
                        }</customerContactAttemptOn>
                        <contactPersonCustomer>${
                          contact.contactPersonCustomer
                        }</contactPersonCustomer>
                        <agentCP>${contact.agentCP}</agentCP>
                        <result>${contact.result}</result>
                        <remark>${contact.remark || ''}</remark>
                      </customerContact>
                      `,
                            )
                            .join('')
                        : ''
                    }
                  </customerContacts>
                  <detailedScheduleDate>
                  ${formatDate(
                    data.detailedScheduleDate,
                  )}</detailedScheduleDate>
                  <detailedScheduleTimeFrom>${
                    data.detailedScheduleTimeFrom || ''
                  }</detailedScheduleTimeFrom>
                  <detailedScheduleTimeTo>${
                    data.detailedScheduleTimeTo || ''
                  }</detailedScheduleTimeTo>
                  <detailedScheduleDelayReason>KAPA</detailedScheduleDelayReason>
               </planned>
            </ins:reportOrderStatusRequest>
         </soapenv:Body>
      </soapenv:Envelope>
    `,
      POSTPONED: (data) => `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ins="http://www.ista.com/DrinkingWaterSystem/InstallationService" xmlns:com="http://www.ista.com/CommonTypes">
         <soapenv:Header/>
         <soapenv:Body>
            <ins:reportOrderStatusRequest>
               <com:environment>Development</com:environment>
               <com:language>DE</com:language>
               <com:consumer>soapUI</com:consumer>
               <postponed>
                  <order>
                     <number>${data.orderNumberIsta || 'UNDEFINED'}</number>
                     <remarkExternal>${
                       data.remarkExternal || ''
                     }</remarkExternal>
                  </order>
                  <orderstatusType>013</orderstatusType>
                  <setOn>${formatDate(data.setOn)}</setOn>
                  <customerContacts>
                    ${
                      data.customerContacts && data.customerContacts.length > 0
                        ? data.customerContacts
                            .map(
                              (contact) => `
                      <customerContact>
                        <customerContactAttemptOn>${
                          contact.customerContactAttemptOn || ''
                        }</customerContactAttemptOn>
                        <contactPersonCustomer>${
                          contact.contactPersonCustomer || ''
                        }</contactPersonCustomer>
                        <agentCP>${contact.agentCP || ''}</agentCP>
                        <result>${contact.result || ''}</result>
                        <remark>${contact.remark || ''}</remark>
                      </customerContact>
                      `,
                            )
                            .join('')
                        : ''
                    }
                  </customerContacts>
                  <postponedReason>${
                    data.postponedReason || ''
                  }</postponedReason>
               </postponed>
            </ins:reportOrderStatusRequest>
         </soapenv:Body>
      </soapenv:Envelope>
    `,
      EXECUTION_ON_SITE_DONE: (data) => `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ins="http://www.ista.com/DrinkingWaterSystem/InstallationService" xmlns:com="http://www.ista.com/CommonTypes">
         <soapenv:Header/>
         <soapenv:Body>
            <ins:reportOrderStatusRequest>
               <com:environment>Development</com:environment>
               <com:language>DE</com:language>
               <com:consumer>soapUI</com:consumer>
               <executionOnSiteDone>
                  <order>
                     <number>${data.orderNumberIsta || 'UNDEFINED'}</number>
                     <remarkExternal>${
                       data.remarkExternal || ''
                     }</remarkExternal>
                  </order>
                  <orderstatusType>030</orderstatusType>
                  <setOn>${formatDate(data.setOn)}</setOn>
                  <customerContacts>
                    ${
                      data.customerContacts && data.customerContacts.length > 0
                        ? data.customerContacts
                            .map(
                              (contact) => `
                      <customerContact>
                        <customerContactAttemptOn>${
                          contact.customerContactAttemptOn || ''
                        }</customerContactAttemptOn>
                        <contactPersonCustomer>${
                          contact.contactPersonCustomer || ''
                        }</contactPersonCustomer>
                        <agentCP>${contact.agentCP || ''}</agentCP>
                        <result>${contact.result || ''}</result>
                        <remark>${contact.remark || ''}</remark>
                      </customerContact>
                      `,
                            )
                            .join('')
                        : ''
                    }
                  </customerContacts>
               </executionOnSiteDone>
            </ins:reportOrderStatusRequest>
         </soapenv:Body>
      </soapenv:Envelope>
    `,
      REJECTED: (data) => `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ins="http://www.ista.com/DrinkingWaterSystem/InstallationService" xmlns:com="http://www.ista.com/CommonTypes">
         <soapenv:Header/>
         <soapenv:Body>
            <ins:reportOrderStatusRequest>
               <com:environment>Development</com:environment>
               <com:language>DE</com:language>
               <com:consumer>soapUI</com:consumer>
               <rejected>
                  <order>
                     <number>${data.orderNumberIsta || 'UNDEFINED'}</number>
                     <remarkExternal>${
                       data.remarkExternal || ''
                     }</remarkExternal>
                  </order>
                  <orderstatusType>200</orderstatusType>
                  <setOn>${formatDate(data.setOn)}</setOn>
                  <customerContacts>
                    ${
                      data.customerContacts && data.customerContacts.length > 0
                        ? data.customerContacts
                            .map(
                              (contact) => `
                      <customerContact>
                        <customerContactAttemptOn>${
                          contact.customerContactAttemptOn || ''
                        }</customerContactAttemptOn>
                        <contactPersonCustomer>${
                          contact.contactPersonCustomer || ''
                        }</contactPersonCustomer>
                        <agentCP>${contact.agentCP || ''}</agentCP>
                        <result>${contact.result || ''}</result>
                        <remark>${contact.remark || ''}</remark>
                      </customerContact>
                      `,
                            )
                            .join('')
                        : ''
                    }
                  </customerContacts>
                  <rejectionReason>${
                    data.rejectionReason || ''
                  }</rejectionReason>
                  <rejectionReasonText>${
                    data.rejectionReasonText || ''
                  }</rejectionReasonText>
               </rejected>
            </ins:reportOrderStatusRequest>
         </soapenv:Body>
      </soapenv:Envelope>
    `,
      CUSTOMER_CONTACT_NOT_POSSIBLE: (data) => `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ins="http://www.ista.com/DrinkingWaterSystem/InstallationService" xmlns:com="http://www.ista.com/CommonTypes">
         <soapenv:Header/>
         <soapenv:Body>
            <ins:reportOrderStatusRequest>
               <com:environment>Development</com:environment>
               <com:language>DE</com:language>
               <com:consumer>soapUI</com:consumer>
               <customerContactNotPossible>
                  <order>
                     <number>${data.orderNumberIsta || 'UNDEFINED'}</number>
                     <remarkExternal>${
                       data.remarkExternal || ''
                     }</remarkExternal>
                  </order>
                  <orderstatusType>011</orderstatusType>
                  <setOn>${formatDate(data.setOn)}</setOn>
                  <customerContacts>
                    ${
                      data.customerContacts && data.customerContacts.length > 0
                        ? data.customerContacts
                            .map(
                              (contact) => `
                      <customerContact>
                        <customerContactAttemptOn>${
                          contact.customerContactAttemptOn || ''
                        }</customerContactAttemptOn>
                        <contactPersonCustomer>${
                          contact.contactPersonCustomer || ''
                        }</contactPersonCustomer>
                        <agentCP>${contact.agentCP || ''}</agentCP>
                        <result>${contact.result || ''}</result>
                        <remark>${contact.remark || ''}</remark>
                      </customerContact>
                      `,
                            )
                            .join('')
                        : ''
                    }
                  </customerContacts>
               </customerContactNotPossible>
            </ins:reportOrderStatusRequest>
         </soapenv:Body>
      </soapenv:Envelope>
    `,
      CANCELLED: (data) => `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ins="http://www.ista.com/DrinkingWaterSystem/InstallationService" xmlns:com="http://www.ista.com/CommonTypes">
         <soapenv:Header/>
         <soapenv:Body>
            <ins:reportOrderStatusRequest>
               <com:environment>Development</com:environment>
               <com:language>DE</com:language>
               <com:consumer>soapUI</com:consumer>
               <cancelled>
                  <order>
                     <number>${data.orderNumberIsta || 'UNDEFINED'}</number>
                     <remarkExternal>${
                       data.remarkExternal || ''
                     }</remarkExternal>
                  </order>
                  <orderstatusType>300</orderstatusType>
                  <setOn>${formatDate(data.setOn)}</setOn>
                  <customerContacts>
                    ${
                      data.customerContacts && data.customerContacts.length > 0
                        ? data.customerContacts
                            .map(
                              (contact) => `
                      <customerContact>
                        <customerContactAttemptOn>${
                          contact.customerContactAttemptOn || ''
                        }</customerContactAttemptOn>
                        <contactPersonCustomer>${
                          contact.contactPersonCustomer || ''
                        }</contactPersonCustomer>
                        <agentCP>${contact.agentCP || ''}</agentCP>
                        <result>${contact.result || ''}</result>
                        <remark>${contact.remark || ''}</remark>
                      </customerContact>
                      `,
                            )
                            .join('')
                        : ''
                    }
                  </customerContacts>
                  <cancellationReason>${
                    data.cancellationReason || ''
                  }</cancellationReason>
               </cancelled>
            </ins:reportOrderStatusRequest>
         </soapenv:Body>
      </soapenv:Envelope>
    `,
      EXECUTION_ON_SITE_NOT_POSSIBLE: (data) => `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ins="http://www.ista.com/DrinkingWaterSystem/InstallationService" xmlns:com="http://www.CommonTypes">
         <soapenv:Header/>
         <soapenv:Body>
            <ins:reportOrderStatusRequest>
               <com:environment>Development</com:environment>
               <com:language>DE</com:language>
               <com:consumer>soapUI</com:consumer>
               <executionOnSiteNotPossible>
                  <order>
                     <number>${data.orderNumberIsta || 'UNDEFINED'}</number>
                     <remarkExternal>${
                       data.remarkExternal || ''
                     }</remarkExternal>
                  </order>
                  <orderstatusType>031</orderstatusType>
                  <setOn>${formatDate(data.setOn)}</setOn>
                  <customerContacts>
                    ${
                      data.customerContacts && data.customerContacts.length > 0
                        ? data.customerContacts
                            .map(
                              (contact) => `
                      <customerContact>
                        <customerContactAttemptOn>${
                          contact.customerContactAttemptOn || ''
                        }</customerContactAttemptOn>
                        <contactPersonCustomer>${
                          contact.contactPersonCustomer || ''
                        }</contactPersonCustomer>
                        <agentCP>${contact.agentCP || ''}</agentCP>
                        <result>${contact.result || ''}</result>
                        <remark>${contact.remark || ''}</remark>
                      </customerContact>
                      `,
                            )
                            .join('')
                        : ''
                    }
                  </customerContacts>
                  <nonExecutionReason>${
                    data.nonExecutionReason || ''
                  }</nonExecutionReason>
               </executionOnSiteNotPossible>
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
