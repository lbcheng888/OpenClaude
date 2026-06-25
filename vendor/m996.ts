// @ts-nocheck
import {Q} from "../runtime.ts";
import {ome} from "./m864.ts";
import {sme} from "./m865.ts";
import {ime} from "./m870.ts";
import {xoe} from "./m886.ts";
import {yk} from "./m613.ts";
import {Zu} from "./m855.ts";
import {US} from "./m823.ts";
import {pme} from "./m889.ts";
import {yo} from "./m892.ts";
import {TM} from "./m899.ts";
import {m2} from "./m901.ts";
import {CRr} from "./m988.ts";
import {RRr} from "./m989.ts";
import {yRs} from "./m993.ts";
import {ARs} from "./m995.ts";
var ARr=Q((rJe)=>{Object.defineProperty(rJe,"__esModule",{value:!0});rJe.STSClient=rJe.__Client=void 0;var RRs=ome(),XCu=sme(),QCu=ime(),vRs=xoe(),ZCu=yk(),xRr=Zu(),eAu=US(),tAu=pme(),nAu=yo(),wRs=TM(),HRs=m2();Object.defineProperty(rJe,"__Client",{enumerable:!0,get:function(){return HRs.Client}});var kRs=CRr(),rAu=RRr(),oAu=yRs(),sAu=ARs();class IRs extends HRs.Client{config;constructor(...[e]){let t=(0,oAu.getRuntimeConfig)(e||{});super(t);this.initConfig=t;let n=(0,rAu.resolveClientEndpointParameters)(t),r=(0,vRs.resolveUserAgentConfig)(n),o=(0,wRs.resolveRetryConfig)(r),s=(0,ZCu.resolveRegionConfig)(o),i=(0,RRs.resolveHostHeaderConfig)(s),a=(0,nAu.resolveEndpointConfig)(i),l=(0,kRs.resolveHttpAuthSchemeConfig)(a),c=(0,sAu.resolveRuntimeExtensions)(l,e?.extensions||[]);this.config=c,this.middlewareStack.use((0,eAu.getSchemaSerdePlugin)(this.config)),this.middlewareStack.use((0,vRs.getUserAgentPlugin)(this.config)),this.middlewareStack.use((0,wRs.getRetryPlugin)(this.config)),this.middlewareStack.use((0,tAu.getContentLengthPlugin)(this.config)),this.middlewareStack.use((0,RRs.getHostHeaderPlugin)(this.config)),this.middlewareStack.use((0,XCu.getLoggerPlugin)(this.config)),this.middlewareStack.use((0,QCu.getRecursionDetectionPlugin)(this.config)),this.middlewareStack.use((0,xRr.getHttpAuthSchemeEndpointRuleSetPlugin)(this.config,{httpAuthSchemeParametersProvider:kRs.defaultSTSHttpAuthSchemeParametersProvider,identityProviderConfigProvider:async(u)=>new xRr.DefaultIdentityProviderConfig({"aws.auth#sigv4":u.credentials})})),this.middlewareStack.use((0,xRr.getHttpSigningPlugin)(this.config))}destroy(){super.destroy()}}rJe.STSClient=IRs});
export {ARr};
