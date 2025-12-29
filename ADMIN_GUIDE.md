# Admin Guide - Publishing to Vijay's Journal

**Your complete guide to writing and publishing articles**

---

## Quick Start - Publishing a New Article

### 5-Minute Workflow

```bash
# 1. Create new file in _posts folder
# Filename format: YYYY-MM-DD-article-title.md
touch _posts/2026-01-15-my-article-title.md

# 2. Open in your editor, add front matter + content

# 3. Commit and push
git add .
git commit -m "New article: My Article Title"
git push origin master

# 4. Wait 1-2 minutes
# 5. Article is live!
```

---

## Table of Contents

1. [Creating a New Article](#creating-a-new-article)
2. [Front Matter Guide](#front-matter-guide)
3. [Markdown Syntax](#markdown-syntax-complete-guide)
4. [Adding Images](#adding-images)
5. [Formatting Tips](#formatting-tips)
6. [Categories & Tags](#categories--tags)
7. [Publishing Checklist](#publishing-checklist)
8. [Updating Existing Articles](#updating-existing-articles)

---

## Creating a New Article

### Step 1: Create the File

**Naming convention:** `YYYY-MM-DD-article-slug.md`

**Examples:**
```
2026-01-15-salesforce-integration-best-practices.md
2026-02-03-real-time-analytics-frameworks.md
2026-03-20-data-governance-strategies.md
```

**Rules:**
- ✅ Start with date: `YYYY-MM-DD-`
- ✅ Lowercase only
- ✅ Use hyphens (not spaces or underscores)
- ✅ Keep slug short but descriptive
- ✅ File extension: `.md`

**Where:** `_posts/` folder in your repository

---

### Step 2: Add Front Matter

**Every article starts with front matter** (metadata between `---` lines):

```yaml
---
layout: post
title: "Your Article Title Here"
date: 2026-01-15
category: analytics-bi
tags: [business intelligence, analytics, real-time data]
excerpt: "A brief 1-2 sentence description of what this article covers."
image: /images/posts/2026-01-15-article-slug/hero.jpg
---
```

**Required fields:**
- `layout:` Always `post`
- `title:` Article title (use quotes if contains colons)
- `date:` Publication date (YYYY-MM-DD)
- `category:` One of: `analytics-bi`, `data-strategy`, `salesforce`, `consulting-insights`

**Optional fields:**
- `tags:` Array of topics (for cross-referencing)
- `excerpt:` Short description (shows in cards on hover, SEO meta)
- `image:` Featured image path (shows in grid cards)

---

### Step 3: Write Your Content

**After the closing `---`, write your article in Markdown:**

```markdown
---
layout: post
title: "The Future of Real-Time Analytics"
date: 2026-01-15
category: analytics-bi
tags: [real-time data, streaming, business intelligence]
excerpt: "How modern organizations leverage streaming architectures for instant insights."
---

## Introduction

Your first paragraph here...

## Main Section

More content...

### Subsection

Details...
```

---

## Front Matter Guide

### Required Fields Explained

#### `layout: post`
**Purpose:** Tells Jekyll which template to use  
**Value:** Always `post` for articles  
**Don't change this**

#### `title: "Article Title"`
**Purpose:** Article headline  
**Format:** Use quotes, especially if title contains `:` or `#`  
**Tips:**
- Keep under 60 characters (better for SEO)
- Use title case: "The Future of Real-Time Analytics"
- Be specific and descriptive
- Avoid clickbait

**Examples:**
```yaml
title: "Building Scalable Data Pipelines with Apache Kafka"
title: "5 Salesforce Integration Patterns Every Architect Should Know"
title: "Why Data Governance Fails: Lessons from 10 Client Engagements"
```

#### `date: YYYY-MM-DD`
**Purpose:** Publication date (affects URL and sorting)  
**Format:** Must be `YYYY-MM-DD` exactly  
**Behavior:** Jekyll won't show future-dated posts

**Examples:**
```yaml
date: 2026-01-15
date: 2025-12-28
```

**Note:** You can schedule posts by using future dates. They'll appear automatically on that date.

#### `category:`
**Purpose:** Primary topic classification  
**Values:** Must be one of these exact slugs:
- `analytics-bi` → Analytics & BI
- `data-strategy` → Data Strategy
- `salesforce` → Salesforce
- `consulting-insights` → Consulting Insights

**Affects:**
- URL structure: `/category/article-title/`
- Category page filtering
- Category badge on cards

**Example:**
```yaml
category: analytics-bi
```

**Wrong:**
```yaml
category: Analytics & BI  # Don't use display name!
category: analytics  # Wrong slug
```

---

### Optional Fields Explained

#### `tags: [tag1, tag2, tag3]`
**Purpose:** Topic keywords for cross-referencing  
**Format:** Array in square brackets, comma-separated  
**Display:** Pills at bottom of article

**Best practices:**
- Use 3-6 tags per article
- Lowercase, hyphenated for multi-word
- Be consistent (reuse tags across articles)
- Mix general and specific

**Examples:**
```yaml
tags: [real-time analytics, apache kafka, streaming data, decision-making]
tags: [salesforce, integration, rest api, data sync]
tags: [consulting, client engagement, transformation, change management]
```

#### `excerpt: "Description"`
**Purpose:** Short summary (shows in cards on hover, search results, SEO)  
**Format:** Quoted string, 1-2 sentences  
**Length:** 100-160 characters ideal

**Examples:**
```yaml
excerpt: "How forward-thinking organizations leverage streaming data to make decisions at the speed of business."
excerpt: "Five integration patterns that solve 90% of Salesforce connectivity challenges."
```

**If omitted:** Jekyll uses first paragraph (might not be ideal)

#### `image: /path/to/image.jpg`
**Purpose:** Featured image for article card  
**Format:** Absolute path from root (starts with `/`)  
**Recommended size:** 1200x720px (5:3 ratio), compressed to <300KB

**Examples:**
```yaml
image: /images/posts/2026-01-15-article-title/hero.jpg
image: /images/posts/2026-02-03-another-article/cover.png
```

**If omitted:** Card shows gradient placeholder

---

## Markdown Syntax (Complete Guide)

### Headings

```markdown
## Main Section (H2)
### Subsection (H3)
#### Sub-subsection (H4)
```

**Hierarchy rules:**
- H1 is article title (set in front matter, don't use in content)
- Start with H2 (`##`) for main sections
- Use H3 (`###`) for subsections
- Use H4 (`####`) rarely (detailed breakdowns)

**Best practices:**
- Don't skip levels (H2 → H4 is wrong)
- Keep headings concise (under 10 words)
- Use sentence case, not ALL CAPS

---

### Paragraphs

```markdown
This is a paragraph. Just write normally.

Leave a blank line between paragraphs.

This is a new paragraph.
```

**Line breaks within paragraphs:**
```markdown
This is one line  
Add two spaces at end of line to force break
This appears on new line
```

---

### Emphasis

```markdown
**Bold text** for strong emphasis
*Italic text* for subtle emphasis
***Bold and italic*** for maximum emphasis
```

**Renders as:**
- **Bold text** for strong emphasis
- *Italic text* for subtle emphasis
- ***Bold and italic*** for maximum emphasis

---

### Links

```markdown
[Link text](https://example.com)
[Another article](/analytics-bi/previous-article/)
[Link with title](https://example.com "Hover text")
```

**Internal links** (to other articles):
```markdown
Read my [previous article on data governance](/data-strategy/governance-frameworks/)
```

**External links:**
```markdown
Check out [Apache Kafka documentation](https://kafka.apache.org/documentation/)
```

**Email links:**
```markdown
Contact me at [athelivijay17@gmail.com](mailto:athelivijay17@gmail.com)
```

---

### Lists

#### Unordered (Bullet) Lists
```markdown
- First item
- Second item
- Third item
  - Nested item (indent with 2 spaces)
  - Another nested item
- Fourth item
```

#### Ordered (Numbered) Lists
```markdown
1. First step
2. Second step
3. Third step
   1. Sub-step (indent with 3 spaces)
   2. Another sub-step
4. Fourth step
```

**Mixed lists:**
```markdown
1. Main point
   - Supporting detail
   - Another detail
2. Next main point
```

---

### Blockquotes

```markdown
> This is a quote or callout.
> It can span multiple lines.
> 
> Even multiple paragraphs.
```

**Renders as:**
> This is a quote or callout.
> It can span multiple lines.

**Use for:**
- Quotes from sources
- Key takeaways
- Important callouts
- Pulling out main ideas

---

### Code

#### Inline Code
```markdown
Use `inline code` for commands, variables, or technical terms.

Example: The `requestAnimationFrame` function improves performance.
```

#### Code Blocks
````markdown
```python
def analyze_data(df):
    """Process dataframe and return insights."""
    return df.groupby('category').agg({
        'revenue': 'sum',
        'count': 'count'
    })
```
````

**Supported languages** (for syntax highlighting):
- `python`, `javascript`, `java`, `sql`, `bash`, `yaml`, `json`, `css`, `html`

**Best practices:**
- Always specify language after opening ```
- Keep code blocks under 30 lines
- Add comments for clarity
- Include context before code block

---

### Horizontal Rules

```markdown
Use three hyphens for a divider:

---

Content continues after the line.
```

**Use sparingly** - section transitions, major topic changes

---

### Images

#### Basic Image
```markdown
![Alt text description](/images/posts/2026-01-15-article/diagram.png)
```

#### Image with Caption
```markdown
![Data pipeline architecture](/images/posts/2026-01-15-article/pipeline.png)
*Figure 1: Modern data pipeline with streaming and batch processing*
```

**Best practices:**
- Always include alt text (accessibility + SEO)
- Use descriptive filenames
- Compress images before adding
- Recommended size: 1200px wide max

---

### Tables

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1 Col 1 | Row 1 Col 2 | Row 1 Col 3 |
| Row 2 Col 1 | Row 2 Col 2 | Row 2 Col 3 |
```

**Alignment:**
```markdown
| Left | Center | Right |
|:-----|:------:|------:|
| Text | Text   | Text  |
```

**Tips:**
- Use for data comparison
- Keep tables simple (max 5 columns)
- Consider using an image of a table for complex data

---

## Adding Images

### Image Workflow

**Step 1: Prepare Images**

**Recommended specs:**
- **Featured image (card):** 1200x720px (5:3 ratio)
- **Inline images:** 1200px width max
- **Diagrams/screenshots:** As needed, but compress
- **Format:** JPG for photos, PNG for diagrams/screenshots
- **Compression:** Aim for <300KB per image

**Tools:**
- **Compression:** TinyPNG.com, Squoosh.app
- **Editing:** Photoshop, GIMP, Canva

**Step 2: Organize in Folder**

```bash
# Create folder for your article's images
mkdir -p images/posts/2026-01-15-article-title

# Copy images into that folder
# Name them descriptively
images/posts/2026-01-15-article-title/
├── hero.jpg          # Featured image for card
├── diagram-1.png     # First diagram in article
├── screenshot-2.png  # Screenshot
└── chart-3.jpg       # Data visualization
```

**Step 3: Reference in Article**

```markdown
---
title: "My Article"
image: /images/posts/2026-01-15-article-title/hero.jpg
---

## Section with Image

Here's a diagram explaining the concept:

![Data flow diagram](/images/posts/2026-01-15-article-title/diagram-1.png)

The diagram shows how data moves through the system...
```

**Important:**
- ✅ Paths start with `/` (absolute from root)
- ✅ Use exact filename (case-sensitive)
- ✅ Include alt text in square brackets
- ✅ Compress images before committing

---

### Image Best Practices

**Do:**
- ✅ Compress all images (<300KB each)
- ✅ Use descriptive filenames: `salesforce-architecture-diagram.png`
- ✅ Store in article-specific folder
- ✅ Use alt text that describes the image content
- ✅ Reference with absolute paths: `/images/...`

**Don't:**
- ❌ Use spaces in filenames: `my diagram.png`
- ❌ Upload uncompressed RAW images (MBs in size)
- ❌ Use relative paths: `../images/...`
- ❌ Forget alt text (bad for SEO and accessibility)
- ❌ Use generic names: `image1.jpg`, `screenshot.png`

---

## Markdown Formatting Tips

### Emphasis in Content

**Bold for:**
- Key terms on first use
- Important takeaways
- Strong emphasis

**Example:**
```markdown
The **modern data stack** has fundamentally changed how organizations approach analytics.
```

**Italic for:**
- Subtle emphasis
- Foreign words
- Internal thoughts
- Quotes within text

**Example:**
```markdown
This approach requires *rethinking* the entire data architecture.
```

---

### Creating Lists

**When to use bullet lists:**
- Multiple related items
- No specific order
- Quick reference points

**When to use numbered lists:**
- Sequential steps
- Ranked items
- Procedures or processes

**Example - Mixing both:**
```markdown
## Implementation Steps

1. **Assess current state**
   - Review existing data infrastructure
   - Interview key stakeholders
   - Document pain points

2. **Design solution**
   - Choose appropriate tools
   - Create architecture diagram
   - Define success metrics

3. **Execute in phases**
   - Start with pilot project
   - Gather feedback
   - Iterate and expand
```

---

### Using Blockquotes Effectively

**For quotes:**
```markdown
As the CTO mentioned in our kickoff meeting:

> "We need real-time visibility into customer behavior, not yesterday's dashboard."

This became the north star for our analytics transformation.
```

**For key takeaways:**
```markdown
> **Key Insight:** Organizations that treat data as a product, not a byproduct, build more sustainable analytics capabilities.
```

**For callouts:**
```markdown
> **Important:** Always validate data quality before making strategic decisions based on new metrics.
```

---

### Code Snippets

**When to use code blocks:**
- SQL queries
- Python/Java code examples
- Configuration files
- API examples
- Terminal commands

**SQL example:**
```markdown
Here's how you query the data:

```sql
SELECT 
    category,
    COUNT(*) as article_count,
    AVG(reading_time) as avg_time
FROM articles
WHERE publish_date >= '2025-01-01'
GROUP BY category
ORDER BY article_count DESC;
```
```

**Python example:**
````markdown
Process the data with this function:

```python
import pandas as pd

def clean_dataframe(df):
    """Remove nulls and standardize column names."""
    df = df.dropna()
    df.columns = df.columns.str.lower().str.replace(' ', '_')
    return df

result = clean_dataframe(raw_data)
```
````

**Command line:**
````markdown
Run these commands:

```bash
cd /path/to/project
pip install -r requirements.txt
python main.py
```
````

---

## Categories & Tags

### Choosing the Right Category

**Every article must have ONE category.**

#### `analytics-bi`
**Use for:**
- Business Intelligence platforms (Tableau, Power BI, Looker)
- Analytics strategies and frameworks
- Dashboard design
- Reporting best practices
- Data visualization
- Analytics team organization

**Example titles:**
- "Choosing the Right BI Platform for Your Organization"
- "Building Executive Dashboards That Drive Action"
- "The Evolution of Self-Service Analytics"

---

#### `data-strategy`
**Use for:**
- Data architecture and infrastructure
- Modern data stack
- Data governance and quality
- Data warehousing and lakes
- ETL/ELT pipelines
- Data platform selection

**Example titles:**
- "Designing a Scalable Data Architecture"
- "Data Governance Without Bureaucracy"
- "Migrating from On-Prem to Cloud Data Warehouse"

---

#### `salesforce`
**Use for:**
- Salesforce implementation
- CRM strategy
- Salesforce configuration and customization
- Integration patterns
- Specific Salesforce clouds (Sales, Service, Marketing)
- Apex, Lightning, Flow

**Example titles:**
- "Salesforce Integration Patterns for Enterprise"
- "Building Custom Lightning Components"
- "Sales Cloud vs Service Cloud: When to Use Which"

---

#### `consulting-insights`
**Use for:**
- Client engagement stories (anonymized)
- Consulting methodologies
- Transformation projects
- Change management
- Stakeholder management
- Lessons learned
- Industry observations

**Example titles:**
- "Why Digital Transformations Fail (And How to Prevent It)"
- "Managing Stakeholder Expectations in Analytics Projects"
- "5 Lessons from My First Year as an Independent Consultant"

---

### Using Tags Effectively

**Tags are cross-category topics.**

**Strategy:**
- Use 3-6 tags per article
- Mix broad and specific tags
- Be consistent (reuse tags across articles)
- Think: "What would someone search for?"

**Good tag examples:**
```yaml
# Broad + Specific:
tags: [analytics, real-time data, apache kafka, streaming]

# Technology + Concept:
tags: [salesforce, integration, rest api, middleware]

# Domain + Application:
tags: [retail analytics, customer behavior, predictive models]
```

**Tag naming conventions:**
- Lowercase
- Multi-word: Use hyphens `real-time-analytics`
- Technologies: Use proper names `Apache Kafka`, `Salesforce`, `Python`
- Concepts: Be specific `data-governance` not just `governance`

---

## Article Structure Best Practices

### Recommended Outline

```markdown
---
[Front matter]
---

## Introduction (2-3 paragraphs)
- Hook: Why this matters
- Context: Set the stage
- Promise: What reader will learn

## Background / Problem (Optional)
- Explain the challenge
- Provide context

## Main Content (3-5 sections)
### First Major Point
Content...

### Second Major Point
Content...

### Third Major Point
Content...

## Practical Application / Implementation
- How to apply these insights
- Step-by-step guidance
- Real-world examples

## Conclusion (1-2 paragraphs)
- Summarize key points
- Call to action or next steps
- Forward-looking statement
```

### Article Length Guidelines

**Short articles (500-800 words):**
- Quick insights
- Single-topic deep dives
- Tool reviews
- Best practices lists

**Medium articles (800-1500 words):**
- Most common length
- Good depth without overwhelming
- Case studies
- How-to guides

**Long articles (1500-3000 words):**
- Comprehensive guides
- Multi-faceted topics
- Thought leadership pieces
- Research-based content

**Reading time calculation:**
- ~200 words per minute
- 1000 words ≈ 5 min read
- 1500 words ≈ 7-8 min read

---

## Advanced Formatting

### Nested Lists

```markdown
1. **First main point**
   - Supporting detail A
   - Supporting detail B
     - Sub-detail 1
     - Sub-detail 2
   - Supporting detail C

2. **Second main point**
   - Another set of details
```

---

### Complex Blockquotes

```markdown
> **Key Takeaway**
> 
> The most successful analytics transformations start with clear business objectives, not technology selection. Organizations that lead with "We need Snowflake" rather than "We need to reduce time-to-insight" often struggle.
```

---

### Combining Code and Explanation

````markdown
The query uses a window function for running totals:

```sql
SELECT 
    date,
    revenue,
    SUM(revenue) OVER (
        ORDER BY date 
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) as running_total
FROM daily_sales;
```

Breaking this down:
- `SUM(revenue) OVER (...)` creates the window function
- `ORDER BY date` ensures chronological calculation
- `ROWS BETWEEN...` defines the window frame
````

---

### Creating Visual Breaks

**Section divider:**
```markdown
---

New major section starts here.
```

**Emphasis break (three asterisks):**
```markdown
* * *

Visual pause in content.
```

---

## Full Article Example

````markdown
---
layout: post
title: "Why Data Governance Fails in Most Organizations"
date: 2026-01-20
category: data-strategy
tags: [data governance, data quality, organizational change, best practices]
excerpt: "Data governance initiatives fail 70% of the time. Here's why, and how to be in the 30% that succeed."
image: /images/posts/2026-01-20-data-governance-fails/hero.jpg
---

## The Uncomfortable Truth

Most data governance programs fail. Not "underperform" or "take longer than expected." **Fail.** As in, three years and millions of dollars later, data quality is no better, compliance gaps remain, and the governance council has stopped meeting.

I've seen this pattern across industries—healthcare, financial services, retail, technology. The specifics differ, but the failure modes are remarkably consistent.

## Why Governance Initiatives Struggle

### They Start with Policies, Not Problems

![Governance framework diagram](/images/posts/2026-01-20-data-governance-fails/framework.png)

The typical approach:

1. Hire a data governance consultant
2. Create a comprehensive framework
3. Write extensive policies and procedures
4. Form a governance council
5. Wonder why no one follows the policies

The issue? **No one wakes up excited about policies.** They wake up frustrated about:

- Unreliable reports that contradict each other
- Customer data spread across 47 systems
- Compliance audits that reveal gaps
- Decisions delayed waiting for "clean" data

Start with these problems, not abstract frameworks.

### They Treat Governance as IT's Job

> **Reality Check:** Data governance is a business problem that requires technical solutions, not a technical problem that business happens to care about.

When governance lives in IT:
- Business teams see it as red tape
- Compliance becomes a checkbox exercise
- Real data quality issues go unaddressed
- Governance team lacks authority

**Better approach:** Business owns governance, IT enables it.

### They Aim for Perfection

I worked with a client who spent 18 months defining their "master data model" before attempting implementation. Meanwhile, their sales and support teams were using different customer databases, causing real business problems daily.

Perfect is the enemy of good in data governance.

## What Actually Works

### Start Small and Specific

Pick ONE critical business process that's broken because of data issues.

Examples:
- Customer onboarding takes 3 weeks because systems don't sync
- Finance can't close books without manual reconciliation
- Compliance can't trace data lineage for audits

Fix that ONE thing. Document what you learn. Expand from there.

### Make Governance Valuable, Not Burdensome

Good governance should make people's jobs **easier**, not harder.

**Bad governance:**
```
Submit data dictionary request → Wait for approval → 
Attend governance meeting → Wait for another meeting → 
Get dictionary 6 weeks later
```

**Good governance:**
```
Search data catalog → Find table with good documentation → 
Use immediately → Flag quality issues → 
Automated alerts improve data over time
```

### Measure What Matters

Don't measure:
- Number of policies written
- Governance meetings held
- People "trained" on governance

Measure:
- Data quality incidents (trending down?)
- Time to resolve data issues (getting faster?)
- Compliance gaps (closing?)
- Business decisions delayed by data problems (decreasing?)

## The Path Forward

Data governance succeeds when it:

1. Solves real business problems
2. Lives where the business is (not in IT)
3. Starts small and proves value
4. Makes work easier, not harder
5. Measures business outcomes, not process compliance

Start with your biggest pain point. Build governance around solving it. Let success breed expansion.

The 30% who succeed don't have better frameworks. They have better focus.

---

*Working on a data governance initiative? [Let's connect](https://linkedin.com/in/vijay-chandra-atheli) to discuss strategies.*
````

---

## Publishing Checklist

### Before Committing

- [ ] Front matter complete and valid YAML
- [ ] Title is clear and under 60 characters
- [ ] Date is correct format (YYYY-MM-DD)
- [ ] Category matches one of four options exactly
- [ ] Tags are relevant and consistent with past articles
- [ ] Excerpt is 100-160 characters
- [ ] Featured image exists and is compressed
- [ ] All inline images exist and paths are correct
- [ ] No spelling/grammar errors (run through Grammarly or similar)
- [ ] Markdown syntax is correct (headings, lists, links)
- [ ] Code blocks specify language
- [ ] Alt text added to all images

### After Pushing

- [ ] Wait 2 minutes for GitHub Pages to build
- [ ] Visit article URL and verify it looks correct
- [ ] Check on mobile device (or browser mobile view)
- [ ] Test dark mode toggle
- [ ] Verify images load
- [ ] Check category page shows new article
- [ ] Verify homepage shows in "Latest Articles"
- [ ] Test all links in article

---

## Updating Existing Articles

### Fix Typos or Errors

```bash
# 1. Open the article file
code _posts/2025-12-28-article-name.md

# 2. Make changes

# 3. Commit with descriptive message
git add _posts/2025-12-28-article-name.md
git commit -m "Fix typo in 'Article Name'"
git push origin master
```

### Major Content Updates

**Update the date in front matter** if significantly changed:

```yaml
---
title: "Original Title"
date: 2025-12-28       # Original
updated: 2026-02-15    # Add this line for major updates
---
```

**Note in article:**
```markdown
*Updated February 15, 2026: Added section on new Salesforce features.*
```

---

### Unpublishing an Article

**Option 1: Delete permanently**
```bash
git rm _posts/2025-12-28-article-to-remove.md
git commit -m "Remove article: Article Name"
git push
```

**Option 2: Rename to draft (won't publish)**
```bash
# Rename without date prefix
mv _posts/2025-12-28-article.md _posts/draft-article.md

git add .
git commit -m "Move article to draft"
git push
```

---

## Git Workflow

### Daily Publishing Routine

```bash
# Check current status
git status

# Pull latest changes (if working from multiple computers)
git pull origin master

# Create new article
touch _posts/2026-01-15-my-article.md

# Write content...

# Stage all changes
git add .

# Commit with message
git commit -m "New article: My Article Title"

# Push to GitHub
git push origin master

# Verify deployment
# Go to: https://github.com/VijayChandraAtheli/vijaychandraatheli.com/actions
# Check for green checkmark
```

### Commit Message Best Practices

**Good commit messages:**
```
New article: The Future of Real-Time Analytics
Fix typo in Salesforce integration article
Update About page with recent experience
Add images to data governance article
Feature: Enable comments on articles
```

**Bad commit messages:**
```
Update
Fixed stuff
asdf
Changes
```

---

## Updating Featured Posts

**Edit `_config.yml`:**

```yaml
featured_posts:
  - "2026-01-20-data-governance-fails"      # Newest/best
  - "2026-01-10-salesforce-integration"     # Second choice
  - "2025-12-28-welcome-to-my-journal"      # Third choice
```

**Rules:**
- Use exact filename (with date, without `.md`)
- Order matters (shows in this order)
- Maximum 3 posts recommended
- Update monthly with your best work

**After editing:**
```bash
git add _config.yml
git commit -m "Update featured articles"
git push
```

---

## Writing Tips for Technical Content

### Make It Scannable

**Use:**
- Short paragraphs (3-5 sentences)
- Descriptive headings
- Bullet lists for multiple points
- Bold for key terms
- Blockquotes for takeaways

**Example of scannable content:**
```markdown
## The Three-Phase Approach

**Phase 1: Assessment**

Start by understanding current state. Interview stakeholders, map existing data flows, and document pain points.

Key activities:
- Stakeholder interviews (5-10 people)
- Process documentation
- Pain point inventory

**Phase 2: Design**

Create the target architecture. Choose tools, define processes, set success metrics.

**Phase 3: Implementation**

Execute in sprints. Start small, prove value, expand.
```

---

### Balance Depth and Accessibility

**For technical topics:**
- Explain concepts before diving into details
- Use analogies for complex ideas
- Provide context before jargon
- Link to external resources for deeper dives

**Example:**
```markdown
## Understanding Stream Processing

Think of stream processing like a factory assembly line, but for data. Instead of waiting for a batch of parts to arrive (batch processing), workers handle each item as it arrives (stream processing).

In technical terms, stream processing systems like Apache Kafka process events in real-time as they're generated, rather than collecting them and processing periodically.

For a deep dive into Kafka's architecture, see the [official documentation](https://kafka.apache.org/documentation/).
```

---

### Use Real Examples

**Instead of:**
> "Organizations should implement data quality checks."

**Write:**
> "Before loading customer data into Salesforce, we added validation rules: email format checks, duplicate detection, and mandatory field verification. This reduced data errors by 67% in the first month."

**Specific beats generic.**

---

## Common Markdown Mistakes to Avoid

### ❌ Wrong: Missing blank lines

```markdown
## Heading
Next paragraph starts immediately (renders as same block!)
```

### ✅ Correct: Blank lines separate blocks

```markdown
## Heading

New paragraph starts here (properly separated).
```

---

### ❌ Wrong: Inconsistent heading levels

```markdown
## Main Section
#### Skipped H3 (wrong hierarchy!)
```

### ✅ Correct: Sequential hierarchy

```markdown
## Main Section
### Subsection
#### Detail point
```

---

### ❌ Wrong: Inline HTML (avoid)

```markdown
<div class="custom">HTML in markdown</div>
```

### ✅ Correct: Use markdown features

```markdown
> Use blockquotes for callouts
**Use bold for emphasis**
```

---

## Image Guidelines (Detailed)

### Recommended Image Sizes

| Image Type | Dimensions | Max Size | Format |
|------------|------------|----------|--------|
| Featured (hero) | 1200x720px | 300KB | JPG |
| Inline photo | 1200px wide | 250KB | JPG |
| Diagram/chart | 1200px wide | 150KB | PNG |
| Screenshot | Actual size | 200KB | PNG |
| Icon/small | 400px | 50KB | PNG/SVG |

### Image Compression Tools

**Online:**
- TinyPNG.com - Excellent compression, maintains quality
- Squoosh.app - Control compression level, see before/after
- CompressJPEG.com - Batch processing

**Desktop:**
- Photoshop: "Save for Web"
- GIMP: Export with quality slider
- ImageOptim (Mac) - Drag and drop

**Command line:**
```bash
# JPG compression (requires imagemagick)
convert input.jpg -quality 85 -resize 1200x output.jpg

# PNG compression (requires optipng)
optipng -o5 input.png
```

### Creating Featured Images

**Tools:**
- Canva - Templates, easy to use
- Figma - Professional design tool
- Photoshop - Full control
- Unsplash - Free stock photos

**Template size:** 1200x720px

**Design tips:**
- Simple, bold compositions
- High contrast text (if adding text overlay)
- Related to article topic
- Professional, not clip-art
- Consistent style across articles

**Free photo sources:**
- Unsplash.com - High-quality, free
- Pexels.com - Curated photos
- Pixabay.com - Large library

---

## Videos & Embeds

### Embedding YouTube Videos

**You cannot embed videos directly in Markdown/Jekyll.**

**Options:**

**Option 1: Link to video**
```markdown
Watch my explanation: [Data Pipeline Architecture](https://youtube.com/watch?v=xyz123)
```

**Option 2: Screenshot + link**
```markdown
[![Video thumbnail](/images/posts/2026-01-15-article/video-thumb.jpg)](https://youtube.com/watch?v=xyz123)

*Click to watch the full explanation on YouTube*
```

**Option 3: Add HTML (advanced)**
```html
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe src="https://www.youtube.com/embed/xyz123" 
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
          frameborder="0" 
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
  </iframe>
</div>
```

**Recommendation:** Link to videos, don't embed (keeps page fast)

---

## Updating Your Bio

**File:** `pages/about.md`

**Structure:**
```markdown
---
layout: page
title: About Me
subtitle: Business Analyst | Consultant | Technology Strategist
permalink: /about/
---

## Background

2-3 paragraphs about your experience...

## What I Write About

### Business Intelligence & Analytics
Description...

### Data Strategy & Architecture
Description...

### Salesforce
Description...

### Consulting Insights
Description...

## Connect

- **LinkedIn:** [Profile](https://linkedin.com/in/your-profile)
- **GitHub:** [Projects](https://github.com/VijayChandraAtheli)
- **Email:** [athelivijay17@gmail.com](mailto:athelivijay17@gmail.com)
```

**Update when:**
- Change jobs/roles
- Gain new certifications
- Major projects completed
- Contact info changes

---

## Common Questions

### How do I schedule a post for future publication?

**Use a future date:**
```yaml
date: 2026-02-01  # Article won't show until Feb 1, 2026
```

Jekyll automatically hides future-dated posts until that date.

---

### How do I create a draft?

**Option 1: Use `_drafts` folder**
```bash
mkdir _drafts
touch _drafts/work-in-progress.md
# No date needed in filename
# Won't publish until moved to _posts
```

**Option 2: Use future date**
```yaml
date: 2099-12-31  # Far future = draft
```

---

### Can I edit articles after publishing?

**Yes!** Just edit the file and push:

```bash
# Edit the file
code _posts/2025-12-28-article.md

# Commit and push
git add _posts/2025-12-28-article.md
git commit -m "Update article: add new section on X"
git push
```

**Changes appear in 1-2 minutes.**

---

### How do I change the site tagline?

**Edit `_config.yml`:**
```yaml
tagline: New Tagline Here
```

**Commit and push.** Appears site-wide instantly.

---

### How do I add a new page (not an article)?

**Create in `pages/` folder:**
```markdown
---
layout: page
title: Services
subtitle: How I Can Help
permalink: /services/
---

Your content here...
```

**Add to navigation in `_config.yml`:**
```yaml
navigation:
  - title: "Services"
    url: "/services/"
```

---

## Quick Reference

### File Naming Cheat Sheet

```
Articles: YYYY-MM-DD-slug.md
Images: descriptive-name.jpg (lowercase, hyphens)
Folders: lowercase-with-hyphens/
```

### Front Matter Template

```yaml
---
layout: post
title: "Article Title"
date: YYYY-MM-DD
category: [analytics-bi | data-strategy | salesforce | consulting-insights]
tags: [tag1, tag2, tag3]
excerpt: "Short description"
image: /images/posts/YYYY-MM-DD-slug/hero.jpg
---
```

### Markdown Quick Reference

```markdown
## Heading 2
### Heading 3

**Bold text**
*Italic text*

[Link](https://url.com)
![Image](/path/to/image.jpg)

- Bullet list
1. Numbered list

> Blockquote

`inline code`

```language
code block
```

---
```

### Git Commands

```bash
git status           # Check what changed
git add .            # Stage all changes
git commit -m "msg"  # Commit with message
git push             # Push to GitHub
git log --oneline    # See recent commits
git diff             # See what changed
```

---

## Support & Resources

### If Something Breaks

1. **Check GitHub Actions** - See build errors
2. **Revert last commit** - `git revert HEAD`
3. **Validate YAML** - Use yamllint.com
4. **Test locally** - `bundle exec jekyll serve`
5. **Check browser console** - F12 for JavaScript errors

### Learning Resources

**Markdown:**
- https://www.markdownguide.org/
- https://commonmark.org/help/

**Jekyll:**
- https://jekyllrb.com/docs/
- https://jekyllrb.com/docs/posts/

**Git:**
- https://git-scm.com/book/en/v2
- https://learngitbranching.js.org/

---

**Happy writing! 📝**

*For technical details, see DEVELOPER_GUIDE.md*