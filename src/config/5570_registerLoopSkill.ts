// @ts-nocheck
import {Ntc,Ftc} from "../core/5522_name.ts";
import {_nc,ync} from "../skills/5547_name.ts";
import {rtc,otc} from "../artifact/5514_name.ts";
import {Unc,$nc} from "../../vendor/m5556.ts";
import {bnc,Enc} from "../../vendor/m5548.ts";
import {Xnc,Qnc} from "../../vendor/m5558.ts";
import {Ptc,Ltc} from "../agent/5521_name.ts";
import {Rnc,vnc} from "../../vendor/m5549.ts";
import {Onc,Lnc} from "../artifact/5555_Lnc.ts";
import {Inc,xnc} from "../../vendor/m5552.ts";
import {wnc,knc} from "../../vendor/m5550.ts";
import {ftc,htc} from "../mcp/5517_rawFirstToken.ts";
import {Dnc,Pnc} from "../../vendor/m5553.ts";
import {atc,ltc} from "../computer-use/5515_name.ts";
import {Mnc,Nnc} from "../../vendor/m5555.ts";
import {Tnc,Snc} from "../mcp/5548_name.ts";
import {Itc,xtc} from "../skills/5520_name.ts";
import {orc,rrc} from "./5560_registerLoopSkill.ts";
import {oo,b} from "../../runtime.ts";
import {lrc,arc} from "../agent/5561_registerScheduleRemoteAgentsSkill.ts";
import {nt} from "../../vendor/m127.ts";
import {Usc,Bsc} from "../skills/5563_registerClaudeApiSkill.ts";
import {Zsc,Qsc} from "../skills/5565_registerClaudeCodeSkill.ts";
import {doesEnterpriseMcpConfigExist as E1,KA} from "../telemetry/3158_unwrapCcrProxyUrl.ts";
import {ctc,utc} from "../../vendor/m5515.ts";
import {gic,hic} from "../../vendor/m5566.ts";
import {Eic,bic} from "../../vendor/m5568.ts";
import {dn} from "./0137_namespace.ts";
import {gtc} from "../../vendor/m5517.ts";
import {Hnc} from "../../vendor/m5551.ts";
/** Registers all built-in skills once; guarded by Cic to prevent double-init. */
function Vtr() {
  if (Cic) return;
  Cic = !0, Ntc(), _nc(), rtc(), Unc(), bnc(), Xnc(), Ptc(), Rnc(), Onc(), Inc(), wnc(), ftc(), Dnc(), atc(), Mnc(), Tnc(), Itc();
  let {
    registerLoopSkill: registerLoopSkill
  } = (orc(), oo(rrc));
  registerLoopSkill();
  let {
    registerScheduleRemoteAgentsSkill: registerScheduleRemoteAgentsSkill
  } = (lrc(), oo(arc));
  if (registerScheduleRemoteAgentsSkill(), !nt(process.env.CLAUDE_CODE_DISABLE_CLAUDE_API_SKILL)) {
    let {
      registerClaudeApiSkill: registerClaudeApiSkill
    } = (Usc(), oo(Bsc));
    registerClaudeApiSkill();
  }
  if (!nt(process.env.CLAUDE_CODE_DISABLE_CLAUDE_CODE_SKILL)) {
    let {
      registerClaudeCodeSkill: registerClaudeCodeSkill
    } = (Zsc(), oo(Qsc));
    registerClaudeCodeSkill();
  }
  if (!E1()) ctc();
  let {
      registerRunSkill: registerRunSkill
    } = (gic(), oo(hic)),
    {
      registerRunSkillGeneratorSkill: registerRunSkillGeneratorSkill
    } = (Eic(), oo(bic));
  registerRunSkill(), registerRunSkillGeneratorSkill();
}

/** Whether Vtr has already been called (init guard). */
var Cic = !1;

/** Lazy module initializer for skill registration dependencies. */
var hUo = b(() => {
  KA();
  dn();
  otc();
  ltc();
  utc();
  htc();
  gtc();
  xtc();
  Ltc();
  Ftc();
  ync();
  Snc();
  Enc();
  vnc();
  knc();
  Hnc();
  xnc();
  Pnc();
  Lnc();
  Nnc();
  $nc();
  Qnc();
});

export {Vtr,Cic,hUo};
