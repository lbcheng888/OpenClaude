// @ts-nocheck
import {nvr,rvr,Iws} from "./m1016.ts";
import {ovs,svs,ivs} from "./m998.ts";
import {Fws,Bws,Uws} from "./m1019.ts";
import {Cws,Aws,Rws} from "./m1014.ts";
import {wws,vws,kws} from "./m1015.ts";
import {uws,dws,pws} from "./m1009.ts";
import {b,x} from "../runtime.ts";
import {Vg} from "./m600.ts";
var $ws,ivr=async(e,t,n,r={},o=!1)=>{let s=t[e];if(Object.keys(r).length>0&&nvr(s))return rvr(s,n);if(o||ovs(s,{profile:e,logger:n.logger}))return svs(e,t,n,r,ivr);if(nvr(s))return rvr(s,n);if(Fws(s))return Bws(s,n);if(Cws(s))return Aws(n,e);if(wws(s))return await vws(e,s,n);if(uws(s))return dws(e,n);throw new $ws.CredentialsProviderError(`Could not resolve credentials using profile: [${e}] in configuration/credentials file(s).`,{logger:n.logger})};
var qws=b(()=>{ivs();pws();Rws();kws();Iws();Uws();$ws=x(Vg(),1)});
export {$ws,ivr,qws};
