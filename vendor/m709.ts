// @ts-nocheck
import {b} from "../runtime.ts";
import {Wi,Hn} from "./m100.ts";
import {Es,Yt} from "./m641.ts";
var aas,Fv,IRt;
var qK=b(()=>{Wi();Es();aas=require("path"),Fv=Hn(function(){switch(Yt()){case"macos":return"/Library/Application Support/ClaudeCode";case"windows":return"C:\\Program Files\\ClaudeCode";default:return"/etc/claude-code"}}),IRt=Hn(function(){return aas.join(Fv(),"managed-settings.d")})});
export {aas,Fv,IRt,qK};
