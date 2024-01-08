import { NestMiddleware } from "@nestjs/common/interfaces/middleware";
export declare class CorsMiddleware implements NestMiddleware {
    use(req: any, res: any, next: (error?: any) => void): void;
}
