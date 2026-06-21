// @ts-nocheck
import {b as L} from "../../runtime.ts";
/**
 * Zero-value Usage object used as the initial/empty baseline for token accounting.
 *
 * Every Session initialises its `totalUsage` from this constant, and fallback
 * error paths return it when no real usage data is available.
 */

/** Shape of the API usage object returned by the Anthropic streaming API. */
interface UsageData {
  input_tokens: number;
  cache_creation_input_tokens: number;
  cache_read_input_tokens: number;
  output_tokens: number;
  server_tool_use: {
    web_search_requests: number;
    web_fetch_requests: number;
  };
  service_tier: string;
  cache_creation: {
    ephemeral_1h_input_tokens: number;
    ephemeral_5m_input_tokens: number;
  };
  inference_geo: string;
  iterations: unknown[];
  speed: string;
}

/** The zero/empty usage object; populated once by the lazy initialiser. */
var $M: UsageData;

/** Lazy initialiser — sets `$M` to the zero Usage value exactly once. */
var cK_ = L(() => {
  $M = {
    input_tokens: 0,
    cache_creation_input_tokens: 0,
    cache_read_input_tokens: 0,
    output_tokens: 0,
    server_tool_use: {
      web_search_requests: 0,
      web_fetch_requests: 0
    },
    service_tier: "standard",
    cache_creation: {
      ephemeral_1h_input_tokens: 0,
      ephemeral_5m_input_tokens: 0
    },
    inference_geo: "",
    iterations: [],
    speed: "standard"
  };
});

export {$M as PE,cK_ as Lut};
