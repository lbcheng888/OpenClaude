// @ts-nocheck
import {Ni} from "./m127.ts";
import {b} from "../runtime.ts";
import {ig} from "./m130.ts";
class sD{static instance=null;status={isAuthenticating:!1,output:[]};changed=Ni();dismissTimer=null;static getInstance(){if(!sD.instance)sD.instance=new sD;return sD.instance}getStatus(){return{...this.status,output:[...this.status.output]}}startAuthentication(){this.clearDismissTimer(),this.status={isAuthenticating:!0,output:[]},this.changed.emit(this.getStatus())}addOutput(e){this.status.output.push(e),this.changed.emit(this.getStatus())}setError(e){this.status.error=e,this.changed.emit(this.getStatus())}endAuthentication(e){if(this.clearDismissTimer(),e)this.status={isAuthenticating:!1,output:[]};else this.status.isAuthenticating=!1,this.dismissTimer=setTimeout(()=>this.dismiss(),t9u),this.dismissTimer.unref?.();this.changed.emit(this.getStatus())}dismiss(){this.clearDismissTimer(),this.status={isAuthenticating:!1,output:[]},this.changed.emit(this.getStatus())}subscribe=this.changed.subscribe;clearDismissTimer(){if(this.dismissTimer!==null)clearTimeout(this.dismissTimer),this.dismissTimer=null}static reset(){if(sD.instance)sD.instance.clearDismissTimer(),sD.instance.changed.clear(),sD.instance=null}}
var t9u=15000;
var cmn=b(()=>{ig()});
export {sD,t9u,cmn};
