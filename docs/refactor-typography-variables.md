# Refactor Plan: Typography & Design Token Variable Names

**Date**: December 3, 2025  
**Scope**: Update CSS variable references across the entire project to match the new `theme.css` definitions  
**Status**: Planning Phase

---

## Executive Summary

The `theme.css` file has been updated with a new set of CSS custom property (design token) names. This document outlines the required changes across all CSS files and HTML to maintain consistency.

### Key Changes in `theme.css`

The following variable categories have been **added/changed**:

#### Typography Variables (NEW)
- `--text-2xs` through `--text-3xl` (8 text size tokens)
- `--line-height-2xs` through `--line-height-3xl` (8 line-height tokens)
- `--font-sans`, `--font-serif`, `--font-mono` (font family tokens)

#### Layout Variables (NEW)
- `--header-height: 80px`
- `--footer-height: 68px`
- `--aside-width` (fluid clamp-based)
- `--gap: 0.33rem`
- `--radius: 0.125rem`

#### Color Variables (RENAMED/RESTRUCTURED)
- Old: `--color-bg`, `--color-bg-alt`, `--color-text`, `--color-text-muted`, `--color-accent`, `--color-accent-hover`
- New: Tailwind-inspired semantic palette with light/dark mode support:
  - `--color-background`, `--color-foreground`
  - `--color-card`, `--color-card-foreground`
  - `--color-primary`, `--color-primary-foreground`
  - `--color-secondary`, `--color-secondary-foreground`
  - `--color-accent`, `--color-accent-foreground`
  - `--color-muted`, `--color-muted-foreground`
  - `--color-destructive`, `--color-destructive-foreground`
  - Plus border, input, ring variants

#### Spacing Variables (REMOVED)
- Old variables `--space-xs`, `--space-sm`, `--space-md`, `--space-lg`, `--space-xl`, `--space-2xl` are **not present** in new `theme.css`
- **Action Required**: Either restore these or replace all usages with new equivalents

---

## Files to Update

### CSS Files
1. **`assets/css/base.css`** — Uses old typography tokens
   - `--color-text` → `--color-foreground`
   - `--color-bg` → `--color-background`
   - `--leading-base` → `--line-height-base` (if applicable)

2. **`assets/css/components.css`** — Uses spacing & color tokens
   - Multiple `--space-*` references
   - `--color-accent`, `--color-accent-hover`, `--color-bg-alt`, `--color-text-muted`

3. **`assets/css/layout.css`** — Uses typography & spacing
   - Typography scale references
   - Spacing variables

4. **`assets/css/navegation.css`** — Uses colors & spacing
   - Navigation-specific styling

5. **`assets/css/theme.css`** — Source of truth ✅ (Already updated)

### HTML Files
6. **`index.html`** — Check for inline styles using old variables
7. **`404.html`** — Check for inline styles using old variables

---

## Variable Mapping Reference

### Color Mappings
| Old Variable | New Variable | Notes |
|---|---|---|
| `--color-bg` | `--color-background` | Main page background |
| `--color-bg-alt` | `--color-card` or `--color-muted` | Depends on context |
| `--color-text` | `--color-foreground` | Primary text color |
| `--color-text-muted` | `--color-muted-foreground` | Secondary text color |
| `--color-accent` | `--color-accent` | Primary brand/accent color |
| `--color-accent-hover` | `--color-accent-foreground` | Accent text/interactive |

### Spacing Mappings (PENDING RESTORATION)
**Note**: Spacing variables are missing from new `theme.css`. Consider:
1. Restoring `--space-*` variables to `theme.css`, OR
2. Using `rem` units directly, OR
3. Mapping to new layout tokens if appropriate

### Typography Mappings
| Old Variable | New Variable | Notes |
|---|---|---|
| `--text-*` series | `--text-*` series | Updated scale (check values) |
| `--leading-base` | `--line-height-base` | Renamed for consistency |
| System font stack | `--font-sans` | Custom font: `'Bebas Neue', sans-serif` |

