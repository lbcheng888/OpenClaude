#!/usr/bin/env node
// Claude Code v2.1.26 — Pixel-perfect 1:1 TUI
import React from "react";
import { render } from "ink";
import { TranscriptView } from "./terminal/components/transcript-view.js";
import { AppStateProvider } from "./terminal/components/app-state.js";
import { TerminalProvider } from "./terminal/components/terminal-context.js";

// If running in a real terminal, use the 1:1 TranscriptView component.
// For piped input, the TranscriptView handles stdin via raw mode.
const app = React.createElement(AppStateProvider, null,
  React.createElement(TerminalProvider, null,
    React.createElement(TranscriptView)
  )
);

const { waitUntilExit } = render(app);
waitUntilExit().then(() => process.exit(0));
