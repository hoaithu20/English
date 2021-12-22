"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
exports.default = (app) => {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Vatta')
        .setDescription('Vatta API Description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
};
//# sourceMappingURL=swagger.config.js.map