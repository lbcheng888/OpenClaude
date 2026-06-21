// @ts-nocheck
import {Hts as Ses,Lpe as hpe,yoe as loe,iEt as Mbt} from "../../vendor/m712.ts";
import {getAPIProvider as Hr,isFirstPartyAnthropicBaseUrl as Gu,li as si} from "../api/1282_usesFirstPartyModelIds.ts";
import {isGatewayAuthPinned as BOe,getGatewayAuth as V_,lt as ct} from "../session/0131_sent.ts";
import {je as Ge} from "../../vendor/m577.ts";
import {hasStoredOAuthToken as sE,getStoredOAuthSubscriptionType as okt,getAnthropicApiKeyWithSource as $g,Ao as mo} from "./2031_withOAuthRefreshLock.ts";
import {b} from "../../runtime.ts";
import {Lr as Or} from "../../vendor/m578.ts";
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

export {sNt as RNt,cy_ as dY,Jz as uY,dy_ as xNt};
