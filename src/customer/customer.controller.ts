import { UseGuards, Controller, Get, Body, Post } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { GetUser } from 'src/auth/decorator';
import { CustomerService } from './customer.service';

@UseGuards(JwtGuard)
@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  createCustomer(
    @GetUser('id') userId: number,
    @Body() dto: CreateCustomerDTO,
  ) {
    return this.customerService.createCustomer(userId, dto);
  }
  @Get()
  getAllCustomersForUser(
    @GetUser('id') userId: number,
  ) {
    return this.customerService.getCustomers(userId);
  }
}
