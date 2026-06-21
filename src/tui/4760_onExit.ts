// @ts-nocheck
import {HG as mG,_gl as JAl,ygl as XAl,hEo as dbo} from "./4759_children.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {fromEnum as Ue} from "../../vendor/m5.ts";
import {saveGlobalConfig as un,getGlobalConfig as vt,Qn as nr} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {et as Ze,Ai as pi} from "../../vendor/m2208.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {hgl as zAl,Agl as KAl,AEo as ubo} from "../../vendor/m4757.ts";
import {Eq as lq,_xe as exe} from "../../vendor/m2807.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {pr as Ar,Yl as zl} from "../../vendor/m2562.ts";
import {Wu as Ku,lS as tS} from "../../vendor/m2571.ts";
import {Wo,Ts as _s} from "../../vendor/m2542.ts";
import {Bs as Os,rA as lA} from "../../vendor/m2550.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function PowerupsDialog(props) {
  let cache = gwq.c(47),
    {
      onExit: onExit
    } = props,
    [unlockedIds, setUnlockedIds] = dp_.useState(getInitialUnlockedIds),
    [activeLesson, setActiveLesson] = dp_.useState(null),
    [focusedLessonId, setFocusedLessonId] = dp_.useState(mG[0].id),
    [showCelebration, setShowCelebration] = dp_.useState(false),
    dismissCelebration;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) dismissCelebration = () => setShowCelebration(false), cache[0] = dismissCelebration;else dismissCelebration = cache[0];
  let onCelebrationDone = dismissCelebration,
    openLesson;
  if (cache[1] !== unlockedIds) openLesson = function (F) {
    setFocusedLessonId(F.id), setActiveLesson(F), j("tengu_powerup_lesson_opened", {
      lesson_id: Ue(F.id),
      was_already_unlocked: unlockedIds.has(F.id),
      unlocked_count: unlockedIds.size
    });
  }, cache[1] = unlockedIds, cache[2] = openLesson;else openLesson = cache[2];
  let handleOpenLesson = openLesson,
    markLessonDone;
  if (cache[3] !== unlockedIds) markLessonDone = function (F) {
    if (unlockedIds.has(F)) return;
    let W = new Set(unlockedIds).add(F);
    if (setUnlockedIds(W), un(G => ({
      ...G,
      powerupsUnlocked: [...W]
    })), j("tengu_powerup_lesson_completed", {
      lesson_id: Ue(F),
      unlocked_count: W.size,
      all_unlocked: W.size === mG.length
    }), W.size === mG.length) setShowCelebration(true);
  }, cache[3] = unlockedIds, cache[4] = markLessonDone;else markLessonDone = cache[4];
  let handleMarkLessonDone = markLessonDone,
    options;
  if (cache[5] !== unlockedIds) options = mG.map($ => {
    let F = unlockedIds.has($.id),
      W = `${F ? Ze.tick : Ze.circle} ${$.title}`;
    return {
      label: F ? xT.createElement(w, {
        color: "success"
      }, W) : W,
      value: $.id,
      description: $.tagline
    };
  }), cache[5] = unlockedIds, cache[6] = options;else options = cache[6];
  let listOptions = options;
  if (activeLesson) {
    let isActiveUnlocked;
    if (cache[7] !== unlockedIds || cache[8] !== activeLesson.id) isActiveUnlocked = unlockedIds.has(activeLesson.id), cache[7] = unlockedIds, cache[8] = activeLesson.id, cache[9] = isActiveUnlocked;else isActiveUnlocked = cache[9];
    let handleActiveDone;
    if (cache[10] !== handleMarkLessonDone || cache[11] !== activeLesson.id) handleActiveDone = () => {
      handleMarkLessonDone(activeLesson.id), setActiveLesson(null);
    }, cache[10] = handleMarkLessonDone, cache[11] = activeLesson.id, cache[12] = handleActiveDone;else handleActiveDone = cache[12];
    let handleActiveBack;
    if (cache[13] === Symbol.for("react.memo_cache_sentinel")) handleActiveBack = () => setActiveLesson(null), cache[13] = handleActiveBack;else handleActiveBack = cache[13];
    let lessonView;
    if (cache[14] !== isActiveUnlocked || cache[15] !== handleActiveDone || cache[16] !== activeLesson) lessonView = xT.createElement(PowerupLessonView, {
      lesson: activeLesson,
      isUnlocked: isActiveUnlocked,
      onDone: handleActiveDone,
      onBack: handleActiveBack
    }), cache[14] = isActiveUnlocked, cache[15] = handleActiveDone, cache[16] = activeLesson, cache[17] = lessonView;else lessonView = cache[17];
    return lessonView;
  }
  let allUnlocked = unlockedIds.size === mG.length,
    header;
  if (cache[18] !== allUnlocked) header = allUnlocked ? xT.createElement(zAl, {
    text: "All powered up"
  }) : xT.createElement(w, {
    bold: true,
    color: "claude"
  }, "Power-ups"), cache[18] = allUnlocked, cache[19] = header;else header = cache[19];
  let counter;
  if (cache[20] !== unlockedIds.size) counter = xT.createElement(w, {
    dimColor: true
  }, " ", unlockedIds.size, "/", mG.length, " unlocked", " "), cache[20] = unlockedIds.size, cache[21] = counter;else counter = cache[21];
  let progressRatio = unlockedIds.size / mG.length,
    progressBar;
  if (cache[22] !== progressRatio) progressBar = xT.createElement(lq, {
    ratio: progressRatio,
    width: 16,
    fillColor: "claude",
    emptyColor: "inactive"
  }), cache[22] = progressRatio, cache[23] = progressBar;else progressBar = cache[23];
  let headerRow;
  if (cache[24] !== header || cache[25] !== counter || cache[26] !== progressBar) headerRow = xT.createElement(B, {
    marginBottom: 1
  }, header, counter, progressBar), cache[24] = header, cache[25] = counter, cache[26] = progressBar, cache[27] = headerRow;else headerRow = cache[27];
  let introText = allUnlocked ? "Now go build something." : "Each power-up teaches one thing Claude Code can do that most people miss. Open one, read it, try it, mark it done.",
    introBlock;
  if (cache[28] !== introText) introBlock = xT.createElement(B, {
    marginBottom: 1
  }, xT.createElement(w, {
    dimColor: true,
    wrap: "wrap"
  }, introText)), cache[28] = introText, cache[29] = introBlock;else introBlock = cache[29];
  let handleSelectLesson;
  if (cache[30] !== handleOpenLesson) handleSelectLesson = $ => {
    let F = mG.find(W => W.id === $);
    if (F) handleOpenLesson(F);
  }, cache[30] = handleOpenLesson, cache[31] = handleSelectLesson;else handleSelectLesson = cache[31];
  let handleCancel;
  if (cache[32] !== onExit) handleCancel = () => onExit("Power-ups closed"), cache[32] = onExit, cache[33] = handleCancel;else handleCancel = cache[33];
  let optionList;
  if (cache[34] !== listOptions || cache[35] !== focusedLessonId || cache[36] !== handleSelectLesson || cache[37] !== handleCancel) optionList = xT.createElement(Ar, {
    options: listOptions,
    hideIndexes: true,
    visibleOptionCount: mG.length,
    defaultFocusValue: focusedLessonId,
    onChange: handleSelectLesson,
    onCancel: handleCancel
  }), cache[34] = listOptions, cache[35] = focusedLessonId, cache[36] = handleSelectLesson, cache[37] = handleCancel, cache[38] = optionList;else optionList = cache[38];
  let footer;
  if (cache[39] === Symbol.for("react.memo_cache_sentinel")) footer = xT.createElement(B, {
    marginTop: 1
  }, xT.createElement(JAl, null)), cache[39] = footer;else footer = cache[39];
  let celebration;
  if (cache[40] !== showCelebration) celebration = showCelebration && xT.createElement(KAl, {
    onDone: onCelebrationDone
  }), cache[40] = showCelebration, cache[41] = celebration;else celebration = cache[41];
  let panel;
  if (cache[42] !== introBlock || cache[43] !== optionList || cache[44] !== celebration || cache[45] !== headerRow) panel = xT.createElement(Ku, {
    color: "claude"
  }, xT.createElement(B, {
    flexDirection: "column"
  }, headerRow, introBlock, optionList, footer, celebration)), cache[42] = introBlock, cache[43] = optionList, cache[44] = celebration, cache[45] = headerRow, cache[46] = panel;else panel = cache[46];
  return panel;
}
function getInitialUnlockedIds() {
  let persisted = vt().powerupsUnlocked ?? [];
  return new Set(persisted.filter(isKnownLessonId));
}
function isKnownLessonId(id) {
  return mG.some(lesson => lesson.id === id);
}
function PowerupLessonView(props) {
  let cache = gwq.c(15),
    {
      lesson: lesson,
      isUnlocked: isUnlocked,
      onDone: onDone,
      onBack: onBack
    } = props,
    keyHandlers;
  if (cache[0] !== onBack || cache[1] !== onDone) keyHandlers = {
    "confirm:yes": onDone,
    "confirm:no": onBack
  }, cache[0] = onBack, cache[1] = onDone, cache[2] = keyHandlers;else keyHandlers = cache[2];
  let keyBindingOptions;
  if (cache[3] === Symbol.for("react.memo_cache_sentinel")) keyBindingOptions = {
    context: "Confirmation"
  }, cache[3] = keyBindingOptions;else keyBindingOptions = cache[3];
  Wo(keyHandlers, keyBindingOptions);
  let statusKind = isUnlocked ? "success" : "pending",
    statusIcon;
  if (cache[4] !== statusKind) statusIcon = xT.createElement(Os, {
    status: statusKind,
    withSpace: true
  }), cache[4] = statusKind, cache[5] = statusIcon;else statusIcon = cache[5];
  let titleText;
  if (cache[6] !== lesson.title) titleText = xT.createElement(w, {
    bold: true,
    color: "claude"
  }, lesson.title), cache[6] = lesson.title, cache[7] = titleText;else titleText = cache[7];
  let titleRow;
  if (cache[8] !== statusIcon || cache[9] !== titleText) titleRow = xT.createElement(B, null, statusIcon, titleText), cache[8] = statusIcon, cache[9] = titleText, cache[10] = titleRow;else titleRow = cache[10];
  let footer;
  if (cache[11] === Symbol.for("react.memo_cache_sentinel")) footer = xT.createElement(XAl, null), cache[11] = footer;else footer = cache[11];
  let lessonPanel;
  if (cache[12] !== lesson.body || cache[13] !== titleRow) lessonPanel = xT.createElement(Ku, {
    color: "claude"
  }, xT.createElement(B, {
    flexDirection: "column",
    gap: 1
  }, titleRow, lesson.body, footer)), cache[12] = lesson.body, cache[13] = titleRow, cache[14] = lessonPanel;else lessonPanel = cache[14];
  return lessonPanel;
}
var gwq, xT, dp_;
var initPowerupsModule = b(() => {
  pi();
  Je();
  _s();
  Ct();
  nr();
  zl();
  tS();
  exe();
  lA();
  ubo();
  dbo();
  gwq = L(nt(), 1), xT = L(Te(), 1), dp_ = L(Te(), 1);
});

export {PowerupsDialog as BWn,getInitialUnlockedIds as RZp,isKnownLessonId as xZp,PowerupLessonView as kZp,gwq as gEo,xT as jm,dp_ as Pjt,initPowerupsModule as _Eo};
