# Expense Tracker - Expo APK Size Optimization Report

Project: `mobile/` (Expo SDK ~57, React Native 0.86, React 19.2, Expo Router, Hermes)

All findings verified against the actual codebase (`require()`/import scan, `npm ls` dependency
graph, and a successful `npx expo export --platform android` producing a Hermes bytecode bundle,
EXIT=0).

---

## 1) Current State

### Dependencies
- Total direct `dependencies`: **23 -> 19** after cleanup.
- Removed (verified unused: top-level only, never imported, nothing depends on them per `npm ls`):
  `expo-device`, `expo-image`, `expo-splash-screen`, `expo-system-ui`.

### Assets
- Deleted **28 unreferenced image/SVG/font files (~13.1 MB)**.
- Remaining required assets: `app-icon.png`, `logo.png`, `revenue-i2.png`, `revenue-i4.png` + 3 style
  JS files.

### Estimated current APK contributors (remaining native modules, largest first)
1. `react-native-reanimated` + `react-native-worklets` (dep of `expo-router`) - large
2. `@clerk/expo` auth + `expo-secure-store` - large
3. `expo-router` stack: `react-native-screens`, `react-native-safe-area-context`, `@expo/ui`,
   `expo-glass-effect`, `expo-symbols` - medium
4. `react-native-keyboard-controller` (used: `KeyboardProvider`/`KeyboardAwareScrollView`) - medium
5. `react-native-gesture-handler` (dep of `expo-router`) - medium
6. `expo-font`, `expo-constants`, `expo-linking`, `expo-status-bar`, `expo-web-browser` - small

---

## 2) Changes Applied

| File | Change | Reason | APK impact |
|---|---|---|---|
| `app.json` | `icon` -> `./assets/app-icon/app-icon.png` | Task 1: official app icon (Expo/iOS/Android) | neutral |
| `app.json` | `ios.icon` -> `app-icon.png` (dropped `assets/expo.icon`) | remove conflicting icon ref | removes unused icon res |
| `app.json` | `android.adaptiveIcon` uses `app-icon.png` + white bg | Task 1 | neutral |
| `app.json` | Removed `expo-splash-screen` plugin + splash image | Task 2: remove all splash refs | removes splash drawable |
| `app.json` | Added `"jsEngine": "hermes"` | config optimization | smaller JS runtime |
| `package.json` | Removed `expo-device`, `expo-image`, `expo-splash-screen`, `expo-system-ui` | verified unused | est. -1.5 to -4 MB |
| `eas.json` (new) | dev / preview(APK) / production(AAB) profiles | build optimization | APK vs AAB dist |

---

## 4) Removed Assets (~13.1 MB)

| File | Type | Size (approx) | Reason |
|---|---|---|---|
| `screenshot-for-readme.png` | PNG | ~9 MB | never imported (template artifact) |
| `revenue-i3.png` | PNG | 1.69 MB | never imported |
| `revenue-i1.png` | PNG | 1.67 MB | never imported |
| `logo-glow.png` | PNG | 332 KB | never imported |
| `android-icon-foreground.png` | PNG | ~79 KB | replaced by `app-icon.png` adaptive |
| `SpaceMono-Regular.ttf` | TTF | 93 KB | unused font (no `useFonts`/`Font.loadAsync` anywhere) |
| `android-icon-monochrome.png` | PNG | 41 KB | removed with adaptive monochrome |
| `tutorial-web.png` | PNG | 59 KB | never imported (template) |
| `icon.png`, `adaptive-icon.png`, `splash-icon.png` | PNG | ~58 KB | replaced by `app-icon.png` / splash removed |
| `expo.icon/` (icon.json, `expo-symbol 2.svg`, `grid.png`) | SVG/PNG | ~61 KB | iOS icon ref removed; unreferenced |
| `tabIcons/*` (explore, home x3 scales) | PNG | ~2 KB | never imported (layout uses `Stack`, not tabs) |
| `expo-badge*.png`, `expo-logo.png`, `react-logo*.png`, `partial-react-logo.png` | PNG | ~56 KB | template leftovers, never imported |

