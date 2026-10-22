# Flutter

How to consume Syntropy in a Flutter app or the `syntropy` package: theme wiring, semantic colors through a ThemeExtension, text styles, directional geometry, Semantics, and a reference widget that mirrors its Figma props.

## Rules
1. Read colors only through `context.colors` (the generated `SyntropyColors` ThemeExtension). Never `Color(0x...)`, `Colors.*` or a primitive.
   Why: only the extension switches Light and Dark, and syntropy-lint flags raw colors.
2. Build both themes from one function so they cannot drift: `SyntropyTheme.light` and `.dark` differ only in the `SyntropyColors` instance and `Brightness`.
   Why: two hand-built themes diverge within a sprint.
3. Spacing, radius and elevation come from `SyntropySpace`, `SyntropyRadius`, `SyntropyElevation`; text from `SyntropyTextStyles` (37 styles). Never a bare `TextStyle(fontSize: ...)`.
   Why: R4; the lint names the replacement.
4. Use directional geometry only: `EdgeInsetsDirectional`, `AlignmentDirectional`, `BorderRadiusDirectional`, `PositionedDirectional`, `TextAlign.start` / `.end`.
   Why: `left` / `right` break RTL; directional types flip from `Directionality`.
5. Never add a `direction`, `textDirection`, `isRtl` or `sizeClass` parameter to a widget. Read `Directionality.of(context)` inside only when a glyph must choose (prefer `Icon(..., matchTextDirection: true)` or a mirrored icon).
   Why: R1 and the size-class rule.
6. Enum names and members mirror Figma verbatim: `Variant=primary` to `SafqahButtonVariant.primary`, `Size=md` to `SafqahButtonSize.md`, `Type=Icon only` to `.iconOnly`, `Emphasis=On-media` to `.onMedia`.
   Why: R3.
7. Interaction states (hover, pressed, focused) are not parameters; disabled is `onPressed == null`; loading is an explicit `isLoading` flag.
   Why: they are runtime states, not API.
8. Wrap every interactive widget in correct Semantics: `button: true`, a label for icon-only controls, `enabled`, and a 48 x 48 minimum hit area.
   Why: WCAG 2.2 AA and the Widgetbook accessibility pass.
