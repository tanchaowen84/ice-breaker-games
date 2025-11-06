# Icebreaker Game Content Pipeline Plan

本文档规划了「Ice Breaker Games」站点的游戏内容模版方案，目标是做到**新增一个 MD/MDX 文件即可生成完整网页**，同时兼顾 i18n、SEO、后续扩展及复用性。

---

## 1. 目标与范围
- 支持通过 `content/games/*.mdx`（未来如需纯 MD 也可扩展）编写单个游戏内容。
- 复用现有 content-collections + Next.js App Router 体系，自动生成静态页面。
- 覆盖元数据、页面布局、列表页（可选）以及导航入口，保证内容结构统一。
- 本阶段只交付内容渲染链路和示例数据，不实现真正的互动工具。

## 2. 内容模型设计

### 2.1 Frontmatter 字段（初稿）
| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `title` | string | ✅ | 游戏名称 |
| `description` | string | ✅ | 简短介绍（用于 SEO / 列表摘要） |
| `date` | string (ISO) | ✅ | 创建或最后更新日期 |
| `published` | boolean | ❌，默认 `true` | 是否展示在列表/站点地图 |
| `scenes` | string[] | ❌ | 场景标签（如 `work`, `remote`, `icebreaker`） |
| `duration` | string | ❌ | 时长提示（如 `5-10 min`） |
| `participants` | string | ❌ | 适合人数（如 `4-10`、`1:1`） |
| `materials` | string[] | ❌ | 所需道具列表 |
| `difficulty` | `'easy' \| 'medium' \| 'advanced'` | ❌ | 难度或准备复杂度 |
| `featured` | boolean | ❌ | 是否在列表页或首页强调 |
| `locale` | string | 由文件名推导 | 语言（与现有多语言策略一致） |

> 如果后续需要“玩法步骤”、“变体”等列表，可直接写在正文 MDX 中，也可扩展 schema。

### 2.2 文件命名约定
- 默认语言：`content/games/two-truths-and-a-lie.mdx`
- 其他语言：`content/games/two-truths-and-a-lie.zh.mdx`
- 自动派生：
  - `slug`：`/games/two-truths-and-a-lie`
  - `slugAsParams`: `two-truths-and-a-lie`
  - `locale`: 依据后缀或默认语言

---

## 3. Content Collections 更新

1. 在 `content-collections.ts` 注册 `games` collection：
   - `directory: 'content/games'`
   - `include: '**/*.mdx'`
   - 复用 `transformMDX`，生成 `body`、`toc`、`content` 等字段。
   - 计算 `slug`, `slugAsParams`, `locale`，并根据正文估算 `estimatedTime`（可复用 blog 的逻辑）。
2. 导出 `allGames` 供调用，与现有的 `allPosts` 一致。
3. 如果需要共用 schema 常量，可构建 `sharedSchemas` 或在 docs/blog 之间抽取公共函数。

---

## 4. 数据访问工具

- 新建 `src/lib/game/get-game.ts`：
  - `getGame(slug: string, locale: Locale)`：按 locale 匹配，找不到则回退默认语言。
  - `getGames(locale: Locale)`：返回当前语言所有已发布游戏，缺失时回退默认语言。
  - 可添加筛选（按场景、featured）逻辑，保持纯函数。
- 如需列表筛选/分页，可参考 `src/lib/blog/data.ts`（`getPaginatedBlogPosts`）。

---

## 5. 页面与路由

### 5.1 详情页
- 目录：`src/app/[locale]/games/[slug]/page.tsx`
- 内容：
  - `generateStaticParams`：循环 `allGames` 生成静态路由。
  - `generateMetadata`：使用 `constructMetadata` + `getUrlWithLocale`。
  - 主组件：
    - 调用 `getGame` 获取数据；
    - 渲染 `GamePage` 组件（见下文）；
    - 处理 404（`notFound()`）。
  - `dynamicParams = false`（可选）确保静态生成为主。

