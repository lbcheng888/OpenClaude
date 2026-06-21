// @ts-nocheck
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function isPastedImage(entry) {
  return entry.type === "image" && entry.content.length > 0;
}
function jiK(pastedContents) {
  if (!pastedContents) return;
  let imageIds = Object.values(pastedContents).filter(isPastedImage).map(entry => entry.id);
  return imageIds.length > 0 ? imageIds : undefined;
}
function JiK(mcpClients, messages, clientBlocks) {
  let announcedNames = new Set(),
    attachmentCount = 0,
    midCount = 0;
  for (let msg of messages) {
    if (msg.type !== "attachment") continue;
    if (attachmentCount++, msg.attachment.type !== "mcp_instructions_delta") continue;
    midCount++;
    for (let name of msg.attachment.addedNames) announcedNames.add(name);
    for (let name of msg.attachment.removedNames) announcedNames.delete(name);
  }
  let connectedClients = mcpClients.filter(client => client.type === "connected"),
    connectedNames = new Set(connectedClients.map(client => client.name)),
    instructionsByName = new Map();
  for (let client of connectedClients) if (client.instructions) instructionsByName.set(client.name, `## ${client.name}
${client.instructions}`);
  for (let block of clientBlocks) {
    if (!connectedNames.has(block.serverName)) continue;
    let existing = instructionsByName.get(block.serverName);
    instructionsByName.set(block.serverName, existing ? `${existing}

${block.block}` : `## ${block.serverName}
${block.block}`);
  }
  let addedEntries = [];
  for (let [name, block] of instructionsByName) if (!announcedNames.has(name)) addedEntries.push({
    name: name,
    block: block
  });
  let removedNames = [];
  for (let name of announcedNames) if (!connectedNames.has(name)) removedNames.push(name);
  if (addedEntries.length === 0 && removedNames.length === 0) return null;
  return j("tengu_mcp_instructions_pool_change", {
    addedCount: addedEntries.length,
    removedCount: removedNames.length,
    priorAnnouncedCount: announcedNames.size,
    clientSideCount: clientBlocks.length,
    messagesLength: messages.length,
    attachmentCount: attachmentCount,
    midCount: midCount
  }), addedEntries.sort((d, p) => d.name.localeCompare(p.name)), {
    addedNames: addedEntries.map(d => d.name),
    addedBlocks: addedEntries.map(d => d.block),
    removedNames: removedNames.sort()
  };
}
var DiK = b(() => {
  Ct();
});

export {isPastedImage as X6e,jiK as Yel,JiK as Jel,DiK as Xel};
