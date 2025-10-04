# Design Guidelines: Idea Organization App

## Design Approach
**Reference-Based: Linear + Notion Hybrid**

Drawing inspiration from Linear's sleek, modern interface and Notion's flexible content organization. This approach prioritizes clarity, efficiency, and visual hierarchy while maintaining a polished, professional aesthetic that enhances productivity.

**Core Principles:**
- Information clarity over decoration
- Purposeful use of color for status differentiation
- Smooth, functional interactions without distraction
- Responsive grid system that adapts seamlessly

## Color Palette

**Dark Mode (Primary):**
- Background: 222 15% 12% (deep charcoal)
- Surface: 222 15% 16% (elevated panels)
- Surface Hover: 222 15% 20%
- Border: 222 10% 25%
- Text Primary: 0 0% 95%
- Text Secondary: 0 0% 65%
- Text Muted: 0 0% 45%

**Status Colors:**
- In Progress: 210 100% 60% (vibrant blue)
- On Hold: 45 100% 55% (amber)
- Waiting: 280 60% 65% (purple)
- Finished: 150 50% 50% (green)
- Default/Draft: 0 0% 50% (neutral gray)

**Accent:**
- Primary Action: 210 100% 60% (blue)
- Danger: 0 85% 60% (red)

**Light Mode:**
- Background: 0 0% 98%
- Surface: 0 0% 100%
- Border: 0 0% 88%
- Text Primary: 222 15% 15%
- Text Secondary: 222 10% 40%
- Status colors remain vibrant with slight adjustments for readability

## Typography

**Font Stack:**
- Primary: 'Inter' (Google Fonts) - UI text, body
- Mono: 'JetBrains Mono' - timestamps, metadata

**Type Scale:**
- Hero/Page Title: text-3xl font-bold (30px)
- Section Headers: text-xl font-semibold (20px)
- Card Titles: text-base font-medium (16px)
- Body Text: text-sm (14px)
- Metadata/Labels: text-xs font-medium uppercase tracking-wider (12px)

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16
- Micro spacing (2, 4): Button padding, icon gaps, tight layouts
- Standard spacing (6, 8): Card padding, section margins
- Macro spacing (12, 16): Page padding, major section breaks

**Grid Structure:**
- Main Container: max-w-7xl mx-auto px-6
- Card Grid: grid gap-4 md:gap-6
- Responsive Breakpoints: sm:640px, md:768px, lg:1024px, xl:1280px

## Component Library

**Navigation:**
- Top bar: Fixed header with app title, view toggles (Board/List), search, settings icon
- Height: h-16, backdrop blur with border-b
- Actions aligned right with gap-4 spacing

**Idea Cards:**
- Background: Surface color with hover elevation
- Padding: p-4 to p-6
- Border-radius: rounded-lg
- Status indicator: 3px left border with status color
- Structure: Title (font-medium), description (text-secondary, line-clamp-2), metadata row (flex justify-between, text-xs)
- Color picker: Floating popover with color swatches
- Drag handle: Left-aligned icon, subtle (text-muted) hover:text-primary

**Status Badge:**
- Pill shape: rounded-full px-3 py-1
- Background: Status color at 15% opacity
- Text: Status color at 100% saturation, text-xs font-medium
- Position: Top-right of card

**Input Fields:**
- Title Input: text-lg font-medium, transparent bg, focus:outline-none, border-b-2 on focus
- Description Textarea: min-h-24, text-sm, p-4, rounded-lg, border focus:border-primary
- Consistent dark mode implementation with proper contrast

**Buttons:**
- Primary: bg-primary text-white px-4 py-2 rounded-lg font-medium
- Secondary: border-2 border-border text-primary px-4 py-2 rounded-lg
- Icon Buttons: p-2 rounded-lg hover:bg-surface-hover transition-colors

**Modals/Dialogs:**
- Overlay: backdrop-blur-sm bg-black/50
- Container: max-w-2xl bg-surface rounded-xl p-6 shadow-2xl
- Header: text-xl font-semibold mb-4, close button top-right

## Interaction Patterns

**Drag & Drop:**
- Active state: opacity-50 transform scale-105
- Drop zone: border-2 border-dashed border-primary/50
- Ghost element follows cursor smoothly

**View Modes:**
- Board View: Masonry grid or columnar status lanes
- List View: Single column with compact cards, sortable headers

**Empty States:**
- Centered content with muted icon (w-16 h-16)
- Text: "No ideas yet" (text-lg font-medium), subtitle with CTA
- Illustration or minimal graphic element

**Color Customization:**
- Inline color picker on card with 8-12 preset swatches
- Custom color option with hex input
- Color applies as accent to card border/header

## Animations

Use sparingly:
- Hover transitions: transition-colors duration-200
- Modal entry: fade + slight scale (from-95 to-100)
- Drag interactions: transform with duration-150
- NO scroll-triggered animations
- NO auto-playing effects

## Layout Specifications

**Main Application:**
- Full viewport height with fixed header
- Scrollable content area: overflow-y-auto
- Two-column potential: Sidebar (status filter) + main content area
- Responsive: Single column on mobile, grid on desktop

**Board View Layout:**
- Status columns: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6
- Each column header: Status name + count badge
- Cards stack vertically within columns with gap-3

**List View Layout:**
- Table-like structure with sticky header
- Columns: Drag handle, Title, Status, Color indicator, Actions
- Row height: h-16 to h-20, hover:bg-surface-hover

This design creates a focused, productive environment where color serves functional purposes, interactions are smooth but unobtrusive, and the interface scales elegantly from mobile to desktop.