// @ts-nocheck
import {Amt,qyo} from "./4328_id.ts";
import {getSessionId as It,lt} from "../session/0132_sent.ts";
import {Tk,jX,Ud} from "../../vendor/m615.ts";
import {cc} from "../../vendor/m2459.ts";
import {fS,po} from "../tools/5224_userPromptCount.ts";
import {yD} from "../config/2259_R9r.ts";
import {VD,Dw} from "./5176_encoding.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
/**
 * Conversion between internal (camelCase) conversation-history entries and the
 * on-the-wire (snake_case) JSONL / SDK message shapes, plus rate-limit status
 * normalization. Module 4898 of Claude Code v2.1.190.
 *
 * Three layers of mapping live here:
 *  - wire -> internal  ({@link normalizeStreamEvents}, {@link wireToInternalCompactMetadata})
 *  - internal -> wire  ({@link internalToWireMessages}, {@link internalToWireCompactMetadata})
 *  - rate-limit status normalization ({@link normalizeRateLimitStatus})
 */

type AnyRecord = Record<string, any>;

/**
 * Map raw stream/SDK events into the in-memory transcript message shape.
 * Drops anything that is not an assistant/user/compact-boundary entry.
 */
function normalizeStreamEvents(events: any[]): AnyRecord[] {
  return events.flatMap((event: AnyRecord) => {
    switch (event.type) {
      case "assistant":
        return [{
          type: "assistant",
          message: event.message,
          uuid: event.uuid,
          requestId: void 0,
          timestamp: new Date().toISOString()
        }];
      case "user":
        return [{
          type: "user",
          message: event.message,
          uuid: event.uuid ?? cryptoModule.randomUUID(),
          timestamp: event.timestamp ?? new Date().toISOString(),
          isMeta: event.isSynthetic
        }];
      case "system":
        if (event.subtype === "compact_boundary") return [{
          type: "system",
          content: "Conversation compacted",
          level: "info",
          subtype: "compact_boundary",
          compactMetadata: wireToInternalCompactMetadata(event.compact_metadata),
          uuid: event.uuid,
          timestamp: new Date().toISOString()
        }];
        return [];
      default:
        return [];
    }
  });
}

/** Convert internal (camelCase) compact metadata back to the wire (snake_case) shape. */
function internalToWireCompactMetadata(metadata: AnyRecord): AnyRecord {
  let {
    preservedSegment: segment,
    preservedMessages: messages
  } = metadata;
  return {
    trigger: metadata.trigger,
    pre_tokens: metadata.preTokens,
    ...(metadata.postTokens !== void 0 && {
      post_tokens: metadata.postTokens
    }),
    ...(metadata.durationMs !== void 0 && {
      duration_ms: metadata.durationMs
    }),
    ...(metadata.userContext !== void 0 && {
      user_context: metadata.userContext
    }),
    ...(metadata.messagesSummarized !== void 0 && {
      messages_summarized: metadata.messagesSummarized
    }),
    ...(metadata.precomputed !== void 0 && {
      precomputed: metadata.precomputed
    }),
    ...(metadata.preCompactDiscoveredTools !== void 0 && {
      pre_compact_discovered_tools: metadata.preCompactDiscoveredTools
    }),
    ...(segment && {
      preserved_segment: {
        head_uuid: segment.headUuid,
        anchor_uuid: segment.anchorUuid,
        tail_uuid: segment.tailUuid
      }
    }),
    ...(messages && {
      preserved_messages: {
        anchor_uuid: messages.anchorUuid,
        uuids: messages.uuids,
        ...(messages.allUuids !== void 0 && {
          all_uuids: messages.allUuids
        })
      }
    })
  };
}

/** Convert wire (snake_case) compact metadata into the internal (camelCase) shape. */
function wireToInternalCompactMetadata(metadata: AnyRecord): AnyRecord {
  let {
    preserved_segment: segment,
    preserved_messages: messages
  } = metadata;
  return {
    trigger: metadata.trigger,
    preTokens: metadata.pre_tokens,
    ...(metadata.post_tokens !== void 0 && {
      postTokens: metadata.post_tokens
    }),
    ...(metadata.duration_ms !== void 0 && {
      durationMs: metadata.duration_ms
    }),
    ...(metadata.user_context !== void 0 && {
      userContext: metadata.user_context
    }),
    ...(metadata.messages_summarized !== void 0 && {
      messagesSummarized: metadata.messages_summarized
    }),
    ...(metadata.precomputed !== void 0 && {
      precomputed: metadata.precomputed
    }),
    ...(metadata.pre_compact_discovered_tools !== void 0 && {
      preCompactDiscoveredTools: [...metadata.pre_compact_discovered_tools]
    }),
    ...(segment && {
      preservedSegment: {
        headUuid: segment.head_uuid,
        anchorUuid: segment.anchor_uuid,
        tailUuid: segment.tail_uuid
      }
    }),
    ...(messages && {
      preservedMessages: {
        anchorUuid: messages.anchor_uuid,
        uuids: [...messages.uuids],
        ...(messages.all_uuids !== void 0 && {
          allUuids: [...messages.all_uuids]
        })
      }
    })
  };
}

/**
 * Map in-memory transcript messages into wire (snake_case) SDK messages,
 * attaching session id, tool-use metadata, and translating compact/local-command
 * system entries.
 */
