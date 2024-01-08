import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerOrderDTO, CustomerDTO, OrderDto, ReceivedDto } from './dto';
import { RejectedDto } from './dto/RejectedDto';
import { PostponedDto } from './dto/PostponedDto';
import { Cancelled, ClosedContractPartner, NotPossible, Order, Planned, Postponed } from '@prisma/client';
import { CancelledDto } from './dto/CancelledDto';
import { PlannedDto } from './dto/PlannedDto';
import { NotPossibleDto } from './dto/NotPossibleDto';
import { ClosedContractPartnerDto } from './dto/ClosedContractPartnerDto';
import { ConfigService } from '@nestjs/config';
export declare class IstaService {
    private prisma;
    private configService;
    private client;
    constructor(prisma: PrismaService, configService: ConfigService);
    receivedOrder(dto: CreateCustomerOrderDTO): Promise<{
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
    orderReceived(dto: CreateCustomerOrderDTO): Promise<{
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
    updateOrder(orderId: number, dto: OrderDto): Promise<{
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
    orderRejected(orderId: number, requestId: number, dto: RejectedDto): Promise<void>;
    orderPostponed(orderId: number, requestId: number | null, dto: PostponedDto): Promise<Postponed | null>;
    orderCancelled(orderId: number, requestId: number | null, dto: CancelledDto): Promise<Cancelled | null>;
    orderPlanned(orderId: number, requestId: number | null, dto: PlannedDto): Promise<Planned | null>;
    orderNotPossible(orderId: number, requestId: number | null, dto: NotPossibleDto): Promise<NotPossible | null>;
    orderClosedContractPartner(orderId: number | null, dto: ClosedContractPartnerDto): Promise<ClosedContractPartner | null>;
    updateOrderReceived(orderId: number | null, dto: ReceivedDto): Promise<Order | null>;
    reportOrderStatus(payload: any): Promise<any>;
    deleteOrder(orderId: number): Promise<Order | null>;
}
