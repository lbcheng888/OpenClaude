// @ts-nocheck
import {iu} from "../../vendor/m3830.ts";
import {bo,uo} from "../../vendor/m2468.ts";
import {VPl,T0o,Rgt} from "../../vendor/m4970.ts";
import {getActiveAgentsFromList as jB,kg} from "../permissions/4476_toAgentInfos.ts";
import {GG,d9} from "../../vendor/m4632.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {bt,Gc} from "../../vendor/m588.ts";
import {fOl,hOl} from "../../vendor/m4980.ts";
import {b,x} from "../../runtime.ts";
import {Fy} from "../../vendor/m3832.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * Agent creation wizard finalizer component.
 *
 * Renders the agent-creation summary view (`fOl`) and wires up its
 * save / save-and-edit / error props. On save it persists the wizard's
 * `finalAgent` via `VPl`, updates the global agent definitions store,
 * optionally opens the new agent file in the user's editor, emits the
 * `tengu_agent_created` telemetry event, then reports a status message.
 */
function gOl({
  tools: agentTools,
  existingAgents,
  onComplete
}: {
  tools: any;
  existingAgents: any;
  onComplete: (message: string) => void;
}) {
  let {
      wizardData
    } = iu(),
    /** Error message shown if persisting the agent fails. */
    [saveError, setSaveError] = Igt.useState<string | null>(null),
    /** Dispatcher for the global app/config store. */
    dispatchStore = bo(),
    /**
     * Persist the wizard's finalized agent.
     * @param openInEditor when true, also open the created agent file in the editor.
     */
    saveAgent = Igt.useCallback(async (openInEditor: boolean) => {
      if (!wizardData?.finalAgent) return;
      try {
        if (await VPl(wizardData.location, wizardData.finalAgent.agentType, wizardData.finalAgent.whenToUse, wizardData.finalAgent.tools, wizardData.finalAgent.getSystemPrompt(), !0, wizardData.finalAgent.color, wizardData.finalAgent.model, wizardData.finalAgent.memory), dispatchStore(prevState => {
          if (!wizardData.finalAgent) return prevState;
          let nextAllAgents = prevState.agentDefinitions.allAgents.concat(wizardData.finalAgent);
          return {
            ...prevState,
            agentDefinitions: {
              ...prevState.agentDefinitions,
              activeAgents: jB(nextAllAgents),
              allAgents: nextAllAgents
            }
          };
        }), openInEditor) {
          let agentFilePath = T0o({
            source: wizardData.location,
            agentType: wizardData.finalAgent.agentType
          });
          await GG(agentFilePath);
        }
        W("tengu_agent_created", {
          agent_type: wizardData.finalAgent.agentType,
          generation_method: wizardData.wasGenerated ? "generated" : "manual",
          source: wizardData.location,
          tool_count: wizardData.finalAgent.tools?.length ?? "all",
          has_custom_model: !!wizardData.finalAgent.model,
          has_custom_color: !!wizardData.finalAgent.color,
          has_memory: !!wizardData.finalAgent.memory,
          memory_scope: wizardData.finalAgent.memory ?? "none",
          ...(openInEditor && {
            opened_in_editor: !0
          })
        });
        let statusMessage = openInEditor ? `Created agent: ${bt.bold(wizardData.finalAgent.agentType)} and opened in editor. If you made edits, restart to load the latest version.` : `Created agent: ${bt.bold(wizardData.finalAgent.agentType)}`;
        onComplete(statusMessage);
      } catch (saveErr) {
        setSaveError(saveErr instanceof Error ? saveErr.message : "Failed to save agent");
      }
    }, [wizardData, onComplete, dispatchStore]),
    /** Save without opening the editor. */
    handleSave = Igt.useCallback(() => saveAgent(!1), [saveAgent]),
    /** Save and open the created agent in the editor. */
    handleSaveAndEdit = Igt.useCallback(() => saveAgent(!0), [saveAgent]);
  return _Ol.jsx(fOl, {
    tools: agentTools,
    existingAgents,
    onSave: handleSave,
    onSaveAndEdit: handleSaveAndEdit,
    error: saveError
  });
}
var Igt, _Ol;
var yOl = b(() => {
  Gc();
  kt();
  uo();
  kg();
  d9();
  Fy();
  Rgt();
  hOl();
  Igt = x(et(), 1), _Ol = x(oe(), 1);
});

export {gOl,Igt,_Ol,yOl};