function internalToWireMessages(messages: any[], context: any): AnyRecord[] {
  return messages.flatMap((entry: AnyRecord) => {
    switch (entry.type) {
      case "assistant":
        {
          let normalizedMessage = injectPlanIntoToolUse(entry),
            toolUseMeta = Amt(normalizedMessage.content, context);
          return [{
            type: "assistant",
            message: normalizedMessage,
            session_id: It(),
            parent_tool_use_id: null,
            uuid: entry.uuid,
            error: entry.error,
            ...(entry.requestId !== void 0 && {
              request_id: entry.requestId
            }),
            ...(toolUseMeta.length > 0 && {
              tool_use_meta: toolUseMeta
            })
          }];
        }
      case "user":
        return [{
          type: "user",
          message: entry.message,
          session_id: It(),
          parent_tool_use_id: null,
          uuid: entry.uuid,
          timestamp: entry.timestamp,
          isSynthetic: entry.isMeta || entry.isVisibleInTranscriptOnly,
          ...(entry.toolUseResult !== void 0 && {
            tool_use_result: entry.toolUseResult
          }),
          ...(entry.origin !== void 0 && {
            origin: entry.origin
          })
        }];
      case "system":
        if (entry.subtype === "compact_boundary" && entry.compactMetadata) return [{
          type: "system",
          subtype: "compact_boundary",
          session_id: It(),
          uuid: entry.uuid,
          compact_metadata: internalToWireCompactMetadata(entry.compactMetadata)
        }];
        if (entry.subtype === "local_command" && (entry.content.includes(`<${Tk}>`) || entry.content.includes(`<${jX}>`))) return [localCommandToAssistantMessage(entry.content, entry.uuid)];
        return [];
      default:
        return [];
    }
  });
}

/** Wrap a local-command output (stdout/stderr stripped) into an assistant message. */
function localCommandToAssistantMessage(content: string, uuid: string): AnyRecord {
  let stripped = cc(content).replace(/<local-command-stdout>([\s\S]*?)<\/local-command-stdout>/, "$1").replace(/<local-command-stderr>([\s\S]*?)<\/local-command-stderr>/, "$1").trim();
  return {
    type: "assistant",
    message: fS({
      content: stripped
    }).message,
    parent_tool_use_id: null,
    session_id: It(),
    uuid
  };
}

/**
 * Normalize a raw rate-limit status object into the public shape, dropping
 * undefined fields and translating the spend-cap disabled reason.
 */
function normalizeRateLimitStatus(status: AnyRecord, {
  includeOverageInUse: includeOverageInUse = !0
}: { includeOverageInUse?: boolean } = {}): AnyRecord | undefined {
  if (!status) return;
  return {
    status: status.status,
    ...(status.resetsAt !== void 0 && {
      resetsAt: status.resetsAt
    }),
    ...(status.rateLimitType !== void 0 && {
      rateLimitType: status.rateLimitType
    }),
    ...(status.utilization !== void 0 && {
      utilization: status.utilization
    }),
    ...(status.overageStatus !== void 0 && {
      overageStatus: status.overageStatus
    }),
    ...(status.overageResetsAt !== void 0 && {
      overageResetsAt: status.overageResetsAt
    }),
    ...(status.overageDisabledReason !== void 0 && {
      overageDisabledReason: status.overageDisabledReason === "org_spend_cap_reached" ? "org_level_disabled_until" : status.overageDisabledReason
    }),
    ...(status.isUsingOverage !== void 0 && {
      isUsingOverage: status.isUsingOverage
    }),
    ...(status.overageInUse !== void 0 && includeOverageInUse && {
      overageInUse: status.overageInUse
    }),
    ...(status.surpassedThreshold !== void 0 && {
      surpassedThreshold: status.surpassedThreshold
    }),
    ...(status.overagePeriodMonthly !== void 0 && {
      overagePeriodMonthly: status.overagePeriodMonthly
    }),
    ...(status.overagePeriodChannel !== void 0 && {
      overagePeriodChannel: status.overagePeriodChannel
    }),
    ...(status.errorCode !== void 0 && {
      errorCode: status.errorCode
    }),
    ...(status.canUserPurchaseCredits !== void 0 && {
      canUserPurchaseCredits: status.canUserPurchaseCredits
    }),
    ...(status.hasChargeableSavedPaymentMethod !== void 0 && {
      hasChargeableSavedPaymentMethod: status.hasChargeableSavedPaymentMethod
    })
  };
}

/**
 * For assistant messages, inject the current plan into the ExitPlanMode-style
 * tool_use input when its name matches the plan tool. Returns the message
 * (possibly with rewritten content).
 */
function injectPlanIntoToolUse(entry: AnyRecord): AnyRecord {
  let content = entry.message.content;
  if (!Array.isArray(content)) return entry.message;
  let rewrittenContent = content.map((block: AnyRecord) => {
    if (block.type !== "tool_use") return block;
    if (block.name === yD) {
      let plan = VD();
      if (plan) return {
        ...block,
        input: {
          ...block.input,
          plan
        }
      };
    }
    return block;
  });
  return {
    ...entry.message,
    content: rewrittenContent
  };
}
var cryptoModule;
var VPe = b(() => {
  lt();
  Ud();
  po();
  Dw();
  qyo();
  cryptoModule = require("crypto");
});

export {normalizeStreamEvents as Ljn,internalToWireCompactMetadata as RGt,wireToInternalCompactMetadata as vGt,internalToWireMessages as c0l,localCommandToAssistantMessage as Mjn,normalizeRateLimitStatus as u0l,injectPlanIntoToolUse as efm,cryptoModule as l0l,VPe};
