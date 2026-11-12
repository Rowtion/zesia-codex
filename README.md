English | [简体中文](README.zh-CN.md)

# ZESIA for Codex

Independent expert advice for your existing agent, delivered through a project Skill and the official A2A CLI. This adapter uses a temporary local browser review window; it does not add a native reply button to Codex.

## Install

Ask your agent:

```text
Read https://zesia.dev/install.md and install Zesia for this agent.
```

For this adapter's exact version, use the immutable archive and checksum in [Releases](https://github.com/Rowtion/zesia-codex/releases). Verify the archive before extracting, then run:

```sh
node /path/to/extracted/install.mjs /absolute/path/to/project
```

The project Skill is installed at `.agents/skills/zesia-consult`. The installer preserves unmanaged existing Skills and provisions official a2a-cli 0.4.0 with a pinned platform SHA-256. It needs Node.js 20+, ordinary file/command access and network access for the first download; no administrator access, global PATH changes or private repository access is required. Consultations never download executable code.

Reload or list Skills in the host and verify `zesia-consult` is discovered. The final installed Skill has been discovered by the actual host. Full model-driven conversation acceptance is still separate. The production installation guide and this repository's latest release can advance independently.

## Use

1. Ask for independent review of the current task or reply.
2. The agent prepares a private draft and opens a local review window showing the read-only question, attachments and destination.
3. Click **Confirm and send** in the window. The advice appears there and is retrieved by Codex to continue your task. No large confirmation message is inserted into the chat.

A trial token is required for cloud consultation. Configure it locally with `node <installed-skill-directory>/scripts/configure.mjs`; never paste a credential into chat. Follow-ups prepare another draft and require confirmation. Unknown send outcomes are never retried automatically.

`requester` must identify the actual calling agent; `project` names the user's project. These are classification labels, not authenticated ownership. Only selected, reviewed material is sent; advice does not authorize additional actions.

## Develop

```sh
npm ci --ignore-scripts
npm run build
npm test
npm run package
```

The pinned `@zesia/runtime` release supplies the shared local workflow and official CLI transport. CI builds and tests this repository independently; release publication is a manual workflow on `main`. Never overwrite a published version. See [LICENSE](LICENSE) and preserve upstream notices in the distributed Skill.

[Host Skill documentation](https://developers.openai.com/codex/skills)

## Managed updates

Repeat installation reuses only an exact adapter version, runtime version and verified content identity. After reviewing a managed update, run the new extracted installer with `--upgrade`. Modified or unmanaged files are preserved. A legacy installation without verifiable version/content metadata returns an explicit migration error; review and move it aside before installing, rather than treating it as current. Project-internal directory symlinks are rejected before writes.

Upgrades retain the previous installation under the project’s `.zesia/skill-backups/` directory and return its path. Review backups before removing them. Legacy installations without verifiable identity must be reviewed and moved aside before reinstalling; `--upgrade` never overwrites unverifiable or user-edited content.

## Local review

For Codex Desktop/CLI running on your computer:

```sh
node <installed-skill-directory>/scripts/zesia.mjs review <draftId>
node <installed-skill-directory>/scripts/zesia.mjs wait <draftId> 60
```

The Skill handles these commands. If automatic opening fails, use its **Review consultation** link. Materials stay local until confirmation, and the browser never receives your trial token. Every follow-up opens a new review. Closing the tab does not cancel a request; **Cancel** before sending does. Read a received result again with `result <draftId>` without another model call.

The local session expires after five idle minutes or fifteen total minutes. Private results remain available for Codex. A remote/cloud Codex runtime is not covered by this local-browser mode: do not expose or forward its port. Real user-session acceptance and model quality remain separate from installation and synthetic transport tests.
