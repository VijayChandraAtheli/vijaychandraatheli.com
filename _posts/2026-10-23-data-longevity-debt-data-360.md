---
layout: post
title: "Data Longevity Debt: Building Trust in the Era of Data 360"
subtitle: "Why technically valid data can lead to the wrong customer decision—and how architects can protect meaning from source to activation."
date: 2026-10-23
category: data-strategy
tags: [salesforce data 360, data longevity debt, data quality, identity resolution, data governance, data architecture]
excerpt: "A unified customer profile is only as trustworthy as the meaning behind its data. Explore historical semantic drift, identity resolution risks, and the architectural controls needed for defensible decisions in Salesforce Data 360."
image: /images/posts/2026-10-23-data-longevity-debt-data-360/hero.jpg
---

A customer profile can be complete and still lead to the wrong decision.

Imagine a national consumer brand preparing to personalize its next interaction with Emily Carter. The marketing team wants to connect her recent product interest with purchase history, loyalty activity, and service interactions. Salesforce Data 360 can help bring these signals together. But before the business decides what to say to Emily, it must establish what those signals actually represent.

The source landscape looks familiar:

| Source | What it knows about Emily Carter |
| --- | --- |
| Salesforce CRM | Emily Carter, Contact `003-A91`, personal email, `Customer = Yes` |
| Commerce platform | Emily Carter, Customer `C-10482`, recent orders, shipping address |
| MCP | Visitor `web-72C91`, 18 product views, 3 cart additions, 2 return sessions |
| Loyalty platform | E. Carter, Member `L-77821`, `Status = Active`, preferred store |
| Legacy warehouse | EMILY J CARTER, Customer `A91`, previous address, historical transactions |


None of these records is necessarily incorrect. The CRM flag may indicate that Emily has purchased before. The loyalty status may describe whether her membership is in good standing. The web activity belongs to a browser or visitor identifier until there is sufficient evidence to associate it with a known person. And a shipping address may describe the destination of a particular order rather than Emily's home.

Yet the moment these records are brought together, the business is tempted to read them as one consistent customer story. Does `A91` in the warehouse relate to `003-A91` in CRM? Did Emily browse those products, or did someone else use the same device? Does *active* mean the same thing across systems? Which address is appropriate for the next interaction?

These are not connector questions. They are questions about meaning, identity, time, and permissible use. Data 360 can provide the architecture to work across systems, but that architecture makes the answers more consequential—not less.

## When Data Outlives Its Definition

Data quality is often discussed in terms of missing values, duplicates, and invalid formats. Those problems matter, but they do not capture a quieter failure: a value can be correct under the rules that created it and misleading under the rules used to interpret it later.

Consider a field named `Active_Customer` in the legacy warehouse. From 2018 through 2021, the business defined an active customer as someone who had purchased within the previous 24 months. In 2022, the field was repurposed to indicate an open loyalty membership. In 2025, it became an eligibility flag for an engagement program.

The column name remained unchanged. The underlying business question did not.

An analyst looking at eight years of `Active_Customer` values might produce a polished trend showing how the active-customer population changed. The query could execute perfectly, and every source row could be valid, while the trend itself compares three incompatible definitions.

I think of this as **data longevity debt**: the accumulated gap between the meaning data had when it was created and the meaning later systems or teams assume it has. It is not an official Salesforce metric. It is a useful way to describe an architectural liability that grows when definitions change without corresponding documentation, transformation rules, or ownership.

This is different from merely having old data. A 2019 purchase remains useful if its date, currency, customer relationship, and business context are understood. The problem arises when we reuse a historical value as though its definition were timeless.

Repaying that debt may require preserving the definition that applied at the time, separating the three concepts into distinct attributes, or restating historical data under a documented common definition where that is legitimately possible. Without one of those steps, moving the field into a newer platform does not make its history comparable.

## Harmonization Can Standardize Structure Without Standardizing Meaning

In Data 360, data brought in through ingestion is represented in Data Lake Objects (DLOs), and harmonization maps relevant source fields into Data Model Objects (DMOs) that express shared business concepts. Federated sources can also be represented through external or virtual DLOs. The model gives different systems a common language for analysis and activation.

But mapping two fields to the same DMO attribute is a claim about what those fields mean.

Suppose three sources expose:

- `Customer_Status = Active`
- `Loyalty_Status = Current`
- `Account_State = 1`

The names look compatible. Their definitions may not be. One could describe recent purchasing behavior, another membership standing, and the third whether an account record is open. Combining them into a single customer-status attribute might produce a clean-looking model while erasing distinctions that matter to the business.

