# Budget AI — Mobile App (Frontend)

Budget AI is a budget tracker with an AI companion ("Budget Bot" / _Peso_) you can
ask questions like _"Can I afford this?"_ and get answers grounded in your budget,
goals, and income. This repository is the **React Native frontend**. The backend
(API + AI/SLM) lives in a separate repository (`budget-ai-api`).

> **Status: design phase.** All screens are built to match the Figma design and
> run on realistic **mock data** (`src/lib/mock.ts`). No backend calls yet — that
> comes next.

## Stack

- **Expo** SDK 57 (React Native 0.86, React 19)
- **Expo Router** — file-based navigation (typed routes)
- **NativeWind v4** — Tailwind CSS for React Native
- **TypeScript** (strict)
- **react-native-svg** — donut / ring progress
- **expo-linear-gradient** — balance & hero gradients
- **@expo/vector-icons** (MaterialCommunityIcons)

## Getting started

```bash
npm install
npx expo start        # then press i (iOS), a (Android), or w (web)
```

Type-check and bundle sanity check:

```bash
npx tsc --noEmit
npx expo export --platform ios   # verifies the whole app bundles
```

## Project structure

```
src/
  app/                        # Expo Router routes (screens)
    _layout.tsx               # root stack + providers + modal registration
    index.tsx                 # entry → redirects to sign-in
    (auth)/                   # sign-in, sign-up, forgot-password, verify-email,
                              #   create-password, reset-success, terms
    (tabs)/                   # Home, Budget, Log, Goals, AI (custom tab bar)
    category-form.tsx         # add / edit budget category  (bottom sheet)
    goal-form.tsx             # add / edit savings goal      (bottom sheet)
    add-funds.tsx             # add funds to a goal          (bottom sheet)
    delete-goal.tsx           # remove-goal confirmation      (dialog)
    settings.tsx              # settings + currency/language pickers
    notifications.tsx         # notifications panel           (top sheet)
  components/
    ui/                       # Button, TextField, Card, Screen, ProgressBar,
                              #   DonutRing, SegmentedControl, ModalSheet
    BottomTabBar.tsx          # 5-tab bar with elevated center "Log" action
    CategoryBadge, LogRow, SectionHeader, Logo, IconPicker, ColorPicker
  theme/
    tokens.ts                 # colors, gradients, radii, category palette (JS)
    categories.ts             # canonical spend categories (label/color/icon)
  lib/
    format.ts                 # ₱ currency + percent helpers
    mock.ts                   # design-phase mock data
    cn.ts                     # className joiner
  global.css                  # Tailwind entry
tailwind.config.js            # design tokens (keep in sync with theme/tokens.ts)
```

## Design system

- **Brand:** royal blue `#2563EB` (buttons, links, active tab); deep royal
  `#0A37C4` (`royal`) for section titles; navy gradient for the balance card.
- **Money:** income green `#22C55E`, expense red `#EF4444`.
- **Categories:** an 8-color palette (`cat.*`) driving category rings/bars/icons.
- **Currency:** Philippine Peso (₱).

Tokens are defined twice on purpose: as Tailwind classes (`tailwind.config.js`)
for markup, and as JS values (`src/theme/tokens.ts`) for SVG strokes, gradient
stops and icon colors. Keep them in sync.

## Screens implemented

Auth (sign in/up, forgot-password, verify email, create/reset password, T&Cs) ·
Home dashboard · Log entry (manual / receipt-scan / voice + income) · Budget
(categories with ring progress, add/edit category) · Goals (savings summary, goal
rings, add/edit/fund/delete) · AI Chat (Budget Bot) · Settings · Notifications.

**Not yet built:** intro onboarding slides, the setup feature carousel, and the
animated splash (pending exact design copy).

## Notes

- The brand mark in `src/components/Logo.tsx` is a placeholder for the
  robot-in-wallet mascot — swap in the exported asset when available.
- `AGENTS.md` reminds contributors to check the versioned Expo 57 docs.
