"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.photoProviders = void 0;
const photo_entity_1 = require("./photo.entity");
exports.photoProviders = [
    {
        provide: 'PHOTO_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(photo_entity_1.Photo),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=photo.providers.js.map