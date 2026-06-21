// @ts-nocheck
import {b,M} from "../runtime.ts";
import {createDefaultGlobalConfig} from "./m594.ts";
var xos,seu="169.254.170.2",ieu="169.254.170.23",aeu="[fd00:ec2::23]",kos=(e,t)=>{if(e.protocol==="https:")return;if(e.hostname===seu||e.hostname===ieu||e.hostname===aeu)return;if(e.hostname.includes("[")){if(e.hostname==="[::1]"||e.hostname==="[0000:0000:0000:0000:0000:0000:0000:0001]")return}else{if(e.hostname==="localhost")return;let n=e.hostname.split("."),r=(o)=>{let s=parseInt(o,10);return 0<=s&&s<=255};if(n[0]==="127"&&r(n[1])&&r(n[2])&&r(n[3])&&n.length===4)return}throw new xos.CredentialsProviderError(`URL not accepted. It must either be HTTPS or match one of the following:
  - loopback CIDR 127.0.0.0/8 or [::1/128]
  - ECS container host 169.254.170.2
  - EKS container host 169.254.170.23 or [fd00:ec2::23]`,{logger:t})};
var Hos=b(()=>{xos=M(createDefaultGlobalConfig(),1)});
export {xos,seu,ieu,aeu,kos,Hos};
