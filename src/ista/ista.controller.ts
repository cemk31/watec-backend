import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { ApiTags } from "@nestjs/swagger";
import { OrderDto } from "./dto";
import { PlannedDto } from "./dto/PlannedDto";
import { IstaService } from "./ista.service";

@UseGuards(JwtGuard)
@ApiTags('ISTA API')
@Controller('ista')
export class IstaController {

    mockOrderDto: OrderDto = {
        number: '123456789',
        remarkExternal: 'External Remark',
        createdAt: new Date(),
        status: [
            {
                id: 1,
                orderId: 2,
                setOn: new Date(),
                executionOnSiteDone: true,
                type: 'Type1'
            }
        ],
        customerContacts: [
            {
                agentCP: 'Agent CP',
                contactPersonCustomer: 'Customer',
                contactAttemptOn: new Date(),
                remark: 'Remark',
                result: 'Success',
            }
        ],
        notPossible: [
            {
                id: 1,
                requestId: 1,
                orderId: 1,
                statusType: 'Type1',
                setOn: new Date(),
                contact: [{
                    id: 1,
                    contactAttemptOn: new Date(),
                    contactPerson: 'John Doe',
                    agentCP: 'Agent A',
                    result: 'Result',
                    remark: 'Remark',
                    notPossibleId: 1,
                    rejectedId: 1,
                    postponedId: 1,
                    cancelledId: 1
                }],
            }
        ],
        postponed: [
            {
              id: 1,
              requestId: 1,
              orderId: 1,
              statusType: 'Type1',
              setOn: new Date(),
              contact: [{
                id: 1,
                contactAttemptOn: new Date(),
                contactPerson: 'John Doe',
                agentCP: 'Agent A',
                result: 'Result',
                remark: 'Remark',
                notPossibleId: 1,
                rejectedId: 1,
                postponedId: 1,
                cancelledId: 1
              }],
              nextContactAttemptOn: new Date(),
              postponedReason: 'Postponed due to XYZ'
            }
          ],          
        cancelled: [
            {
                id: 1,
                requestId: 1,
                orderId: 1,
                statusType: 'Cancelled',
                setOn: new Date(),
                contact: [{
                    id: 1,
                    contactAttemptOn: new Date(),
                    contactPerson: 'John Doe',
                    agentCP: 'Agent A',
                    result: 'Result',
                    remark: 'Remark',
                    notPossibleId: 1,
                    rejectedId: 1,
                    postponedId: 1,
                    cancelledId: 1
                }],
                cancellationReason: 'Cancelled due to XYZ',
            }
        ],
        rejected: [
            {
                id: 1,
                requestId: 1,
                orderId: 1,
                statusType: 2,
                setOn: new Date(),
                contact: [{
                    id: 1,
                    contactAttemptOn: new Date(),
                    contactPerson: 'John Doe',
                    agentCP: 'Agent A',
                    result: 'Result',
                    remark: 'Remark',
                    notPossibleId: 1,
                    rejectedId: 1,
                    postponedId: 1,
                    cancelledId: 1
                }],
                reason: 'Rejected due to ABC',
                reasonText: 'Additional Rejection Details',
            }
        ],
        closedContractPartner: [
            {
                id: 1,
                orderId: 1,
                orderstatusType: 1,
                setOn: new Date(),
                contact: [{
                    id: 1,
                    contactAttemptOn: new Date(),
                    contactPerson: 'John Doe',
                    agentCP: 'Agent A',
                    result: 'Result',
                    remark: 'Remark',
                    notPossibleId: 1,
                    rejectedId: 1,
                    postponedId: 1,
                    cancelledId: 1
                }],
                deficiencyDescription: 'Deficiency Description',
                registrationHealthAuthoritiesOn: new Date(),
                extraordinaryExpenditureReason: 'Extraordinary Expenditure Reason',
                suppliedDocuments: [],
                recordedSystem: [],
                reportOrderStatusRequest: [], // Assuming this is an array of DTOs
                
            }
        ],

        planned: [
            {
                id: 1,
                orderId: 1,
                orderstatusType: "1",
                setOn: new Date(),
                customerContact: [
                    {
                        agentCP: 'Agent CP',
                        contactPersonCustomer: 'Customer',
                        contactAttemptOn: new Date(),
                        remark: 'Remark',
                        result: 'Success'
                    }
                ],
                detailedScheduleDate: new Date(),
                detailedScheduleTimeFrom: new Date(),
                detailedScheduleTimeTo: new Date(),
                detailedScheduleDelayReason: 'Delay Reason',
                requestId: 1,
            }
        ],
        received: [
            {
                id: null,
                orderId: null,
                orderstatusType: 'Status Type',
                setOn: new Date(),
                customerContact: [
                    {
                        agentCP: 'Agent CP',
                        contactPersonCustomer: 'Customer',
                        contactAttemptOn: new Date(),
                        remark: 'Remark',
                        result: 'Success'
                        // fill other properties for the CustomerContactDto
                    }
                ],
                requestId: 1,
            }
        ],
        id: 0
    };
      
    
    constructor(
        private istaService: IstaService,
    ) {}

    //createOrder
    @Post()
    createOrder(@Body() dto: OrderDto) {
        return this.istaService.createOrder(dto);
    }

    //createTestOrder
    @Post("/test")
    createTestOrder() {
        return this.istaService.createOrder(this.mockOrderDto);
    }

    @Post("/received")
    createTestOrderReceived() {
        return this.istaService.orderReceived(this.mockOrderDto);
    }

    //Received to Us
    @Post()
    orderReceived(@Body() dto: OrderDto) {
        
    }
    //Planned - from us
    orderPlanned(@Body() dto: PlannedDto) {

    }
    //Execution on site done 

    //closed cp - Übernahme TWA

    //Rejected 

    //customer contact not possible 

    //customer contact postponed 

    //CANCELLED

    //EXECUTION ON SITE NOT POSSIBLE


    //GetAllOrders
    @Get()
    getAllOrders() {
        console.log("getAllOrders");
        return this.istaService.getAllOrders();
    }

    //Create new empty order
    @Post("/new")
    createNewOrder(@Body() dto: OrderDto) {
        console.log("createNewOrder");
        return this.istaService.createNewOrder(dto);
    }
}
