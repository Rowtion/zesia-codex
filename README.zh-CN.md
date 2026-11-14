[English](README.md) | 简体中文

# 则灵（zesia）· Codex

为已有 Agent 提供独立专业意见。Codex 在本机准备资料，用户在统一的
`https://zesia.dev/consult` 窗口审阅批准，原 Agent 通过官方 A2A 传输取回意见。
不依赖原生回复按钮或 Consult MCP 服务。

## 安装

把同一句安装提示词发给 Agent：

```text
Read https://zesia.dev/install.md and install ZESIA for this agent.
```

安装指南以实际已发布版本为准，源码分支不代表已发行。0.3 版本的宿主 Skill 包与
`native.lock.json` 固定的独立 Runtime 配套使用；分别核对 SHA-256 后解压，
将 Runtime 覆盖到宿主包目录，保留宿主 `host.json`，再运行：

```text
<解压目录>/scripts/zesia install <当前项目绝对路径>
```

Windows 使用 `zesia.exe`。安装到 `.agents/skills/zesia-consult`，不需要另装
Node/Bun、管理员权限、全局 PATH 修改或私有仓库访问。旧 Node 脚本仅保留兼容入口。
独立包包含上游许可证与可重建的公开 JS 入口。

在宿主刷新/列出 Skills 并确认发现 `zesia-consult`。安装、发现、网页授权和真实模型咨询
分别验收，不把其中一项当成全部完成。Agent 与浏览器须在同一电脑；远程 SSH/云端工作区
暂不覆盖，不转发本机端口或关闭浏览器安全策略。

## 咨询

1. 请求独立复核当前任务或回复。
2. Agent 在本地准备只读问题与附件，打开统一在线窗口。浏览器要求时允许连接本机。
   准备与展示草稿不会上传咨询资料。
3. 用户在对应请求下批准后，桥才通过 A2A 发送准确资料。意见在窗口显示，并由 Codex
   取回、核查证据后继续工作。

Skill 使用 `scripts/zesia prepare`、`review`、`wait`、`result`，不会将确认资料整包塞入
聊天输入框。追问重新批准；中断或未知结果只读恢复同一请求，不自动重复模型推理。
本地收件记录区分“已保存结果”与“原 Agent 已取回”。

使用前在终端运行 `<已安装Skill>/scripts/zesia configure` 设置试用 token，不要发到聊天。
长期凭证只留本机，模型密钥只留云端。在线页面是可读取自身内存的受信软件，草稿本地性
不是针对网站发布者的密码学保证。意见不构成新的执行授权或事实验证。

## 更新与研发

仅版本、Runtime 和文件身份完全一致时复用。审阅后的托管升级使用
`install <项目> --upgrade`，旧内容保留在 `.zesia/skill-backups/`。用户修改、非托管或
不可验证的旧安装不会被覆盖；先明确审阅并移走，不能直接删除以强行升级。

研发检查：`npm ci --ignore-scripts`、`npm run build`、`npm test`、
`npm run test:native`、`npm run package`。共享依赖固定为不可变公开发行包。
无 Node PATH 的原生安装、共享 Runtime 多平台 A2A、真实宿主会话分别记录证据。
在 main 手动发行，不覆盖版本，保留 [LICENSE](LICENSE) 和上游声明。
