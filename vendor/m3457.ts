// @ts-nocheck
import {X} from "../runtime.ts";
import {OPn} from "./m3450.ts";
import {Xma} from "./m3451.ts";
import {MPn} from "./m3452.ts";
import {ifa} from "./m3453.ts";
import {mle} from "./m3449.ts";
import {GQr} from "./m3455.ts";
import {VQr} from "./m3456.ts";
var KQr=X((pfa)=>{var n6=pfa;n6.build="minimal";n6.Writer=OPn();n6.BufferWriter=Xma();n6.Reader=MPn();n6.BufferReader=ifa();n6.util=mle();n6.rpc=GQr();n6.roots=VQr();n6.configure=dfa;function dfa(){n6.util._configure(),n6.Writer._configure(n6.BufferWriter),n6.Reader._configure(n6.BufferReader)}dfa()});
export {KQr};
