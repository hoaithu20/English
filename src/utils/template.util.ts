import { readFileSync } from 'fs';

const path = require('path');

export function readTemplateForgotPassword(obj: any) {
  const file = readFileSync(
    path.join(__dirname, '/../mail/template/forgot-password-mail.html'),
    'utf-8',
  );
  return file
    .replace('#{logo}', obj.logo)
    .replace('#{email_reset}', obj.email)
    .replace('#{link_reset}', obj.link);
}
