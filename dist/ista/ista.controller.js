"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IstaController = void 0;
const common_1 = require("@nestjs/common");
const guard_1 = require("../auth/guard");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
const PlannedDto_1 = require("./dto/PlannedDto");
const ista_service_1 = require("./ista.service");
const RejectedDto_1 = require("./dto/RejectedDto");
const PostponedDto_1 = require("./dto/PostponedDto");
const CancelledDto_1 = require("./dto/CancelledDto");
const NotPossibleDto_1 = require("./dto/NotPossibleDto");
const ClosedContractPartnerDto_1 = require("./dto/ClosedContractPartnerDto");
const create_done_dto_1 = require("../auftrag/dto/create-done.dto");
let IstaController = class IstaController {
    constructor(istaService) {
        this.istaService = istaService;
    }
    createOrder(dto) {
        return this.istaService.createOrder(dto);
    }
    createNewOrder(dto) {
        console.log('createNewOrder');
        console.log(dto);
        return this.istaService.orderReceived(dto);
    }
    updateOrder(dto) {
        console.log('updateOrder DTO', dto);
        const orderId = Number(dto.orderId);
        return this.istaService.updateOrderReceived(orderId, dto);
    }
    createCustomerAndOrderById(customerId, received) {
        console.log('received', received);
        const order = this.istaService.receivedOrderWithCustomerId(customerId, received);
        return order;
    }
    createCustomer(dto) {
        const customer = this.istaService.createCustomer(dto);
        return customer;
    }
    updateCustomer(customerId, dto) {
        return this.istaService.updateCustomer(customerId, dto);
    }
    getCustomerById(customerId) {
        return this.istaService.getCustomerById(customerId);
    }
    orderPlanned(dto) {
        console.log('orderPlanned', dto);
        return this.istaService.orderPlanned(dto.orderId, dto.requestId, dto);
    }
    orderClosed(dto) {
        return this.istaService.orderClosedContractPartner(dto.orderId, dto);
    }
    async orderRejected(dto) {
        try {
            const orderDTO = new dto_1.OrderDto();
            orderDTO.rejected = [dto];
            const result = await this.istaService.orderRejected(dto.orderId, dto.requestId, dto);
            return result;
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('Ein Fehler ist aufgetreten', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    orderNotPossible(dto) {
        return this.istaService.orderNotPossible(dto.orderId, dto.requestId, dto);
    }
    orderPostponed(dto) {
        return this.istaService.orderPostponed(dto.orderId, dto.requestId, dto);
    }
    orderCancelled(dto) {
        return this.istaService.orderCancelled(dto.orderId, dto.requestId, dto);
    }
    getAllOrders() {
        return this.istaService.getAllOrders();
    }
    getOrderById(orderId) {
        return this.istaService.getOrderById(orderId);
    }
    updateStatus(orderDTO) {
        console.log(orderDTO);
        return this.istaService.updateOrder(orderDTO.id, orderDTO);
    }
    deleteOrder(orderId) {
        return this.istaService.deleteOrder(orderId);
    }
    closedContractPartner(dto) {
        const closedContractPartner = this.istaService.orderClosedContractPartner(dto.orderId, dto);
        console.log('closedContractPartner', closedContractPartner);
        if (closedContractPartner !== null) {
            return this.closedContractPartner;
        }
    }
    done(dto) {
        console.log('done', dto);
        return this.istaService.doneOrder(dto.orderId);
    }
    reportStatusToISTA(dto) {
        console.log('reportStatus', dto);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.OrderDto]),
    __metadata("design:returntype", void 0)
], IstaController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Post)('/received'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCustomerOrderDTO]),
    __metadata("design:returntype", void 0)
], IstaController.prototype, "createNewOrder", null);
__decorate([
    (0, common_1.Post)('/create-received'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ReceivedDto]),
    __metadata("design:returntype", void 0)
], IstaController.prototype, "updateOrder", null);
__decorate([
    (0, common_1.Post)('/customerOrder/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.ReceivedDto]),
    __metadata("design:returntype", void 0)
], IstaController.prototype, "createCustomerAndOrderById", null);
__decorate([
    (0, common_1.Post)('/customer'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CustomerDTO]),
    __metadata("design:returntype", void 0)
], IstaController.prototype, "createCustomer", null);
__decorate([
    (0, common_1.Patch)('/customer/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.CustomerDTO]),
    __metadata("design:returntype", void 0)
], IstaController.prototype, "updateCustomer", null);
__decorate([
    (0, common_1.Get)('/customer/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], IstaController.prototype, "getCustomerById", null);
__decorate([
    (0, common_1.Post)('/planned'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PlannedDto_1.PlannedDto]),
    __metadata("design:returntype", void 0)
], IstaController.prototype, "orderPlanned", null);
__decorate([
    (0, common_1.Post)('/closed'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ClosedContractPartnerDto_1.ClosedContractPartnerDto]),
    __metadata("design:returntype", void 0)
], IstaController.prototype, "orderClosed", null);
__decorate([
    (0, common_1.Post)('/rejected'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RejectedDto_1.RejectedDto]),
    __metadata("design:returntype", Promise)
], IstaController.prototype, "orderRejected", null);
__decorate([
    (0, common_1.Post)('/notPossible'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NotPossibleDto_1.NotPossibleDto]),
    __metadata("design:returntype", void 0)
], IstaController.prototype, "orderNotPossible", null);
__decorate([
    (0, common_1.Post)('/postponed'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PostponedDto_1.PostponedDto]),
    __metadata("design:returntype", void 0)
], IstaController.prototype, "orderPostponed", null);
__decorate([
    (0, common_1.Post)('/cancelled'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CancelledDto_1.CancelledDto]),
    __metadata("design:returntype", void 0)
], IstaController.prototype, "orderCancelled", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IstaController.prototype, "getAllOrders", null);
__decorate([
    (0, common_1.Get)('/order/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], IstaController.prototype, "getOrderById", null);
__decorate([
    (0, common_1.Patch)('/order/:id'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.OrderDto]),
    __metadata("design:returntype", void 0)
], IstaController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)('/order/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], IstaController.prototype, "deleteOrder", null);
__decorate([
    (0, common_1.Post)('/cp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ClosedContractPartnerDto_1.ClosedContractPartnerDto]),
    __metadata("design:returntype", void 0)
], IstaController.prototype, "closedContractPartner", null);
__decorate([
    (0, common_1.Post)('/done'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_done_dto_1.DoneDto]),
    __metadata("design:returntype", void 0)
], IstaController.prototype, "done", null);
__decorate([
    (0, common_1.Post)('/sync'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SyncDto]),
    __metadata("design:returntype", void 0)
], IstaController.prototype, "reportStatusToISTA", null);
IstaController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, swagger_1.ApiTags)('ISTA API'),
    (0, common_1.Controller)('ista'),
    __metadata("design:paramtypes", [ista_service_1.IstaService])
], IstaController);
exports.IstaController = IstaController;
//# sourceMappingURL=ista.controller.js.map