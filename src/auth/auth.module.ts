import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwStrategy } from "./strategy";

@Module({
    imports: [JwtModule.register({
        
    })],
    controllers: [AuthController],
    providers: [AuthService, JwStrategy]
})

export class AuthModule {}