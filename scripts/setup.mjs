import fs from 'node:fs';
import {randomBytes,scryptSync} from 'node:crypto';
if(fs.existsSync('.env')){console.error('.env already exists. To rotate the owner password, back it up and remove it before running setup again.');process.exit(1);}
const password=randomBytes(18).toString('base64url'),salt=randomBytes(16).toString('hex');
const hash=scryptSync(password,salt,64).toString('hex');
fs.writeFileSync('.env',`ADMIN_PASSWORD_HASH=${salt}:${hash}\nSTORAGE_DIR=./storage\nPORT=3000\nCOOKIE_SECURE=false\n`,{mode:0o600,flag:'wx'});
console.log(`Setup complete. Keep this password in a password manager:\n\n${password}\n\nOpen http://localhost:3000/#/admin after starting the site.\nFor public hosting, enable HTTPS and set COOKIE_SECURE=true.`);
