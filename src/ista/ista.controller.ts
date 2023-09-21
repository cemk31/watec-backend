import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { ApiTags } from "@nestjs/swagger";
import { CreateCustomerOrderDTO, CustomerDTO, OrderDto, ReceivedDto } from "./dto";
import { PlannedDto } from "./dto/PlannedDto";
import { IstaService } from "./ista.service";
import { Order, Rejected } from "@prisma/client";
import { RejectedDto } from "./dto/RejectedDto";
import { PostponedDto } from "./dto/PostponedDto";
import { CancelledDto } from "./dto/CancelledDto";
import { NotPossibleDto } from "./dto/NotPossibleDto";
import { ClosedContractPartnerDto } from "./dto/ClosedContractPartnerDto";

@UseGuards(JwtGuard)
@ApiTags('ISTA API')
@Controller('ista')
export class IstaController {

    mockOrderDto: OrderDto = {
        id: 1,
        number: '123456789',
        remarkExternal: 'External Remark',
        createdAt: new Date(),
        status: [
            {
                id: 1,
                orderId: null,
                setOn: new Date(),
                executionOnSiteDone: true,
                type: 'Type1'
            }
        ],
        CustomerContacts: [
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
                orderId: null,
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
              orderId: null,
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
                orderId: null,
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
                orderId: null,
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
                orderId: null,
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
                orderId: null,
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
                customerContacts: [
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
        customer:
            {
                name: 'John Doe',
                email: 'john.doe@example.com',
                phoneNumber: '+1234567890',
                lastName: 'Doe',
                firstName: 'John',
                street: '123 Main St',
                zipCode: '12345',
                place: 'Springfield',
                country: 'USA'
            }
        };
      
    
    constructor(
        private istaService: IstaService,
    ) {}

    //createOrder
    @Post()
    createOrder(@Body() dto: OrderDto) {
        return this.istaService.createOrder(dto);
    }

    //RECEIVED - Create new empty order
    @Post("/received")
    createNewOrder(@Body() dto: CreateCustomerOrderDTO) {
        console.log("createNewOrder");
        return this.istaService.orderReceived(dto);
    }

    @Put("/received")
    updateOrder(@Body() dto: ReceivedDto) {
        console.log("updateOrder");
        const orderId = Number(dto.orderId);
        return this.istaService.updateOrderReceived(orderId, dto);
    }

    //createTestOrder
    @Post("/test")
    createTestOrder() {
        return this.istaService.createOrder(this.mockOrderDto);
    }

    @Post("/customerOrder")
    createCustomerAndOrder(@Body() dto: CreateCustomerOrderDTO){
        // const customer = this.istaService.createCustomer(dto.customer);
        console.log("customer", dto.Customer);
        console.log("customer", dto.Received);

        const order = this.istaService.orderReceived(dto);

        return order;
    }
    
    //RECEIVED - Create new empty customer & order
    @Post("/customer")
    createCustomer(@Body() dto: CustomerDTO){
        const customer = this.istaService.createCustomer(dto);
        return customer;
    }

    @Get("/customer/:id")
    getCustomerById(@Param('id', ParseIntPipe) customerId: number){
        return this.istaService.getCustomerById(customerId);
    }

    //Planned - from us 
    @Post("/planned")
    orderPlanned(@Body() dto: PlannedDto) {
        return this.istaService.orderPlanned(dto.orderId, dto.requestId, dto);
    }
    //Execution on site done 

    //closed cp - Übernahme TWA
    @Post("/closed")
    orderClosed(@Body() dto: ClosedContractPartnerDto) {
        return this.istaService.orderClosedContractPartner(dto.orderId, dto);
    }
    //Rejected
    @Post("/rejected")
    async orderRejected(@Body() dto: RejectedDto): Promise<any> {
        try {
          const orderDTO = new OrderDto();
          orderDTO.rejected = [dto];  // Option 2: Erstellen Sie ein Array mit dto als einzigem Element
          
          const result = await this.istaService.orderRejected(dto.orderId, dto.requestId, dto);

          return result;
        } catch (error) {
          // Fehlerbehandlung
          console.error(error);
          throw new HttpException('Ein Fehler ist aufgetreten', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }

    //customer contact not possible 
    @Post("/notPossible")
    orderNotPossible(@Body() dto: NotPossibleDto) {
        return this.istaService.orderNotPossible(dto.orderId, dto.requestId, dto);
    }
    //customer contact postponed 
    @Post("/postponed")
    orderPostponed(@Body() dto: PostponedDto) {
        return this.istaService.orderPostponed(dto.orderId, dto.requestId, dto);
    }
    //CANCELLED
    @Post("/cancelled")
    orderCancelled(@Body() dto: CancelledDto) {
        return this.istaService.orderCancelled(dto.orderId, dto.requestId, dto);
    }

    //EXECUTION ON SITE NOT POSSIBLE


    //GetAllOrders
    @Get()
    getAllOrders() {
        return this.istaService.getAllOrders();
    }

    //Get Order by Id
    @Get('/order/:id')
    getOrderById(@Param('id', ParseIntPipe) orderId: number) {
        return this.istaService.getOrderById(orderId);
    }

    @Patch()
    updateStatus(@Body() orderDTO : OrderDto){
      console.log(orderDTO);
      return this.istaService.updateOrder(orderDTO.id, orderDTO);
    }
}