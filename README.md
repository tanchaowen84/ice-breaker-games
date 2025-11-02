# Ice Breaker Games — Project README

A lightweight, content-first hub for **ice breaker games**, **icebreaker questions**, and a small set of facilitator tools. The v1 goal is to ship a usable **homepage (Play-first)** that lets anyone start immediately, while deeper tool pages and blog posts are added over time.

---

## Vision
Build the best starting point on the internet for breaking the ice — fast, simple, and practical. The site centers on two parallel content pillars:

- **Games** (How to play) — actionable, low-friction activities.
- **Questions** (What to ask) — conversation starters by tone/scene.

A small **Toolbelt** (Timer, Team Splitter, Name Picker, Question Spinner) supports facilitation and reinforces the "start now" promise.

小工具到时候具体收集具体的关键词再进行设计和慢慢添加

---

## Homepage Plan (Play‑first)
**Principle:** Action first, then gentle routing. The homepage must enable a visitor to get started within seconds, before offering deeper browsing.

### Layout (ASCII wireframe + microcopy)
```
┌────────────────────────────────────────────────────────────────────┐
│ LOGO              Games | Questions | Tools ｜ BLog          Sign in │
├────────────────────────────────────────────────────────────────────┤
│ HERO                                                          ↑ Fold │
│  H1: Break the ice in 60 seconds.                                  │
│  Sub: Pick a quick game or a conversation starter. Not sure yet?    │
│       Hit “Start” and we’ll choose for you.  
│ 这个地方可以左右结构，右侧做一个转盘，用户点击start之后给他随机转一个破冰游戏来
│  Sub-CTA: Or try a quick tool:                                      │
│  Toolbelt: [Timer] [Team Splitter] [Name Picker] [Question Spinner] │
│  Microcopy: Open instantly — no signup required.                    │
├────────────────────────────────────────────────────────────────────┤
│ Section: Quick Start Collections                                    │
│  Lead: Only a few minutes? Begin with these ready-to-run picks.     │
│  ┌───────────────────┬───────────────────┬───────────────────┐      │
│  │ 5-Minute Starters │ No-materials Picks│ Remote-friendly    │      │
│  │ Warm up fast in 5 │ Just talk and go  │ Perfect for Zoom   │      │
│  │ [Open collection] │ [Open collection] │ [Open collection]  │      │
│  └───────────────────┴───────────────────┴───────────────────┘      │
│  Note: Can’t decide? Tap “Start” for a random suggestion.            │
├────────────────────────────────────────────────────────────────────┤
│ Section: Scenes Hub                                                 │
│  Lead: Different settings, different vibes — pick what fits today.  │
│  ┌───────────┬───────────┬───────────┬───────────┬───────────┐       │
│  │ Work      │ Meetings  │ Adults    │ Teens     │ Kids      │       │
│  │ For teams │ For workshops │ Relaxed & social │ High engagement │ Easy to run │
│  │ [Open]    │ [Open]    │ [Open]    │ [Open]    │ [Open]    │       │
│  └───────────┴───────────┴───────────┴───────────┴───────────┘       │
│  ┌───────────────────┬────────────────────────┬───────────────────┐  │
│  │ Large Groups      │ Quick (5–10 minutes)   │ Fun Picks         │  │
│  │ Scales to 30+     │ Short and lively       │ Just for laughs   │  │
│  │ [Open]            │ [Open]                 │ [Open]            │  │
│  └───────────────────┴────────────────────────┴───────────────────┘  │
├────────────────────────────────────────────────────────────────────┤
│ Section: Questions Bank                                             │
│  Lead: Prefer talking to moving? Grab icebreaker questions by mood. │
│  Chips: [Funny] [Deep] [For Work] [For Teens] [For Kids] [Meetings] │
│  Micro-CTA: Not sure what to ask? Spin one.                         │
│  [Browse questions]                                                 │
├────────────────────────────────────────────────────────────────────┤
│ Section: Featured Tools                                             │
│  Lead: Make facilitation effortless.                                │
│  ┌───────────────────┬───────────────────┬───────────────────┬───────┐
│  │ Question Spinner  │ Bingo Maker       │ Timer             │ Split │
│  │ Prompt roulette   │ Custom bingo grid │ Keep things tight │ Fair teams │
│  │ [Open tool]       │ [Open tool]       │ [Open tool]       │ [Open] │
│  └───────────────────┴───────────────────┴───────────────────┴───────┘
├────────────────────────────────────────────────────────────────────┤
│ Section: Blog                                                       │
│  Lead: Short reads on picking the right opener and keeping energy.  │
│  Cards (teasers; can be “Coming soon” at launch):                    │
│    • How to pick the right icebreaker in 3 steps                     │
│    • 10 five-minute openers for busy meetings                        │
│    • Large-group energizers that actually work                       │
│  [View the blog]                                                     │
├────────────────────────────────────────────────────────────────────┤
│ Footer (minimal)                                                    │
│  About · Contact · Terms · Privacy                                  │
└────────────────────────────────────────────────────────────────────┘
```

### Behavior (MVP)
- **Start** must work on day one: ship with a tiny internal seed to power random and Quick Start cards.一开始简单的有一个转盘可以简单的给一个随机的游戏就可以了，别的我们后续慢慢添加
- **Toolbelt** at launch: 初期不需要任何的小工具，随着我们后续的添加和挖掘慢慢添加，先使用soon badge
- **Collections & Scenes**: where content isn’t ready, show disabled buttons with tooltip **“Coming soon”** or route to a tasteful teaser modal; avoid 404s.刚刚开始没有那么多的破冰游戏具体的页面，随着后续慢慢挖掘进行添加，先使用soon badge

---