English | [简体中文](README.zh-CN.md)

# ZESIA for Codex

Independent expert advice for your existing agent. Codex prepares a local evidence packet,
you review it in the shared `https://zesia.dev/consult` window, and Codex retrieves the advice
through the official A2A transport. No native reply button or Consult MCP server is required.

## Install

Ask your agent:

```text
Read https://zesia.dev/install.md and install ZESIA for this agent.
```

The guide identifies actually published releases; a source branch is not a released installer.
Version 0.3 combines this host's immutable Skill archive with the matching standalone Runtime
asset listed in `native.lock.json`. Verify both SHA-256 values before extracting. Overlay the
Runtime asset into the extracted host archive, keeping its `host.json`, then run:

```text
<extracted-directory>/scripts/zesia install <absolute-current-project>
```

Use `zesia.exe` on Windows. The project Skill is installed at `.agents/skills/zesia-consult`.
No separate Node/Bun installation, administrator rights, global PATH changes or private
repository access is needed. Existing Node scripts remain developer compatibility entry points.
The native bundle includes licenses and a public rebuildable JS entry point.

Reload/list Skills and verify the host discovers `zesia-consult`. Installation, discovery,
actual browser approval and a real consultation are separate acceptance checks. Browser and
Agent must run on the same computer; remote/SSH/cloud workspaces are not covered. Do not
forward the local bridge port or disable browser security to force compatibility.

## Consult

1. Ask ZESIA to independently review the current task or reply.
2. The Agent prepares read-only materials locally and opens the shared online window. Allow
   its browser loopback connection when requested. Preparation and viewing do not upload drafts.
3. Approve below the actual request. The bridge sends only the exact approved packet; the
   cloud opinion appears in the window and returns to Codex for evidence-based adoption.

The Skill uses `scripts/zesia prepare`, `review`, `wait` and `result`. No large confirmation
packet is pasted into chat. Each follow-up needs a new approval; interrupted or unknown
outcomes only read the same stable request, never automatically repeat inference. A local
receipt distinguishes an available result from one the Agent has actually retrieved.

A trial token is required. Run `<installed-skill>/scripts/zesia configure` in your terminal;
never paste it into chat. Long-lived tokens stay local, model keys stay on the server.
Online page code is trusted software with access to its own memory; local draft handling is
not a claim of cryptographic protection against the website publisher. Advice grants no
additional permissions or factual guarantees.

## Managed updates

Only exact adapter/runtime versions and verified file identity can be reused. A reviewed
managed upgrade uses `install <project> --upgrade` and retains the previous installation under
`.zesia/skill-backups/`. Modified, unmanaged or unverifiable legacy content is preserved;
review and move it aside explicitly before installing. Never delete it to force an upgrade.

## Develop

`npm ci --ignore-scripts`, `npm run build`, `npm test`, `npm run test:native`, `npm run package`.
Shared Runtime and standalone assets are pinned to immutable public releases. Native installation
is tested without Node on PATH; runtime multi-platform A2A acceptance and actual host session
acceptance have separate evidence. Publishing is an explicit workflow on main and never
replaces an existing version. Preserve [LICENSE](LICENSE) and upstream notices.

[Codex Skill documentation](https://developers.openai.com/codex/skills)
