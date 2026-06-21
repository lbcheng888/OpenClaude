// @ts-nocheck
import {ca} from "./m5.ts";
import {b} from "../runtime.ts";
import {kg} from "./m129.ts";
class KD{static instance=null;status={isAuthenticating:!1,output:[]};changed=ca();dismissTimer=null;static getInstance(){if(!KD.instance)KD.instance=new KD;return KD.instance}getStatus(){return{...this.status,output:[...this.status.output]}}startAuthentication(){this.clearDismissTimer(),this.status={isAuthenticating:!0,output:[]},this.changed.emit(this.getStatus())}addOutput(e){this.status.output.push(e),this.changed.emit(this.getStatus())}setError(e){this.status.error=e,this.changed.emit(this.getStatus())}endAuthentication(e){if(this.clearDismissTimer(),e)this.status={isAuthenticating:!1,output:[]};else this.status.isAuthenticating=!1,this.dismissTimer=setTimeout(()=>this.dismiss(),BPu),this.dismissTimer.unref?.();this.changed.emit(this.getStatus())}dismiss(){this.clearDismissTimer(),this.status={isAuthenticating:!1,output:[]},this.changed.emit(this.getStatus())}subscribe=this.changed.subscribe;clearDismissTimer(){if(this.dismissTimer!==null)clearTimeout(this.dismissTimer),this.dismissTimer=null}static reset(){if(KD.instance)KD.instance.clearDismissTimer(),KD.instance.changed.clear(),KD.instance=null}}
var BPu=15000;
var vun=b(()=>{kg()});
export {KD,BPu,vun};
