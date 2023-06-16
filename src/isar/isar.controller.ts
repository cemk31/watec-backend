import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { IsarService } from "./isar.service";
import { CreateAddressDTO } from "./dto/create-address.dto";
import { GetUser } from "src/auth/decorator";

@UseGuards(JwtGuard)
@Controller('isar')
export class IsarController {
    constructor(
        private isarService: IsarService,
    ) {

    }

    // @Get("addresses/:id")
    //     async getAllAddress(@GetUser('id') userId: number) {
    //         return this.isarService.getAllAddresses(userId);
    //     }

    // @Post("address")
    // async createAddress(@GetUser('id') userId: number, @Body() dto: CreateAddressDTO) {
    //     return this.isarService.createAddress(userId, dto);
    // }

    // @Patch()

    // @Post()

    // @Delete()

}