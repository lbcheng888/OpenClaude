// @ts-nocheck
import {Ni} from "./m127.ts";
import {b} from "../runtime.ts";
import {ig} from "./m130.ts";
class SNo{_status="idle";_generation=0;_changed=Ni();reserve(){if(this._status!=="idle")return!1;return this._status="dispatching",this._notify(),!0}cancelReservation(){if(this._status!=="dispatching")return;this._status="idle",this._notify()}tryStart(){if(this._status==="running")return null;return this._status="running",++this._generation,this._notify(),this._generation}end(e){if(this._generation!==e)return!1;if(this._status!=="running")return!1;return this._status="idle",this._notify(),!0}forceEnd(){if(this._status==="idle")return;this._status="idle",++this._generation,this._notify()}get isActive(){return this._status!=="idle"}get generation(){return this._generation}subscribe=this._changed.subscribe;getSnapshot=()=>this._status!=="idle";_notify(){this._changed.emit()}}
var iKl=b(()=>{ig()});
export {SNo,iKl};
