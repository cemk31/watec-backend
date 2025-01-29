import { ContactDto } from './ContactDto';
import { RecordedSystemDto } from './RecordedSystemDto';
import { ReportOrderStatusRequestDto } from './ReportOrderStatusRequestDto';
import { SuppliedDocumentsDto } from './SuppliedDocumentsDto';
import { CustomerContactDto } from './CustomerContactDto';
import { ServiceDto } from './ServiceDto';
export declare class ClosedContractPartnerDto {
    id: number;
    orderId: number;
    orderstatusType: number;
    setOn: Date;
    customerContacts: CustomerContactDto[];
    deficiencyDescription?: string;
    extraordinaryExpenditureReason?: string;
    suppliedDocuments: SuppliedDocumentsDto[];
    registrationHealthAuthoritiesOn: Date;
    recordedSystem: RecordedSystemDto[];
    reportOrderStatusRequest: ReportOrderStatusRequestDto[];
    contact: ContactDto[];
    services?: ServiceDto[];
}
