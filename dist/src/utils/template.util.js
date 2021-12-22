"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readTemplateForgotPassword = void 0;
const fs_1 = require("fs");
const path = require('path');
function readTemplateForgotPassword(obj) {
    const file = fs_1.readFileSync(path.join(__dirname, '/../mail/template/forgot-password-mail.html'), 'utf-8');
    return file
        .replace('#{logo}', obj.logo)
        .replace('#{email_reset}', obj.email)
        .replace('#{link_reset}', obj.link);
}
exports.readTemplateForgotPassword = readTemplateForgotPassword;
//# sourceMappingURL=template.util.js.map