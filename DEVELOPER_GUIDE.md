# Developer Guide - Vijay's Journal

**Technical documentation for vijaychandraatheli.com**

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Repository Structure](#repository-structure)
4. [File Purposes](#file-purposes)
5. [Design System](#design-system)
6. [Build & Deployment](#build--deployment)
7. [Custom Features](#custom-features)
8. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

### Platform
- **Static Site Generator:** Jekyll 4.3.0
- **Hosting:** GitHub Pages (free)
- **Domain:** vijaychandraatheli.com (via Squarespace Domains)
- **Deployment:** Automatic on git push to `master` branch

### Design Philosophy
- Modern magazine-style editorial layout
- Mobile-first responsive design
- Ultra-compact spacing for minimal scrolling
- Clean typography with Crimson Pro (serif) + Work Sans (sans-serif)
- Dark mode support with localStorage persistence

### Content Management
- Write articles in Markdown (`.md` files)
- Version controlled via Git
- No database required
- Automatic URL generation based on categories

---

## Technology Stack

### Core Technologies
```yaml
Jekyll: 4.3.0          # Static site generator
Ruby: 3.0+             # Required for Jekyll (server-side only)
Markdown: Kramdown     # Content formatting
HTML5: Semantic markup
CSS3: Modern features (Grid, Flexbox, Custom Properties)
JavaScript: Vanilla ES6 (no frameworks)
```

### Jekyll Plugins
```ruby
jekyll-feed       # RSS feed generation
jekyll-seo-tag    # Meta tags for SEO
jekyll-sitemap    # XML sitemap for search engines
```

### Fonts (Google Fonts)
```
Crimson Pro: Body text, tagline (serif)
Work Sans: Headers, navigation, UI (sans-serif)
```

---

## Repository Structure

```
vijaychandraatheli.com/
│
├── _config.yml              # Jekyll site configuration
├── Gemfile                  # Ruby dependencies
├── CNAME                    # Custom domain configuration
├── README.md                # Basic repository info
├── DEVELOPER_GUIDE.md       # This file
├── ADMIN_GUIDE.md           # Content publishing guide
│
├── _layouts/                # HTML templates
│   ├── default.html         # Base wrapper (header + footer)
│   ├── home.html            # Homepage layout
│   ├── post.html            # Single article layout
│   └── page.html            # Static pages layout
│
├── _includes/               # Reusable components
│   ├── header.html          # Site header (centered, sticky)
│   ├── footer.html          # Site footer
│   └── article-card.html    # Grid card component
│
├── _posts/                  # 📝 YOUR ARTICLES GO HERE
│   ├── 2025-12-28-welcome-to-my-journal.md
│   ├── 2025-12-29-article-title.md
│   └── YYYY-MM-DD-article-slug.md
│
├── assets/
│   ├── css/
│   │   └── main.css         # Complete site styling (~800 lines)
│   └── js/
│       └── theme.js         # Dark mode + sticky header logic
│
├── images/
│   ├── posts/               # Article images
│   │   └── YYYY-MM-DD-article-name/
│   │       ├── hero.jpg     # Featured image
│   │       └── diagram.png  # Inline images
│   └── about/
│       └── profile.jpg      # About page photo
│
└── pages/
    ├── about.md             # About page
    ├── journal.md           # All articles grid
    ├── analytics-bi.md      # Category: Analytics & BI
    ├── data-strategy.md     # Category: Data Strategy
    ├── salesforce.md        # Category: Salesforce
    └── consulting-insights.md # Category: Consulting Insights
```

---

## File Purposes

### Configuration Files

#### `_config.yml`
**Purpose:** Jekyll site configuration  
**You Edit:** When changing featured posts, navigation, site metadata  
**Contains:**
- Site title, tagline, description
- Author information (name, email, social links)
- Navigation menu structure
- Category definitions
- Featured posts list
- Permalink structure
- Plugin configuration

**Example settings you might change:**
```yaml
featured_posts:
  - "2025-12-28-welcome-to-my-journal"
  - "2026-01-15-your-new-featured-article"
```

#### `Gemfile`
**Purpose:** Ruby dependencies for Jekyll  
**You Edit:** Rarely (only when updating Jekyll or adding plugins)  
**Contains:** Jekyll version, plugins list

#### `CNAME`
**Purpose:** Custom domain configuration for GitHub Pages  
**You Edit:** Never (unless changing domain)  
**Contains:** Single line: `vijaychandraatheli.com`

---

### Layout Files (`_layouts/`)

#### `default.html`
**Purpose:** Master template that wraps all pages  
**You Edit:** Never (unless adding site-wide features)  
**Contains:**
- `<head>` with meta tags, fonts, CSS links
- Ambient gradient background
- Dark mode toggle button
- Header include
- Main content placeholder (`{{ content }}`)
- Footer include
- JavaScript includes

**Template hierarchy:**
```
All pages use → default.html
    ├── home.html (uses default)
    ├── post.html (uses default)
    └── page.html (uses default)
```

#### `home.html`
**Purpose:** Homepage layout with intro + featured + grid  
**You Edit:** Rarely (only to change homepage structure)  
**Contains:**
- Introduction section (from `index.md`)
- Featured articles grid (3 columns)
- Latest articles grid (4 columns)
- Conditional rendering based on post count

#### `post.html`
**Purpose:** Single article page layout  
**You Edit:** Never (unless changing article page structure)  
**Contains:**
- Category badge
- Article title and subtitle
- Author metadata (avatar, name, date, read time)
- Article content area
- Tags footer
- "Back to Journal" link

#### `page.html`
**Purpose:** Static pages (About, category pages)  
**You Edit:** Never (unless changing page structure)  
**Contains:**
- Page title and subtitle
- Page content area
- Minimal, clean layout

---

### Include Files (`_includes/`)

#### `header.html`
**Purpose:** Site header with navigation  
**You Edit:** Never (styling handled by CSS)  
**Contains:**
- Site title (your name)
- Tagline
- Navigation menu (dynamically generated from `_config.yml`)

**Behavior:**
- Normal state: Centered, full branding
- Sticky state: Compact with "VC" + inline navigation

#### `footer.html`
**Purpose:** Site footer with links  
**You Edit:** Rarely (only to add/change footer links)  
**Contains:**
- Copyright notice (auto-updates year)
- Social links (LinkedIn, GitHub, Email from `_config.yml`)

#### `article-card.html`
**Purpose:** Reusable article card for grids  
**You Edit:** Never (unless changing card design)  
**Contains:**
- Card image with category badge (top-right)
- Article title
- Excerpt (hidden, shows on hover)
- Metadata (date, reading time)

---

### Content Files

#### `_posts/` Folder
**Purpose:** All your journal articles  
**You Edit:** THIS IS WHERE YOU WORK DAILY  
**Naming convention:** `YYYY-MM-DD-article-slug.md`

**Example:**
```
_posts/2025-12-28-welcome-to-my-journal.md
_posts/2026-01-05-salesforce-integration-patterns.md
_posts/2026-01-12-data-governance-frameworks.md
```

**Each file contains:**
- YAML front matter (metadata)
- Markdown content (article body)

#### `pages/` Folder
**Purpose:** Static pages and category archives  
**You Edit:** Occasionally (updating bio, category descriptions)

**Files:**
- `about.md` - Your professional bio
- `journal.md` - All articles archive
- `analytics-bi.md` - Analytics & BI category page
- `data-strategy.md` - Data Strategy category page
- `salesforce.md` - Salesforce category page
- `consulting-insights.md` - Consulting category page

#### `index.md`
**Purpose:** Homepage content  
**You Edit:** Rarely (only to update intro text)  
**Contains:** Introduction section in YAML front matter

---

### Asset Files

#### `assets/css/main.css`
**Purpose:** Complete site styling (~800 lines)  
**You Edit:** Rarely (only for design changes)

**Structure:**
```css
CSS Variables (lines 1-25)
    - Colors, fonts, spacing values
    
Base Styles (lines 26-60)
    - Reset, body defaults
    
Components:
    - Ambient gradient background
    - Theme toggle button
    - Sticky header system
    - Footer
    - Homepage hero section
    - Section titles
    - Article grids (3-col featured, 4-col latest)
    - Article cards
    - Single post pages
    - Static pages
    
Responsive Design (lines 800+)
    - Tablet breakpoints (@992px)
    - Mobile breakpoints (@768px)
    - Small mobile (@480px)
```

**Key sections you might edit:**
- Lines 10-20: Color variables (change accent color, etc.)
- Lines 40-50: Body font size and line-height
- Lines 450-550: Spacing values (if you want more/less compact)

#### `assets/js/theme.js`
**Purpose:** Interactive features  
**You Edit:** Never (unless adding new features)

**Features implemented:**
1. **Dark mode toggle**
   - Saves preference to localStorage
   - Persists across sessions
   - Updates moon/sun icon

2. **Sticky compact header**
   - Activates at 100px scroll
   - Smooth opacity crossfade
   - Placeholder prevents content jump
   - Body class for theme toggle positioning

3. **Keyboard shortcuts**
   - Press 'T' to scroll to top

4. **External link handling**
   - Automatically opens in new tab
   - Adds security attributes

5. **Image lazy loading**
   - Improves page load performance

6. **Print handling**
   - Removes dark mode when printing
   - Resets header to normal

---

## Design System

### Typography Scale

**Fonts:**
- **Serif (Crimson Pro):** Body text, tagline, intro paragraphs
- **Sans-serif (Work Sans):** Headers, navigation, UI elements, metadata

**Font Sizes:**
```
Site Title: 48px (Work Sans, weight 800)
Article Title: 50px (Work Sans, weight 800)
H2 in articles: 30px (Work Sans, weight 700)
H3 in articles: 22px (Work Sans, weight 600)
Body text: 18px (Crimson Pro, weight 400)
Navigation: 13px uppercase (Work Sans, weight 600)
Compact nav (sticky): 11px
Card titles: 18px (Work Sans, weight 700)
Meta text: 12-13px (Work Sans)
```

### Color Palette

**CSS Variables (defined in `:root`):**
```css
--accent: #d63447         /* Red - primary action color */
--dark: #1a1a1a          /* Almost black - text */
--light: #ffffff         /* White - backgrounds */
--gray: #666             /* Medium gray - secondary text */
--border: #ddd           /* Light gray - borders */
--gradient-start: #d63447 /* Red - gradient start */
--gradient-end: #9b59b6   /* Purple - gradient end */
```

**Dark Mode Overrides:**
```css
--light: #0a0a0a
--dark: #e8e8e8
--border: #333
--gray: #999
```

**Usage:**
- Accent color: Category badges, hover states, underlines, links
- Dark: Text, borders in light mode
- Light: Backgrounds in light mode
- Gray: Secondary text, metadata, subtle elements

### Spacing System

**Line Heights:**
- Body text: 1.4
- Article content: 1.45-1.5
- Headers: 1.08-1.25 (tight for impact)

**Margins (Vertical Rhythm):**
- Between paragraphs: 0.5-0.65em
- Before H2: 28px
- Before H3: 22px
- Between sections: 35-45px
- Article header: 28px bottom
- Article footer: 35px top

### Grid System

**Homepage:**
- Featured Articles: 3 columns (desktop)
- Latest Articles: 4 columns (desktop)
- Gap: 22px

**Responsive Breakpoints:**
- `>1200px`: 4 columns (latest), 3 columns (featured)
- `992-1200px`: 3 columns (latest)
- `768-992px`: 2 columns
- `<768px`: 1 column (mobile)

**Card Specifications:**
- Image aspect ratio: 5:3 (60% padding-top)
- Border-radius: 8px
- Hover: translateY(-5px) + box-shadow
- Category badge: 8px top-right, 8px font size

---

## Build & Deployment

### How Jekyll Works

**Process:**
```
1. You write: Markdown files
2. You push: Git commit + push
3. GitHub runs: Jekyll build process
4. Jekyll reads:
   - _config.yml (settings)
   - _posts/*.md (articles)
   - _layouts/*.html (templates)
   - _includes/*.html (components)
   - assets/* (CSS, JS, images)
5. Jekyll generates: Complete HTML/CSS/JS website
6. GitHub serves: Static files at vijaychandraatheli.com
```

**Build time:** ~1-2 minutes after push

### Deployment Workflow

**Standard article publish:**
```bash
# 1. Create article
touch _posts/2026-01-15-my-new-article.md

# 2. Write content (see ADMIN_GUIDE.md)

# 3. Add images (if any)
mkdir -p images/posts/2026-01-15-my-new-article
# Copy images to that folder

# 4. Commit and push
git add .
git commit -m "New article: My New Article"
git push origin master

# 5. Wait 1-2 minutes
# Article appears at: vijaychandraatheli.com/category/my-new-article/
```

### Local Development (Optional)

**If you want to preview before publishing:**

```bash
# One-time setup (install Jekyll):
gem install bundler jekyll

# Install dependencies:
bundle install

# Run local server:
bundle exec jekyll serve

# View at: http://localhost:4000
# Auto-rebuilds when you save files
```

**Pros of local preview:**
- See changes instantly
- Catch formatting errors before publishing
- Test on mobile devices via network

**Cons:**
- Requires Ruby installed
- Extra setup step

---

## Custom Features

### 1. Sticky Compact Header

**Implementation:**
- **JavaScript:** `assets/js/theme.js` lines 30-95
- **CSS:** `assets/css/main.css` lines 145-280
- **Trigger:** Scroll > 100px

**How it works:**
1. Detects scroll position
2. When > 100px: Adds `.sticky` class to `<header>`
3. CSS fades out title/tagline, fades in "VC"
4. Creates placeholder div to prevent content jump
5. Placeholder height animates: expanded → compact
6. Adds `header-is-sticky` class to `<body>` (moves dark mode toggle down)

**States:**
- **Normal:** Full branding (title + tagline + nav)
- **Sticky:** Compact (VC + nav inline)

**Customization:**
```javascript
const scrollThreshold = 100; // Change this to trigger earlier/later
```

### 2. Dark Mode

**Implementation:**
- **JavaScript:** `assets/js/theme.js` lines 15-30
- **CSS:** CSS variables override in dark mode
- **Storage:** localStorage key: `theme`

**How it works:**
1. On page load: Check localStorage for saved preference
2. Apply `dark-mode` class to `<body>` if saved
3. Toggle button: Switches class, saves preference
4. CSS variables automatically update colors

**Color overrides:**
```css
body.dark-mode {
    --light: #0a0a0a;  /* Dark background */
    --dark: #e8e8e8;   /* Light text */
    --border: #333;
    --gray: #999;
}
```

### 3. Article Grid with Hover Effects

**Implementation:**
- **HTML:** `_includes/article-card.html`
- **CSS:** `.article-card` section

**Features:**
- Category badge (top-right corner, 8px font)
- Title below image
- Excerpt (hidden, shows on hover with opacity transition)
- Metadata (date, reading time)
- Card lifts on hover (`translateY(-5px)`)
- Image zooms on hover (`scale(1.05)`)

### 4. Category System

**URL Structure:**
```
/category-slug/article-slug/

Examples:
/analytics-bi/real-time-analytics/
/data-strategy/modern-data-stack/
/salesforce/integration-patterns/
/consulting-insights/transformation-case-study/
```

**Categories:**
- `analytics-bi` → "Analytics & BI"
- `data-strategy` → "Data Strategy"
- `salesforce` → "Salesforce"
- `consulting-insights` → "Consulting Insights"

**Each category has:**
- Navigation link in header
- Dedicated archive page (`pages/category-name.md`)
- Auto-filtered article list

### 5. Featured Articles

**Implementation:** `_config.yml` + homepage layout

**How to feature an article:**
1. Add filename to `featured_posts` array in `_config.yml`
2. Use exact filename (with date prefix, without `.md`)
3. Order matters (shows in list order)
4. Limit: 3 articles maximum

**Example:**
```yaml
featured_posts:
  - "2025-12-28-welcome-to-my-journal"
  - "2026-01-10-best-article-ever"
  - "2026-01-20-another-great-one"
```

---

## URL Structure

### Permalink Configuration

**Set in `_config.yml`:**
```yaml
permalink: /:categories/:title/
```

**Generated URLs:**
```
Article: _posts/2026-01-15-salesforce-best-practices.md
Category: salesforce
Result: /salesforce/salesforce-best-practices/
```

**Clean URLs:**
- No dates in URLs (evergreen content)
- Category visible in path (good for SEO)
- Lowercase, hyphenated slugs
- No file extensions

---

## Design System Details

### Responsive Grid

**CSS Grid Implementation:**
```css
.articles-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 22px;
}

/* Tablet */
@media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
}

/* Mobile */
@media (max-width: 768px) {
    grid-template-columns: 1fr;
}
```

**Automatically responsive** - adjusts based on screen width AND browser zoom.

### Typography System

**Hierarchy:**
```
Level 1: Site title (48px, 800 weight)
Level 2: Article title (50px, 800 weight)
Level 3: H2 in content (30px, 700 weight)
Level 4: H3 in content (22px, 600 weight)
Level 5: Body text (18px, 400 weight)
Level 6: Metadata (12-13px, 400-600 weight)
```

**Letter spacing:**
- Large titles: Negative (-2px to -1px) for tighter appearance
- Body text: Normal (0)
- Uppercase nav: Positive (1px) for readability

### Animations

**Page load:**
- Header: `fadeInDown` (0.8s ease)
- Content: `fadeIn` (1s ease)
- Article title: `slideIn` (0.8s ease)

**Interactions:**
- Card hover: transform + box-shadow (0.3s ease)
- Nav link hover: underline animation (0.3s ease)
- Tag hover: background + lift (0.3s ease)
- Dark mode toggle: rotate + scale (0.3s ease)

**Sticky header:**
- Opacity crossfade: 0.25-0.3s
- Placeholder height: 0.35s cubic-bezier
- Smooth, coordinated transitions

---

## Content Organization

### Categories

**Purpose:** Primary article grouping (one per article)

**Available categories:**
1. `analytics-bi` - Business Intelligence & Analytics
2. `data-strategy` - Data architecture, governance, infrastructure
3. `salesforce` - CRM, integrations, best practices
4. `consulting-insights` - Client work, methodologies, lessons

**In article front matter:**
```yaml
category: analytics-bi  # Use slug, not display name
```

### Tags

**Purpose:** Cross-category topics (multiple per article)

**Usage:**
```yaml
tags: [real-time analytics, streaming data, apache kafka, business intelligence]
```

**Displayed:** At bottom of articles as clickable pills

**Future:** Can add tag archive pages

---

## DNS & Hosting Configuration

### Domain Setup (Squarespace)

**A Records (point to GitHub Pages):**
```
@ → 185.199.108.153
@ → 185.199.109.153
@ → 185.199.110.153
@ → 185.199.111.153
```

**CNAME Record:**
```
www → vijaychandraatheli.github.io
```

**TTL:** 4 hours (14400 seconds)

### GitHub Pages Settings

**Repository:** `VijayChandraAtheli/vijaychandraatheli.com`

**Settings → Pages:**
- Source: `master` branch, `/ (root)` folder
- Custom domain: `vijaychandraatheli.com`
- Enforce HTTPS: ✓ Enabled
- Build: Automatic on push

**CNAME file:** Contains single line `vijaychandraatheli.com`

---

## Troubleshooting

### Issue: Site not updating after push

**Cause:** GitHub Pages build failed or still building

**Solution:**
1. Go to repository → Actions tab
2. Check latest "pages build and deployment" workflow
3. If failed (red X): Click to see error
4. If yellow: Still building, wait 2 more minutes
5. Common errors: YAML syntax in front matter, missing layouts

**Quick fix:**
```bash
# Check Jekyll build locally:
bundle exec jekyll build

# If errors appear, fix them before pushing
```

---

### Issue: CSS/JS changes not showing

**Cause:** Browser cache or GitHub Pages cache

**Solution:**
1. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Open in incognito/private window
4. Wait 2-3 minutes for GitHub Pages to rebuild
5. Check if commit is in GitHub (verify push succeeded)

---

### Issue: Article not showing on site

**Cause:** Filename format wrong or future date

**Solution:**
1. Check filename: Must be `YYYY-MM-DD-slug.md`
2. Check date: Jekyll won't show future-dated posts
3. Check category: Must match one of the defined categories
4. Check front matter: YAML syntax must be valid

**Validation:**
```yaml
---
layout: post               # Must be exactly "post"
title: "Your Title"        # Quoted strings
date: 2025-12-28          # YYYY-MM-DD format, not future
category: analytics-bi     # Must match defined category
tags: [tag1, tag2]        # Array format
excerpt: "Description"     # Optional
image: /images/...        # Optional, relative path
---
```

---

### Issue: Images not loading

**Cause:** Wrong path or missing file

**Solution:**
1. Check image path starts with `/` (absolute from root)
2. Correct: `/images/posts/2025-12-28-article/hero.jpg`
3. Wrong: `images/posts/...` or `./images/...`
4. Verify file exists in repository
5. Check filename case (case-sensitive on Linux servers)
6. Compress large images (<500KB recommended)

---

### Issue: Sticky header flickering

**Cause:** Browser performance or transition conflicts

**Solution:**
1. Check if multiple scroll handlers conflicting
2. Verify placeholder has `height: 0` and `transition` in CSS
3. Ensure `header::before` transitions properly
4. Check browser DevTools Performance tab for layout thrashing

**If persists:** Increase scroll threshold:
```javascript
const scrollThreshold = 150; // Instead of 100
```

---

### Issue: Dark mode not persisting

**Cause:** localStorage not saving

**Solution:**
1. Check browser console for errors
2. Verify browser allows localStorage (private browsing might block)
3. Check `theme.js` loaded correctly
4. Clear localStorage and try again:
   ```javascript
   // In browser console:
   localStorage.clear();
   ```

---

## Performance Optimization

### Current Optimizations

1. **Static site** - No server processing, instant page loads
2. **Image lazy loading** - Images load as you scroll
3. **Minimal JavaScript** - ~200 lines total, no frameworks
4. **CSS-only animations** - GPU-accelerated transforms
5. **Passive scroll listeners** - Doesn't block scrolling
6. **RequestAnimationFrame** - Synced with browser repaint

### Load Performance

**Typical metrics:**
- First paint: <1s
- Time to interactive: <1.5s
- Total page size: ~100-200KB (without images)

### Future Optimizations

**If site grows large:**
- Add pagination (>20 articles per page)
- Implement search functionality
- Add service worker for offline
- Use WebP images with fallbacks
- Minify CSS/JS in production

---

## Extending the Site

### Adding a New Category

**Steps:**
1. Add to `_config.yml`:
   ```yaml
   category_names:
     new-category: "Display Name"
   
   navigation:
     - title: "Display Name"
       url: "/new-category/"
   ```

2. Create page: `pages/new-category.md`
   ```markdown
   ---
   layout: page
   title: Display Name
   subtitle: Description
   permalink: /new-category/
   ---
   
   <section class="articles-section">
       <div class="articles-grid">
           {% assign category_posts = site.posts | where: "category", "new-category" %}
           {% for post in category_posts %}
               {% include article-card.html post=post %}
           {% endfor %}
       </div>
   </section>
   ```

3. Use in articles:
   ```yaml
   category: new-category
   ```

---

### Adding Analytics

**Google Analytics 4:**

1. Get tracking ID from Google Analytics
2. Add to `_layouts/default.html` in `<head>`:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

---

### Adding Comments

**Using utterances (GitHub Issues as comments):**

1. Install utterances GitHub app on your repo
2. Add to `_layouts/post.html` before `</article>`:
   ```html
   <script src="https://utteranc.es/client.js"
           repo="VijayChandraAtheli/vijaychandraatheli.com"
           issue-term="pathname"
           theme="github-light"
           crossorigin="anonymous"
           async>
   </script>
   ```

---

## Code Maintenance

### What to Edit Regularly
- `_posts/*.md` - New articles (daily/weekly)
- `_config.yml` - Featured posts (monthly)
- `pages/about.md` - Bio updates (quarterly)

### What to Edit Rarely
- `assets/css/main.css` - Design tweaks (rarely)
- `index.md` - Homepage intro (rarely)
- Category page descriptions (rarely)

### What to NEVER Edit (Unless You Know What You're Doing)
- `_layouts/*.html` - Core templates
- `_includes/*.html` - Components
- `assets/js/theme.js` - Interactive features
- `CNAME` - Domain configuration

---

## Backup & Version Control

### Git is Your Backup

**Everything is version controlled:**
```bash
# See all changes:
git log --oneline

# Restore previous version:
git checkout abc1234 _posts/2025-12-28-article.md

# Undo last commit:
git revert HEAD

# See what changed:
git diff
```

**Recommendation:** Never force-push, always commit logically

### Disaster Recovery

**If site breaks:**
```bash
# 1. Check GitHub Actions for build errors
# 2. Revert to last working commit:
git log --oneline
git revert <bad-commit-hash>
git push

# 3. Or restore specific file:
git checkout HEAD~1 path/to/file
git commit -m "Restore working version"
git push
```

---

## Security & Best Practices

### What's Secure
- ✅ Static site (no database to hack)
- ✅ HTTPS enforced (GitHub provides free SSL)
- ✅ No user input (no injection vulnerabilities)
- ✅ External links use `rel="noopener noreferrer"`
- ✅ No sensitive data in repository

### Best Practices
- ✅ Keep images compressed (<500KB)
- ✅ Write semantic HTML in content
- ✅ Use proper heading hierarchy (H2 → H3 → H4)
- ✅ Add alt text to images
- ✅ Test on mobile devices
- ✅ Commit messages should be descriptive

### Don't Do This
- ❌ Commit sensitive info (API keys, passwords)
- ❌ Use uncompressed images (slows load time)
- ❌ Edit files directly on GitHub web interface (error-prone)
- ❌ Push without testing locally (if you have Jekyll installed)

---

## Technical Debt & Future Improvements

### Known Limitations

1. **No search functionality** - Consider adding Jekyll search plugin
2. **No pagination** - Will need it after ~30 articles
3. **No RSS reader count** - Can't track subscribers
4. **Manual featured posts** - Could automate based on views/tags
5. **No related articles** - Could add based on tags/category

### Enhancement Ideas

**Easy to add later:**
- Newsletter signup (Mailchimp, Substack)
- Social share buttons
- Reading time estimates (already calculated, just display)
- "Popular articles" based on manual curation
- Archive by year/month

**Medium complexity:**
- Search functionality (Jekyll plugins available)
- Comments (Disqus, utterances)
- Related posts algorithm
- Table of contents for long articles
- Author bio box in articles

**Complex:**
- Multiple authors
- Draft/publish workflow
- Scheduled posts
- A/B testing
- Analytics dashboard

---

## Browser Compatibility

### Tested & Working
- ✅ Chrome/Edge (Chromium) 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome Mobile (Android)

### CSS Features Used
- CSS Grid (99%+ browser support)
- Flexbox (99%+ support)
- CSS Custom Properties (98%+ support)
- CSS Animations (99%+ support)

### JavaScript Features
- ES6 Arrow functions
- const/let
- Template literals
- RequestAnimationFrame
- LocalStorage

**No polyfills needed** for modern browsers (2020+)

---

## File Size Budget

**Current sizes:**
- `main.css`: ~25KB (unminified)
- `theme.js`: ~6KB (unminified)
- HTML per page: ~10-15KB
- Fonts (Google CDN): ~30KB (cached)

**Per article page load:**
- Without images: ~70KB
- With images: ~200-500KB (depends on image optimization)

**Recommendation:** Keep article images under 300KB each

---

## Questions & Support

### Getting Help

**For Jekyll issues:**
- Official docs: https://jekyllrb.com/docs/
- GitHub Pages docs: https://docs.github.com/en/pages

**For Markdown:**
- Guide: https://www.markdownguide.org/
- Cheatsheet: See ADMIN_GUIDE.md

**For Git:**
- Guide: https://git-scm.com/docs
- Interactive tutorial: https://learngitbranching.js.org/

### Debugging Tips

**Always check:**
1. GitHub Actions tab (build status)
2. Browser console (F12) for JavaScript errors
3. Network tab for failed resource loads
4. _config.yml syntax (YAML is picky about indentation)

**Common mistakes:**
- Wrong date format in filename
- Missing closing quotes in front matter
- Incorrect category slug
- Image path doesn't start with `/`
- YAML indentation with tabs instead of spaces

---

## Changelog

### Version History

**v1.0 - December 28, 2025**
- Initial launch
- Jekyll 4.3 + GitHub Pages
- Custom domain configured
- Sticky header with opacity crossfade
- Dark mode toggle
- 4-column responsive grid
- Ultra-compact spacing
- Magazine-style design

---

**End of Developer Guide**

*For content publishing instructions, see ADMIN_GUIDE.md*