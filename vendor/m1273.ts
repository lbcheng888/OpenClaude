// @ts-nocheck
import {b} from "../runtime.ts";
import {PO} from "./m1236.ts";
import {xln,BedrockRuntimeClient} from "./m1259.ts";
import {qCr,ApplyGuardrailCommand} from "./m1263.ts";
import {jCr,ConverseCommand} from "./m1264.ts";
import {WCr,ConverseStreamCommand} from "./m1265.ts";
import {GCr,CountTokensCommand} from "./m1266.ts";
import {VCr,GetAsyncInvokeCommand} from "./m1267.ts";
import {KCr,InvokeModelCommand} from "./m1268.ts";
import {zCr,InvokeModelWithBidirectionalStreamCommand} from "./m1269.ts";
import {YCr,InvokeModelWithResponseStreamCommand} from "./m1270.ts";
import {zln,ListAsyncInvokesCommand} from "./m1271.ts";
import {JCr,StartAsyncInvokeCommand} from "./m1272.ts";
import {gCr} from "./m1229.ts";
var DHu,BedrockRuntime;
var oOs=b(()=>{PO();xln();qCr();jCr();WCr();GCr();VCr();KCr();zCr();YCr();zln();JCr();DHu={ApplyGuardrailCommand:ApplyGuardrailCommand,ConverseCommand:ConverseCommand,ConverseStreamCommand:ConverseStreamCommand,CountTokensCommand:CountTokensCommand,GetAsyncInvokeCommand:GetAsyncInvokeCommand,InvokeModelCommand:InvokeModelCommand,InvokeModelWithBidirectionalStreamCommand:InvokeModelWithBidirectionalStreamCommand,InvokeModelWithResponseStreamCommand:InvokeModelWithResponseStreamCommand,ListAsyncInvokesCommand:ListAsyncInvokesCommand,StartAsyncInvokeCommand:StartAsyncInvokeCommand};BedrockRuntime=class BedrockRuntime extends BedrockRuntimeClient{};gCr(DHu,BedrockRuntime)});
export {DHu,BedrockRuntime,oOs};
