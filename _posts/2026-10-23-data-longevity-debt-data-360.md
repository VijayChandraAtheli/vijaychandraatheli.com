---
layout: post
title: "Data Longevity Debt: Building trust in the Era of Data 360"
subtitle: "How historical data, identity resolution, and governance shape trusted customer profiles and better business decisions."
date: 2026-10-23
category: data-strategy
tags: [salesforce data 360, data longevity debt, data quality, identity resolution, data governance, data architecture]
excerpt: "Salesforce Data 360 brings fragmented enterprise data together. Explore how data history, identity resolution, and governance help turn unified customer profiles into trusted insights and meaningful business outcomes."
image: /images/posts/2026-10-23-data-longevity-debt-data-360/hero.jpg
---

Salesforce Data 360 is often introduced through its end state: connect fragmented customer data, harmonize it into a common model, resolve identities, calculate insights, build segments, and activate those insights across the business.

That sequence is technically correct. It is also where organizations can underestimate the hardest part of the implementation.

The difficult question is rarely whether the platform can connect the data. The difficult question is whether the organization can explain what the connected data actually means.

Consider a national consumer brand preparing its first Data 360 use case. The business wants to identify customers showing strong product interest online, combine that behavior with purchase and service history, and personalize the next interaction.

The source landscape might look like this:

| Source | What it knows about Emily Carter |
| --- | --- |
| Salesforce CRM | Emily Carter, Contact `003-A91`, personal email, Customer = Yes |
| Commerce platform | Emily Carter, Customer `C-10482`, recent purchases, shipping address |
| Marketing Cloud Personalization | Visitor `web-72C91`, 18 product views, 3 cart additions, 2 return sessions |
| Loyalty platform | E. Carter, Member `L-77821`, Status = Active, preferred store |
| Legacy warehouse | EMILY J CARTER, Customer `A91`, old address, historical transactions |

Nothing here is obviously broken. Every system may be functioning exactly as designed.

The problems appear when the organization asks Data 360 to treat those records as parts of the same customer story.

Does `A91` in the legacy warehouse relate to `003-A91` in CRM, or is the similarity meaningless? Does `Customer = Yes` in CRM mean the same thing as `Status = Active` in the loyalty platform? One may indicate that Emily has purchased before, while the other may mean her loyalty membership had activity within a defined period.

Can `web-72C91` be confidently connected to Emily after she identifies herself? If Emily shares an email address with another household member, should both records become one unified individual? Which address is current, and which source owns that answer?

This is where Data 360 readiness begins: not at the connector, but at the meaning accumulated behind the data.

## The Data Is Not Always Dirty. Sometimes It Is Carrying History.

Data quality conversations often reduce enterprise data into two categories: clean and dirty.

That misses a more difficult class of problems. Data can be accurate, complete, and valid according to the rules of a source system while still being unsafe to interpret in a new context.

Emily's old address may have been correct when it was captured. Her loyalty status may be current. Her CRM email may be valid. Her web behavior may accurately describe a browser session. Each record can be locally correct while the combined interpretation is wrong.

This becomes more important as data ages because business definitions rarely remain static.

Suppose the legacy warehouse has contained a field called `Active_Customer` since 2018. From 2018 through 2021, "active" meant a purchase within the previous 24 months. In 2022, it changed to an open loyalty account. In 2025, another team reused the same field for customers eligible for an engagement program.

Every historical value may have been populated correctly. No record is necessarily corrupt or duplicated. Yet an eight-year trend treating `Active_Customer` as one consistent concept is analytically wrong because the meaning changed while the column name survived.

I think of this as **data longevity debt**: the accumulated gap between what data meant when it was created and what the organization assumes it means today.

The longer a data asset lives, the more opportunities there are for definitions, owners, systems, and business rules to change around it. A field can remain technically valid while becoming semantically unstable.

That matters in Data 360 because harmonization creates a common structure, and a common structure can make information look more consistent than it really is.

## DLO to DMO Mapping Is Not Just Field Mapping

When data is ingested into Data 360, source-oriented records are represented in Data Lake Objects. Harmonization then maps those source structures into Data Model Objects that represent shared business concepts.

On the surface, this can look like a schema exercise.

But consider three fields:

`Customer_Status = Active`

`Loyalty_Status = Current`

`Account_State = 1`

Should all three map into the same standardized customer-status attribute?

Maybe. But the answer cannot be derived from the field names alone.

