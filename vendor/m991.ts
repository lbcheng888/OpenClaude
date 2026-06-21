// @ts-nocheck
import {X} from "../runtime.ts";
import {Jpe} from "./m859.ts";
import {Xpe} from "./m860.ts";
import {Qpe} from "./m865.ts";
import {Poe} from "./m881.ts";
import {nk} from "./m607.ts";
import {Sd} from "./m850.ts";
import {US} from "./m818.ts";
import {ome} from "./m884.ts";
import {yo} from "./m887.ts";
import {i1} from "./m894.ts";
import {V2} from "./m896.ts";
import {zTr} from "./m983.ts";
import {JTr} from "./m984.ts";
import {Cys} from "./m988.ts";
import {Hys} from "./m990.ts";
var YTr=X((sze)=>{Object.defineProperty(sze,"__esModule",{value:!0});sze.STSClient=sze.__Client=void 0;var Iys=Jpe(),Lmu=Xpe(),Mmu=Qpe(),Dys=Poe(),Nmu=nk(),nSr=Sd(),Bmu=US(),Fmu=ome(),Umu=yo(),Pys=i1(),Lys=V2();Object.defineProperty(sze,"__Client",{enumerable:!0,get:function(){return Lys.Client}});var Oys=zTr(),$mu=JTr(),qmu=Cys(),jmu=Hys();class Mys extends Lys.Client{config;constructor(...[e]){let t=(0,qmu.getRuntimeConfig)(e||{});super(t);this.initConfig=t;let n=(0,$mu.resolveClientEndpointParameters)(t),r=(0,Dys.resolveUserAgentConfig)(n),o=(0,Pys.resolveRetryConfig)(r),s=(0,Nmu.resolveRegionConfig)(o),i=(0,Iys.resolveHostHeaderConfig)(s),a=(0,Umu.resolveEndpointConfig)(i),l=(0,Oys.resolveHttpAuthSchemeConfig)(a),c=(0,jmu.resolveRuntimeExtensions)(l,e?.extensions||[]);this.config=c,this.middlewareStack.use((0,Bmu.getSchemaSerdePlugin)(this.config)),this.middlewareStack.use((0,Dys.getUserAgentPlugin)(this.config)),this.middlewareStack.use((0,Pys.getRetryPlugin)(this.config)),this.middlewareStack.use((0,Fmu.getContentLengthPlugin)(this.config)),this.middlewareStack.use((0,Iys.getHostHeaderPlugin)(this.config)),this.middlewareStack.use((0,Lmu.getLoggerPlugin)(this.config)),this.middlewareStack.use((0,Mmu.getRecursionDetectionPlugin)(this.config)),this.middlewareStack.use((0,nSr.getHttpAuthSchemeEndpointRuleSetPlugin)(this.config,{httpAuthSchemeParametersProvider:Oys.defaultSTSHttpAuthSchemeParametersProvider,identityProviderConfigProvider:async(u)=>new nSr.DefaultIdentityProviderConfig({"aws.auth#sigv4":u.credentials})})),this.middlewareStack.use((0,nSr.getHttpSigningPlugin)(this.config))}destroy(){super.destroy()}}sze.STSClient=Mys});
export {YTr};
