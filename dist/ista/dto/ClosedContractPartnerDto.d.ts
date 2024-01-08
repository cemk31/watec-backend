import { ContactDto } from "./ContactDto";
import { RecordedSystemDto } from "./RecordedSystemDto";
import { ReportOrderStatusRequestDto } from "./ReportOrderStatusRequestDto";
import { SuppliedDocumentsDto } from "./SuppliedDocumentsDto";
export declare class ClosedContractPartnerDto {
    id: number;
    orderId: number;
    orderstatusType: number;
    setOn: Date;
    deficiencyDescription?: string;
    registrationHealthAuthoritiesOn?: Date;
    extraordinaryExpenditureReason?: string;
    suppliedDocuments: SuppliedDocumentsDto[];
    recordedSystem: RecordedSystemDto[];
    reportOrderStatusRequest: ReportOrderStatusRequestDto[];
    contact: ContactDto[];
}
