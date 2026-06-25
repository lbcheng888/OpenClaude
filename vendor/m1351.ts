// @ts-nocheck
import {b} from "../runtime.ts";
import {rD} from "./m1322.ts";
import {gpn,AssumeRoleCommand} from "./m1340.ts";
import {SIr,AssumeRoleWithSAMLCommand} from "./m1341.ts";
import {ypn,AssumeRoleWithWebIdentityCommand} from "./m1342.ts";
import {bIr,AssumeRootCommand} from "./m1343.ts";
import {EIr,DecodeAuthorizationMessageCommand} from "./m1344.ts";
import {CIr,GetAccessKeyInfoCommand} from "./m1345.ts";
import {AIr,GetCallerIdentityCommand} from "./m1346.ts";
import {RIr,GetDelegatedAccessTokenCommand} from "./m1347.ts";
import {vIr,GetFederationTokenCommand} from "./m1348.ts";
import {wIr,GetSessionTokenCommand} from "./m1349.ts";
import {kIr,GetWebIdentityTokenCommand} from "./m1350.ts";
import {okt,STSClient} from "./m1336.ts";
import {aIr} from "./m1315.ts";
var i2u,STS;
var a9s=b(()=>{rD();gpn();SIr();ypn();bIr();EIr();CIr();AIr();RIr();vIr();wIr();kIr();okt();i2u={AssumeRoleCommand:AssumeRoleCommand,AssumeRoleWithSAMLCommand:AssumeRoleWithSAMLCommand,AssumeRoleWithWebIdentityCommand:AssumeRoleWithWebIdentityCommand,AssumeRootCommand:AssumeRootCommand,DecodeAuthorizationMessageCommand:DecodeAuthorizationMessageCommand,GetAccessKeyInfoCommand:GetAccessKeyInfoCommand,GetCallerIdentityCommand:GetCallerIdentityCommand,GetDelegatedAccessTokenCommand:GetDelegatedAccessTokenCommand,GetFederationTokenCommand:GetFederationTokenCommand,GetSessionTokenCommand:GetSessionTokenCommand,GetWebIdentityTokenCommand:GetWebIdentityTokenCommand};STS=class STS extends STSClient{};aIr(i2u,STS)});
export {i2u,STS,a9s};
