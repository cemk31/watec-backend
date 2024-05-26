import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerDTO } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async createCustomer(userId: number, dto: CustomerDTO) {
    const customer = await this.prisma.customer.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        street: dto.street,
        zipCode: dto.zipCode,
        place: dto.place,
        country: dto.country,
        email: dto.email,
        phoneNumber: dto.phoneNumber,
        objekt: {
          create: dto.objekt,
        },
      },
    });
    return customer;
  }

  async getCustomers() {
    return this.prisma.customer.findMany({
      include: {
        orders: true,
      },
    });
  }

  async updateCustomer(userId: number, dto: CustomerDTO) {
    const customer = await this.prisma.customer.update({
      where: {
        id: userId,
      },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        street: dto.street,
        zipCode: dto.zipCode,
        place: dto.place,
        country: dto.country,
        email: dto.email,
        phoneNumber: dto.phoneNumber,
      },
    });
    return customer;
  }
}
