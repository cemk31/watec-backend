import {
  UseGuards,
  Controller,
  Get,
  Body,
  Post,
  Put,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { CustomerDTO } from './dto/create-customer.dto';
import { GetUser } from 'src/auth/decorator';
import { CustomerService } from './customer.service';

@UseGuards(JwtGuard)
@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  createCustomer(@GetUser('id') userId: number, @Body() dto: CustomerDTO) {
    return this.customerService.createCustomer(userId, dto);
  }

  @Put('/:id')
  updateCustomer(
    @Param('id', ParseIntPipe) customerId: number,
    @Body() dto: CustomerDTO,
  ) {
    return this.customerService.updateCustomer(customerId, dto);
  }

  @Get()
  getAllCustomersForUser() {
    return this.customerService.getCustomers();
  }
}
