import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { IstaService } from "./ista.service";

@UseGuards(JwtGuard)
@Controller('ista')
export class IstaController {
    constructor(
        private istaService: IstaService,
    ) {

    }

    //Received to Us
    
    //Planned - from us

    //Execution on site done 

    //closed cp - Übernahme TWA

    //Rejected 

    //customer contact not possible 

    //customer contact postponed 

    //CANCELLED

    //EXECUTION ON SITE NOT POSSIBLE

}