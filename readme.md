# 🔧 em-cli

一个基于 commander 的脚手架, 采用插件形式进行命令开发，提供较完备的类型推断.

## ✨ Features

- 🔌 插件化开发命令

- 📄 较完备的类型推到

## 🛠️ Tech Stack

- 🧑‍💻 pnpm & Turborepo & ESLint & Prettier & Jest & father

- 💼 Pure ESM

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js 20+
- pnpm 9.5+
- corepack enabled

### 🔧 Installation

```bash
# Enable corepack
corepack enable

# node version
nvm use

# Install dependencies
pnpm install

# Start
# "start": "pnpm --parallel --filter [插件名称]... --filter ee start",
pnpm run start
```

## 📁 Project Structure

```
├── .changeset/
├── .github/             # github actions
├── .history/
├── .husky/
├── .turbo/
├── .vscode/
├── codemod/
├── coverage/
├── docs/
├── make/
├── packages/           # 🔥 插件与核心包
├── scripts/
├── .fatherrc.ts
├── .gitignore
├── babel.config.cjs
├── jest.config.ts
├── Makefile
├── package.json
├── .eslintrcignore
├── .eslintrc.cjs
├── .npmrc
├── .nvmrc
├── .pnpm-lock.yaml
├── .commitlint.config.cjs
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tsup.config.ts
├── turbo.json
├── readme.md
└── tsconfig.base.json
```
