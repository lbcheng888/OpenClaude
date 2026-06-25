// @ts-nocheck
import {vas as Ses,qpe as hpe,_oe as loe,PRt as Mbt} from "../../vendor/m717.ts";
import {getAPIProvider as Hr,isFirstPartyAnthropicBaseUrl as Gu,Ps as si} from "../api/1287_usesFirstPartyModelIds.ts";
import {isGatewayAuthPinned as BOe,z_ as V_,lt as ct} from "../session/0132_sent.ts";
import {Ne as Ge} from "../../vendor/m583.ts";
import {hasStoredOAuthToken as sE,getStoredOAuthSubscriptionType as okt,getAnthropicApiKeyWithSource as $g,lo as mo} from "./2036_withOAuthRefreshLock.ts";
import {b} from "../../runtime.ts";
import {Ir as Or} from "../../vendor/m584.ts";
// @ts-nocheck
function sNt() {
  Jz = undefined, Ses();
}
function cy_() {
  if (Jz !== undefined) return Jz;
  if (hpe()) return Jz = loe(true);
  if (Hr() === "gateway") return Jz = loe(BOe(V_()));
  if (Hr() !== "firstParty") return Jz = loe(false);
  if (!Gu()) return Jz = loe(false);
  if (Ge.CLAUDE_CODE_ENTRYPOINT === "local-agent" || Ge.CLAUDE_CODE_ENTRYPOINT === "remote_cowork") return Jz = loe(false);
  if (sE() && okt() === null) return Jz = loe(true);
  if (sE() && (okt() === "enterprise" || okt() === "team")) return Jz = loe(true);
  try {
    let {
      key: e
    } = $g({
      skipRetrievingKeyFromApiKeyHelper: true
    });
    if (e) return Jz = loe(true);
  } catch {}
  return Jz = loe(false);
}
var Jz;
var dy_ = b(() => {
  ct();
  mo();
  Or();
  si();
  Mbt();
});
export {sNt as rUt,cy_ as $j,Jz as Uj,dy_ as oUt};
