pertakecast
============
[![Current Version](https://img.shields.io/badge/version-0.1.0-green.svg)](https://github.com/TaishiKobari/pertakecast)

VS Codeの拡張機能セットを共有できるWebアプリです。
extensions.jsonを読み込んで、拡張機能の名前、アイコン、リンクなどを取得します。

![CleanShot 2022-06-16 at 04 41 41](https://user-images.githubusercontent.com/70504137/173911772-f1c1850d-f4ca-42dd-a49d-2a8af1c99278.gif)

---

## Features
- jsonファイルから拡張機能の情報を自動で取得
- 共有リンク発行
- 保存した拡張機能の削除
- Googleログイン

.
![CleanShot 2022-06-16 at 04 49 20](https://user-images.githubusercontent.com/70504137/173914502-1f094046-719b-4fa3-9c26-a2f34377355d.gif)

---

## Setup

1. Clone this repo to your desktop
1. run `docker-compose up` to create postgres database.
1. run `yarn` to install all the dependencies.
1. run `yarn migrate` to run prisma migration.
1. run `yarn dev` and access http://localhost:3000.

---
