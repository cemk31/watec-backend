import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { IstaService } from "./ista.service";
import { ApiTags } from "@nestjs/swagger";
import { OrderDto } from "./dto";

@UseGuards(JwtGuard)
@ApiTags('ISTA API')
@Controller('ista')
export class IstaController {
    constructor(
        private istaService: IstaService,
    ) {

    }

    //createOrder
    @Post()
    createOrder(@Body() dto: OrderDto) {
        
    }

    //Received to Us
    @Post()
    orderReceived(@Body() dto: OrderDto) {
        
    }
    //Planned - from us

    //Execution on site done 

    //closed cp - Übernahme TWA

    //Rejected 

    //customer contact not possible 

    //customer contact postponed 

    //CANCELLED

    //EXECUTION ON SITE NOT POSSIBLE

}