---

## Implementation Steps

### Phase 1: Audit & Validation
- [ ] Search all CSS files for old variable names
- [ ] Identify all `--space-*` usages and document
- [ ] Check HTML files for inline style references
- [ ] Create variable migration map with fallback logic

### Phase 2: Restore Missing Tokens (if needed)
- [ ] Decide: restore `--space-*` variables or refactor spacing usage
- [ ] Update `theme.css` if necessary

### Phase 3: Update CSS Files
- [ ] Update `base.css` — colors & typography
- [ ] Update `components.css` — colors & spacing
- [ ] Update `layout.css` — typography & spacing
- [ ] Update `navegation.css` — colors & spacing

### Phase 4: Update HTML Files
- [ ] Audit `index.html` for variable usage
- [ ] Audit `404.html` for variable usage

### Phase 5: Testing & Validation
- [ ] Visual regression testing (compare before/after)
- [ ] Check CSS lint for undefined variable warnings
- [ ] Verify dark mode functionality (`:root.dark`)
- [ ] Test responsive behavior on multiple viewports

### Phase 6: Generate Implementation Report
- [ ] Document all changes made
- [ ] List files modified
- [ ] Report any conflicts or manual decisions
- [ ] Provide summary of test results

---

## Known Issues & Decisions

### Missing Spacing Variables
**Status**: ⚠️ Unresolved  
The new `theme.css` does not define `--space-xs`, `--space-sm`, etc., which are heavily used in:
- `components.css` (11+ usages)
- `layout.css` (7+ usages)
- `navegation.css` (5+ usages)

**Recommendation**: Restore these variables to `theme.css` with appropriate `clamp()` values for consistency.

### Dark Mode Support
**Status**: ✅ Ready  
The new `theme.css` includes `:root.dark` selector with inverted colors. Ensure:
- Dark mode class is properly applied in HTML
- All color variables are defined in both `:root` and `:root.dark`

---

## Success Criteria

✅ All CSS files compile without undefined variable warnings  
✅ Visual appearance matches pre-refactor state  
✅ Light and dark modes both function correctly  
✅ Responsive typography scales properly across viewports  
✅ All design tokens consistently named and documented  
✅ Implementation report generated with full audit trail

---

## Prompt for Implementation

```
You are tasked with implementing the refactor plan documented in 
docs/refactor-typography-variables.md

The plan describes changes to CSS variable names in the design token system.
Your task is to:

1. Update all CSS files to use the new variable names from theme.css:
   - assets/css/base.css
   - assets/css/components.css
   - assets/css/layout.css
   - assets/css/navegation.css

2. Update HTML files for any inline style references:
   - index.html
   - 404.html

3. Handle the MISSING SPACING VARIABLES issue:
   - First, restore the --space-* variables to theme.css with 
     appropriate clamp() definitions for fluid scaling
   - Then update all usages in CSS files

4. After completing all changes:
   - Run a search to verify no old variable names remain
   - Create an IMPLEMENTATION REPORT at: docs/refactor-implementation-report.md
   
5. IMPLEMENTATION REPORT MUST INCLUDE:
   - List of all files modified
   - Count of variable replacements per file
   - Any manual decisions made (with reasoning)
   - Variable mapping table showing old → new transformations
   - Dark mode verification status
   - Testing checklist results
   - Any warnings or unresolved issues
   - Before/after examples of key style rules

Ensure all changes maintain visual consistency and no undefined variable 
warnings appear in the CSS output.
```

---

## Next Steps

1. Review and approve this plan
2. Address the missing spacing variables issue in `theme.css`
3. Execute implementation using the provided prompt
4. Generate comprehensive implementation report
5. Conduct visual regression testing
6. Deploy and monitor

---

**Document Version**: 1.0  
**Last Updated**: December 3, 2025
