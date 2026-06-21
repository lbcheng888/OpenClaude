// @ts-nocheck
import {b as L} from "../../runtime.ts";
/**
 * Bedrock / Anthropic API shape enums.
 *
 * This module declares a set of frozen-style enum constant objects used by the
 * Anthropic API client and its AWS Bedrock (Converse / Guardrail) compatibility
 * layer. Each constant maps the enum member name to its on-the-wire string value.
 *
 * The objects are populated lazily by `initApiShapeEnums`, an esbuild
 * `__esmMin`-style module initializer (`L(() => { ... })`): the body runs once,
 * the first time the module is imported, assigning every module-scoped binding.
 * The vars are declared up front so other modules can hold live references to
 * them before initialization completes.
 *
 * Behavior is identical to the original generated SDK shapes; only names, types,
 * and documentation have been added.
 */

/** Original minified module-init wrapper helper (esbuild `__esmMin`). */
declare const L: <T>(init: () => T) => () => T;

/** Generic enum-constant object: member name -> on-the-wire string value. */
type StringEnum = Readonly<Record<string, string>>;

// --- Async invocation / batch job status -----------------------------------

/** Status of an asynchronous invocation / batch job. (orig: PJ5) */
var AsyncInvokeStatus: StringEnum;
var SortBy: StringEnum;
var SortOrder: StringEnum;
var GuardrailImageFormat: StringEnum;
var GuardrailContentQualifier: StringEnum;
var GuardrailTrace: StringEnum;
var GuardrailContentSource: StringEnum;
var GuardrailAction: StringEnum;
var GuardrailSensitiveInformationAction: StringEnum;
var GuardrailManagedWordsAction: StringEnum;
var GuardrailContentFilterConfidence: StringEnum;
var GuardrailContentFilterStrength: StringEnum;
var GuardrailContentFilterType: StringEnum;
var GuardrailContentPolicyAction: StringEnum;
var GuardrailContextualGroundingFilterType: StringEnum;
var GuardrailContextualGroundingPolicyAction: StringEnum;
var GuardrailPiiEntityType: StringEnum;
var GuardrailSensitiveInformationPolicyAction: StringEnum;
var GuardrailWordPolicyAction: StringEnum;
var GuardrailTopicPolicyAction: StringEnum;
var GuardrailManagedWordType: StringEnum;
var CachePointType: StringEnum;
var PerformanceConfigLatency: StringEnum;
var DocumentFormat: StringEnum;
var BedrockGuardrailImageFormat: StringEnum;
var BedrockGuardrailContentQualifier: StringEnum;
var ImageFormat: StringEnum;
var VideoFormat: StringEnum;
var ToolResultStatus: StringEnum;
var ServerToolUseBlockType: StringEnum;
var ConversationRole: StringEnum;
var ContextManagementMode: StringEnum;
var ServiceTier: StringEnum;
var StopReason: StringEnum;
var InvocationMode: StringEnum;
var ReasoningMode: StringEnum;
var initApiShapeEnums = L(() => {
  AsyncInvokeStatus = {
    COMPLETED: "Completed",
    FAILED: "Failed",
    IN_PROGRESS: "InProgress"
  }, SortBy = {
    SUBMISSION_TIME: "SubmissionTime"
  }, SortOrder = {
    ASCENDING: "Ascending",
    DESCENDING: "Descending"
  }, GuardrailImageFormat = {
    JPEG: "jpeg",
    PNG: "png"
  }, GuardrailContentQualifier = {
    GROUNDING_SOURCE: "grounding_source",
    GUARD_CONTENT: "guard_content",
    QUERY: "query"
  }, GuardrailTrace = {
    FULL: "FULL",
    INTERVENTIONS: "INTERVENTIONS"
  }, GuardrailContentSource = {
    INPUT: "INPUT",
    OUTPUT: "OUTPUT"
  }, GuardrailAction = {
    GUARDRAIL_INTERVENED: "GUARDRAIL_INTERVENED",
    NONE: "NONE"
  }, GuardrailSensitiveInformationAction = {
    ALWAYS_FALSE: "ALWAYS_FALSE",
    ALWAYS_TRUE: "ALWAYS_TRUE"
  }, GuardrailManagedWordsAction = {
    BLOCKED: "BLOCKED",
    NONE: "NONE"
  }, GuardrailContentFilterConfidence = {
    HIGH: "HIGH",
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    NONE: "NONE"
  }, GuardrailContentFilterStrength = {
    HIGH: "HIGH",
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    NONE: "NONE"
  }, GuardrailContentFilterType = {
    HATE: "HATE",
    INSULTS: "INSULTS",
    MISCONDUCT: "MISCONDUCT",
    PROMPT_ATTACK: "PROMPT_ATTACK",
    SEXUAL: "SEXUAL",
    VIOLENCE: "VIOLENCE"
  }, GuardrailContentPolicyAction = {
    BLOCKED: "BLOCKED",
    NONE: "NONE"
  }, GuardrailContextualGroundingFilterType = {
    GROUNDING: "GROUNDING",
    RELEVANCE: "RELEVANCE"
  }, GuardrailContextualGroundingPolicyAction = {
    ANONYMIZED: "ANONYMIZED",
    BLOCKED: "BLOCKED",
    NONE: "NONE"
  }, GuardrailPiiEntityType = {
    ADDRESS: "ADDRESS",
    AGE: "AGE",
    AWS_ACCESS_KEY: "AWS_ACCESS_KEY",
    AWS_SECRET_KEY: "AWS_SECRET_KEY",
    CA_HEALTH_NUMBER: "CA_HEALTH_NUMBER",
    CA_SOCIAL_INSURANCE_NUMBER: "CA_SOCIAL_INSURANCE_NUMBER",
    CREDIT_DEBIT_CARD_CVV: "CREDIT_DEBIT_CARD_CVV",
    CREDIT_DEBIT_CARD_EXPIRY: "CREDIT_DEBIT_CARD_EXPIRY",
    CREDIT_DEBIT_CARD_NUMBER: "CREDIT_DEBIT_CARD_NUMBER",
    DRIVER_ID: "DRIVER_ID",
    EMAIL: "EMAIL",
    INTERNATIONAL_BANK_ACCOUNT_NUMBER: "INTERNATIONAL_BANK_ACCOUNT_NUMBER",
    IP_ADDRESS: "IP_ADDRESS",
    LICENSE_PLATE: "LICENSE_PLATE",
    MAC_ADDRESS: "MAC_ADDRESS",
    NAME: "NAME",
    PASSWORD: "PASSWORD",
    PHONE: "PHONE",
    PIN: "PIN",
    SWIFT_CODE: "SWIFT_CODE",
    UK_NATIONAL_HEALTH_SERVICE_NUMBER: "UK_NATIONAL_HEALTH_SERVICE_NUMBER",
    UK_NATIONAL_INSURANCE_NUMBER: "UK_NATIONAL_INSURANCE_NUMBER",
    UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER: "UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER",
    URL: "URL",
    USERNAME: "USERNAME",
    US_BANK_ACCOUNT_NUMBER: "US_BANK_ACCOUNT_NUMBER",
    US_BANK_ROUTING_NUMBER: "US_BANK_ROUTING_NUMBER",
    US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER: "US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER",
    US_PASSPORT_NUMBER: "US_PASSPORT_NUMBER",
    US_SOCIAL_SECURITY_NUMBER: "US_SOCIAL_SECURITY_NUMBER",
    VEHICLE_IDENTIFICATION_NUMBER: "VEHICLE_IDENTIFICATION_NUMBER"
  }, GuardrailSensitiveInformationPolicyAction = {
    BLOCKED: "BLOCKED",
    NONE: "NONE"
  }, GuardrailWordPolicyAction = {
    DENY: "DENY"
  }, GuardrailTopicPolicyAction = {
    BLOCKED: "BLOCKED",
    NONE: "NONE"
  }, GuardrailManagedWordType = {
    PROFANITY: "PROFANITY"
  }, CachePointType = {
    DISABLED: "disabled",
    ENABLED: "enabled",
    ENABLED_FULL: "enabled_full"
  }, PerformanceConfigLatency = {
    DEFAULT: "default"
  }, DocumentFormat = {
    CSV: "csv",
    DOC: "doc",
    DOCX: "docx",
    HTML: "html",
    MD: "md",
    PDF: "pdf",
    TXT: "txt",
    XLS: "xls",
    XLSX: "xlsx"
  }, BedrockGuardrailImageFormat = {
    JPEG: "jpeg",
    PNG: "png"
  }, BedrockGuardrailContentQualifier = {
    GROUNDING_SOURCE: "grounding_source",
    GUARD_CONTENT: "guard_content",
    QUERY: "query"
  }, ImageFormat = {
    GIF: "gif",
    JPEG: "jpeg",
    PNG: "png",
    WEBP: "webp"
  }, VideoFormat = {
    FLV: "flv",
    MKV: "mkv",
    MOV: "mov",
    MP4: "mp4",
    MPEG: "mpeg",
    MPG: "mpg",
    THREE_GP: "three_gp",
    WEBM: "webm",
    WMV: "wmv"
  }, ToolResultStatus = {
    ERROR: "error",
    SUCCESS: "success"
  }, ServerToolUseBlockType = {
    SERVER_TOOL_USE: "server_tool_use"
  }, ConversationRole = {
    ASSISTANT: "assistant",
    USER: "user"
  }, ContextManagementMode = {
    OPTIMIZED: "optimized",
    STANDARD: "standard"
  }, ServiceTier = {
    DEFAULT: "default",
    FLEX: "flex",
    PRIORITY: "priority"
  }, StopReason = {
    CONTENT_FILTERED: "content_filtered",
    END_TURN: "end_turn",
    GUARDRAIL_INTERVENED: "guardrail_intervened",
    MAX_TOKENS: "max_tokens",
    MODEL_CONTEXT_WINDOW_EXCEEDED: "model_context_window_exceeded",
    STOP_SEQUENCE: "stop_sequence",
    TOOL_USE: "tool_use"
  }, InvocationMode = {
    ASYNC: "async",
    SYNC: "sync"
  }, ReasoningMode = {
    DISABLED: "DISABLED",
    ENABLED: "ENABLED",
    ENABLED_FULL: "ENABLED_FULL"
  };
});
export {AsyncInvokeStatus,SortBy as SortAsyncInvocationBy,SortOrder as MHu,GuardrailImageFormat,GuardrailContentQualifier,GuardrailTrace as GuardrailOutputScope,GuardrailContentSource,GuardrailAction,GuardrailSensitiveInformationAction as GuardrailAutomatedReasoningLogicWarningType,GuardrailManagedWordsAction as GuardrailContentPolicyAction,GuardrailContentFilterConfidence,GuardrailContentFilterStrength,GuardrailContentFilterType as VHu,GuardrailContentPolicyAction as GuardrailContextualGroundingPolicyAction,GuardrailContextualGroundingFilterType as zHu,GuardrailContextualGroundingPolicyAction as GuardrailSensitiveInformationPolicyAction,GuardrailPiiEntityType as JHu,GuardrailSensitiveInformationPolicyAction as GuardrailTopicPolicyAction,GuardrailWordPolicyAction as QHu,GuardrailTopicPolicyAction as GuardrailWordPolicyAction,GuardrailManagedWordType,CachePointType as GuardrailTrace,PerformanceConfigLatency as CachePointType,DocumentFormat,BedrockGuardrailImageFormat as GuardrailConverseImageFormat,BedrockGuardrailContentQualifier as GuardrailConverseContentQualifier,ImageFormat,VideoFormat,ToolResultStatus,ServerToolUseBlockType as ToolUseType,ConversationRole,ContextManagementMode as dIu,ServiceTier as ServiceTierType,StopReason,InvocationMode as GuardrailStreamProcessingMode,ReasoningMode as Trace,initApiShapeEnums as uOs};
