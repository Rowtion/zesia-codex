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
2. Agent 准备本地草稿，打开只读网页展示问题、附件和接收地址。
3. 用户在网页点击确认后才通过 A2A 发送；意见在网页显示，并由 Codex 取回后判断如何采纳。

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

## 托管更新

重复安装只复用适配版本、Runtime 版本和内容身份均精确匹配的安装。审阅托管更新后，可给新解压的安装器加 `--upgrade`。已修改或非托管文件保持原样。缺少可验证版本/内容记录的旧安装会明确报迁移错误，需要审阅并移到备份位置后再安装，不会假报已更新。写入前拒绝项目内部目录的符号链接。

升级会在项目的 `.zesia/skill-backups/` 中保留旧安装并返回路径，请检查后自行清理。缺少可验证身份的旧安装需要先检查并移到安全位置；`--upgrade` 不会覆盖身份不明或已被用户修改的文件。

## 本地咨询窗口

Codex 桌面版/CLI 与浏览器在同一电脑运行时，准备资料后通过 `review <draftId>` 打开临时本地网页，展示只读问题、附件和目标地址。用户点击确认后通过 A2A 发送，结果在网页显示，并由 `wait <draftId> 60` 或 `result <draftId>` 交回 Codex。不会向聊天中塞入大段确认内容。

自动打开失败时使用返回的审阅链接。浏览器不接触长期试用 token，确认前不外发资料；追问需重新审阅。关闭标签页不等于取消，发送前点击 Cancel 可取消。服务空闲五分钟或累计十五分钟后退出，本地私有结果仍可取回。

不覆盖远程/云端 Codex 运行环境，不要公开暴露或转发本地端口。安装/合成调用验证与真实用户会话、顾问质量验收分别记录。
