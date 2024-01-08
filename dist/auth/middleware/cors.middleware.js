"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorsMiddleware = void 0;
const common_1 = require("@nestjs/common");
let CorsMiddleware = class CorsMiddleware {
    use(req, res, next) {
        throw new Error("Method not implemented.");
    }
};
CorsMiddleware = __decorate([
    (0, common_1.Injectable)()
], CorsMiddleware);
exports.CorsMiddleware = CorsMiddleware;
function Middleware() {
    throw new Error("Function not implemented.");
}
function processOptions(options) {
    const defaultOptions = {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        maxAge: 86400
    };
    const mergedOptions = Object.assign({}, defaultOptions, options);
    return mergedOptions;
}
function isAllowedOrigin(origin, allowedOrigins) {
    if (allowedOrigins === '*') {
        return true;
    }
    if (Array.isArray(allowedOrigins)) {
        return allowedOrigins.indexOf(origin) !== -1;
    }
    if (typeof allowedOrigins === 'string') {
        return origin === allowedOrigins;
    }
    if (allowedOrigins instanceof RegExp) {
        return allowedOrigins.test(origin);
    }
    return false;
}
function cors(options) {
    const corsOptions = processOptions(options);
    return function corsMiddleware(req, res, next) {
        const origin = req.headers.origin;
        if (isAllowedOrigin(origin, corsOptions.origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
        if (req.method === 'OPTIONS') {
            res.setHeader('Access-Control-Allow-Methods', corsOptions.methods.join(', '));
            res.setHeader('Access-Control-Allow-Headers', corsOptions.allowedHeaders.join(', '));
            res.setHeader('Access-Control-Max-Age', corsOptions.maxAge);
            res.end();
        }
        else {
            next();
        }
    };
}
//# sourceMappingURL=cors.middleware.js.map