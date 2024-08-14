"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_service_1 = require("./app.service");
const app_controller_1 = require("./app.controller");
const products_module_1 = require("./products/products.module");
const counters_schema_1 = require("./products/counters.schema");
const platform_express_1 = require("@nestjs/platform-express");
const vendors_module_1 = require("./vendors/vendors.module");
const axios_1 = require("@nestjs/axios");
const prediction_service_1 = require("./predictions/prediction.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb+srv://mansidhamne22:XIp5Tn0aqQechOMw@cluster0.baiyc.mongodb.net/walmart?retryWrites=true&w=majority&appName=Cluster0'),
            mongoose_1.MongooseModule.forFeature([{ name: counters_schema_1.Counter.name, schema: counters_schema_1.CounterSchema }]),
            platform_express_1.MulterModule.register({
                dest: './public/uploads/',
            }),
            products_module_1.ProductModule,
            vendors_module_1.VendorModule,
            axios_1.HttpModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, prediction_service_1.PredictionService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map