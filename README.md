# Personal Catalog Site Builder

A reusable AI skill for person-led B2B websites: introduce a real person, present products, show field evidence, collect inquiries and implement a separate owner-only customer workspace.

可分享的建站 Skill：先介绍个人，再展示产品、现场素材和联系入口，并按需建设私有客户后台。只提供通用方法与布局，不含真实企业、个人或品牌资料。

## Install / 安装

Requires Python 3.10+. Download this repository as a ZIP and extract it, or clone it. In the repository run:

```sh
python install.py
```

The installer copies only the skill into `$CODEX_HOME/skills` (default `~/.codex/skills`). No downloads or dependencies; it refuses to overwrite existing skills. Use `python install.py --dry-run` to inspect the destination, or `--skills-dir <directory>` for a different skill folder. Open a new conversation after installation. Agents supporting SKILL.md can also use `skills/personal-catalog-site-builder` directly.

## Invoke / 调用

```text
Use $personal-catalog-site-builder to build a person-led product website.
Use a dark introduction, white catalog, product model details, in-page photo
previews and contact options. Use only the approved material I provide.
```

```text
使用 $personal-catalog-site-builder，搭建个人展示＋产品目录网站。
采用黑色人物首屏、白色产品区，图片在页内放大，产品有独立详情和型号表。
使用英语和西班牙语，需要私有客户后台。只使用我另行提供并确认的资料。
```

The skill adapts to existing frameworks/hosts. No mandatory cloud service or paid API. A chosen host/auth/media provider may have its own fees and requirements; use its installed deployment skill where available.

## Included / 内容

- Main skill: discovery, layout, data separation, verification and release.
- Three focused guides: layout/content; backend/privacy/CRM; media/performance/acceptance.
- Static starter: responsive hero/catalog, English/Spanish examples, exact product views, searchable/paginated models and in-page photo dialog.
- Safe scaffold and installer using Python standard library; package and browser tests.

The starter is a **public prototype**, with **no backend, authentication, CRM, stored inquiries, email delivery or production `/products/{id}` router**. These are implementation tasks guided by the skill. Query-based details work on a plain static server. All products, models and graphics are synthetic; replace before launch. No measured performance improvement is promised.

## Preview / 预览

```sh
python skills/personal-catalog-site-builder/scripts/scaffold_site.py --output ../catalog-demo
python -m http.server 8000 --directory ../catalog-demo
```

Open `http://localhost:8000`. Destination must not exist. Edit output `site-data.json` with approved content. Production APIs, inquiry delivery and private storage require a real server with authorization.

## Checks / 检查

```sh
python -m unittest discover -s tests -p "test_*.py"
```

Optional browser tests require Node.js, Playwright and Chromium; see `tests/browser-smoke.cjs`. Set `BROWSER_CHANNEL=msedge` or `chrome` to use an installed browser instead of Playwright's downloaded Chromium. Nothing installs automatically.

## Privacy / 公开范围

Authored as a clean generic package: no real site source/history, personal profile, contacts, customers, quotes, brand logos, original photos/videos, database, credentials, deployment IDs or real-site configuration. Don't add them to a shared derivative. A new site's private data belongs in protected storage, never this repository.

本仓库只分享方法、原创通用骨架和合成示例。不要把真实客户、价格、联系方式、品牌素材、站点配置或账号文件补进公开版本。生成与发布是不同动作；发布前检查实际文件和权限。

MIT licensed. See `LICENSE`.
