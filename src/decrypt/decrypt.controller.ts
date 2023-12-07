import { UseGuards, Controller, Body, Post, Param } from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { DecryptService } from "./decrypt.service";
import { GetUser } from "src/auth/decorator";
import { CreateAddressDTO } from "src/isar/dto";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";

@ApiTags('decrpyt')
@Controller('decrpyt')
export class decryptController {
    constructor(private decryptService: DecryptService) {

    }

    @Post()
    @ApiOperation({ summary: 'Decrypt String' })
    async decrypt(@Param('text') text: string) {
        return this.decryptService.decrypt(text);
    }

    @Post('encrypt')
    @ApiOperation({ summary: 'Encrypt String' })
    async encrypt(@Param('text') text: string) {
        return this.decryptService.encrypt(text);
    }

}