Measures deserve the same scrutiny. Commerce reports Emily's lifetime value as `$4,800`; finance reports `$3,950`; loyalty reports `$5,200`. The discrepancy may reflect refunds, different revenue components, household-level aggregation, or different time windows. Choosing one figure without resolving those differences is not reconciliation; it is selecting a number before agreeing on the question.

An architect should establish the definition, grain, time period, and source authority of a critical attribute before it becomes a common enterprise concept. For the historical `Active_Customer` example, that also means recording *when* each definition applied. The event timestamp, ingestion timestamp, and effective period of a business rule are not necessarily the same thing.

This requirement does not disappear with zero-copy federation. Data 360 supports query federation, where an external compute engine executes the query, and file federation, where Data 360 can query supported external storage using its own compute. Caching or acceleration may also be used. Those are important design choices for data access, freshness, performance, and cost; none establishes whether `product_view` or `active_customer` has a stable business meaning. [1](#ref-1)[2](#ref-2)

The same discipline applies regardless of how much data the platform can reach: connect the history required for the decision, and be able to explain how that history is interpreted.

## Keys Establish Relationships; They Do Not Establish Identity

The next risk is more mechanical, but no less damaging.

Imagine two systems that both contain `Customer_ID = A91`. Those values may refer to completely different records. An identifier is not universally unique simply because its column is called `Customer_ID`.

Data 360 addresses this kind of collision with **Fully Qualified Keys (FQKs)**. A source key is interpreted together with its key qualifier, so `A91` from the legacy warehouse is distinct from `A91` in the loyalty platform. Appropriate qualifier fields matter for both primary and foreign keys, including the relationships and joins used in calculated insights. [3](#ref-3)

That prevents an avoidable class of incorrect associations. It does not prove that two source records represent the same person.

The distinction is important:

| Question | Architectural responsibility |
| --- | --- |
| Which source namespace does `A91` belong to? | Key qualification and relationship modeling |
| Does legacy customer `A91` refer to Emily Carter in CRM? | Identity resolution and supporting evidence |
| Does an order belong to that source customer record? | Correct source foreign-key relationship |
| Should the order contribute to Emily's lifetime value? | Valid relationships, identity mapping, and the metric's business definition |

A correctly qualified order key can coexist with a bad identity match. Conversely, accurate identity matching cannot repair a transaction joined through the wrong foreign key. These are different controls, and both must hold before a downstream measure can be trusted.

## Identity Resolution Is a Decision With Two Different Failure Modes

Identity resolution takes the challenge beyond field definitions and keys. It evaluates evidence from multiple sources to determine which profiles belong to the same individual or other supported entity.

For each pair of source profiles, there are four possible outcomes when we compare the system's decision against known reality:

| Reality / Identity Decision | Data 360 matches the profiles | Data 360 keeps the profiles separate |
| --- | --- | --- |
| **Same person** | **True positive** — correct match | **False negative** — false split |
| **Different people** | **False positive** — false merge | **True negative** — correct separation |

![Identity-resolution matrix: true positive (correct match), false negative (false split), false positive (false merge), and true negative (correct separation), showing the impact of mistakes on profiles, insights, segments, and activation.](/images/posts/2026-10-23-data-longevity-debt-data-360/identity-resolution-outcomes.png)

*Figure: False merges can mix two people's information; false splits can keep one person's activity fragmented. The severity depends on how the resulting profiles are used.*

### A False Merge Can Make the Profile More Complete—and Less Correct

Suppose Emily and another household member share `carterfamily@example.com`. If a ruleset relies on that email alone, two distinct people could be grouped together. Salesforce cautions against matching on a single shared contact point for precisely this reason. [4](#ref-4)

The resulting unified profile may contain more purchases, browsing activity, contact points, and service history than either individual actually generated. A lifetime-value calculation can be overstated. A recommendation can be based on another person's preferences. In a sensitive context, the mistake can create a risk of exposing or acting on information associated with someone else.

More information in a profile is not the same as more accurate information.

### A False Split Can Hide a Relationship That Already Exists

Now imagine Emily's commerce profile uses a different email address and an outdated phone number. The match rules fail to link it to her CRM profile, even though both represent the same person.

Her purchases remain with one profile while recent browsing sits with another. A campaign may treat an existing customer as a new prospect, or an insight may understate the total relationship because the relevant activity is spread across profiles. This is a completeness failure rather than an over-grouping failure, but it can still distort business decisions.

### Why a Single Matching Rule Is Not the Whole Risk

Identity resolution can also produce **transitive matches**. If profile A matches B under one rule, and B matches C under another, all three can become part of the same unified cluster even if A and C do not directly satisfy a rule together. B acts as the bridge. [5](#ref-5)

That makes cluster-level review essential. A test that only asks whether two familiar records match can overlook an unexpected third record entering through a different rule. Household data, recycled phone numbers, shared addresses, and other ambiguous identifiers are particularly valuable cases to test.

A high consolidation rate does not settle the question either. Salesforce calculates it from the reduction in source profiles to unified profiles. That reports *how much* consolidation occurred, not *whether* the resulting clusters reflect reality. [6](#ref-6)

Match quality should be evaluated using verified samples, known positive and negative cases, and the business consequences of the errors found. The acceptable trade-off may differ between exploratory analytics and an activation that could disclose sensitive information.

## A Unified Profile Is Not a Golden Record

Once Emily's records are linked, a second question appears: which source value should the business use?

Data 360 identity resolution creates unified profiles and retains links back to the source records. It does not replace source systems or function as a traditional master data management system that establishes a single authoritative golden record for every attribute. [7](#ref-7)

Reconciliation rules can select a value for eligible single-valued fields on the unified profile, such as a name. They do **not** reconcile contact-point email addresses, phone numbers, and addresses in the same way; multiple contact points can remain associated with the unified individual. For certain activations, source-priority settings determine which available contact point is selected. [8](#ref-8)

That distinction matters in Emily's address history. CRM has her previous address, commerce has the destination of her latest shipment, and loyalty has an address entered at registration. The commerce address is not automatically the correct residential address: it could be where Emily sent a gift. Fulfillment, service, and marketing may each need a different address-selection policy, backed by the right source attributes and business context.

In other words, identity resolution answers *which records appear to belong together*. Reconciliation and downstream business logic answer *which values are appropriate for a particular purpose*. Neither removes the need for source ownership and governance.

There is a further longevity consideration: a Unified Individual ID is not necessarily immutable. When profiles merge or split following changes in data or matching, some records may become associated with a different unified ID. Integrations that persist that ID as a permanent external customer identifier need a strategy for those changes and for tracing source-to-unified relationships. [9](#ref-9)

A trusted profile is therefore not one in which every attribute has a single winner. It is one in which the relationships, selected values, and limitations are understood.

## The Risk Changes When a Profile Drives an Action

Not every Data 360 use case follows a fixed sequence of identity resolution, calculated insights, segmentation, and activation. Some segments do not require calculated insights, and some use cases do not require unified profiles at all. But in a customer-unification use case like Emily's, those capabilities can form a consequential chain:

**Source records → harmonized model → identity links → customer metrics or attributes → audience decision → customer-facing action**

An upstream mistake can influence more than a dashboard. Suppose a falsely merged profile combines Emily's purchases with a household member's browsing. An insight measuring purchase value or product interest may now be overstated. A segment using that information could select Emily for an offer that makes little sense—or, in a more sensitive environment, could create an inappropriate disclosure risk.

Even a *correctly matched* identity does not make every communication appropriate. A unified individual can have multiple email addresses or phone numbers with different consent and preference histories. Salesforce notes that activation contact-point selection can depend on source priority and engagement behavior rather than automatically enforcing each contact point's consent status. Organizations must design and verify the necessary consent and channel-eligibility controls before activation. [10](#ref-10)

This is why I would test the **activation decision**, not only the matching configuration. For every customer-facing action, ask: Which identity evidence was used? Which attributes determined eligibility? Which contact point was selected? What permission applies to that contact point and purpose? What should happen when the evidence is incomplete or contradictory?

Speed adds a separate consideration. Scheduled and real-time identity resolution do not operate identically; real-time matching uses exact or exact-normalized methods even when the scheduled configuration includes other match methods. Low latency can improve responsiveness, but it should not be mistaken for broader matching coverage or higher certainty. [11](#ref-11)

## Repaying Data Longevity Debt: An Architect's Approach

The solution is not to require perfect data before connecting anything. It is to make the assumptions behind each important decision visible, testable, and owned.

I would begin with one business outcome—say, identifying existing customers who have recently shown product interest but have not purchased. Then I would work backward through the minimum data, relationships, definitions, and controls required to support that outcome.

| Control | What I would establish before activation |
| --- | --- |
| **Business definition history** | Document what *active*, *customer*, *purchase*, and *product view* meant over time, including effective dates and known changes. |
| **Attribute-level ownership** | Identify the authoritative source for each fact and the exceptions that depend on use, such as shipping versus residential address. |
| **Key and relationship integrity** | Verify key qualifiers on relevant primary and foreign keys, relationship cardinality, and joins used in metrics. |
| **Identity quality tests** | Review known matches, known nonmatches, shared contact points, false merges, false splits, and transitive clusters. |
| **Decision and consent controls** | Validate segment logic, metric definitions, contact-point selection, consent, and appropriate behavior when confidence is insufficient. |
| **Change monitoring** | Detect source schema or meaning changes, unexpected consolidation shifts, new bridge clusters, and changes to unified-profile associations. |

These are not six one-time configuration tasks. Source applications change, new data arrives, marketing definitions evolve, and matching rules are adjusted. A use case that passed validation at launch can drift later unless the team knows which assumptions to revisit.

The controls also need different owners. Data engineers can verify the pipelines and joins; an architect can make the relationships and trade-offs explicit; business owners must approve the meaning of *active customer* and the circumstances in which a customer qualifies for outreach; privacy and channel owners must govern permissible use. None of those responsibilities can be delegated entirely to a platform setting.

A useful readiness review should produce evidence, not merely a successful processing status. Can the team reproduce a metric under its documented definition? Can it explain why two source records were unified? Can it show that a selected contact point is eligible for the intended communication? Can it identify which downstream processes need review when a source definition changes?

When the answers are available, the organization can make informed compromises. It may accept a conservative match strategy for a sensitive activation while using a broader, clearly qualified view for non-customer-facing analysis. It may exclude historical records whose definitions cannot be reconstructed rather than silently treating them as comparable. Those decisions are more defensible than assuming a completed pipeline is a trusted pipeline.

## Back to Emily: What a Trusted Decision Looks Like

Return to the original marketing request. Emily has recent browsing activity, several source-system identifiers, a loyalty membership, and a long purchase history. The goal is still to decide whether a personalized interaction would be useful.

A defensible implementation can now explain its choices. The team defines *existing customer* consistently for the relevant period. It qualifies identifiers by source and checks relationships before attributing transactions. It connects anonymous browsing to Emily only when sufficient identity evidence is available. It tests household-sharing scenarios to avoid combining another person's activity with hers. It interprets historical statuses under the definitions that existed when they were recorded. And before communicating, it selects an appropriate contact point and verifies that the intended use is permitted.

Emily's profile may still contain several addresses, incomplete older transactions, or activity that cannot be confidently attributed. That does not make the implementation a failure. The team knows what the profile can support and where it should avoid claiming certainty.

Data 360 makes it possible to bring that evidence together. The architect's responsibility is to preserve the distinctions that allow the business to use it responsibly. When the marketing team can explain **why Emily qualifies, which activity genuinely belongs to her, and which communication she has permitted**, the unified profile has served its purpose—not because it contains everything, but because it supports a decision the business can defend.

---

## References

1. <a id="ref-1"></a> [Salesforce Architects — Data 360 Architecture](https://architect.salesforce.com/docs/architect/fundamentals/guide/data-360-architecture)
2. <a id="ref-2"></a> [Salesforce Help — Zero Copy Data Federation](https://help.salesforce.com/s/articleView?id=data.c360_a_file_federation.htm&language=en_US&type=5)
3. <a id="ref-3"></a> [Salesforce Help — Best Practices for Fully Qualified Keys](https://help.salesforce.com/s/articleView?id=sf.c360_a_key_qualifier_best_practices.htm&language=en_US&type=5)
4. <a id="ref-4"></a> [Salesforce Help — Configure Identity Resolution Match Rules](https://help.salesforce.com/s/articleView?id=data.c360_a_match_rules_configure.htm&language=en_US&type=5)
5. <a id="ref-5"></a> [Salesforce Help — Transitive Match in Identity Resolution](https://help.salesforce.com/s/articleView?id=004811108&language=en_US&type=1)
6. <a id="ref-6"></a> [Salesforce Help — Identity Resolution Ruleset Processing Results](https://help.salesforce.com/s/articleView?id=sf.c360_a_resolution_summary.htm&language=en_US&type=5)
7. <a id="ref-7"></a> [Salesforce Help — Unify Source Profiles](https://help.salesforce.com/s/articleView?id=data.c360_a_identity_resolution_unify_source_profiles.htm&language=en_US&type=5)
8. <a id="ref-8"></a> [Salesforce Help — Identity Resolution Reconciliation Rules](https://help.salesforce.com/s/articleView?id=sf.c360_a_reconciliation_rules.htm&language=en_US&type=5) and [Contact Points and Source Priority Order](https://help.salesforce.com/s/articleView?id=sf.c360_a_contact_points.htm&language=en_US&type=5)
9. <a id="ref-9"></a> [Salesforce Help — Changes to a Unified Individual ID](https://help.salesforce.com/s/articleView?id=000395529&language=en_US&type=1)
10. <a id="ref-10"></a> [Salesforce Help — Omnichannel Considerations and Best Practices](https://help.salesforce.com/s/articleView?id=data.c360_a_omni_best_practices.htm&language=en_US&type=5)
11. <a id="ref-11"></a> [Salesforce Help — Scheduled and Real-Time Matching in Identity Resolution](https://help.salesforce.com/s/articleView?id=data.c360_a_identity_resolution_match_type_compare.htm&language=en_US&type=5)
