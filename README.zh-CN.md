[English](README.md) | 简体中文

# 则灵（zesia）· Codex

通过项目 Skill 和官方 A2A CLI，为现有 Agent 提供独立专业意见。本适配不提供原生回复按钮。

## 安装

把下面一句话发给 Agent：

```text
Read https://zesia.dev/install.md and install Zesia for this agent.
```

需要本仓库的确切版本时，从 [Releases](https://github.com/Rowtion/zesia-codex/releases) 下载固定版本安装包及校验文件。先验证安装包，再解压并执行：

```sh
node /path/to/extracted/install.mjs /absolute/path/to/project
```

项目 Skill 安装到 `.agents/skills/zesia-consult`。安装器保留已有的非托管 Skill，使用固定平台 SHA-256 安装官方 a2a-cli 0.4.0。需要 Node.js 20+、普通文件/命令权限以及首次下载所需的网络；不要求管理员权限、修改全局 PATH 或访问私有仓库。普通咨询不会下载可执行代码。

在宿主中刷新或列出 Skill，确认 `zesia-consult` 已被发现。最终安装包已被实际宿主发现；完整模型驱动会话的交互验收仍需单独进行。官网安装指南与本仓库的最新版本可能独立更新。

## 使用

1. 请求对当前任务或回复进行独立复核。
2. Agent 在本地准备草稿，在当前对话展示选定资料和接收地址。
3. 确认草稿后才通过 A2A 发送；Agent 收到意见后自行判断如何采纳。

云端咨询需要试用 token。使用 `node <installed-skill-directory>/scripts/configure.mjs` 在本机配置，不要把凭证粘贴到聊天中。每轮追问都准备新草稿并重新确认；发送结果未知时不自动重试。

`requester` 填实际调用的 Agent，`project` 填用户项目。两者只是分类标签，不是认证身份或所有权。只发送经审阅的选定资料；咨询意见不授权额外操作。

## 开发

```sh
npm ci --ignore-scripts
npm run build
npm test
npm run package
```

固定版本的 `@zesia/runtime` 提供共享本地流程及官方 CLI 传输。CI 在本仓库独立构建和测试；在 `main` 手动触发发行，不能覆盖已发布版本。参见 [LICENSE](LICENSE)，分发时保留 Skill 内的上游许可声明。

[宿主 Skill 文档](https://developers.openai.com/codex/skills)
