// @ts-nocheck
import {b} from "../runtime.ts";
import {QP} from "./m1241.ts";
import {pdn,BedrockRuntimeClient} from "./m1264.ts";
import {_Hr,ApplyGuardrailCommand} from "./m1268.ts";
import {yHr,ConverseCommand} from "./m1269.ts";
import {THr,ConverseStreamCommand} from "./m1270.ts";
import {SHr,CountTokensCommand} from "./m1271.ts";
import {bHr,GetAsyncInvokeCommand} from "./m1272.ts";
import {EHr,InvokeModelCommand} from "./m1273.ts";
import {CHr,InvokeModelWithBidirectionalStreamCommand} from "./m1274.ts";
import {AHr,InvokeModelWithResponseStreamCommand} from "./m1275.ts";
import {Ddn,ListAsyncInvokesCommand} from "./m1276.ts";
import {RHr,StartAsyncInvokeCommand} from "./m1277.ts";
import {Kkr} from "./m1234.ts";
var jFu,BedrockRuntime;
var QFs=b(()=>{QP();pdn();_Hr();yHr();THr();SHr();bHr();EHr();CHr();AHr();Ddn();RHr();jFu={ApplyGuardrailCommand:ApplyGuardrailCommand,ConverseCommand:ConverseCommand,ConverseStreamCommand:ConverseStreamCommand,CountTokensCommand:CountTokensCommand,GetAsyncInvokeCommand:GetAsyncInvokeCommand,InvokeModelCommand:InvokeModelCommand,InvokeModelWithBidirectionalStreamCommand:InvokeModelWithBidirectionalStreamCommand,InvokeModelWithResponseStreamCommand:InvokeModelWithResponseStreamCommand,ListAsyncInvokesCommand:ListAsyncInvokesCommand,StartAsyncInvokeCommand:StartAsyncInvokeCommand};BedrockRuntime=class BedrockRuntime extends BedrockRuntimeClient{};Kkr(jFu,BedrockRuntime)});
export {jFu,BedrockRuntime,QFs};
