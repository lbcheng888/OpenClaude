// @ts-nocheck
import {Edt as Zut,Wmo as Npo} from "./4308_id.ts";
import {getSessionId as kt,lt as ct} from "../session/0131_sent.ts";
import {rk as Zx,XX as qX,initKp as Dp} from "../../vendor/m609.ts";
import {Ec as bc} from "../../vendor/m2449.ts";
import {SS as mS,lo} from "../tools/5190_userPromptCount.ts";
import {VO as LO} from "../config/2251_zBr.ts";
import {DP as IP,yx as Ax} from "./5144_encoding.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function iGn(e) {
  return e.flatMap(t => {
    switch (t.type) {
      case "assistant":
        return [{
          type: "assistant",
          message: t.message,
          uuid: t.uuid,
          requestId: undefined,
          timestamp: new Date().toISOString()
        }];
      case "user":
        return [{
          type: "user",
          message: t.message,
          uuid: t.uuid ?? LSl.randomUUID(),
          timestamp: t.timestamp ?? new Date().toISOString(),
          isMeta: t.isSynthetic
        }];
      case "system":
        if (t.subtype === "compact_boundary") return [{
          type: "system",
          content: "Conversation compacted",
          level: "info",
          subtype: "compact_boundary",
          compactMetadata: Hjt(t.compact_metadata),
          uuid: t.uuid,
          timestamp: new Date().toISOString()
        }];
        return [];
      default:
        return [];
    }
  });
}
function kjt(e) {
  let {
    preservedSegment: t,
    preservedMessages: n
  } = e;
  return {
    trigger: e.trigger,
    pre_tokens: e.preTokens,
    ...(e.postTokens !== undefined && {
      post_tokens: e.postTokens
    }),
    ...(e.durationMs !== undefined && {
      duration_ms: e.durationMs
    }),
    ...(e.userContext !== undefined && {
      user_context: e.userContext
    }),
    ...(e.messagesSummarized !== undefined && {
      messages_summarized: e.messagesSummarized
    }),
    ...(e.precomputed !== undefined && {
      precomputed: e.precomputed
    }),
    ...(e.preCompactDiscoveredTools !== undefined && {
      pre_compact_discovered_tools: e.preCompactDiscoveredTools
    }),
    ...(t && {
      preserved_segment: {
        head_uuid: t.headUuid,
        anchor_uuid: t.anchorUuid,
        tail_uuid: t.tailUuid
      }
    }),
    ...(n && {
      preserved_messages: {
        anchor_uuid: n.anchorUuid,
        uuids: n.uuids,
        ...(n.allUuids !== undefined && {
          all_uuids: n.allUuids
        })
      }
    })
  };
}
function Hjt(e) {
  let {
    preserved_segment: t,
    preserved_messages: n
  } = e;
  return {
    trigger: e.trigger,
    preTokens: e.pre_tokens,
    ...(e.post_tokens !== undefined && {
      postTokens: e.post_tokens
    }),
    ...(e.duration_ms !== undefined && {
      durationMs: e.duration_ms
    }),
    ...(e.user_context !== undefined && {
      userContext: e.user_context
    }),
    ...(e.messages_summarized !== undefined && {
      messagesSummarized: e.messages_summarized
    }),
    ...(e.precomputed !== undefined && {
      precomputed: e.precomputed
    }),
    ...(e.pre_compact_discovered_tools !== undefined && {
      preCompactDiscoveredTools: [...e.pre_compact_discovered_tools]
    }),
    ...(t && {
      preservedSegment: {
        headUuid: t.head_uuid,
        anchorUuid: t.anchor_uuid,
        tailUuid: t.tail_uuid
      }
    }),
    ...(n && {
      preservedMessages: {
        anchorUuid: n.anchor_uuid,
        uuids: [...n.uuids],
        ...(n.all_uuids !== undefined && {
          allUuids: [...n.all_uuids]
        })
      }
    })
  };
}
function MSl(e, t) {
  return e.flatMap(n => {
    switch (n.type) {
      case "assistant":
        {
          let r = dnm(n),
            o = Zut(r.content, t);
          return [{
            type: "assistant",
            message: r,
            session_id: kt(),
            parent_tool_use_id: null,
            uuid: n.uuid,
            error: n.error,
            ...(n.requestId !== undefined && {
              request_id: n.requestId
            }),
            ...(o.length > 0 && {
              tool_use_meta: o
            })
          }];
        }
      case "user":
        return [{
          type: "user",
          message: n.message,
          session_id: kt(),
          parent_tool_use_id: null,
          uuid: n.uuid,
          timestamp: n.timestamp,
          isSynthetic: n.isMeta || n.isVisibleInTranscriptOnly,
          ...(n.toolUseResult !== undefined && {
            tool_use_result: n.toolUseResult
          }),
          ...(n.origin !== undefined && {
            origin: n.origin
          })
        }];
      case "system":
        if (n.subtype === "compact_boundary" && n.compactMetadata) return [{
          type: "system",
          subtype: "compact_boundary",
          session_id: kt(),
          uuid: n.uuid,
          compact_metadata: kjt(n.compactMetadata)
        }];
        if (n.subtype === "local_command" && (n.content.includes(`<${Zx}>`) || n.content.includes(`<${qX}>`))) return [aGn(n.content, n.uuid)];
        return [];
      default:
        return [];
    }
  });
}
function aGn(e, t) {
  let n = bc(e).replace(/<local-command-stdout>([\s\S]*?)<\/local-command-stdout>/, "$1").replace(/<local-command-stderr>([\s\S]*?)<\/local-command-stderr>/, "$1").trim();
  return {
    type: "assistant",
    message: mS({
      content: n
    }).message,
    parent_tool_use_id: null,
    session_id: kt(),
    uuid: t
  };
}
function NSl(e, {
  includeOverageInUse: t = true
} = {}) {
  if (!e) return;
  return {
    status: e.status,
    ...(e.resetsAt !== undefined && {
      resetsAt: e.resetsAt
    }),
    ...(e.rateLimitType !== undefined && {
      rateLimitType: e.rateLimitType
    }),
    ...(e.utilization !== undefined && {
      utilization: e.utilization
    }),
    ...(e.overageStatus !== undefined && {
      overageStatus: e.overageStatus
    }),
    ...(e.overageResetsAt !== undefined && {
      overageResetsAt: e.overageResetsAt
    }),
    ...(e.overageDisabledReason !== undefined && {
      overageDisabledReason: e.overageDisabledReason === "org_spend_cap_reached" ? "org_level_disabled_until" : e.overageDisabledReason
    }),
    ...(e.isUsingOverage !== undefined && {
      isUsingOverage: e.isUsingOverage
    }),
    ...(e.overageInUse !== undefined && t && {
      overageInUse: e.overageInUse
    }),
    ...(e.surpassedThreshold !== undefined && {
      surpassedThreshold: e.surpassedThreshold
    }),
    ...(e.overagePeriodMonthly !== undefined && {
      overagePeriodMonthly: e.overagePeriodMonthly
    }),
    ...(e.errorCode !== undefined && {
      errorCode: e.errorCode
    }),
    ...(e.canUserPurchaseCredits !== undefined && {
      canUserPurchaseCredits: e.canUserPurchaseCredits
    }),
    ...(e.hasChargeableSavedPaymentMethod !== undefined && {
      hasChargeableSavedPaymentMethod: e.hasChargeableSavedPaymentMethod
    })
  };
}
function dnm(e) {
  let t = e.message.content;
  if (!Array.isArray(t)) return e.message;
  let n = t.map(r => {
    if (r.type !== "tool_use") return r;
    if (r.name === LO) {
      let o = IP();
      if (o) return {
        ...r,
        input: {
          ...r.input,
          plan: o
        }
      };
    }
    return r;
  });
  return {
    ...e.message,
    content: n
  };
}
var LSl;
var kDe = b(() => {
  ct();
  Dp();
  lo();
  Ax();
  Npo();
  LSl = require("crypto");
});

export {iGn as KGn,kjt as r8t,Hjt as o8t,MSl as oEl,aGn as zGn,NSl as sEl,dnm as qom,LSl as rEl,kDe as KDe};
