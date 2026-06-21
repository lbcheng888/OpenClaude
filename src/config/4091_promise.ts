// @ts-nocheck
import {st as T_} from "../../vendor/m5.ts";
import {b as L} from "../../runtime.ts";
import {sn as $6} from "./0047_namespace.ts";
// @ts-nocheck
function Ht4() {
  return T_(process.env.CLAUDE_CODE_SYNC_SKILLS);
}
function _t4(H) {
  let _,
    q = new Promise(K => {
      _ = K;
    });
  return KI6.set(H, {
    promise: q,
    resolve: _
  }), _;
}
function pLq(H) {
  let _ = KI6.get(H);
  return _ ? _.promise : Promise.resolve({
    ok: true
  });
}
function Kt4(H) {
  gpH.set(H.name, H);
}
function Ot4(H) {
  gpH.delete(H);
}
function Tt4(H) {
  return gpH.get(H.name) === H;
}
function ULq(H) {
  let _ = 0;
  for (let q of gpH.keys()) if (!H.has(q)) gpH.delete(q), _++;
  for (let q of KI6.keys()) if (!H.has(q)) KI6.delete(q);
  return _;
}
function MQ_() {
  return gpH.size === 0 ? [] : Array.from(gpH.values());
}
var KI6, gpH;
var UI_ = L(() => {
  $6();
  KI6 = new Map(), gpH = new Map();
});

export {Ht4 as FIe,_t4 as u$a,pLq as g$n,Kt4 as d$a,Ot4 as p$a,Tt4 as m$a,ULq as f$a,MQ_ as A$a,KI6 as h$n,gpH as Dqe,UI_ as e9t};
