import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateCustomerOrderDTO,
  CustomerDTO,
  ExecutionOnSiteNotPossibleDto,
  OrderDto,
  received,
  SyncDto,
} from './dto';
import { PlannedDto } from './dto/PlannedDto';
import { IstaService } from './ista.service';
import { RejectedDto } from './dto/RejectedDto';
import { PostponedDto } from './dto/PostponedDto';
import { CancelledDto } from './dto/CancelledDto';
import { NotPossibleDto } from './dto/NotPossibleDto';
import { ClosedContractPartnerDto } from './dto/ClosedContractPartnerDto';
import { DoneDto } from 'src/auftrag/dto/create-done.dto';
import { Received } from '@prisma/client';

@UseGuards(JwtGuard)
@ApiTags('ISTA API')
@Controller('ista')
export class IstaController {
  // mockOrderDto: OrderDto = {
  //   id: 1,
  //   number: '123456789',
  //   remarkExternal: 'External Remark',
  //   createdAt: new Date(),
  //   status: [
  //     {
  //       id: 1,
  //       orderId: null,
  //       setOn: new Date(),
  //       executionOnSiteDone: true,
  //       type: 'Type1',
  //     },
  //   ],
  //   CustomerContacts: [
  //     {
  //       agentCP: 'Agent CP',
  //       contactPersonCustomer: 'Customer',
  //       contactAttemptOn: new Date(),
  //       remark: 'Remark',
  //       result: 'Success',
  //     },
  //   ],
  //   notPossible: [
  //     {
  //       id: 1,
  //       requestId: 1,
  //       orderId: null,
  //       statusType: 'Type1',
  //       setOn: new Date(),
  //       contact: [
  //         {
  //           id: 1,
  //           contactAttemptOn: new Date(),
  //           contactPerson: 'John Doe',
  //           agentCP: 'Agent A',
  //           result: 'Result',
  //           remark: 'Remark',
  //           notPossibleId: 1,
  //           rejectedId: 1,
  //           postponedId: 1,
  //           cancelledId: 1,
  //         },
  //       ],
  //     },
  //   ],
  //   postponed: [
  //     {
  //       id: 1,
  //       requestId: 1,
  //       orderId: null,
  //       statusType: 'Type1',
  //       setOn: new Date(),
  //       contact: [
  //         {
  //           id: 1,
  //           contactAttemptOn: new Date(),
  //           contactPerson: 'John Doe',
  //           agentCP: 'Agent A',
  //           result: 'Result',
  //           remark: 'Remark',
  //           notPossibleId: 1,
  //           rejectedId: 1,
  //           postponedId: 1,
  //           cancelledId: 1,
  //         },
  //       ],
  //       nextContactAttemptOn: new Date(),
  //       postponedReason: 'Postponed due to XYZ',
  //     },
  //   ],
  //   cancelled: [
  //     {
  //       id: 1,
  //       requestId: 1,
  //       orderId: null,
  //       statusType: 'Cancelled',
  //       setOn: new Date(),
  //       contact: [
  //         {
  //           id: 1,
  //           contactAttemptOn: new Date(),
  //           contactPerson: 'John Doe',
  //           agentCP: 'Agent A',
  //           result: 'Result',
  //           remark: 'Remark',
  //           notPossibleId: 1,
  //           rejectedId: 1,
  //           postponedId: 1,
  //           cancelledId: 1,
  //         },
  //       ],
  //       cancellationReason: 'Cancelled due to XYZ',
  //     },
  //   ],
  //   rejected: [
  //     {
  //       id: 1,
  //       requestId: 1,
  //       orderId: null,
  //       statusType: 2,
  //       setOn: new Date(),
  //       contact: [
  //         {
  //           id: 1,
  //           contactAttemptOn: new Date(),
  //           contactPerson: 'John Doe',
  //           agentCP: 'Agent A',
  //           result: 'Result',
  //           remark: 'Remark',
  //           notPossibleId: 1,
  //           rejectedId: 1,
  //           postponedId: 1,
  //           cancelledId: 1,
  //         },
  //       ],
  //       reason: 'Rejected due to ABC',
  //       reasonText: 'Additional Rejection Details',
  //     },
  //   ],
  //   closedContractPartner: [
  //     {
  //       id: 1,
  //       orderId: null,
  //       orderstatusType: 1,
  //       setOn: new Date(),
  //       contact: [
  //         {
  //           id: 1,
  //           contactAttemptOn: new Date(),
  //           contactPerson: 'John Doe',
  //           agentCP: 'Agent A',
  //           result: 'Result',
  //           remark: 'Remark',
  //           notPossibleId: 1,
  //           rejectedId: 1,
  //           postponedId: 1,
  //           cancelledId: 1,
  //         },
  //       ],
  //       deficiencyDescription: 'Deficiency Description',
  //       registrationHealthAuthoritiesOn: new Date(),
  //       extraordinaryExpenditureReason: 'Extraordinary Expenditure Reason',
  //       suppliedDocuments: [],
  //       recordedSystem: [],
  //       reportOrderStatusRequest: [], // Assuming this is an array of DTOs
  //       customerContacts: [], // Add the missing property
  //     },
  //   ],