The first may indicate purchase recency. The second may indicate membership standing. The third may simply indicate that an account record has not been closed. Mapping them together because they look similar would create a clean technical model containing an ambiguous business concept.

The same problem appears with measures. Suppose one source reports Emily's lifetime value as `$4,800`, another reports `$3,950`, and a third reports `$5,200`. Investigation may show that one includes merchandise only, one excludes refunds, and one includes service-plan revenue and household purchases.

None of the values is necessarily wrong. They answer different questions.

Harmonization is therefore a decision about whether two pieces of data are equivalent enough to participate in the same business concept. If that decision is wrong, calculated insights, segments, activations, reporting, and AI experiences can all inherit the mistake.

A technically successful mapping can create a very convincing version of the wrong truth.

## Keys Have Context Too

Identifiers create a similar problem.

Suppose two source systems both contain customer ID `A91`. It is tempting to join them, especially when teams have spent years treating fields named `Customer_ID` or `Member_ID` as though the names themselves guaranteed uniqueness.

They do not.

An identifier is unique only within the namespace in which it was designed to be unique.

This is where Fully Qualified Keys matter in Data 360. Key qualifiers allow Data 360 to distinguish source keys that may contain the same raw value after multiple data streams are harmonized into shared DMOs.

Conceptually:

`A91 + LegacyWarehouse`

is different from:

`A91 + LoyaltyPlatform`

until the organization has a defensible reason to relate them.

The downstream effect of getting this wrong can be significant. An incorrect key relationship can attach an order to the wrong person. That order can alter a calculated insight, the insight can change segment eligibility, and the segment can drive an activation.

Before trusting a field called `Customer_ID`, I would want to know how it was generated, whether it is unique only within one source, whether it can be reused, and what entity it actually identifies.

A person, household, account, browser, membership, and subscription are not interchangeable simply because they all have IDs.

## Identity Resolution Is a Classification Problem

Identity resolution is one of the most valuable capabilities in Data 360, but it is also where source-data assumptions become visible quickly.

Every match rule is effectively answering a classification question:

**Should these two records be treated as the same person?**

That decision produces four possible outcomes.

| Reality \ Identity Decision | Data 360 Matches the Profiles | Data 360 Keeps the Profiles Separate |
| --- | --- | --- |
| **They are the same person** | **True Positive** — correct match | **False Negative** — false split |
| **They are different people** | **False Positive** — false merge | **True Negative** — correct separation |

The true-positive and true-negative quadrants are the desired outcomes. The two error quadrants are where the business risk begins.

![Identity-resolution matrix: true positive (correct match), false negative (false split), false positive (false merge), and true negative (correct separation), showing the impact of mistakes on profiles, insights, segments, and activation.](/images/posts/2026-10-23-data-longevity-debt-data-360/identity-resolution-outcomes.png)

*Figure: Matching errors propagate downstream. A false merge blends different people; a false split fragments one person across records.*

### False Positive: The False Merge

A false positive occurs when two different people are incorrectly unified.

Suppose Emily and another household member share:

`carterfamily@example.com`

If the identity strategy relies too heavily on email, their profiles could be clustered together.

The problem is no longer just an incorrect profile count. The unified profile can now combine purchases, preferences, service interactions, browsing behavior, and contact points belonging to different people.

The error can then escalate:

**Incorrect match → incorrect unified profile → incorrect calculated insight → incorrect segment membership → incorrect activation**

If the combined profile appears to have higher lifetime value or stronger product intent, Emily may qualify for a segment because someone else's behavior was added to hers.

In a low-risk retail use case, that may create an awkward experience. In financial services, healthcare, insurance, or other privacy-sensitive contexts, a false merge can create much greater risk because one person's information may influence an action toward another.

### False Negative: The False Split

A false negative creates the opposite problem.

Emily Carter in CRM and Emily J. Carter in commerce are actually the same person, but the rules fail to connect them because the emails differ and one phone number is outdated.

Now one customer survives as two profiles.

Her purchases may sit under one profile while browsing behavior sits under another. Lifetime value is understated. Marketing can treat an existing customer like a prospect. Two profiles may qualify for the same campaign. Attribution becomes fragmented because engagement and purchase are never connected.

The downstream path becomes:

**Missed match → fragmented profile → incomplete insight → missed or duplicated segment → weak activation**

False negatives tend to hurt completeness, analytics, personalization, attribution, and customer experience. False positives often carry a higher privacy or inappropriate-disclosure risk.

Both matter, but they fail differently.

## Consolidation Rate Is Not Identity Quality

