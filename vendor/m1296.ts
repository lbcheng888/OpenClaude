// @ts-nocheck
import {or,dn} from "../src/config/0137_namespace.ts";
import {getOauthConfig,Sc} from "../src/api/0465_getOauthConfig.ts";
import {b} from "../runtime.ts";
function u7(){let e=process.env.CLAUDE_SECURESTORAGE_CONFIG_DIR;if(e!==void 0)return(e||OBs.join(epn.homedir(),".claude")).normalize("NFC");return or()}
function wM(e=""){let t=process.env.CLAUDE_SECURESTORAGE_CONFIG_DIR,n=t!==void 0?!t:!process.env.CLAUDE_CONFIG_DIR,r=t!==void 0?t.normalize("NFC"):or(),o=n?"":`-${PBs.createHash("sha256").update(r).digest("hex").substring(0,8)}`;return`Claude Code${getOauthConfig().OAUTH_FILE_SUFFIX}${e}${o}`}
function ZP(){let e;try{e=process.env.USER||epn.userInfo().username}catch{e="claude-code-user"}if(!YBu.test(e))return"claude-code-user";return e}
function d7(){aC.cache={data:null,cachedAt:0},aC.generation++,aC.readInFlight=null}
function LBs(e,t){if(aC.cache.cachedAt!==0||aC.generation!==t)return;let n=null;if(e)try{n=JSON.parse(e)}catch{return}aC.cache={data:n,cachedAt:Date.now()}}
var PBs,epn,OBs,Woe="-credentials",YBu,tpn=30000,aC;
var G5=b(()=>{Sc();dn();PBs=require("crypto"),epn=require("os"),OBs=require("path");YBu=/^[a-zA-Z0-9._-]+$/;aC={cache:{data:null,cachedAt:0},generation:0,readInFlight:null}});
export {u7,wM,ZP,d7,LBs,PBs,epn,OBs,Woe,YBu,tpn,aC,G5};
