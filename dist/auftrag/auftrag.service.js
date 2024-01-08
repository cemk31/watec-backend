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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuftragService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AuftragService = class AuftragService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllAuftraege() {
        return this.prisma.auftrag.findMany();
    }
    async getSingleAuftrag(auftragId) {
        const auftrag = await this.prisma.auftrag.findUnique({
            where: { id: auftragId },
        });
        if (!auftrag) {
            throw new common_1.NotFoundException('Auftrag nicht gefunden');
        }
        return auftrag;
    }
    async createAuftrag(dto) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25;
        await this.prisma.auftrag.create({
            data: {
                done: dto === null || dto === void 0 ? void 0 : dto.done,
                emailEingang: dto === null || dto === void 0 ? void 0 : dto.emailEingang,
                bemerkung: dto === null || dto === void 0 ? void 0 : dto.bemerkung,
                vorgemerkt: dto === null || dto === void 0 ? void 0 : dto.vorgemerkt,
                objekt: {
                    create: {
                        liNr: (_a = dto.objekt) === null || _a === void 0 ? void 0 : _a.liNr,
                        adresseLi: (_b = dto.objekt) === null || _b === void 0 ? void 0 : _b.adresseLi,
                        plzLi: (_c = dto.objekt) === null || _c === void 0 ? void 0 : _c.plzLi,
                        ortLi: (_d = dto.objekt) === null || _d === void 0 ? void 0 : _d.ortLi,
                    },
                },
                auftraggeber: {
                    create: {
                        userId: (_e = dto.auftraggeber) === null || _e === void 0 ? void 0 : _e.userId,
                        ap: (_f = dto.auftraggeber) === null || _f === void 0 ? void 0 : _f.ap,
                        email: (_g = dto.auftraggeber) === null || _g === void 0 ? void 0 : _g.email,
                        ort: (_h = dto.auftraggeber) === null || _h === void 0 ? void 0 : _h.ort,
                        plz: (_j = dto.auftraggeber) === null || _j === void 0 ? void 0 : _j.plz,
                        strasse: (_k = dto.auftraggeber) === null || _k === void 0 ? void 0 : _k.strasse,
                        tel: (_l = dto.auftraggeber) === null || _l === void 0 ? void 0 : _l.tel,
                        auftraggebername: (_m = dto.auftraggeber) === null || _m === void 0 ? void 0 : _m.auftraggebername,
                    },
                },
                auftragsBestaetigung: {
                    create: {
                        auftragbestatigung: (_o = dto.auftragsbestaetigung) === null || _o === void 0 ? void 0 : _o.auftragbestatigung,
                        vwBestatigung: (_p = dto.auftragsbestaetigung) === null || _p === void 0 ? void 0 : _p.vwBestatigung,
                        terminiertZum: (_q = dto.auftragsbestaetigung) === null || _q === void 0 ? void 0 : _q.terminiertZum,
                        uhrzeit: (_r = dto.auftragsbestaetigung) === null || _r === void 0 ? void 0 : _r.uhrzeit,
                        aushang: (_s = dto.auftragsbestaetigung) === null || _s === void 0 ? void 0 : _s.aushang,
                        datumAushang: (_t = dto.auftragsbestaetigung) === null || _t === void 0 ? void 0 : _t.datumAushang,
                        agInformiert: (_u = dto.auftragsbestaetigung) === null || _u === void 0 ? void 0 : _u.agInformiert,
                        bgb: (_v = dto.auftragsbestaetigung) === null || _v === void 0 ? void 0 : _v.bgb,
                        bgbBericht: (_w = dto.auftragsbestaetigung) === null || _w === void 0 ? void 0 : _w.bgbBericht,
                        ssa: (_x = dto.auftragsbestaetigung) === null || _x === void 0 ? void 0 : _x.ssa,
                        bericht: (_y = dto.auftragsbestaetigung) === null || _y === void 0 ? void 0 : _y.bericht,
                        umb: (_z = dto.auftragsbestaetigung) === null || _z === void 0 ? void 0 : _z.umb,
                        ber: (_0 = dto.auftragsbestaetigung) === null || _0 === void 0 ? void 0 : _0.ber,
                        reNr: (_1 = dto.auftragsbestaetigung) === null || _1 === void 0 ? void 0 : _1.reNr,
                        reBetrag: (_2 = dto.auftragsbestaetigung) === null || _2 === void 0 ? void 0 : _2.reBetrag,
                        reNr2: (_3 = dto.auftragsbestaetigung) === null || _3 === void 0 ? void 0 : _3.reNr2,
                        reBetrag2: (_4 = dto.auftragsbestaetigung) === null || _4 === void 0 ? void 0 : _4.reBetrag2,
                        reNr2Erhalten: (_5 = dto.auftragsbestaetigung) === null || _5 === void 0 ? void 0 : _5.reNr2Erhalten,
                        dateien: (_6 = dto.auftragsbestaetigung) === null || _6 === void 0 ? void 0 : _6.dateien,
                        mahnung: (_7 = dto.auftragsbestaetigung) === null || _7 === void 0 ? void 0 : _7.mahnung,
                        mahnung1: (_8 = dto.auftragsbestaetigung) === null || _8 === void 0 ? void 0 : _8.mahnung1,
                        mahnungErhaten: (_9 = dto.auftragsbestaetigung) === null || _9 === void 0 ? void 0 : _9.mahnungErhalten,
                    },
                },
                email: { create: {
                        emailBetreff: (_10 = dto.email) === null || _10 === void 0 ? void 0 : _10.emailBetreff,
                        emailAnhang: (_11 = dto.email) === null || _11 === void 0 ? void 0 : _11.emailAnhang,
                        bestatigungVersendet: (_12 = dto.email) === null || _12 === void 0 ? void 0 : _12.bestatigungVersendet,
                        anfrageThema: (_13 = dto.email) === null || _13 === void 0 ? void 0 : _13.anfrageThema,
                        anfrageBestatigt: (_14 = dto.email) === null || _14 === void 0 ? void 0 : _14.anfrageBestatigt,
                        angebotErstellt: (_15 = dto.email) === null || _15 === void 0 ? void 0 : _15.angebotErstellt,
                        angebotsnummer: (_16 = dto.email) === null || _16 === void 0 ? void 0 : _16.angebotsnummer,
                        angebot: (_17 = dto.email) === null || _17 === void 0 ? void 0 : _17.angebot,
                    } },
                vwStatisch: { create: {
                        vwBuro: (_18 = dto.vwStatisch) === null || _18 === void 0 ? void 0 : _18.vwBuro,
                        vwMa: (_19 = dto.vwStatisch) === null || _19 === void 0 ? void 0 : _19.vwMa,
                        mailadresseVw: (_20 = dto.vwStatisch) === null || _20 === void 0 ? void 0 : _20.mailadresseVw,
                        telVw: (_21 = dto.vwStatisch) === null || _21 === void 0 ? void 0 : _21.telVw,
                    } },
                vwDynamisch: { create: {
                        vwBuro: (_22 = dto.vwStatisch) === null || _22 === void 0 ? void 0 : _22.vwBuro,
                        vwMa: (_23 = dto.vwStatisch) === null || _23 === void 0 ? void 0 : _23.vwMa,
                        mailadresseVw: (_24 = dto.vwStatisch) === null || _24 === void 0 ? void 0 : _24.mailadresseVw,
                        telVw: (_25 = dto.vwStatisch) === null || _25 === void 0 ? void 0 : _25.telVw,
                    } },
                user: { connect: { id: 1 } },
            },
        });
    }
    async deleteAuftrag(auftragId) {
        await this.prisma.auftrag.delete({
            where: { id: auftragId },
        });
    }
    async createEmail(data) {
        var _a;
        return (_a = this.prisma.email) === null || _a === void 0 ? void 0 : _a.create({
            data,
        });
    }
    async getEmailById(id) {
        var _a;
        return (_a = this.prisma.email) === null || _a === void 0 ? void 0 : _a.findUnique({
            where: { id },
        });
    }
    async getAllEmails() {
        var _a;
        return (_a = this.prisma.email) === null || _a === void 0 ? void 0 : _a.findMany();
    }
    async createObjekt(data) {
        return this.prisma.objekt.create({
            data,
        });
    }
    async getObjektById(id) {
        return this.prisma.objekt.findUnique({
            where: { id },
        });
    }
    async getAllObjekte() {
        return this.prisma.objekt.findMany();
    }
    async updateObjekt(id, data) {
        return this.prisma.objekt.update({
            where: { id },
            data,
        });
    }
    async deleteObjekt(id) {
        return this.prisma.objekt.delete({
            where: { id },
        });
    }
    async createVw(data) {
        return this.prisma.vw.create({
            data,
        });
    }
    async getVwById(id) {
        return this.prisma.vw.findUnique({
            where: { id },
            include: {
                auftraegeStatisch: true,
                auftraegeDynamisch: true,
            }
        });
    }
    async getAllVws() {
        return this.prisma.vw.findMany({
            include: {
                auftraegeStatisch: true,
                auftraegeDynamisch: true,
            }
        });
    }
    async updateVw(id, data) {
        return this.prisma.vw.update({
            where: { id },
            data,
        });
    }
    async deleteVw(id) {
        return this.prisma.vw.delete({
            where: { id },
        });
    }
    async createAuftragsBestaetigung(data) {
        return this.prisma.auftragsBestaetigung.create({
            data,
        });
    }
    async getAuftragsBestaetigungById(id) {
        return this.prisma.auftragsBestaetigung.findUnique({
            where: { id },
        });
    }
    async getAllAuftragsBestaetigungen() {
        return this.prisma.auftragsBestaetigung.findMany();
    }
    async updateAuftragsBestaetigung(id, data) {
        return this.prisma.auftragsBestaetigung.update({
            where: { id },
            data,
        });
    }
    async deleteAuftragsBestaetigung(id) {
        return this.prisma.auftragsBestaetigung.delete({
            where: { id },
        });
    }
    async getAuftraggeberById(id) {
        var _a;
        return (_a = this.prisma.auftraggeber) === null || _a === void 0 ? void 0 : _a.findUnique({
            where: { id },
            include: {
                auftraege: true,
            },
        });
    }
    async getAllAuftraggeber() {
        var _a;
        return (_a = this.prisma.auftraggeber) === null || _a === void 0 ? void 0 : _a.findMany({
            include: {
                auftraege: true,
            },
        });
    }
    async deleteAuftraggeber(id) {
        var _a;
        return (_a = this.prisma.auftraggeber) === null || _a === void 0 ? void 0 : _a.delete({
            where: { id },
        });
    }
};
AuftragService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuftragService);
exports.AuftragService = AuftragService;
//# sourceMappingURL=auftrag.service.js.map