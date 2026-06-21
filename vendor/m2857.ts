// @ts-nocheck
import {X} from "../runtime.ts";
var tqi=X((J2h,eqi)=>{function KId(e){return{name:"Dockerfile",aliases:["docker"],case_insensitive:!0,keywords:"from maintainer expose env arg user onbuild stopsignal",contains:[e.HASH_COMMENT_MODE,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,e.NUMBER_MODE,{beginKeywords:"run cmd entrypoint volume add copy workdir label healthcheck shell",starts:{end:/[^\\]$/,subLanguage:"bash"}}],illegal:"</"}}eqi.exports=KId});
export {tqi};
