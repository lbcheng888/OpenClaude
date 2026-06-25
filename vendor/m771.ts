// @ts-nocheck
import {b,x} from "../runtime.ts";
import {Vg} from "./m600.ts";
var Eus,buu="169.254.170.2",Euu="169.254.170.23",Cuu="[fd00:ec2::23]",Cus=(e,t)=>{if(e.protocol==="https:")return;if(e.hostname===buu||e.hostname===Euu||e.hostname===Cuu)return;if(e.hostname.includes("[")){if(e.hostname==="[::1]"||e.hostname==="[0000:0000:0000:0000:0000:0000:0000:0001]")return}else{if(e.hostname==="localhost")return;let n=e.hostname.split("."),r=(o)=>{let s=parseInt(o,10);return 0<=s&&s<=255};if(n[0]==="127"&&r(n[1])&&r(n[2])&&r(n[3])&&n.length===4)return}throw new Eus.CredentialsProviderError(`URL not accepted. It must either be HTTPS or match one of the following:
  - loopback CIDR 127.0.0.0/8 or [::1/128]
  - ECS container host 169.254.170.2
  - EKS container host 169.254.170.23 or [fd00:ec2::23]`,{logger:t})};
var Aus=b(()=>{Eus=x(Vg(),1)});
export {Eus,buu,Euu,Cuu,Cus,Aus};
