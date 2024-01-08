"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlToJsonMiddleware = void 0;
const common_1 = require("@nestjs/common");
const xml2js = require("xml2js");
let XmlToJsonMiddleware = class XmlToJsonMiddleware {
    use(req, res, next) {
        if (req.headers['content-type'] === 'application/xml' || req.headers['content-type'] === 'text/xml') {
            let xml = '';
            req.setEncoding('utf8');
            req.on('data', function (chunk) {
                xml += chunk;
            });
            req.on('end', function () {
                xml2js.parseString(xml, (err, jsonPayload) => {
                    if (err) {
                        res.status(400).send('Invalid XML format');
                    }
                    else {
                        req.body = jsonPayload;
                        next();
                    }
                });
            });
        }
        else {
            next();
        }
    }
};
XmlToJsonMiddleware = __decorate([
    (0, common_1.Injectable)()
], XmlToJsonMiddleware);
exports.XmlToJsonMiddleware = XmlToJsonMiddleware;
//# sourceMappingURL=xml-to-json.middleware.js.map