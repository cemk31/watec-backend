import { ISuppliedDocuments } from "./SuppliedDocumentsDto";
export declare class DocumentDto implements IDocument {
    id: number;
    type: string;
    content: string;
    suppliedDocuments?: ISuppliedDocuments[];
}
export interface IDocument {
    id: number;
    type: string;
    content: string;
    suppliedDocuments?: ISuppliedDocuments[];
}
