// @ts-nocheck
import {zG,fRl,hRl,Lko} from "../agent/4791_children.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
import {saveGlobalConfig as hn,getGlobalConfig as Ot,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {Xe,Zs} from "../../vendor/m2216.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {pRl,dRl,Oko} from "../../vendor/m4789.ts";
import {F4,iHe} from "../../vendor/m2820.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {hr,Ol} from "../../vendor/m2573.ts";
import {ku,rS} from "../../vendor/m2582.ts";
import {Oo,ss} from "../../vendor/m2553.ts";
import {bs,ff} from "../../vendor/m2561.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/*
 * tui/4792_onExit.ts - React/Ink terminal UI restoration (Power-ups screen).
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols, property names, literals, and exported names are preserved.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 * - Short internal names are retained where local usage does not verify a safer semantic name.
 *
 * Azn renders the "Power-ups" list: a set of lessons the user can open and mark done.
 * Each lesson tracks an unlocked/completed state persisted via the powerupsUnlocked store.
 */
function Azn(props: any): any {
  let cache = Mko.c(47),
    {
      onExit
    } = props,
    [unlockedSet, setUnlockedSet] = XWt.useState(Ulm),
    [activeLesson, setActiveLesson] = XWt.useState(null),
    [focusedLessonId, setFocusedLessonId] = XWt.useState(zG[0].id),
    [allDone, setAllDone] = XWt.useState(!1),
    closeAllDone;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) closeAllDone = () => setAllDone(!1), cache[0] = closeAllDone;else closeAllDone = cache[0];
  let onAllDoneClose = closeAllDone,
    openLessonFn;
  if (cache[1] !== unlockedSet) openLessonFn = function (lesson: any): any {
    setFocusedLessonId(lesson.id), setActiveLesson(lesson), W("tengu_powerup_lesson_opened", {
      lesson_id: Le(lesson.id),
      was_already_unlocked: unlockedSet.has(lesson.id),
      unlocked_count: unlockedSet.size
    });
  }, cache[1] = unlockedSet, cache[2] = openLessonFn;else openLessonFn = cache[2];
  let openLesson = openLessonFn,
    completeLessonFn;
  if (cache[3] !== unlockedSet) completeLessonFn = function (lessonId: any): any {
    if (unlockedSet.has(lessonId)) return;
    let nextUnlocked = new Set(unlockedSet).add(lessonId);
    if (setUnlockedSet(nextUnlocked), hn(config => ({
      ...config,
      powerupsUnlocked: [...nextUnlocked]
    })), W("tengu_powerup_lesson_completed", {
      lesson_id: Le(lessonId),
      unlocked_count: nextUnlocked.size,
      all_unlocked: nextUnlocked.size === zG.length
    }), nextUnlocked.size === zG.length) setAllDone(!0);
  }, cache[3] = unlockedSet, cache[4] = completeLessonFn;else completeLessonFn = cache[4];
  let completeLesson = completeLessonFn,
    optionsValue;
  if (cache[5] !== unlockedSet) optionsValue = zG.map((lesson: any): any => {
    let isUnlocked = unlockedSet.has(lesson.id),
      label = `${isUnlocked ? Xe.tick : Xe.circle} ${lesson.title}`;
    return {
      label: isUnlocked ? Vw.jsx(v, {
        color: "success",
        children: label
      }) : label,
      value: lesson.id,
      description: lesson.tagline
    };
  }), cache[5] = unlockedSet, cache[6] = optionsValue;else optionsValue = cache[6];
  let options = optionsValue;
  if (activeLesson) {
    let detailIsUnlocked;
    if (cache[7] !== unlockedSet || cache[8] !== activeLesson.id) detailIsUnlocked = unlockedSet.has(activeLesson.id), cache[7] = unlockedSet, cache[8] = activeLesson.id, cache[9] = detailIsUnlocked;else detailIsUnlocked = cache[9];
    let onDetailDone;
    if (cache[10] !== completeLesson || cache[11] !== activeLesson.id) onDetailDone = (): any => {
      completeLesson(activeLesson.id), setActiveLesson(null);
    }, cache[10] = completeLesson, cache[11] = activeLesson.id, cache[12] = onDetailDone;else onDetailDone = cache[12];
    let onDetailBack;
    if (cache[13] === Symbol.for("react.memo_cache_sentinel")) onDetailBack = () => setActiveLesson(null), cache[13] = onDetailBack;else onDetailBack = cache[13];
    let detailView;
    if (cache[14] !== detailIsUnlocked || cache[15] !== onDetailDone || cache[16] !== activeLesson) detailView = Vw.jsx(qlm, {
      lesson: activeLesson,
      isUnlocked: detailIsUnlocked,
      onDone: onDetailDone,
      onBack: onDetailBack
    }), cache[14] = detailIsUnlocked, cache[15] = onDetailDone, cache[16] = activeLesson, cache[17] = detailView;else detailView = cache[17];
    return detailView;
  }
  let everythingUnlocked = unlockedSet.size === zG.length,
    titleNode;
  if (cache[18] !== everythingUnlocked) titleNode = everythingUnlocked ? Vw.jsx(pRl, {
    text: "All powered up"
  }) : Vw.jsx(v, {
    bold: !0,
    color: "claude",
    children: "Power-ups"
  }), cache[18] = everythingUnlocked, cache[19] = titleNode;else titleNode = cache[19];
  let countNode;
  if (cache[20] !== unlockedSet.size) countNode = Vw.jsxs(v, {
    dimColor: !0,
    children: [" ", unlockedSet.size, "/", zG.length, " unlocked", " "]
  }), cache[20] = unlockedSet.size, cache[21] = countNode;else countNode = cache[21];
  let progressRatio = unlockedSet.size / zG.length,
    progressBar;
  if (cache[22] !== progressRatio) progressBar = Vw.jsx(F4, {
    ratio: progressRatio,
    width: 16,
    fillColor: "claude",
    emptyColor: "inactive"
  }), cache[22] = progressRatio, cache[23] = progressBar;else progressBar = cache[23];
  let header;
  if (cache[24] !== titleNode || cache[25] !== countNode || cache[26] !== progressBar) header = Vw.jsxs($, {
    marginBottom: 1,
    children: [titleNode, countNode, progressBar]
  }), cache[24] = titleNode, cache[25] = countNode, cache[26] = progressBar, cache[27] = header;else header = cache[27];
  let helpText = everythingUnlocked ? "Now go build something." : "Each power-up teaches one thing Claude Code can do that most people miss. Open one, read it, try it, mark it done.",
    helpNode;
  if (cache[28] !== helpText) helpNode = Vw.jsx($, {
    marginBottom: 1,
    children: Vw.jsx(v, {
      dimColor: !0,
      wrap: "wrap",
      children: helpText
    })
  }), cache[28] = helpText, cache[29] = helpNode;else helpNode = cache[29];
  let onSelectFn;
  if (cache[30] !== openLesson) onSelectFn = (lessonId: any): any => {
    let lesson = zG.find((candidate: any): any => candidate.id === lessonId);
    if (lesson) openLesson(lesson);
  }, cache[30] = openLesson, cache[31] = onSelectFn;else onSelectFn = cache[31];
  let onCancelFn;
  if (cache[32] !== onExit) onCancelFn = () => onExit("Power-ups closed"), cache[32] = onExit, cache[33] = onCancelFn;else onCancelFn = cache[33];
  let selectNode;
  if (cache[34] !== options || cache[35] !== focusedLessonId || cache[36] !== onSelectFn || cache[37] !== onCancelFn) selectNode = Vw.jsx(hr, {
    options: options,
    hideIndexes: !0,
    visibleOptionCount: zG.length,
    defaultFocusValue: focusedLessonId,
    onChange: onSelectFn,
    onCancel: onCancelFn
  }), cache[34] = options, cache[35] = focusedLessonId, cache[36] = onSelectFn, cache[37] = onCancelFn, cache[38] = selectNode;else selectNode = cache[38];
  let footerNode;
  if (cache[39] === Symbol.for("react.memo_cache_sentinel")) footerNode = Vw.jsx($, {
    marginTop: 1,
    children: Vw.jsx(fRl, {})
  }), cache[39] = footerNode;else footerNode = cache[39];
  let allDoneNode;
  if (cache[40] !== allDone) allDoneNode = allDone && Vw.jsx(dRl, {
    onDone: onAllDoneClose
  }), cache[40] = allDone, cache[41] = allDoneNode;else allDoneNode = cache[41];
  let rendered;
  if (cache[42] !== helpNode || cache[43] !== selectNode || cache[44] !== allDoneNode || cache[45] !== header) rendered = Vw.jsx(ku, {
    color: "claude",
    children: Vw.jsxs($, {
      flexDirection: "column",
      children: [header, helpNode, selectNode, footerNode, allDoneNode]
    })
  }), cache[42] = helpNode, cache[43] = selectNode, cache[44] = allDoneNode, cache[45] = header, cache[46] = rendered;else rendered = cache[46];
  return rendered;
}
/** Build the initial unlocked-lesson Set from persisted config, dropping unknown ids. */
function Ulm(): any {
  let stored = Ot().powerupsUnlocked ?? [];
  return new Set(stored.filter($lm));
}
/** True if the given id matches a known lesson. */
function $lm(lessonId: any): any {
  return zG.some((lesson: any): any => lesson.id === lessonId);
}
/** Lesson detail view with confirm-to-complete / back keybindings. */
function qlm(props: any): any {
  let cache = Mko.c(15),
    {
      lesson,
      isUnlocked,
      onDone,
      onBack
    } = props,
    confirmHandlers;
  if (cache[0] !== onBack || cache[1] !== onDone) confirmHandlers = {
    "confirm:yes": onDone,
    "confirm:no": onBack
  }, cache[0] = onBack, cache[1] = onDone, cache[2] = confirmHandlers;else confirmHandlers = cache[2];
  let confirmOptions;
  if (cache[3] === Symbol.for("react.memo_cache_sentinel")) confirmOptions = {
    context: "Confirmation"
  }, cache[3] = confirmOptions;else confirmOptions = cache[3];
  Oo(confirmHandlers, confirmOptions);
  let statusKind = isUnlocked ? "success" : "pending",
    statusNode;
  if (cache[4] !== statusKind) statusNode = Vw.jsx(bs, {
    status: statusKind,
    withSpace: !0
  }), cache[4] = statusKind, cache[5] = statusNode;else statusNode = cache[5];
  let titleNode;
  if (cache[6] !== lesson.title) titleNode = Vw.jsx(v, {
    bold: !0,
    color: "claude",
    children: lesson.title
  }), cache[6] = lesson.title, cache[7] = titleNode;else titleNode = cache[7];
  let titleRow;
  if (cache[8] !== statusNode || cache[9] !== titleNode) titleRow = Vw.jsxs($, {
    children: [statusNode, titleNode]
  }), cache[8] = statusNode, cache[9] = titleNode, cache[10] = titleRow;else titleRow = cache[10];
  let hintNode;
  if (cache[11] === Symbol.for("react.memo_cache_sentinel")) hintNode = Vw.jsx(hRl, {}), cache[11] = hintNode;else hintNode = cache[11];
  let rendered;
  if (cache[12] !== lesson.body || cache[13] !== titleRow) rendered = Vw.jsx(ku, {
    color: "claude",
    children: Vw.jsxs($, {
      flexDirection: "column",
      gap: 1,
      children: [titleRow, lesson.body, hintNode]
    })
  }), cache[12] = lesson.body, cache[13] = titleRow, cache[14] = rendered;else rendered = cache[14];
  return rendered;
}
var Mko, XWt, Vw;
var Nko = b(() => {
  Zs();
  je();
  ss();
  kt();
  tr();
  Ol();
  rS();
  iHe();
  ff();
  Oko();
  Lko();
  Mko = x(tt(), 1), XWt = x(et(), 1), Vw = x(oe(), 1);
});

export {Azn,Ulm,$lm,qlm,Mko,XWt,Vw,Nko};
