// @ts-nocheck
import {iu} from "../../vendor/m3830.ts";
import {FE,V1} from "../../vendor/m4006.ts";
import {Or,ss} from "../../vendor/m2553.ts";
import {AL,d9} from "../../vendor/m4632.ts";
import {kl,lh} from "../../vendor/m2739.ts";
import {COl,AOl} from "../agent/4984_content.ts";
import {qp} from "../../vendor/m137.ts";
import {_c,PE} from "../../vendor/m3831.ts";
import {dr,uc} from "../../vendor/m2558.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {gd,xw} from "./3853_mode.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {Ba,I_} from "../../vendor/m2584.ts";
import {ga,rh} from "../../vendor/m2550.ts";
import {b,x} from "../../runtime.ts";
import {jx} from "../../vendor/m196.ts";
import {je} from "../../vendor/m2462.ts";
import {Fy} from "../../vendor/m3832.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * Wizard step: generate an agent from a natural-language description.
 * Reads/writes the multi-step wizard context, calls the agent generator,
 * and renders either a "generating" spinner or the description input form.
 */
function ROl() {
  let {
      updateWizardData: e,
      goBack: t,
      goToStep: n,
      wizardData: r
    } = iu(),
    /** Free-text description the user types for the agent to be generated. */
    [descriptionText, setDescriptionText] = Dne.useState(r.generationPrompt || ""),
    /** True while an agent generation request is in flight. */
    [isGenerating, setIsGenerating] = Dne.useState(!1),
    /** Last error message to surface to the user, or null. */
    [errorMessage, setErrorMessage] = Dne.useState(null),
    /** Cursor position within the description input. */
    [cursorOffset, setCursorOffset] = Dne.useState(descriptionText.length),
    currentModel = FE(),
    /** Holds the AbortController for the in-flight generation request. */
    abortControllerRef = Dne.useRef(null),
    handleCancel = Dne.useCallback(() => {
      if (abortControllerRef.current) abortControllerRef.current.abort(), abortControllerRef.current = null, setIsGenerating(!1), setErrorMessage("Generation cancelled");
    }, []);
  Or("confirm:no", handleCancel, {
    context: "Settings",
    isActive: isGenerating
  });
  let handleOpenExternalEditor = Dne.useCallback(async () => {
    let result = await AL(descriptionText);
    if (result.content !== null) setDescriptionText(result.content), setCursorOffset(result.content.length);
  }, [descriptionText]);
  Or("chat:externalEditor", handleOpenExternalEditor, {
    context: "Chat",
    isActive: !isGenerating
  });
  let handleGoBack = Dne.useCallback(() => {
    e({
      generationPrompt: "",
      agentType: "",
      systemPrompt: "",
      whenToUse: "",
      generatedAgent: void 0,
      wasGenerated: !1
    }), setDescriptionText(""), setErrorMessage(null), t();
  }, [e, t]);
  Or("confirm:no", handleGoBack, {
    context: "Settings",
    isActive: !isGenerating
  });
  let handleSubmit = async () => {
      let trimmedDescription = descriptionText.trim();
      if (!trimmedDescription) {
        setErrorMessage("Please describe what the agent should do");
        return;
      }
      setErrorMessage(null), setIsGenerating(!0), e({
        generationPrompt: trimmedDescription,
        isGenerating: !0
      });
      let abortController = kl();
      abortControllerRef.current = abortController;
      try {
        let generatedAgent = await COl(trimmedDescription, currentModel, [], abortController.signal);
        e({
          agentType: generatedAgent.identifier,
          whenToUse: generatedAgent.whenToUse,
          systemPrompt: generatedAgent.systemPrompt,
          generatedAgent: generatedAgent,
          isGenerating: !1,
          wasGenerated: !0
        }), n(6);
      } catch (err) {
        if (err instanceof qp) ;else if (err instanceof Error && !err.message.includes("No assistant message found")) setErrorMessage(err.message || "Failed to generate agent");
        e({
          isGenerating: !1
        });
      } finally {
        setIsGenerating(!1), abortControllerRef.current = null;
      }
    },
    placeholderSubtitle = "Describe what this agent should do and when it should be used (be comprehensive for best results)";
  if (isGenerating) return oU.jsx(_c, {
    subtitle: placeholderSubtitle,
    footerText: oU.jsx(dr, {
      action: "confirm:no",
      context: "Settings",
      fallback: "Esc",
      description: "cancel"
    }),
    children: oU.jsxs($, {
      flexDirection: "row",
      alignItems: "center",
      children: [oU.jsx(gd, {}), oU.jsx(v, {
        color: "suggestion",
        children: " Generating agent from description..."
      })]
    })
  });
  return oU.jsx(_c, {
    subtitle: placeholderSubtitle,
    footerText: oU.jsxs(bn, {
      children: [oU.jsx(dr, {
        action: "confirm:yes",
        context: "Confirmation",
        fallback: "Enter",
        description: "submit"
      }), oU.jsx(dr, {
        action: "chat:externalEditor",
        context: "Chat",
        fallback: "ctrl+g",
        description: "open in editor"
      }), oU.jsx(dr, {
        action: "confirm:no",
        context: "Settings",
        fallback: "Esc",
        description: "go back"
      })]
    }),
    children: oU.jsxs($, {
      flexDirection: "column",
      children: [errorMessage && oU.jsx($, {
        marginBottom: 1,
        children: oU.jsx(Ba, {
          error: errorMessage
        })
      }), oU.jsx(ga, {
        value: descriptionText,
        onChange: setDescriptionText,
        onSubmit: handleSubmit,
        placeholder: "e.g., Help me write unit tests for my code...",
        columns: 80,
        cursorOffset: cursorOffset,
        onChangeCursorOffset: setCursorOffset,
        focus: !0,
        showCursor: !0
      })]
    })
  });
}
var Dne, oU;
var vOl = b(() => {
  jx();
  V1();
  je();
  ss();
  lh();
  d9();
  uc();
  Is();
  I_();
  xw();
  rh();
  Fy();
  PE();
  AOl();
  Dne = x(et(), 1), oU = x(oe(), 1);
});

export {ROl,Dne,oU,vOl};
