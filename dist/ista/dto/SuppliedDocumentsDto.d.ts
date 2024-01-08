import { ClosedContractPartnerDto } from "./ClosedContractPartnerDto";
import { IDocument } from "./DocumentDto";
export declare class SuppliedDocumentsDto {
    id: number;
    document?: IDocument;
    closedContractPartner?: ClosedContractPartnerDto;
    closedContractPartnerId?: number;
    documentId?: number;
}
export interface ISuppliedDocuments {
    id: number;
    document?: IDocument;
}
