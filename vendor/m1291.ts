// @ts-nocheck
import {tr,sn} from "../src/config/0047_namespace.ts";
import {getOauthConfig,Dc} from "../src/api/0459_getOauthConfig.ts";
import {b} from "../runtime.ts";
function B7(){let e=process.env.CLAUDE_SECURESTORAGE_CONFIG_DIR;if(e!==void 0)return(e||FOs.join(hcn.homedir(),".claude")).normalize("NFC");return tr()}
function m1(e=""){let t=process.env.CLAUDE_SECURESTORAGE_CONFIG_DIR,n=t!==void 0?!t:!process.env.CLAUDE_CONFIG_DIR,r=t!==void 0?t.normalize("NFC"):tr(),o=n?"":`-${BOs.createHash("sha256").update(r).digest("hex").substring(0,8)}`;return`Claude Code${getOauthConfig().OAUTH_FILE_SUFFIX}${e}${o}`}
function OO(){let e;try{e=process.env.USER||hcn.userInfo().username}catch{e="claude-code-user"}if(!DIu.test(e))return"claude-code-user";return e}
function F7(){rC.cache={data:null,cachedAt:0},rC.generation++,rC.readInFlight=null}
function UOs(e,t){if(rC.cache.cachedAt!==0||rC.generation!==t)return;let n=null;if(e)try{n=JSON.parse(e)}catch{return}rC.cache={data:n,cachedAt:Date.now()}}
var BOs,hcn,FOs,joe="-credentials",DIu,gcn=30000,rC;
var k8=b(()=>{Dc();sn();BOs=require("crypto"),hcn=require("os"),FOs=require("path");DIu=/^[a-zA-Z0-9._-]+$/;rC={cache:{data:null,cachedAt:0},generation:0,readInFlight:null}});
export {B7,m1,OO,F7,UOs,BOs,hcn,FOs,joe,DIu,gcn,rC,k8};
