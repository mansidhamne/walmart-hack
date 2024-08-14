"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const vendors_service_1 = require("./vendors.service");
const vendors_controller_1 = require("./vendors.controller");
const vendors_schema_1 = require("./vendors.schema");
const counters_schema_1 = require("./counters.schema");
let VendorModule = class VendorModule {
};
exports.VendorModule = VendorModule;
exports.VendorModule = VendorModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: vendors_schema_1.Vendor.name, schema: vendors_schema_1.VendorSchema },
                { name: counters_schema_1.Counter.name, schema: counters_schema_1.CounterSchema },
            ]),
        ],
        providers: [vendors_service_1.VendorService],
        controllers: [vendors_controller_1.VendorsController],
    })
], VendorModule);
//# sourceMappingURL=vendors.module.js.map