### 5.2 列表页
- `/src/app/[locale]/games/page.tsx` 作为第一页，搭配 `GameGridWithPagination` 输出分页网格。
- `/src/app/[locale]/games/page/[page]/page.tsx` 处理 2+ 页，逻辑复用博客的 `CustomPagination`。
- 数据来源 `getPaginatedGames`（内部沿用 `websiteConfig.blog.paginationSize`），支持 locale fallback。

---

## 6. UI 组件与复用

### 6.1 新增组件目录结构（建议）
```
src/components/game/
  game-page.tsx          // 页面入口，组合多个子区块
  game-header.tsx        // 标题 / 描述 / 标签 / 元信息
  game-meta-card.tsx     // 时长、人数、材料
  game-content.tsx       // 包裹 CustomMDXContent + TOC（可选）
  game-related.tsx       // 相关推荐（未来扩展）
```

### 6.2 可复用内容
- `CustomMDXContent`（已有）：渲染正文。
- `CustomPage`：可拆解其中的 header 逻辑以便为游戏定制化界面。
- `BlogGrid`/`BlogCard`：可作为游戏列表样式参考或直接继承并改字段。
- `BlogToc`：若游戏正文较长，可复用目录组件。
- `GameCard`/`GamePage`：支持封面图渲染（frontmatter `image`/`imageAlt`），并在缺图时显示占位元素。

---

## 7. 国际化与翻译
- 详情页模板使用 `getTranslations('GamePage')` 获取 UI 文字（如“预计时长”、“参加人数”等）。
- 在 `messages/en.json`（以及其他语言文件）添加相应命名空间与文案。
- `locale` 逻辑与博客一致：优先当前语言，否则回退默认语言。

---

## 8. SEO & 结构化数据
- `generateMetadata` 中设置标题、描述、OG 图（后续可允许 frontmatter 指定）。
- 可加入 `structured data (JSON-LD)` 的扩展（如 `HowTo` schema），暂列为未来增强项。
- 更新 `sitemap.ts`：在现有 `allPosts` 逻辑基础上增加 `allGames` 输出。

---

## 9. 导航与入口（待确认）
- `src/routes.ts` 新增 `Routes.Games = '/games'`。
- 根据产品需求，把入口添加到：
  - Navbar（`src/config/navbar-config.tsx`）；
  - Footer；
  - 首页 CTA（如 Quick Start、Scene Hub）。
- 若 MVP 阶段只需手动访问，可暂缓导航修改。

---

## 10. 交付步骤（建议顺序）
1. **Schema & Collection**：更新 `content-collections.ts` + 添加示例 MDX。
2. **Lib 工具**：实现 `getGame` / `getGames`。
3. **页面与组件**：
   - 游戏详情路由；
   - `GamePage` 及子组件；
   - （可选）列表页。
4. **翻译与配置**：补充 `messages` 文案、`routes` 常量、导航入口（若需要）。
5. **SEO & Sitemap**：同步更新 `generateMetadata`、`sitemap.ts`。
6. **QA 验证**：
   - `content-collections build` / `pnpm dev` 检查编译；
   - 打开示例页面（含默认/非默认 locale）；
   - lighthouse/visual check（可选）。

---

## 11. 测试与验证清单
- `pnpm run dev` 编译无错误。
- `/[locale]/games/[slug]` 页面加载成功，前端组件正常渲染。
- 当游戏在当前语言缺失时，回退默认语言内容。
- frontmatter 缺字段报错（schema validation）符合预期。
- sitemap / metadata 正常输出（跑 `pnpm run build` 或 `pnpm run docs` 验证）。
- 若启用列表页，分页/筛选行为正确。

---

## 12. 后续扩展想法
- 支持 “玩法步骤” 结构化字段（数组）以便生成 Step UI 或导出 PDF。
- 引入 `scene` 与 `difficulty` 的枚举常量，结合筛选器生成动态列表页或搜索。
- 在首页场景区块拉取真实游戏数据，替换“Soon”提示。
- 结合工具模块（如随机抽取游戏、定时器）实现交互式体验。

---

> 以上规划确认后，可按第 10 节步骤逐项实施。若需要调整字段或页面形式，请先在本文更新记录，以保持团队对实现方式的一致认知。
