import { CreateCustomerOrderDTO, CustomerDTO, OrderDto, ReceivedDto } from "./dto";
import { PlannedDto } from "./dto/PlannedDto";
import { IstaService } from "./ista.service";
import { RejectedDto } from "./dto/RejectedDto";
import { PostponedDto } from "./dto/PostponedDto";
import { CancelledDto } from "./dto/CancelledDto";
import { NotPossibleDto } from "./dto/NotPossibleDto";
import { ClosedContractPartnerDto } from "./dto/ClosedContractPartnerDto";
import { DoneDto } from "src/auftrag/dto/create-done.dto";
export declare class IstaController {
    private istaService;
    mockOrderDto: OrderDto;
    constructor(istaService: IstaService);
    createOrder(dto: OrderDto): Promise<{
        status: (import("@prisma/client/runtime").GetResult<{
            id: number;
            type: string;
            setOn: Date;
            executionOnSiteDone: boolean;
            orderId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Received: (import("@prisma/client/runtime").GetResult<{
            id: number;
            orderId: number;
            orderstatusType: string;
            setOn: Date;
            requestId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Planned: (import("@prisma/client/runtime").GetResult<{
            id: number;
            orderId: number;
            orderstatusType: string;
            setOn: Date;
            detailedScheduleDate: Date;
            detailedScheduleTimeFrom: Date;
            detailedScheduleTimeTo: Date;
            detailedScheduleDelayReason: string;
            requestId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        CustomerContacts: (import("@prisma/client/runtime").GetResult<{
            id: number;
            contactAttemptOn: Date;
            contactPersonCustomer: string;
            agentCP: string;
            result: string;
            remark: string;
            orderId: number;
            plannedId: number;
            receivedId: number;
            statusReportId: number;
        }, unknown, never> & {})[];
        NotPossible: (import("@prisma/client/runtime").GetResult<{
            id: number;
            statusType: string;
            setOn: Date;
            orderId: number;
            requestId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Postponed: (import("@prisma/client/runtime").GetResult<{
            id: number;
            statusType: string;
            setOn: Date;
            nextContactAttemptOn: Date;
            postponedReason: string;
            orderId: number;
            requestId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Cancelled: (import("@prisma/client/runtime").GetResult<{
            id: number;
            statusType: string;
            setOn: Date;
            cancellationReason: string;
            createdAt: Date;
            updatedAt: Date;
            orderId: number;
            requestId: number;
        }, unknown, never> & {})[];
        Rejected: (import("@prisma/client/runtime").GetResult<{
            id: number;
            statusType: number;
            setOn: Date;
            reason: string;
            reasonText: string;
            requestId: number;
            orderId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        ClosedContractPartner: (import("@prisma/client/runtime").GetResult<{
            id: number;
            orderstatusType: number;
            setOn: Date;
            deficiencyDescription: string;
            registrationHealthAuthoritiesOn: Date;
            extraordinaryExpenditureReason: string;
            orderId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Customer: import("@prisma/client/runtime").GetResult<{
            id: number;
            firstName: string;
            lastName: string;
            addressId: number;
            phoneNumber: string;
            street: string;
            zipCode: string;
            email: string;
            country: string;
            place: string;
            companyName: string;
            fax: string;
            propertyNumber: string;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {};
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        number: string;
        remarkExternal: string;
        createdAt: Date;
        actualStatus: import(".prisma/client").Status;
        customerId: number;
        updatedAt: Date;
    }, unknown, never> & {}>;
    createNewOrder(dto: CreateCustomerOrderDTO): Promise<{
        status: (import("@prisma/client/runtime").GetResult<{
            id: number;
            type: string;
            setOn: Date;
            executionOnSiteDone: boolean;
            orderId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Received: (import("@prisma/client/runtime").GetResult<{
            id: number;
            orderId: number;
            orderstatusType: string;
            setOn: Date;
            requestId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Planned: (import("@prisma/client/runtime").GetResult<{
            id: number;
            orderId: number;
            orderstatusType: string;
            setOn: Date;
            detailedScheduleDate: Date;
            detailedScheduleTimeFrom: Date;
            detailedScheduleTimeTo: Date;
            detailedScheduleDelayReason: string;
            requestId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        CustomerContacts: (import("@prisma/client/runtime").GetResult<{
            id: number;
            contactAttemptOn: Date;
            contactPersonCustomer: string;
            agentCP: string;
            result: string;
            remark: string;
            orderId: number;
            plannedId: number;
            receivedId: number;
            statusReportId: number;
        }, unknown, never> & {})[];
        NotPossible: (import("@prisma/client/runtime").GetResult<{
            id: number;
            statusType: string;
            setOn: Date;
            orderId: number;
            requestId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Postponed: (import("@prisma/client/runtime").GetResult<{
            id: number;
            statusType: string;
            setOn: Date;
            nextContactAttemptOn: Date;
            postponedReason: string;
            orderId: number;
            requestId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Cancelled: (import("@prisma/client/runtime").GetResult<{
            id: number;
            statusType: string;
            setOn: Date;
            cancellationReason: string;
            createdAt: Date;
            updatedAt: Date;
            orderId: number;
            requestId: number;
        }, unknown, never> & {})[];
        Rejected: (import("@prisma/client/runtime").GetResult<{
            id: number;
            statusType: number;
            setOn: Date;
            reason: string;
            reasonText: string;
            requestId: number;
            orderId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        ClosedContractPartner: (import("@prisma/client/runtime").GetResult<{
            id: number;
            orderstatusType: number;
            setOn: Date;
            deficiencyDescription: string;
            registrationHealthAuthoritiesOn: Date;
            extraordinaryExpenditureReason: string;
            orderId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Customer: import("@prisma/client/runtime").GetResult<{
            id: number;
            firstName: string;
            lastName: string;
            addressId: number;
            phoneNumber: string;
            street: string;
            zipCode: string;
            email: string;
            country: string;
            place: string;
            companyName: string;
            fax: string;
            propertyNumber: string;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {};
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        number: string;
        remarkExternal: string;
        createdAt: Date;
        actualStatus: import(".prisma/client").Status;
        customerId: number;
        updatedAt: Date;
    }, unknown, never> & {}>;
    updateOrder(dto: ReceivedDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        number: string;
        remarkExternal: string;
        createdAt: Date;
        actualStatus: import(".prisma/client").Status;
        customerId: number;
        updatedAt: Date;
    }, unknown, never> & {}>;
    createTestOrder(): Promise<{
        status: (import("@prisma/client/runtime").GetResult<{
            id: number;
            type: string;
            setOn: Date;
            executionOnSiteDone: boolean;
            orderId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Received: (import("@prisma/client/runtime").GetResult<{
            id: number;
            orderId: number;
            orderstatusType: string;
            setOn: Date;
            requestId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Planned: (import("@prisma/client/runtime").GetResult<{
            id: number;
            orderId: number;
            orderstatusType: string;
            setOn: Date;
            detailedScheduleDate: Date;
            detailedScheduleTimeFrom: Date;
            detailedScheduleTimeTo: Date;
            detailedScheduleDelayReason: string;
            requestId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        CustomerContacts: (import("@prisma/client/runtime").GetResult<{
            id: number;
            contactAttemptOn: Date;
            contactPersonCustomer: string;
            agentCP: string;
            result: string;
            remark: string;
            orderId: number;
            plannedId: number;
            receivedId: number;
            statusReportId: number;
        }, unknown, never> & {})[];
        NotPossible: (import("@prisma/client/runtime").GetResult<{
            id: number;
            statusType: string;
            setOn: Date;
            orderId: number;
            requestId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Postponed: (import("@prisma/client/runtime").GetResult<{
            id: number;
            statusType: string;
            setOn: Date;
            nextContactAttemptOn: Date;
            postponedReason: string;
            orderId: number;
            requestId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Cancelled: (import("@prisma/client/runtime").GetResult<{
            id: number;
            statusType: string;
            setOn: Date;
            cancellationReason: string;
            createdAt: Date;
            updatedAt: Date;
            orderId: number;
            requestId: number;
        }, unknown, never> & {})[];
        Rejected: (import("@prisma/client/runtime").GetResult<{
            id: number;
            statusType: number;
            setOn: Date;
            reason: string;
            reasonText: string;
            requestId: number;
            orderId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        ClosedContractPartner: (import("@prisma/client/runtime").GetResult<{
            id: number;
            orderstatusType: number;
            setOn: Date;
            deficiencyDescription: string;
            registrationHealthAuthoritiesOn: Date;
            extraordinaryExpenditureReason: string;
            orderId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Customer: import("@prisma/client/runtime").GetResult<{
            id: number;
            firstName: string;
            lastName: string;
            addressId: number;
            phoneNumber: string;
            street: string;
            zipCode: string;
            email: string;
            country: string;
            place: string;
            companyName: string;
            fax: string;
            propertyNumber: string;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {};
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        number: string;
        remarkExternal: string;
        createdAt: Date;
        actualStatus: import(".prisma/client").Status;
        customerId: number;
        updatedAt: Date;
    }, unknown, never> & {}>;
    createCustomerAndOrder(dto: CreateCustomerOrderDTO): Promise<{
        status: (import("@prisma/client/runtime").GetResult<{
            id: number;
            type: string;
            setOn: Date;
            executionOnSiteDone: boolean;
            orderId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Received: (import("@prisma/client/runtime").GetResult<{
            id: number;
            orderId: number;
            orderstatusType: string;
            setOn: Date;
            requestId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Planned: (import("@prisma/client/runtime").GetResult<{
            id: number;
            orderId: number;
            orderstatusType: string;
            setOn: Date;
            detailedScheduleDate: Date;
            detailedScheduleTimeFrom: Date;
            detailedScheduleTimeTo: Date;
            detailedScheduleDelayReason: string;
            requestId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        CustomerContacts: (import("@prisma/client/runtime").GetResult<{
            id: number;
            contactAttemptOn: Date;
            contactPersonCustomer: string;
            agentCP: string;
            result: string;
            remark: string;
            orderId: number;
            plannedId: number;
            receivedId: number;
            statusReportId: number;
        }, unknown, never> & {})[];
        NotPossible: (import("@prisma/client/runtime").GetResult<{
            id: number;
            statusType: string;
            setOn: Date;
            orderId: number;
            requestId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Postponed: (import("@prisma/client/runtime").GetResult<{
            id: number;
            statusType: string;
            setOn: Date;
            nextContactAttemptOn: Date;
            postponedReason: string;
            orderId: number;
            requestId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Cancelled: (import("@prisma/client/runtime").GetResult<{
            id: number;
            statusType: string;
            setOn: Date;
            cancellationReason: string;
            createdAt: Date;
            updatedAt: Date;
            orderId: number;
            requestId: number;
        }, unknown, never> & {})[];
        Rejected: (import("@prisma/client/runtime").GetResult<{
            id: number;
            statusType: number;
            setOn: Date;
            reason: string;
            reasonText: string;
            requestId: number;
            orderId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        ClosedContractPartner: (import("@prisma/client/runtime").GetResult<{
            id: number;
            orderstatusType: number;
            setOn: Date;
            deficiencyDescription: string;
            registrationHealthAuthoritiesOn: Date;
            extraordinaryExpenditureReason: string;
            orderId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Customer: import("@prisma/client/runtime").GetResult<{
            id: number;
            firstName: string;
            lastName: string;
            addressId: number;
            phoneNumber: string;
            street: string;
            zipCode: string;
            email: string;
            country: string;
            place: string;
            companyName: string;
            fax: string;
            propertyNumber: string;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {};
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        number: string;
        remarkExternal: string;
        createdAt: Date;
        actualStatus: import(".prisma/client").Status;
        customerId: number;
        updatedAt: Date;
    }, unknown, never> & {}>;
    createCustomer(dto: CustomerDTO): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        firstName: string;
        lastName: string;
        addressId: number;
        phoneNumber: string;
        street: string;
        zipCode: string;
        email: string;
        country: string;
        place: string;
        companyName: string;
        fax: string;
        propertyNumber: string;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {}>;
    getCustomerById(customerId: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        firstName: string;
        lastName: string;
        addressId: number;
        phoneNumber: string;
        street: string;
        zipCode: string;
        email: string;
        country: string;
        place: string;
        companyName: string;
        fax: string;
        propertyNumber: string;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {}>;
    orderPlanned(dto: PlannedDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        orderId: number;
        orderstatusType: string;
        setOn: Date;
        detailedScheduleDate: Date;
        detailedScheduleTimeFrom: Date;
        detailedScheduleTimeTo: Date;
        detailedScheduleDelayReason: string;
        requestId: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {}>;
    orderClosed(dto: ClosedContractPartnerDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        orderstatusType: number;
        setOn: Date;
        deficiencyDescription: string;
        registrationHealthAuthoritiesOn: Date;
        extraordinaryExpenditureReason: string;
        orderId: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {}>;
    orderRejected(dto: RejectedDto): Promise<any>;
    orderNotPossible(dto: NotPossibleDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        statusType: string;
        setOn: Date;
        orderId: number;
        requestId: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {}>;
    orderPostponed(dto: PostponedDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        statusType: string;
        setOn: Date;
        nextContactAttemptOn: Date;
        postponedReason: string;
        orderId: number;
        requestId: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {}>;
    orderCancelled(dto: CancelledDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        statusType: string;
        setOn: Date;
        cancellationReason: string;
        createdAt: Date;
        updatedAt: Date;
        orderId: number;
        requestId: number;
    }, unknown, never> & {}>;
    getAllOrders(): Promise<({
        status: (import("@prisma/client/runtime").GetResult<{
            id: number;
            type: string;
            setOn: Date;
            executionOnSiteDone: boolean;
            orderId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Received: ({
            CustomerContact: (import("@prisma/client/runtime").GetResult<{
                id: number;
                contactAttemptOn: Date;
                contactPersonCustomer: string;
                agentCP: string;
                result: string;
                remark: string;
                orderId: number;
                plannedId: number;
                receivedId: number;
                statusReportId: number;
            }, unknown, never> & {})[];
            Request: import("@prisma/client/runtime").GetResult<{
                id: number;
                environment: string;
                language: string;
                consumer: string;
                cancelledId: number;
                notPossibleId: number;
                plannedId: number;
                postponedId: number;
                receivedId: number;
                rejectedId: number;
            }, unknown, never> & {};
        } & import("@prisma/client/runtime").GetResult<{
            id: number;
            orderId: number;
            orderstatusType: string;
            setOn: Date;
            requestId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Planned: ({
            CustomerContact: (import("@prisma/client/runtime").GetResult<{
                id: number;
                contactAttemptOn: Date;
                contactPersonCustomer: string;
                agentCP: string;
                result: string;
                remark: string;
                orderId: number;
                plannedId: number;
                receivedId: number;
                statusReportId: number;
            }, unknown, never> & {})[];
            Request: import("@prisma/client/runtime").GetResult<{
                id: number;
                environment: string;
                language: string;
                consumer: string;
                cancelledId: number;
                notPossibleId: number;
                plannedId: number;
                postponedId: number;
                receivedId: number;
                rejectedId: number;
            }, unknown, never> & {};
        } & import("@prisma/client/runtime").GetResult<{
            id: number;
            orderId: number;
            orderstatusType: string;
            setOn: Date;
            detailedScheduleDate: Date;
            detailedScheduleTimeFrom: Date;
            detailedScheduleTimeTo: Date;
            detailedScheduleDelayReason: string;
            requestId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        NotPossible: ({
            Contact: (import("@prisma/client/runtime").GetResult<{
                id: number;
                contactAttemptOn: Date;
                contactPerson: string;
                agentCP: string;
                result: string;
                remark: string;
                cancelledId: number;
                closedContractPartnerId: number;
                notPossibleId: number;
                postponedId: number;
                rejectedId: number;
                receivedId: number;
                createdAt: Date;
                updatedAt: Date;
            }, unknown, never> & {})[];
            Request: import("@prisma/client/runtime").GetResult<{
                id: number;
                environment: string;
                language: string;
                consumer: string;
                cancelledId: number;
                notPossibleId: number;
                plannedId: number;
                postponedId: number;
                receivedId: number;
                rejectedId: number;
            }, unknown, never> & {};
        } & import("@prisma/client/runtime").GetResult<{
            id: number;
            statusType: string;
            setOn: Date;
            orderId: number;
            requestId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Postponed: ({
            Contact: (import("@prisma/client/runtime").GetResult<{
                id: number;
                contactAttemptOn: Date;
                contactPerson: string;
                agentCP: string;
                result: string;
                remark: string;
                cancelledId: number;
                closedContractPartnerId: number;
                notPossibleId: number;
                postponedId: number;
                rejectedId: number;
                receivedId: number;
                createdAt: Date;
                updatedAt: Date;
            }, unknown, never> & {})[];
            Request: import("@prisma/client/runtime").GetResult<{
                id: number;
                environment: string;
                language: string;
                consumer: string;
                cancelledId: number;
                notPossibleId: number;
                plannedId: number;
                postponedId: number;
                receivedId: number;
                rejectedId: number;
            }, unknown, never> & {};
        } & import("@prisma/client/runtime").GetResult<{
            id: number;
            statusType: string;
            setOn: Date;
            nextContactAttemptOn: Date;
            postponedReason: string;
            orderId: number;
            requestId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Cancelled: ({
            Contact: (import("@prisma/client/runtime").GetResult<{
                id: number;
                contactAttemptOn: Date;
                contactPerson: string;
                agentCP: string;
                result: string;
                remark: string;
                cancelledId: number;
                closedContractPartnerId: number;
                notPossibleId: number;
                postponedId: number;
                rejectedId: number;
                receivedId: number;
                createdAt: Date;
                updatedAt: Date;
            }, unknown, never> & {})[];
            Request: import("@prisma/client/runtime").GetResult<{
                id: number;
                environment: string;
                language: string;
                consumer: string;
                cancelledId: number;
                notPossibleId: number;
                plannedId: number;
                postponedId: number;
                receivedId: number;
                rejectedId: number;
            }, unknown, never> & {};
        } & import("@prisma/client/runtime").GetResult<{
            id: number;
            statusType: string;
            setOn: Date;
            cancellationReason: string;
            createdAt: Date;
            updatedAt: Date;
            orderId: number;
            requestId: number;
        }, unknown, never> & {})[];
        Rejected: ({
            Contact: (import("@prisma/client/runtime").GetResult<{
                id: number;
                contactAttemptOn: Date;
                contactPerson: string;
                agentCP: string;
                result: string;
                remark: string;
                cancelledId: number;
                closedContractPartnerId: number;
                notPossibleId: number;
                postponedId: number;
                rejectedId: number;
                receivedId: number;
                createdAt: Date;
                updatedAt: Date;
            }, unknown, never> & {})[];
            Request: import("@prisma/client/runtime").GetResult<{
                id: number;
                environment: string;
                language: string;
                consumer: string;
                cancelledId: number;
                notPossibleId: number;
                plannedId: number;
                postponedId: number;
                receivedId: number;
                rejectedId: number;
            }, unknown, never> & {};
        } & import("@prisma/client/runtime").GetResult<{
            id: number;
            statusType: number;
            setOn: Date;
            reason: string;
            reasonText: string;
            requestId: number;
            orderId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        ClosedContractPartner: (import("@prisma/client/runtime").GetResult<{
            id: number;
            orderstatusType: number;
            setOn: Date;
            deficiencyDescription: string;
            registrationHealthAuthoritiesOn: Date;
            extraordinaryExpenditureReason: string;
            orderId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Customer: import("@prisma/client/runtime").GetResult<{
            id: number;
            firstName: string;
            lastName: string;
            addressId: number;
            phoneNumber: string;
            street: string;
            zipCode: string;
            email: string;
            country: string;
            place: string;
            companyName: string;
            fax: string;
            propertyNumber: string;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {};
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        number: string;
        remarkExternal: string;
        createdAt: Date;
        actualStatus: import(".prisma/client").Status;
        customerId: number;
        updatedAt: Date;
    }, unknown, never> & {})[]>;
    getOrderById(orderId: number): Promise<{
        status: (import("@prisma/client/runtime").GetResult<{
            id: number;
            type: string;
            setOn: Date;
            executionOnSiteDone: boolean;
            orderId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Received: ({
            CustomerContact: (import("@prisma/client/runtime").GetResult<{
                id: number;
                contactAttemptOn: Date;
                contactPersonCustomer: string;
                agentCP: string;
                result: string;
                remark: string;
                orderId: number;
                plannedId: number;
                receivedId: number;
                statusReportId: number;
            }, unknown, never> & {})[];
            Request: import("@prisma/client/runtime").GetResult<{
                id: number;
                environment: string;
                language: string;
                consumer: string;
                cancelledId: number;
                notPossibleId: number;
                plannedId: number;
                postponedId: number;
                receivedId: number;
                rejectedId: number;
            }, unknown, never> & {};
        } & import("@prisma/client/runtime").GetResult<{
            id: number;
            orderId: number;
            orderstatusType: string;
            setOn: Date;
            requestId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        CustomerContacts: ({
            ClosedContractPartner: (import("@prisma/client/runtime").GetResult<{
                id: number;
                orderstatusType: number;
                setOn: Date;
                deficiencyDescription: string;
                registrationHealthAuthoritiesOn: Date;
                extraordinaryExpenditureReason: string;
                orderId: number;
                createdAt: Date;
                updatedAt: Date;
            }, unknown, never> & {})[];
            planned: import("@prisma/client/runtime").GetResult<{
                id: number;
                orderId: number;
                orderstatusType: string;
                setOn: Date;
                detailedScheduleDate: Date;
                detailedScheduleTimeFrom: Date;
                detailedScheduleTimeTo: Date;
                detailedScheduleDelayReason: string;
                requestId: number;
                createdAt: Date;
                updatedAt: Date;
            }, unknown, never> & {};
            received: import("@prisma/client/runtime").GetResult<{
                id: number;
                orderId: number;
                orderstatusType: string;
                setOn: Date;
                requestId: number;
                createdAt: Date;
                updatedAt: Date;
            }, unknown, never> & {};
        } & import("@prisma/client/runtime").GetResult<{
            id: number;
            contactAttemptOn: Date;
            contactPersonCustomer: string;
            agentCP: string;
            result: string;
            remark: string;
            orderId: number;
            plannedId: number;
            receivedId: number;
            statusReportId: number;
        }, unknown, never> & {})[];
        Planned: (import("@prisma/client/runtime").GetResult<{
            id: number;
            orderId: number;
            orderstatusType: string;
            setOn: Date;
            detailedScheduleDate: Date;
            detailedScheduleTimeFrom: Date;
            detailedScheduleTimeTo: Date;
            detailedScheduleDelayReason: string;
            requestId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        NotPossible: (import("@prisma/client/runtime").GetResult<{
            id: number;
            statusType: string;
            setOn: Date;
            orderId: number;
            requestId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Postponed: (import("@prisma/client/runtime").GetResult<{
            id: number;
            statusType: string;
            setOn: Date;
            nextContactAttemptOn: Date;
            postponedReason: string;
            orderId: number;
            requestId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Cancelled: (import("@prisma/client/runtime").GetResult<{
            id: number;
            statusType: string;
            setOn: Date;
            cancellationReason: string;
            createdAt: Date;
            updatedAt: Date;
            orderId: number;
            requestId: number;
        }, unknown, never> & {})[];
        Rejected: (import("@prisma/client/runtime").GetResult<{
            id: number;
            statusType: number;
            setOn: Date;
            reason: string;
            reasonText: string;
            requestId: number;
            orderId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        ClosedContractPartner: ({
            recordedSystem: ({
                property: import("@prisma/client/runtime").GetResult<{
                    id: number;
                    hotwatersupplyType_central: boolean;
                    hotwatersupplyType_decentral: boolean;
                }, unknown, never> & {};
                drinkingWaterFacility: import("@prisma/client/runtime").GetResult<{
                    id: number;
                    consecutiveNumber: number;
                    usageType: string;
                    usageTypeOthers: string;
                    numberSuppliedUnits: number;
                    numberDrinkingWaterHeater: number;
                    totalVolumeLitres: number;
                    pipingSystemType_Circulation: boolean;
                    pipingSystemType_Waterbranchline: boolean;
                    pipingSystemType_Pipetraceheater: boolean;
                    pipingVolumeGr3Litres: boolean;
                    deadPipeKnown: boolean;
                    deadPipesPosition: string;
                    numberAscendingPipes: number;
                    aerosolformation: boolean;
                    explanation: string;
                    numberSuppliedPersons: number;
                    pipeworkSchematicsAvailable: boolean;
                    numberColdWaterLegs: number;
                    numberHotWaterLegs: number;
                    temperatureCirculationDWH_A: number;
                    temperatureCirculationDWH_B: number;
                    heatExchangerSystem_central: boolean;
                    heatExchangerSystem_districtheating: boolean;
                    heatExchangerSystem_continuousflowprinciple: boolean;
                }, unknown, never> & {};
                services: (import("@prisma/client/runtime").GetResult<{
                    id: number;
                    articleNumber_ista: number;
                    quantity: number;
                    unit: string;
                    extraordinaryExpenditure: boolean;
                    purchasePrice_ista: number;
                    warranty: boolean;
                    addressId: number;
                    recordedSystemId: number;
                }, unknown, never> & {})[];
            } & import("@prisma/client/runtime").GetResult<{
                id: number;
                closedContractPartnerId: number;
                drinkingWaterFacilityId: number;
                propertyId: number;
            }, unknown, never> & {})[];
            suppliedDocuments: (import("@prisma/client/runtime").GetResult<{
                id: number;
                closedContractPartnerId: number;
                documentId: number;
            }, unknown, never> & {})[];
            ReportOrderStatusRequest: (import("@prisma/client/runtime").GetResult<{
                id: number;
                environment: string;
                language: string;
                consumer: string;
                closedContractPartnerId: number;
            }, unknown, never> & {})[];
        } & import("@prisma/client/runtime").GetResult<{
            id: number;
            orderstatusType: number;
            setOn: Date;
            deficiencyDescription: string;
            registrationHealthAuthoritiesOn: Date;
            extraordinaryExpenditureReason: string;
            orderId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Customer: import("@prisma/client/runtime").GetResult<{
            id: number;
            firstName: string;
            lastName: string;
            addressId: number;
            phoneNumber: string;
            street: string;
            zipCode: string;
            email: string;
            country: string;
            place: string;
            companyName: string;
            fax: string;
            propertyNumber: string;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {};
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        number: string;
        remarkExternal: string;
        createdAt: Date;
        actualStatus: import(".prisma/client").Status;
        customerId: number;
        updatedAt: Date;
    }, unknown, never> & {}>;
    updateStatus(orderDTO: OrderDto): Promise<{
        status: (import("@prisma/client/runtime").GetResult<{
            id: number;
            type: string;
            setOn: Date;
            executionOnSiteDone: boolean;
            orderId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Received: ({
            CustomerContact: (import("@prisma/client/runtime").GetResult<{
                id: number;
                contactAttemptOn: Date;
                contactPersonCustomer: string;
                agentCP: string;
                result: string;
                remark: string;
                orderId: number;
                plannedId: number;
                receivedId: number;
                statusReportId: number;
            }, unknown, never> & {})[];
            Request: import("@prisma/client/runtime").GetResult<{
                id: number;
                environment: string;
                language: string;
                consumer: string;
                cancelledId: number;
                notPossibleId: number;
                plannedId: number;
                postponedId: number;
                receivedId: number;
                rejectedId: number;
            }, unknown, never> & {};
        } & import("@prisma/client/runtime").GetResult<{
            id: number;
            orderId: number;
            orderstatusType: string;
            setOn: Date;
            requestId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Planned: (import("@prisma/client/runtime").GetResult<{
            id: number;
            orderId: number;
            orderstatusType: string;
            setOn: Date;
            detailedScheduleDate: Date;
            detailedScheduleTimeFrom: Date;
            detailedScheduleTimeTo: Date;
            detailedScheduleDelayReason: string;
            requestId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        CustomerContacts: (import("@prisma/client/runtime").GetResult<{
            id: number;
            contactAttemptOn: Date;
            contactPersonCustomer: string;
            agentCP: string;
            result: string;
            remark: string;
            orderId: number;
            plannedId: number;
            receivedId: number;
            statusReportId: number;
        }, unknown, never> & {})[];
        NotPossible: (import("@prisma/client/runtime").GetResult<{
            id: number;
            statusType: string;
            setOn: Date;
            orderId: number;
            requestId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Postponed: (import("@prisma/client/runtime").GetResult<{
            id: number;
            statusType: string;
            setOn: Date;
            nextContactAttemptOn: Date;
            postponedReason: string;
            orderId: number;
            requestId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Cancelled: (import("@prisma/client/runtime").GetResult<{
            id: number;
            statusType: string;
            setOn: Date;
            cancellationReason: string;
            createdAt: Date;
            updatedAt: Date;
            orderId: number;
            requestId: number;
        }, unknown, never> & {})[];
        Rejected: (import("@prisma/client/runtime").GetResult<{
            id: number;
            statusType: number;
            setOn: Date;
            reason: string;
            reasonText: string;
            requestId: number;
            orderId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        ClosedContractPartner: (import("@prisma/client/runtime").GetResult<{
            id: number;
            orderstatusType: number;
            setOn: Date;
            deficiencyDescription: string;
            registrationHealthAuthoritiesOn: Date;
            extraordinaryExpenditureReason: string;
            orderId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {})[];
        Customer: import("@prisma/client/runtime").GetResult<{
            id: number;
            firstName: string;
            lastName: string;
            addressId: number;
            phoneNumber: string;
            street: string;
            zipCode: string;
            email: string;
            country: string;
            place: string;
            companyName: string;
            fax: string;
            propertyNumber: string;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {};
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        number: string;
        remarkExternal: string;
        createdAt: Date;
        actualStatus: import(".prisma/client").Status;
        customerId: number;
        updatedAt: Date;
    }, unknown, never> & {}>;
    deleteOrder(orderId: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        number: string;
        remarkExternal: string;
        createdAt: Date;
        actualStatus: import(".prisma/client").Status;
        customerId: number;
        updatedAt: Date;
    }, unknown, never> & {}>;
    closedContractPartner(dto: ClosedContractPartnerDto): (dto: ClosedContractPartnerDto) => any;
    done(dto: DoneDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        number: string;
        remarkExternal: string;
        createdAt: Date;
        actualStatus: import(".prisma/client").Status;
        customerId: number;
        updatedAt: Date;
    }, unknown, never> & {}>;
    reportStatusToISTA(dto: OrderDto): void;
}
