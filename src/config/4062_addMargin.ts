// @ts-nocheck
import {_t,uo} from "../../vendor/m2468.ts";
import {Ne} from "../../vendor/m583.ts";
import {getUserMsgOptIn as wre,lt} from "../session/0132_sent.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {nu,lr} from "../../vendor/m233.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {nqa,rqa} from "../../vendor/m4060.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {Ir} from "../../vendor/m584.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Renders a user-prompt message block, optionally truncating very long text
 * into a head/hidden/tail summary, and wraps it with margin/background/padding.
 *
 * The `cache.c(23)`-style slots are React Compiler (auto-memoization) output:
 * each `if (cache[i] !== input)` guard recomputes a derived value only when its
 * inputs changed, otherwise it reuses the previously cached slot.
 */
interface UserPromptMessageProps {
  /** Whether to add a top margin to the rendered block. */
  addMargin: boolean;
  /** The prompt payload; only its `text` field is consumed here. */
  param: { text: string };
  /** Whether the message is shown in transcript mode. */
  isTranscriptMode: boolean;
  /** Optional timestamp shown in the brief layout. */
  timestamp: unknown;
}

/** Truncated representation of an overly long prompt text. */
interface TruncatedText {
  /** Leading slice of the text. */
  head: string;
  /** Count of lines hidden between head and tail. */
  hiddenLines: number;
  /** Trailing slice of the text. */
  tail: string;
}

function iqa(props: UserPromptMessageProps) {
  let cache = sqa.c(23),
    {
      addMargin,
      param,
      isTranscriptMode,
      timestamp
    } = props,
    {
      text
    } = param,
    isBriefOnly = _t(LDp),
    viewingAgentTaskId = _t(ODp),
    isCodeBrief = Ne.CLAUDE_CODE_BRIEF,
    useBriefLayout;
  if (cache[0] !== isBriefOnly || cache[1] !== isTranscriptMode || cache[2] !== viewingAgentTaskId) useBriefLayout = wre() && (isCodeBrief || it("tengu_kairos_brief", !1)) && isBriefOnly && !isTranscriptMode && !viewingAgentTaskId, cache[0] = isBriefOnly, cache[1] = isTranscriptMode, cache[2] = viewingAgentTaskId, cache[3] = useBriefLayout;else useBriefLayout = cache[3];
  let briefLayout = useBriefLayout,
    displayContent;
  e: {
    if (text.length <= DDp) {
      displayContent = text;
      break e;
    }
    let headSlice;
    if (cache[4] !== text) headSlice = text.slice(0, oqa), cache[4] = text, cache[5] = headSlice;else headSlice = cache[5];
    let head = headSlice,
      totalLineCount,
      tailLineCount,
      tailSlice;
    if (cache[6] !== text) tailSlice = text.slice(-PDp), totalLineCount = nu(text, `
`, oqa), tailLineCount = nu(tailSlice, `
`), cache[6] = text, cache[7] = totalLineCount, cache[8] = tailLineCount, cache[9] = tailSlice;else totalLineCount = cache[7], tailLineCount = cache[8], tailSlice = cache[9];
    let hiddenLineCount = totalLineCount - tailLineCount,
      truncated: TruncatedText;
    if (cache[10] !== head || cache[11] !== hiddenLineCount || cache[12] !== tailSlice) truncated = {
      head: head,
      hiddenLines: hiddenLineCount,
      tail: tailSlice
    }, cache[10] = head, cache[11] = hiddenLineCount, cache[12] = tailSlice, cache[13] = truncated;else truncated = cache[13];
    displayContent = truncated;
  }
  let content = displayContent;
  if (!text) return Ie(Error("No content found in user prompt message")), null;
  let marginTop = addMargin ? 1 : 0,
    backgroundColor = briefLayout ? void 0 : "userMessageBackground",
    paddingRight = briefLayout ? 0 : 1,
    briefTimestamp = briefLayout ? timestamp : void 0,
    messageNode;
  if (cache[14] !== content || cache[15] !== briefTimestamp || cache[16] !== briefLayout) messageNode = gmo.jsx(nqa, {
    text: content,
    useBriefLayout: briefLayout,
    timestamp: briefTimestamp
  }), cache[14] = content, cache[15] = briefTimestamp, cache[16] = briefLayout, cache[17] = messageNode;else messageNode = cache[17];
  let wrappedNode;
  if (cache[18] !== marginTop || cache[19] !== backgroundColor || cache[20] !== paddingRight || cache[21] !== messageNode) wrappedNode = gmo.jsx($, {
    flexDirection: "column",
    marginTop: marginTop,
    backgroundColor: backgroundColor,
    paddingRight: paddingRight,
    children: messageNode
  }), cache[18] = marginTop, cache[19] = backgroundColor, cache[20] = paddingRight, cache[21] = messageNode, cache[22] = wrappedNode;else wrappedNode = cache[22];
  return wrappedNode;
}
function ODp(state: { viewingAgentTaskId: unknown }) {
  return state.viewingAgentTaskId;
}
function LDp(state: { isBriefOnly: unknown }) {
  return state.isBriefOnly;
}
var sqa,
  gmo,
  DDp = 1e4,
  oqa = 2500,
  PDp = 2500;
var aqa = b(() => {
  lt();
  je();
  jn();
  uo();
  Ir();
  vn();
  lr();
  rqa();
  sqa = x(tt(), 1), gmo = x(oe(), 1);
});

export {iqa,ODp,LDp,sqa,gmo,DDp,oqa,PDp,aqa};
