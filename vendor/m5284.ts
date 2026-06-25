// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Ce,In,cn,Ct} from "./m197.ts";
import {xe,He,Pt,mn} from "../src/telemetry/0600_feature_name.ts";
import {Rm,tI} from "./m465.ts";
import {Mee,o_e} from "./m3289.ts";
import {Ne} from "./m583.ts";
import {execFileNoThrow,Ii} from "./m690.ts";
import {b} from "../runtime.ts";
import {Ir} from "./m584.ts";
function NGl(e,t){let n=t?.trim();if(n?.includes("javax.net.ssl.trustStore="))return n;let r=`-Djavax.net.ssl.trustStore=${e} -Djavax.net.ssl.trustStorePassword=${XKt} -Djavax.net.ssl.trustStoreType=PKCS12`;return n?`${r} ${n}`:r}
async function FGl(e){let t=[],n={failureCodes:t},r=NJ.join(e.stateDir,"agent-proxy-ca.crt");try{await OH.mkdir(e.stateDir,{recursive:!0}),await OH.writeFile(r,e.ccrCa,"utf8")}catch(i){return logForDebugging(`[agent-proxy] tool trust setup skipped: cannot write CA file: ${Ce(i)}`,{level:"warn"}),xe("agent_proxy_tool_trust","ca_file_write_failed"),n}let o=await MGl(e.keytoolBin,QOm),s=await MGl(e.certutilBin,()=>Rm("certutil"));if(await Promise.all([(async()=>{if(!o){logForDebugging("[agent-proxy] no keytool found; skipping JVM truststore");return}let i=await ZOm(o,r,NJ.join(e.stateDir,"java-truststore.p12"),t);if(!i)return;if(XOm.test(i)){logForDebugging(`[agent-proxy] truststore path contains JVM-unsafe characters; not emitting JAVA_TOOL_OPTIONS: ${i}`,{level:"warn"}),t.push("jvm_unsafe_truststore_path");return}n.javaTrustStorePath=i,await eLm(i,e.bazelrcPath??"/etc/bazel.bazelrc",t)})(),(async()=>{if(!s){logForDebugging("[agent-proxy] certutil not found; skipping NSS trust for browsers");return}await tLm(r,e.nssDbDirs??[NJ.join(J1o.homedir(),".pki","nssdb"),NJ.join(Mee(),"pki","nssdb")],s,t)})(),nLm(e.caBundlePath,e.botoConfigPath??NJ.join(J1o.homedir(),".boto"),t)]),t.length===0)He("agent_proxy_tool_trust");else Pt("agent_proxy_tool_trust",t[0]);return n}
async function MGl(e,t){if(e)return OH.realpath(e).catch(()=>{return});return await t()??void 0}
async function QOm(){let e=[await Rm("keytool"),Ne.JAVA_HOME?NJ.join(Ne.JAVA_HOME,"bin","keytool"):void 0],t;for(let n of e){if(!n)continue;let r=await OH.realpath(n).catch(()=>{return});if(!r)continue;if(t??=r,await BGl(r))return r}return t}
async function BGl(e){let t=NJ.dirname(NJ.dirname(e));for(let n of[NJ.join(t,"lib","security","cacerts"),NJ.join(t,"jre","lib","security","cacerts")]){let r=await OH.realpath(n).catch(()=>{return});if(r)return r}return}
async function ZOm(e,t,n,r){let o=await BGl(e);if(!o){logForDebugging(`[agent-proxy] no JDK cacerts found near ${e}; skipping JVM truststore`),r.push("jdk_cacerts_not_found");return}let s=`${n}.tmp`;await OH.unlink(s).catch(()=>{});let i=await q_t(e,["-importkeystore","-noprompt","-srckeystore",o,"-srcstorepass",XKt,"-destkeystore",s,"-deststoretype","PKCS12","-deststorepass",XKt]);if(!i.ok){logForDebugging(`[agent-proxy] keytool importkeystore failed: ${i.detail}`,{level:"warn"}),r.push("java_truststore_seed_failed"),await OH.unlink(s).catch(()=>{});return}let a=await q_t(e,["-importcert","-noprompt","-trustcacerts","-alias","ccr-agent-proxy","-file",t,"-keystore",s,"-storetype","PKCS12","-storepass",XKt]);if(!a.ok){logForDebugging(`[agent-proxy] keytool importcert failed: ${a.detail}`,{level:"warn"}),r.push("java_truststore_import_failed"),await OH.unlink(s).catch(()=>{});return}try{await OH.rename(s,n).catch(async()=>{await OH.writeFile(n,await OH.readFile(s)),await OH.unlink(s).catch(()=>{})})}catch(l){logForDebugging(`[agent-proxy] could not move JVM truststore into place: ${Ce(l)}`,{level:"warn"}),r.push("java_truststore_publish_failed");return}return logForDebugging(`[agent-proxy] JVM truststore built at ${n}`),n}
async function eLm(e,t,n){let r=`${LGl}
# Bazel's repository downloader runs on its embedded JDK and ignores
# JAVA_TOOL_OPTIONS; carry the agent-proxy truststore via startup options.
startup --host_jvm_args=-Djavax.net.ssl.trustStore=${e} --host_jvm_args=-Djavax.net.ssl.trustStorePassword=${XKt} --host_jvm_args=-Djavax.net.ssl.trustStoreType=PKCS12
${Y1o}
`,o;try{o=await OH.readFile(t,"utf8")}catch(u){if(!In(u)){logForDebugging(`[agent-proxy] could not read ${t}: ${Ce(u)}`),n.push("bazelrc_write_failed");return}o=""}let s=o.indexOf(LGl),i=o.indexOf(Y1o),l=(s>=0&&i>s?o.slice(0,s)+o.slice(i+Y1o.length).replace(/^\n/,""):o).trimEnd(),c=l?`${l}

${r}`:r;if(c===o)return;try{await OH.writeFile(t,c,"utf8"),logForDebugging(`[agent-proxy] wrote Bazel trust block to ${t}`)}catch(u){logForDebugging(`[agent-proxy] could not write ${t}: ${Ce(u)}`),n.push("bazelrc_write_failed")}}
async function tLm(e,t,n,r){for(let o of t){if(!await OH.mkdir(o,{recursive:!0}).then(()=>!0,(c)=>(logForDebugging(`[agent-proxy] could not create NSS dir ${o}: ${Ce(c)}`),!1))){r.push("nss_add_failed");continue}let i=`sql:${o}`;await q_t(n,["-D","-d",i,"-n","ccr-agent-proxy"]);let a=["-A","-d",i,"-t","C,,","-n","ccr-agent-proxy","-i",e],l=await q_t(n,a);if(!l.ok)await q_t(n,["-N","--empty-password","-d",i]),l=await q_t(n,a);if(l.ok)logForDebugging(`[agent-proxy] MITM CA added to NSS DB at ${o}`);else logForDebugging(`[agent-proxy] certutil -A failed for ${o}: ${l.detail}`),r.push("nss_add_failed")}}
async function nLm(e,t,n){let r=`[Boto]
ca_certificates_file = ${e}
`;try{await OH.writeFile(t,r,{flag:"wx",mode:420}),logForDebugging(`[agent-proxy] wrote ${t} for gsutil trust`)}catch(o){if(cn(o)==="EEXIST")return;logForDebugging(`[agent-proxy] could not write ${t}: ${Ce(o)}`),n.push("boto_write_failed")}}
async function q_t(e,t){let n=await execFileNoThrow(e,t,{timeout:20000,preserveOutputOnError:!0,useCwd:!1});if(n.code===0)return{ok:!0,stdout:n.stdout,detail:""};return{ok:!1,stdout:n.stdout,detail:`${n.error??`exit ${n.code}`} ${n.stderr.slice(0,200)}`.trim()}}
var OH,J1o,NJ,XKt="changeit",XOm,LGl="# >>> ccr-agent-proxy (managed by Claude Code) >>>",Y1o="# <<< ccr-agent-proxy <<<";
var UGl=b(()=>{mn();qe();Ir();Ct();Ii();tI();o_e();OH=require("fs/promises"),J1o=require("os"),NJ=require("path"),XOm=/[\s'"]/});
export {NGl,FGl,MGl,QOm,BGl,ZOm,eLm,tLm,nLm,q_t,OH,J1o,NJ,XKt,XOm,LGl,Y1o,UGl};