**Kept (required):**
- `app-icon.png` - configured as the app icon (Task 1).
- `logo.png` - used in `src/app/(home)/index.tsx` header (`require`).
- `revenue-i2.png` - used in `src/app/(auth)/sign-up.tsx` (`require`).
- `revenue-i4.png` - used in `src/app/(auth)/sign-in.tsx` (`require`).
- `app-icon.png` - also serves as the web favicon (`app.json web.favicon`, replacing the deleted
  `favicon.png`).

*(Excluded folders `assets/app-icons/` and `assets/screenshots/` per rules; neither exists in this
project. The provided icon lives at `assets/app-icon/app-icon.png`.)*

---

## 5) Code Cleanup
- Removed invalid/duplicate `ActivityIndicatorBase` import from `create.jsx`.
- Simplified `api.js` (removed pointless `Platform.select` with identical URLs).
- Removed 3 unused themes + unused `THEMES` export from `colors.js`.
- No unused routes/screens/components/hooks removed: every route is reachable and all shared
  components/hooks are imported by screens.

## 6) Bundle Analysis
- Production Android bundle: **Hermes bytecode `.hbc` ~5.3 MB** (1765 modules), verified via export.
- Before the direct-Ionicons change it was ~5.6 MB and bundled **22 icon fonts + ~4 MB assets**;
  after, only `Ionicons.ttf` is bundled (plus a ~962 KB `material-symbols` font pulled
  transitively by `expo-router` internals - not safely removable).
- Only 3 app images are bundled: `logo.png`, `revenue-i2.png`, `revenue-i4.png`.

## 7) Estimated APK Reduction
- Removed native modules (`expo-device`, `expo-image`, `expo-splash-screen`, `expo-system-ui`),
  dropped 20 unused icon fonts, trimmed JS bundle ~0.3 MB.
- **Estimated: ~5-8 MB smaller APK (~6-10% reduction).** Exact numbers require an actual
  `eas build -p android --profile preview`.
- **APK vs AAB:** `preview` builds an APK (`buildType: apk`) for direct install/testing (larger,
  universal); `production` builds an AAB (`app-bundle`) for Play Store, yielding per-device splits
  that typically download ~1/3 less.

## 8) Optional Optimizations (need approval)
1. Convert `logo.png`, `revenue-i2/i4.png`, `app-icon.png` to WebP / recompress (~200-400 KB more).
2. Generate a safe-zone Android adaptive foreground from `app-icon.png` for best launcher look.
3. Investigate removing the `@expo-google-fonts/material-symbols` (~962 KB) transitive font.
4. Replacing `react-native-keyboard-controller`/`reanimated` with core `KeyboardAvoidingView`
   (feature-level refactor; these are currently used).
5. Add `expo-build-properties` proguard minification for smaller AAB.
6. Run `expo prebuild` + `expo-doctor` and a real EAS build to lock in exact numbers.

| 6 screens/components | `Ionicons` imported from `@expo/vector-icons/Ionicons` | only Ionicons used -> drop 20 icon fonts | -~0.3 MB JS, -2 to -4 MB packed fonts |
| `create.jsx` | removed invalid `ActivityIndicatorBase` import | dead/invalid code | small |
| `api.js` | removed redundant `Platform.select` (identical URLs) | dead code | tiny |
| `colors.js` | removed 3 unused themes + unused `THEMES` export | dead code | tiny |

### Native dependency analysis (kept - required)
`react-native-reanimated`, `react-native-gesture-handler`, `react-native-screens`,
`react-native-safe-area-context`, `@expo/ui`, `expo-glass-effect`, `expo-symbols`,
`expo-constants`, `expo-font`, `expo-linking`, `expo-web-browser` are all **transitive
dependencies of `expo-router` / `@clerk/expo` / `@expo/vector-icons`** and cannot be removed
without breaking routing/auth/icons (confirmed via `npm ls`). `react-native-keyboard-controller`
is referenced in `_layout.tsx` and the auth screens.

---

## 3) Removed Dependencies

| Package | Reason | APK savings (est.) |
|---|---|---|
| `expo-device` | never imported; no package depends on it (top-level only) | ~0.5-1 MB |
| `expo-image` | never imported; Glide native module unneeded (uses RN `<Image>`) | ~1.5-3 MB |
| `expo-splash-screen` | only used by removed splash plugin (Task 2) | ~0.5-1 MB |
| `expo-system-ui` | never imported / not configured | ~0.3-0.6 MB |
