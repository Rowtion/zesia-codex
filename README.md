# Zesia for Codex

First-wave Skill + bundled A2A CLI adapter; no native reply button is claimed. The original agent prepares a local draft, the user reviews it in chat, then the runtime sends the approved packet through A2A and returns structured advice.

Develop with npm ci --ignore-scripts, npm run build, npm test, npm run package. Install the generated dist/skill with the included installer into the target project. Existing unmanaged skills and user configuration are preserved. No global executable installation or administrator permissions are needed. Node >=20 is required by the current wrapper.

The installer pins official A2A CLI 0.4.0 and validates platform archive hashes; it downloads the selected binary once during installation. Ordinary consultations never download executables. Set packet.requester to the actual current agent name; installation metadata is a hint, not ownership or identity.

Host reference: https://developers.openai.com/codex/skills
