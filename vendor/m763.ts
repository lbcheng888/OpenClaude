// @ts-nocheck
import {Aos,hos} from "./m760.ts";
import {gos,_os} from "./m762.ts";
import {Endpoint,ogr} from "./m759.ts";
import {Nbe,sgr} from "./m761.ts";
import {b,M} from "../runtime.ts";
import {yB} from "./m601.ts";
import {b7} from "./m758.ts";
var igr,yos,getInstanceMetadataEndpoint=async()=>yos.parseUrl(await QZc()||await ZZc()),QZc=async()=>igr.loadConfig(Aos)(),ZZc=async()=>{let e=await igr.loadConfig(gos)();switch(e){case Nbe.IPv4:return Endpoint.IPv4;case Nbe.IPv6:return Endpoint.IPv6;default:throw Error(`Unsupported endpoint mode: ${e}. Select from ${Object.values(Nbe)}`)}};
var agr=b(()=>{ogr();hos();sgr();_os();igr=M(yB(),1),yos=M(b7(),1)});
export {igr,yos,getInstanceMetadataEndpoint,QZc,ZZc,agr};