  //   planned: [
  //     {
  //       id: 1,
  //       orderId: null,
  //       orderstatusType: '1',
  //       setOn: new Date(),
  //       customerContact: [
  //         {
  //           agentCP: 'Agent CP',
  //           contactPersonCustomer: 'Customer',
  //           contactAttemptOn: new Date(),
  //           remark: 'Remark',
  //           result: 'Success',
  //         },
  //       ],
  //       detailedScheduleDate: new Date(),
  //       detailedScheduleTimeFrom: new Date(),
  //       detailedScheduleTimeTo: new Date(),
  //       detailedScheduleDelayReason: 'Delay Reason',
  //       requestId: 1,
  //     },
  //   ],
  //   received: [
  //     {
  //       id: null,
  //       orderId: null,
  //       orderstatusType: 'Status Type',
  //       setOn: new Date(),
  //       contactAttemptOn: new Date(),
  //       contactPersonCustomer: 'Customer',
  //       agentCP: 'Agent CP',
  //       result: 'Success',
  //       remark: 'Remark',
  //       customerContacts: [
  //         {
  //           agentCP: 'Agent CP',
  //           contactPersonCustomer: 'Customer',
  //           contactAttemptOn: new Date(),
  //           remark: 'Remark',
  //           result: 'Success',
  //           // fill other properties for the CustomerContactDto
  //         },
  //       ],
  //       requestId: 1,
  //     },
  //   ],
  //   customer: {
  //     name: 'John Doe',
  //     email: 'john.doe@example.com',
  //     phoneNumber: '+1234567890',
  //     lastName: 'Doe',
  //     firstName: 'John',
  //     street: '123 Main St',
  //     zipCode: '12345',
  //     place: 'Springfield',
  //     country: 'USA',
  //   },
  // };

  constructor(private istaService: IstaService) {}

  //createOrder
  @Post()
  createOrder(@Body() dto: OrderDto) {
    return this.istaService.createOrder(dto);
  }

  //RECEIVED - Create new empty order
  // @Post('/received')
  // createNewOrder(@Body() dto: CreateCustomerOrderDTO) {
  //   console.log('createNewOrder');
  //   console.log(dto);
  //   return this.istaService.orderReceived(dto);
  // }

  // @Post('/create-received')
  // updateOrder(@Body() dto: ReceivedDto) {
  //   console.log('updateOrder DTO', dto);
  //   const orderId = Number(dto.orderId);
  //   return this.istaService.updateOrderReceived(orderId, dto);
  // }

  @Post('/customerOrder/:id')
  createCustomerAndOrderById(
    @Param('id', ParseIntPipe) customerId: number,
    @Body() received: received,
  ) {
    console.log('received', received);
    const order = this.istaService.receivedOrderWithCustomerId(
      customerId,
      received,
    );
    return order;
  }

