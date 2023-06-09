import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async createCustomer(userId: number, dto: CreateCustomerDTO) {
    const customer = await this.prisma.customer.create({
      data: {
        userId,
        ...dto,
      },
    });
    return customer;
  }

  async getCustomers(userId: number) {
    return this.prisma.customer.findMany({
      where: {
        userId,
      },
    });
  }
}
