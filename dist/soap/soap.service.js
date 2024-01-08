"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoapService = void 0;
const xml2js = require("xml2js");
class SoapService {
    async xmlToJson(xml) {
        return new Promise((resolve, reject) => {
            xml2js.parseString(xml, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    async reportOrderStatus(xml) {
        const jsonPayload = await this.xmlToJson(xml);
        return {
            message: 'Order status reported',
        };
    }
}
exports.SoapService = SoapService;
//# sourceMappingURL=soap.service.js.map