// @ts-nocheck
import {b} from "../runtime.ts";
import {n7} from "./m954.ts";
import {pRr,GetRoleCredentialsCommand} from "./m972.ts";
import {eln,swt} from "./m973.ts";
import {tln,iwt} from "./m974.ts";
import {fRr,mRr} from "./m975.ts";
import {nwt,SSOClient} from "./m968.ts";
import {tRr} from "./m947.ts";
var mCu,CAs;
var AAs=b(()=>{n7();pRr();eln();tln();fRr();nwt();mCu={GetRoleCredentialsCommand:GetRoleCredentialsCommand,ListAccountRolesCommand:swt,ListAccountsCommand:iwt,LogoutCommand:mRr};CAs=class CAs extends SSOClient{};tRr(mCu,CAs)});
export {mCu,CAs,AAs};