Data 360 exposes a consolidation rate showing how source profiles were reduced into unified profiles.

It is useful.

It is not a measure of truth.

If 100 source profiles become 70 unified profiles, the rate tells us that records were combined. It does not tell us whether the combinations were correct.

A higher rate could mean better identity resolution. It could also mean match rules became too permissive. A lower rate could indicate weak matching, or it could reflect a deliberately conservative strategy designed to avoid false merges.

The right rate depends on the data, use case, and cost of being wrong.

A useful identity review should therefore inspect real matched clusters, known household cases, shared contact points, and samples designed specifically to find false merges and false splits.

The better question is not:

> How many profiles did we unify?

It is:

> How confidently can we defend the profiles we unified?

## A Unified Profile Is Not Automatically a Golden Record

The phrase *unified profile* can create another misconception: that Data 360 produces one perfect customer record that replaces contradictions across source systems.

That is not what identity resolution does.

The unified profile links source records determined to belong to the same entity. Data 360 preserves those relationships, while reconciliation rules can determine which value is surfaced for fields that require a selected value.

Return to Emily's address.

CRM contains her previous address. Commerce contains the address from her most recent shipment. Loyalty contains the address entered when she joined.

A reconciliation rule might prioritize commerce because recent fulfillment data is generally more current. But configuring source priority does not prove that the commerce value is universally correct. Emily may have shipped a gift somewhere else.

The technology can execute a precedence rule. It cannot decide the business meaning of the field on the organization's behalf.

Different systems may legitimately own different facts. Commerce may own fulfilled-order history. CRM may own service relationships. A preference center may own communication preferences. Marketing Cloud Personalization may own recent digital behavior. Loyalty may own membership status.

The enterprise may not need one system to "win the customer." It may need **attribute-level authority**.

That is a governance model, not just a reconciliation setting.

## Zero Copy Removes Movement, Not Interpretation

The same distinction applies to zero-copy data federation.

Federation can allow Data 360 to work with information stored externally without requiring every row to be duplicated into another storage layer. That can be valuable for large datasets.

But zero copy solves a movement problem.

It does not solve a meaning problem.

Suppose the organization federates digital interaction data containing:

`visitor_id`

`event_type`

`page_category`

`event_timestamp`

`campaign_id`

The data may remain outside Data 360, but the organization still needs to know whether visitor IDs persist across devices, when anonymous behavior can be connected to a known customer, how timestamps are standardized, whether bot traffic was removed, and whether the definition of `product_view` changed after a website redesign.

Federation changes where the data is processed. It does not remove the need to understand the data.

The same logic should guide scope. If the first use case needs 30 days of digital behavior, years of history may add complexity without improving the decision.

The better architectural question is not "How much data can Data 360 access?"

It is "Which data is necessary to support this decision?"

## Identity Errors Become More Expensive After Activation

Identity resolution sits upstream of systems that can act.

Once profiles are unified, organizations may calculate metrics, build segments, personalize experiences, trigger flows or data actions, enrich CRM, or activate audiences downstream.

The path looks like this:

**Source data → DLO → DMO → identity resolution → unified profile → calculated insight → segment → activation**

Every stage assumes the previous stage was sufficiently correct for the next decision.

If two people were falsely merged, calculated insights can aggregate their behavior. Segment criteria can evaluate that combined profile. Activation can carry the mistake into a customer-facing channel.

If one person was falsely split, insights can understate the relationship. A valuable customer may miss a loyalty segment while another fragment receives acquisition messaging.

Real-time processing can increase the consequence because speed reduces the time between a bad identity decision and a downstream action. Faster architecture does not make the decision more accurate; it simply allows the outcome to travel more quickly.

The acceptable error rate should therefore be driven by the activation.

A false split in exploratory analytics may be tolerable while match rules are refined. A false merge that can influence regulated communication may not be.

Identity resolution should be designed backward from business consequence, not forward from whichever fields happen to be available.

## Governance Begins Where Configuration Stops

At some point, every Data 360 implementation reaches questions the platform cannot answer.

What exactly qualifies someone as active? Which source owns legal name? Which address should be used for which purpose? How long should behavioral history remain relevant? Which identifiers are reliable enough for matching? What false-positive risk is acceptable? Who approves changes to an identity rule after downstream activations depend on it?

These are governance decisions.

Data 360 provides technical mechanisms to support governance: data spaces, lineage, classifications, policies, masking, reconciliation rules, identity rules, and access controls.

But configuration cannot replace ownership.

