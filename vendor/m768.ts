// @ts-nocheck
import {cus,uus} from "./m765.ts";
import {dus,pus} from "./m767.ts";
import {Endpoint,Pbr} from "./m764.ts";
import {TCe,Obr} from "./m766.ts";
import {b,x} from "../runtime.ts";
import {$N} from "./m607.ts";
import {jK} from "./m763.ts";
var Lbr,mus,getInstanceMetadataEndpoint=async()=>mus.parseUrl(await fuu()||await huu()),fuu=async()=>Lbr.loadConfig(cus)(),huu=async()=>{let e=await Lbr.loadConfig(dus)();switch(e){case TCe.IPv4:return Endpoint.IPv4;case TCe.IPv6:return Endpoint.IPv6;default:throw Error(`Unsupported endpoint mode: ${e}. Select from ${Object.values(TCe)}`)}};
var Mbr=b(()=>{Pbr();uus();Obr();pus();Lbr=x($N(),1),mus=x(jK(),1)});
export {Lbr,mus,getInstanceMetadataEndpoint,fuu,huu,Mbr};