9. Arabic is the default locale; `flutter_localizations` provides RTL. Numbers render with Western digits (`NumberFormat('#,##0.00', 'en')` plus the locale's currency position rule), never `ar` digit shaping.
   Why: Safqah number rules.
10. Each widget has a doc comment: when to use it, what to use instead, constraints the constructor cannot express.
    Why: the doc comment feeds IDE hover, dartdoc, Widgetbook and agents.

## Wiring the theme
```dart
// lib/theme/syntropy_theme.dart
import 'package:flutter/material.dart';
import 'syntropy_colors.dart';   // generated, copy from assets/
import 'syntropy_tokens.dart';   // generated, copy from assets/

abstract final class SyntropyTheme {
  static ThemeData get light => _build(Brightness.light, SyntropyColors.light);
  static ThemeData get dark => _build(Brightness.dark, SyntropyColors.dark);

  static ThemeData _build(Brightness brightness, SyntropyColors c) {
    return ThemeData(
      brightness: brightness,
      fontFamily: SyntropyTextStyles.fontFamily,
      scaffoldBackgroundColor: c.bgSurface,
      colorScheme: ColorScheme.fromSeed(seedColor: c.bgBrandPrimary, brightness: brightness).copyWith(
        primary: c.bgBrandPrimary,
        onPrimary: c.textOnBrand,
        surface: c.bgBase,
        onSurface: c.textDefault,
        error: c.bgError,
        outline: c.borderDefault,
      ),
      textTheme: const TextTheme(
        displaySmall: SyntropyTextStyles.display32Bold,
        headlineSmall: SyntropyTextStyles.heading24Bold,
        titleLarge: SyntropyTextStyles.heading20Bold,
        titleMedium: SyntropyTextStyles.heading18Semibold,
        bodyLarge: SyntropyTextStyles.body16Regular,
        bodyMedium: SyntropyTextStyles.body14Regular,
        labelLarge: SyntropyTextStyles.body14Medium,
        bodySmall: SyntropyTextStyles.caption12Regular,
      ).apply(bodyColor: c.textDefault, displayColor: c.textDefault),
      extensions: <ThemeExtension<dynamic>>[c],
    );
  }
}

// main.dart
MaterialApp(
  theme: SyntropyTheme.light,
  darkTheme: SyntropyTheme.dark,
  locale: const Locale('ar'),
  supportedLocales: const [Locale('ar'), Locale('en')],
  localizationsDelegates: GlobalMaterialLocalizations.delegates,
  home: const HomeScreen(),
);
```
The TextTheme mapping exists only so raw Material widgets inherit Syntropy type; Syntropy widgets use `SyntropyTextStyles` directly.

## Reference widget: SafqahButton
Figma `Button` (417:2): `Variant` (primary, secondary, tertiary, destructive, error, text), `Size` (lg, md, sm), `State` (default, hover, pressed, focused, disabled, loading), `Direction` (ltr, rtl), `Label`, `Has icon leading` + `Icon leading`, `Has icon trailing` + `Icon trailing`.
```dart
enum SafqahButtonVariant { primary, secondary, tertiary, destructive, error, text }
enum SafqahButtonSize { lg, md, sm }

/// The Syntropy button (Figma `Button`, 02a).
///
/// Use one `primary` button per screen for the main action; pair it with a
/// `secondary` or `tertiary` button of the same size. For an icon-only control
/// use [SafqahIconButton]. Direction comes from [Directionality]; there is no
/// direction parameter. Leading and trailing icons follow reading order.
class SafqahButton extends StatelessWidget {
  const SafqahButton(
    this.label, {
    super.key,
    required this.onPressed,
    this.variant = SafqahButtonVariant.primary,
    this.size = SafqahButtonSize.lg,
    this.iconLeading,
    this.iconTrailing,
    this.isLoading = false,
  });

  final String label;
  final VoidCallback? onPressed;          // null = State=disabled
  final SafqahButtonVariant variant;
  final SafqahButtonSize size;
  final IconData? iconLeading;            // null = Has icon leading off
  final IconData? iconTrailing;
  final bool isLoading;                   // State=loading

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final enabled = onPressed != null && !isLoading;
    final (bg, fg, border) = switch (variant) {
      SafqahButtonVariant.primary => (c.bgBrandPrimary, c.textOnBrand, c.bgBrandPrimary),
      SafqahButtonVariant.secondary => (c.bgBase, c.textBrandDarkest, c.borderBrandPrimary),
      SafqahButtonVariant.tertiary => (c.bgBrandLightest, c.textBrandDarkest, c.bgBrandLightest),
      SafqahButtonVariant.destructive => (c.bgError, c.textInverse, c.bgError),
      SafqahButtonVariant.error => (c.bgErrorSubtle, c.textError, c.borderErrorError),
      SafqahButtonVariant.text => (Colors.transparent, c.textBrandDarkest, Colors.transparent),
    };
    final (height, padX, style) = switch (size) {
      SafqahButtonSize.lg => (48.0, SyntropySpace.spaceXl, SyntropyTextStyles.body16Semibold),
      SafqahButtonSize.md => (40.0, SyntropySpace.spaceLg, SyntropyTextStyles.body14Semibold),
      SafqahButtonSize.sm => (32.0, SyntropySpace.spaceMd, SyntropyTextStyles.body13Semibold),
    };
    return Semantics(
      button: true,
      enabled: enabled,
      label: label,
      excludeSemantics: true,
      child: ConstrainedBox(
        constraints: BoxConstraints(minHeight: height < 48 ? 48 : height),  // 48 hit area
        child: Material(
          color: enabled ? bg : c.bgDisabled,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadiusDirectional.circular(SyntropyRadius.radiusFull),
            side: BorderSide(color: enabled ? border : c.borderDisabled),
          ),
          child: InkWell(
            onTap: enabled ? onPressed : null,
            customBorder: const StadiumBorder(),
            child: Padding(
              padding: EdgeInsetsDirectional.symmetric(horizontal: padX),
              child: Row(mainAxisSize: MainAxisSize.min, children: [
                if (iconLeading != null) ...[Icon(iconLeading, size: 20, color: enabled ? fg : c.iconDisabled), const SizedBox(width: SyntropySpace.spaceSm)],
                if (isLoading) SizedBox.square(dimension: 20, child: CircularProgressIndicator(strokeWidth: 2, color: fg))
                else Text(label, style: style.copyWith(color: enabled ? fg : c.textDisabled)),
                if (iconTrailing != null) ...[const SizedBox(width: SyntropySpace.spaceSm), Icon(iconTrailing, size: 20, color: enabled ? fg : c.iconDisabled)],
              ]),
            ),
          ),
        ),
      ),
    );
  }
}
```
Notes on the example:
- The color pairs are illustrative; take each variant's exact tokens from the Figma component with `get_variable_defs` on the variant node during the R5 gate, then keep them in the switch.
- Brand green as built: `text/on-brand` on `bg/brand/primary` (the primary label) and `text/brand/primary` on light surfaces keep the Figma pairs exactly. They are accepted by DS decision; do not flag them in the PR or invent a new color.
- Heights 48, 40, 32 come from the layout sizing reference and are component conventions, not spacing tokens. Icon size 20 likewise comes from the component.
- `Colors.transparent` is the one allowed `Colors.*` member; it carries no hue.

## Usage
```dart
SafqahButton('استثمر الآن', onPressed: _invest);                                   // primary, lg
SafqahButton('تفاصيل الصفقة', onPressed: _open, variant: SafqahButtonVariant.secondary, size: SafqahButtonSize.md);
SafqahButton('متابعة', onPressed: null);                                          // disabled
```

## Do and Don't
| Do | Don't |
|---|---|
| `padding: const EdgeInsetsDirectional.only(start: SyntropySpace.spaceLg)` | `EdgeInsets.only(left: 16)` |
| `color: context.colors.textMuted` | `color: Colors.grey[600]` or `Color(0xFF535D58)` |
| `style: SyntropyTextStyles.body14Regular` | `TextStyle(fontSize: 14, fontFamily: 'Inter')` |
| `Icon(Icons.arrow_forward, matchTextDirection: true)` or the mirrored Syntropy glyph | `SafqahBackButton(direction: TextDirection.rtl)` |
| `LayoutBuilder` in the screen picks a one or two column layout | `SafqahCard(sizeClass: SizeClass.regular)` |
| One story per arguable state (default, disabled, loading) with Args for size and variant | 216 stories, one per Figma variant |

## Widgetbook notes (R2)
- Story per state a reviewer argues about; `Variant` and `Size` are Args.
- Locale (ar, en) and theme (light, dark) are addons or modes, never Args.
- Scenarios every component needs: long Arabic string, long English string, large number, empty, loading, disabled.
- `designLink` per story comes from a manifest, never typed by hand.

## Sources
- Syntropy Widgetbook plan (R1 to R6, Layer 1 tokens, section 8 Definition of Done, section 10 lint messages)
- `knowledge/components/index.json` (`Button` 417:2 props)
- `knowledge/foundations/figma/layout.md` (sizing reference)