The platform can enforce a rule only after the organization has decided what that rule should be.

Different teams can maintain high-quality data inside their own workflows while the enterprise still lacks a shared definition for the attributes that matter across Sales, Marketing, Service, and Commerce.

Connecting the systems exposes those disagreements. Resolving them requires business ownership.

## A Practical Data 360 Readiness Sequence

I would not begin a Data 360 implementation by asking every team which systems they want connected.

I would begin with the decision the business wants to improve, then work backward through the data required to support it.

| Stage | Question to answer |
| --- | --- |
| **1. Business decision** | What specific decision or experience are we trying to improve? |
| **2. Source selection** | Which datasets are actually necessary? |
| **3. Semantic review** | What do critical fields mean, and has that meaning changed over time? |
| **4. Ingestion or federation** | Should the data be ingested or federated, and why? |
| **5. Harmonization** | Which source attributes truly represent the same DMO concepts? |
| **6. Keys and relationships** | What does each identifier represent, and where are FQKs required? |
| **7. Identity design** | What evidence is enough to match, and what are the costs of false merges and splits? |
| **8. Reconciliation** | Which sources are authoritative for which attributes and use cases? |
| **9. Insights and segmentation** | Do calculated metrics and segments still make sense against real unified profiles? |
| **10. Activation controls** | What action can the data influence, and what quality risk is acceptable? |
| **11. Monitoring** | How will source drift, semantic changes, and match-quality deterioration be detected? |

This order matters because downstream sophistication cannot compensate for upstream ambiguity.

A well-designed segment does not fix an incorrect DMO mapping. A real-time activation does not fix a false merge. A calculated insight does not fix a metric whose definition changed halfway through the historical period.

## Data 360 Readiness Is Really Decision Readiness

The strongest Data 360 implementations are not the ones that connect the most systems first. They are the ones that can defend the path from source data to business action.

For every important activation, the organization should be able to explain where the underlying data came from, what the critical fields mean, how identities were matched, which values were reconciled, how fresh the data needs to be, and what happens when those assumptions are wrong.

That is why data longevity debt matters.

Enterprise data rarely becomes unreliable because every source suddenly starts producing garbage. More often, perfectly reasonable systems evolve under different teams, definitions, and time periods until the enterprise can no longer assume that similarly named fields or identifiers describe the same thing.

Data 360 makes those inconsistencies visible because it asks the organization to connect them. That visibility is not a weakness of the platform. It is one of the reasons the platform can be valuable.

But it changes the responsibility of the implementation team.

The goal is not simply to create a unified profile. The goal is to create a profile whose identity, attributes, history, and downstream use can be explained and defended.

Salesforce can provide the architecture to connect records, harmonize models, resolve identities, calculate insights, build segments, and activate data.

The organization still has to supply the meaning.

And the quality of that meaning determines the quality of every decision that follows.

---

## References

- [Salesforce Architects: Data 360 Architecture](https://architect.salesforce.com/docs/architect/fundamentals/guide/data-360-architecture)
- [Salesforce Help: Connect Data in Data 360](https://help.salesforce.com/s/articleView?id=data.c360_a_data_ingestion.htm&language=en_US&type=5)
- [Salesforce Help: Fully Qualified Keys](https://help.salesforce.com/s/articleView?id=data.c360_a_fully_qualified_keys.htm&language=en_US&type=5)
- [Salesforce Help: Best Practices for Fully Qualified Keys](https://help.salesforce.com/s/articleView?id=data.c360_a_key_qualifier_best_practices.htm&language=en_US&type=5)
- [Salesforce Help: Identity Resolution Match Rules](https://help.salesforce.com/s/articleView?id=sf.c360_a_match_rules.htm&language=en_US&type=5)
- [Salesforce Help: Identity Resolution Match Methods](https://help.salesforce.com/s/articleView?id=data.c360_a_match_rules_criteria_fuzzy_normalized.htm&language=en_US&type=5)
- [Salesforce Help: Identity Resolution Ruleset Processing Results](https://help.salesforce.com/s/articleView?id=data.c360_a_resolution_summary.htm&language=en_US&type=5)
- [Salesforce Help: Reconciliation Rules for Unified Individuals](https://help.salesforce.com/s/articleView?id=data.c360_a_omni_reconciliation.htm&language=en_US&type=5)
- [Salesforce Help: Zero Copy Data Federation](https://help.salesforce.com/s/articleView?id=data.c360_a_file_federation.htm&language=en_US&type=5)
