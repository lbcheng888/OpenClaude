// @ts-nocheck
import {b} from "../runtime.ts";
import {GD} from "./m1317.ts";
import {Dcn,AssumeRoleCommand} from "./m1335.ts";
import {Gvr,AssumeRoleWithSAMLCommand} from "./m1336.ts";
import {Ocn,AssumeRoleWithWebIdentityCommand} from "./m1337.ts";
import {Vvr,AssumeRootCommand} from "./m1338.ts";
import {Kvr,DecodeAuthorizationMessageCommand} from "./m1339.ts";
import {zvr,GetAccessKeyInfoCommand} from "./m1340.ts";
import {Yvr,GetCallerIdentityCommand} from "./m1341.ts";
import {Jvr,GetDelegatedAccessTokenCommand} from "./m1342.ts";
import {Xvr,GetFederationTokenCommand} from "./m1343.ts";
import {Qvr,GetSessionTokenCommand} from "./m1344.ts";
import {Zvr,GetWebIdentityTokenCommand} from "./m1345.ts";
import {Dvt,STSClient} from "./m1331.ts";
import {Dvr} from "./m1310.ts";
var j0u,STS;
var pNs=b(()=>{GD();Dcn();Gvr();Ocn();Vvr();Kvr();zvr();Yvr();Jvr();Xvr();Qvr();Zvr();Dvt();j0u={AssumeRoleCommand:AssumeRoleCommand,AssumeRoleWithSAMLCommand:AssumeRoleWithSAMLCommand,AssumeRoleWithWebIdentityCommand:AssumeRoleWithWebIdentityCommand,AssumeRootCommand:AssumeRootCommand,DecodeAuthorizationMessageCommand:DecodeAuthorizationMessageCommand,GetAccessKeyInfoCommand:GetAccessKeyInfoCommand,GetCallerIdentityCommand:GetCallerIdentityCommand,GetDelegatedAccessTokenCommand:GetDelegatedAccessTokenCommand,GetFederationTokenCommand:GetFederationTokenCommand,GetSessionTokenCommand:GetSessionTokenCommand,GetWebIdentityTokenCommand:GetWebIdentityTokenCommand};STS=class STS extends STSClient{};Dvr(j0u,STS)});
export {j0u,STS,pNs};
