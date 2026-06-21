// @ts-nocheck
import {b} from "../runtime.ts";
import {H7} from "./m949.ts";
import {NTr,GetRoleCredentialsCommand} from "./m967.ts";
import {gsn,DCt} from "./m968.ts";
import {_sn,PCt} from "./m969.ts";
import {FTr,BTr} from "./m970.ts";
import {kCt,SSOClient} from "./m963.ts";
import {wTr} from "./m942.ts";
var Xpu,k_s;
var H_s=b(()=>{H7();NTr();gsn();_sn();FTr();kCt();Xpu={GetRoleCredentialsCommand:GetRoleCredentialsCommand,ListAccountRolesCommand:DCt,ListAccountsCommand:PCt,LogoutCommand:BTr};k_s=class k_s extends SSOClient{};wTr(Xpu,k_s)});
export {Xpu,k_s,H_s};
