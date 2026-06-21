// @ts-nocheck
import {Eu as bu} from "../../vendor/m3812.ts";
import {kE as CE,jL as OL} from "../../vendor/m3944.ts";
import {Or as Ir,Ts as _s} from "../../vendor/m2542.ts";
import {iM as XL,q9 as R9} from "../../vendor/m4604.ts";
import {Jl as Yl,ch as uh} from "../../vendor/m2727.ts";
import {sRl as Nvl,iRl as Bvl} from "../agent/4954_content.ts";
import {xm as Pm} from "../../vendor/m135.ts";
import {React as Pc,CE as SE} from "../../vendor/m3813.ts";
import {lr as ur,readRoster as Ec} from "../../vendor/m2547.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {tp as op,_x as fx} from "./3835_mode.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {Tn as hn,zs as qs} from "../../vendor/m2554.ts";
import {nl as Za,v_ as C_} from "../../vendor/m2573.ts";
import {Pa,rh} from "../../vendor/m2539.ts";
import {b,M as L} from "../../runtime.ts";
import {LD as OD} from "../../vendor/m194.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {$y as Fy} from "../../vendor/m3814.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function $J4() {
  let {
      updateWizardData: updateWizardData,
      goBack: goBack,
      goToStep: goToStep,
      wizardData: wizardData
    } = bu(),
    [descriptionText, setDescriptionText] = XX.useState(wizardData.generationPrompt || ""),
    [isGenerating, setIsGenerating] = XX.useState(false),
    [errorMessage, setErrorMessage] = XX.useState(null),
    [cursorOffset, setCursorOffset] = XX.useState(descriptionText.length),
    currentModel = CE(),
    abortControllerRef = XX.useRef(null),
    handleCancel = XX.useCallback(() => {
      if (abortControllerRef.current) abortControllerRef.current.abort(), abortControllerRef.current = null, setIsGenerating(false), setErrorMessage("Generation cancelled");
    }, []);
  Ir("confirm:no", handleCancel, {
    context: "Settings",
    isActive: isGenerating
  });
  let handleOpenExternalEditor = XX.useCallback(async () => {
    let result = await XL(descriptionText);
    if (result.content !== null) setDescriptionText(result.content), setCursorOffset(result.content.length);
  }, [descriptionText]);
  Ir("chat:externalEditor", handleOpenExternalEditor, {
    context: "Chat",
    isActive: !isGenerating
  });
  let handleGoBack = XX.useCallback(() => {
    updateWizardData({
      generationPrompt: "",
      agentType: "",
      systemPrompt: "",
      whenToUse: "",
      generatedAgent: undefined,
      wasGenerated: false
    }), setDescriptionText(""), setErrorMessage(null), goBack();
  }, [updateWizardData, goBack]);
  Ir("confirm:no", handleGoBack, {
    context: "Settings",
    isActive: !isGenerating
  });
  let handleSubmit = async () => {
      let trimmedDescription = descriptionText.trim();
      if (!trimmedDescription) {
        setErrorMessage("Please describe what the agent should do");
        return;
      }
      setErrorMessage(null), setIsGenerating(true), updateWizardData({
        generationPrompt: trimmedDescription,
        isGenerating: true
      });
      let T = Yl();
      abortControllerRef.current = T;
      try {
        let S = await Nvl(trimmedDescription, currentModel, [], T.signal);
        updateWizardData({
          agentType: S.identifier,
          whenToUse: S.whenToUse,
          systemPrompt: S.systemPrompt,
          generatedAgent: S,
          isGenerating: false,
          wasGenerated: true
        }), goToStep(6);
      } catch (S) {
        if (S instanceof Pm) ;else if (S instanceof Error && !S.message.includes("No assistant message found")) setErrorMessage(S.message || "Failed to generate agent");
        updateWizardData({
          isGenerating: false
        });
      } finally {
        setIsGenerating(false), abortControllerRef.current = null;
      }
    },
    placeholderSubtitle = "Describe what this agent should do and when it should be used (be comprehensive for best results)";
  if (isGenerating) return XX.default.createElement(Pc, {
    subtitle: placeholderSubtitle,
    footerText: XX.default.createElement(ur, {
      action: "confirm:no",
      context: "Settings",
      fallback: "Esc",
      description: "cancel"
    })
  }, XX.default.createElement(B, {
    flexDirection: "row",
    alignItems: "center"
  }, XX.default.createElement(op, null), XX.default.createElement(w, {
    color: "suggestion"
  }, " Generating agent from description...")));
  return XX.default.createElement(Pc, {
    subtitle: placeholderSubtitle,
    footerText: XX.default.createElement(hn, null, XX.default.createElement(ur, {
      action: "confirm:yes",
      context: "Confirmation",
      fallback: "Enter",
      description: "submit"
    }), XX.default.createElement(ur, {
      action: "chat:externalEditor",
      context: "Chat",
      fallback: "ctrl+g",
      description: "open in editor"
    }), XX.default.createElement(ur, {
      action: "confirm:no",
      context: "Settings",
      fallback: "Esc",
      description: "go back"
    }))
  }, XX.default.createElement(B, {
    flexDirection: "column"
  }, errorMessage && XX.default.createElement(B, {
    marginBottom: 1
  }, XX.default.createElement(Za, {
    error: errorMessage
  })), XX.default.createElement(Pa, {
    value: descriptionText,
    onChange: setDescriptionText,
    onSubmit: handleSubmit,
    placeholder: "e.g., Help me write unit tests for my code...",
    columns: 80,
    cursorOffset: cursorOffset,
    onChangeCursorOffset: setCursorOffset,
    focus: true,
    showCursor: true
  })));
}
var XX;
var YJ4 = b(() => {
  OD();
  OL();
  Je();
  _s();
  uh();
  R9();
  Ec();
  qs();
  C_();
  fx();
  rh();
  Fy();
  SE();
  Bvl();
  XX = L(Te(), 1);
});

export {$J4 as aRl,XX as FC,YJ4 as lRl};