  //RECEIVED - Create new empty customer & order
  @Post('/customer')
  createCustomer(@Body() dto: CustomerDTO) {
    const customer = this.istaService.createCustomer(dto);
    return customer;
  }

  @Patch('/customer/:id')
  updateCustomer(
    @Param('id', ParseIntPipe) customerId: number,
    @Body() dto: CustomerDTO,
  ) {
    return this.istaService.updateCustomer(customerId, dto);
  }

  @Get('/customer/:id')
  getCustomerById(@Param('id', ParseIntPipe) customerId: number) {
    return this.istaService.getCustomerById(customerId);
  }

  //Planned - from us
  @Post('/planned')
  orderPlanned(@Body() dto: PlannedDto) {
    console.log('orderPlanned', dto);
    return this.istaService.orderPlanned(dto.orderId, dto.requestId, dto);
  }
  //Execution on site done

  //closed cp - Übernahme TWA
  @Post('/closed')
  orderClosed(@Body() dto: ClosedContractPartnerDto) {
    return this.istaService.orderClosedContractPartner(dto.orderId, dto);
  }
  //Rejected
  @Post('/rejected')
  async orderRejected(@Body() dto: RejectedDto): Promise<any> {
    try {
      const result = await this.istaService.orderRejected(dto);
      return result;
    } catch (error) {
      // Fehlerbehandlung
      console.error(error);
      throw new HttpException(
        'Ein Fehler ist aufgetreten',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //customer contact not possible
  @Post('/notPossible')
  orderNotPossible(@Body() dto: NotPossibleDto) {
    return this.istaService.orderNotPossible(dto.orderId, dto.requestId, dto);
  }
  //customer contact postponed
  @Post('/postponed')
  orderPostponed(@Body() dto: PostponedDto) {
    return this.istaService.orderPostponed(dto);
  }
  //CANCELLED
  @Post('/cancelled')
  orderCancelled(@Body() dto: CancelledDto) {
    return this.istaService.orderCancelled(dto.orderId, dto.requestId, dto);
  }

  @Post('/executionOnSiteNotPossible')
  orderExecutionOnSiteNotPossible(@Body() dto: ExecutionOnSiteNotPossibleDto) {
    // In ista.controller.ts, make sure to pass both arguments
    return this.istaService.orderExecutionOnSiteNotPossible(dto.orderId, dto);
  }

  //EXECUTION ON SITE NOT POSSIBLE

  //GetAllOrders
  @Get()
  getAllOrders() {
    return this.istaService.getAllOrders();
  }

  //Get Order by Id
  @Get('/order/:id')
  getOrderById(@Param('id', ParseIntPipe) orderId: number) {
    return this.istaService.getOrderById(orderId);
  }

  @Patch('/order/:id')
  updateStatus(@Body() orderDTO: OrderDto) {
    console.log(orderDTO);
    return this.istaService.updateOrder(orderDTO.id, orderDTO);
  }

  // @Post('/report-status')
  // async reportStatus(@Body() payload: any): Promise<any> {
  // return this.istaService.reportOrderStatus(payload);
  // }

  @Delete('/order/:id')
  deleteOrder(@Param('id', ParseIntPipe) orderId: number) {
    return this.istaService.deleteOrder(orderId);
  }

  @Post('/cp')
  closedContractPartner(@Body() dto: ClosedContractPartnerDto) {
    const closedContractPartner = this.istaService.orderClosedContractPartner(
      dto.orderId,
      dto,
    );
    console.log('closedContractPartner', closedContractPartner);
    if (closedContractPartner !== null) {
      return this.closedContractPartner;
    }
  }

  @Post('/done')
  done(@Body() dto: DoneDto) {
    console.log('done', dto);
    return this.istaService.doneOrder(dto.orderId);
  }

  @Post('/sync')
  reportStatusToISTA(@Body() dto: SyncDto) {
    console.log('reportStatus', dto);
  }
}
