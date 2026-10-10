# B4B America — Client Clarification Questions & Inconsistencies Log

This document consolidates all items marked **TBC (To Be Confirmed)**, source document discrepancies, and technical architecture questions for the client's review.

---

## 1. Rank & Promotion Inconsistencies (from Client Document)

In reviewing the client's official 9-Rank Compensation & Promotion rules, the following ambiguities and gaps were identified:

1. **Promotion Rule Repetition for Ranks 7, 8, and 9:**
   - In the source document, Ranks 7 (*Senior Channel VP*), 8 (*National Channel VP*), and 9 (*Senior National Channel VP*) share nearly identical promotional criteria text.
   - **Question:** What are the exact distinct qualification thresholds (e.g., consecutive months, team size, monthly group volume) required to promote from Rank 7 to 8, and from Rank 8 to 9?

2. **Level 2 to Level 3 Promotion Threshold Discrepancy ($4,150 vs. $4,175):**
   - The Level 2 (*Relationship Coordinator II*) monthly commission range is **$3,150 – $4,175**.
   - However, the promotion rule in the client document states: *"3 consecutive months of personal monthly commission of $4,150 or more promotes to Level 3."*
   - Meanwhile, Level 3 (*Senior Executive*) monthly commission begins at **$4,200**.
   - **Question:** Should the qualification threshold be **$4,150**, **$4,175**, or **$4,200**?

3. **Commission Range Gap between Rank 5 and Rank 6:**
   - Rank 5 (*Regional Leader*) monthly commission range is **$8,400 – $14,580**.
   - Rank 6 (*Channel VP*) monthly commission range begins at **$15,500 – $20,850**.
   - **Question:** What happens to a coach earning between **$14,581 and $15,499**? Is the Rank 5 ceiling intended to be $15,499, or is the Rank 6 floor intended to be $14,580?

4. **Commission Range Overlap at $27,085:**
   - Rank 7 ceiling is **$27,085 / month**.
   - Rank 8 floor is **$27,085 / month**.
   - **Question:** Should Rank 8 begin at **$27,086** or **$27,500** to avoid threshold ambiguity?

5. **"Area Manager" Title in Promotion Text:**
   - The promotion narrative refers to an *"Area Manager"* role, but this title does not exist in the official 1–9 Rank Table (which uses *Account Executive*, *Relationship Coordinator II*, *Senior Executive*, *District Leader*, *Regional Leader*, *Channel VP*, *Senior Channel VP*, *National Channel VP*, *Senior National Channel VP*).
   - **Question:** Is *"Area Manager"* an alternative title for *District Leader (Rank 4)*, or a separate operational role?

---

## 2. Subscription & Billing Tier Pricing

- The client document explicitly defined the starting B4B Coach subscription at **$25 / month** (covering Core Ranks 1–3).
- For higher tiers, placeholder prices have been configured and clearly labeled in the Admin editor as *"Price to be confirmed by client"*:
  - **Rank 1–3 (Core Coach):** $25 / month ($240 / year) — *Confirmed by client*
  - **Rank 4–6 (Leadership):** $49 / month ($470 / year) — *Placeholder (TBC)*
  - **Rank 7–9 (Executive Director):** $99 / month ($950 / year) — *Placeholder (TBC)*
- **Question:** What are the client's approved monthly and annual prices for Rank 4–6 and Rank 7–9 membership packages?

---

## 3. Product & Brand Identity Questions

1. **eBOX Specification:**
   - eBOX is pinned prominently as the top feature in the coach sidebar.
   - **Question:** What exact workflow does eBOX serve? Is it a client document exchange vault (like a secure DropBox for tax returns/P&Ls), a credential locker, or an internal compliance repository?
2. **Brand Name Co-Existence:**
   - References appear for both *"B4B America"* and *"OAL Network"*.
   - **Question:** Is "OAL Network" the parent organization / licensee and "B4B America" the customer-facing brand, or should all UI labels standardize strictly on "B4B America"?
3. **Client & Job Seeker Portal Logins:**
   - The mock database includes roles for `Client` and `Job Seeker`, but the client's core update document focuses entirely on B4B Coaches, Leadership Ranks, and Admins.
   - **Question:** Do commercial clients and job seekers require dedicated password-authenticated portals, or are they public intake forms that dispatch leads directly to B4B Coaches?

---

## 4. Territory Map & Branch Cities Verification

The interactive Territory Management module has been updated to reflect the exact official **12 Federal Reserve Districts, Head Offices, and Branch Cities**:

1. **District 1 (Boston, 1-A):** Head Office: Boston, MA. Branch Cities: None.
2. **District 2 (New York, 2-B):** Head Office: New York, NY. Branch Cities: None.
3. **District 3 (Philadelphia, 3-C):** Head Office: Philadelphia, PA. Branch Cities: None.
4. **District 4 (Cleveland, 4-D):** Head Office: Cleveland, OH. Branch Cities: Cincinnati, OH; Pittsburgh, PA.
5. **District 5 (Richmond, 5-E):** Head Office: Richmond, VA. Branch Cities: Baltimore, MD; Charlotte, NC.
6. **District 6 (Atlanta, 6-F):** Head Office: Atlanta, GA. Branch Cities: Birmingham, AL; Jacksonville, FL; Miami, FL; Nashville, TN; New Orleans, LA.
7. **District 7 (Chicago, 7-G):** Head Office: Chicago, IL. Branch Cities: Detroit, MI.
8. **District 8 (St. Louis, 8-H):** Head Office: St. Louis, MO. Branch Cities: Little Rock, AR; Louisville, KY; Memphis, TN.
9. **District 9 (Minneapolis, 9-I):** Head Office: Minneapolis, MN. Branch Cities: Helena, MT.
10. **District 10 (Kansas City, 10-J):** Head Office: Kansas City, MO. Branch Cities: Denver, CO; Oklahoma City, OK; Omaha, NE.
11. **District 11 (Dallas, 11-K):** Head Office: Dallas, TX. Branch Cities: El Paso, TX; Houston, TX; San Antonio, TX.
12. **District 12 (San Francisco, 12-L):** Head Office: San Francisco, CA. Branch Cities: Los Angeles, CA; Portland, OR; Salt Lake City, UT; Seattle, WA.

### Split States Note:
12 US states are split across two Federal Reserve districts (MO, IL, IN, KY, TN, MS, LA, NM, PA, NJ, WI, MI). In the interactive map, each state is mapped to its primary district seat while allowing multi-district notes and county allocation.
- **Question:** Does the client want split states assigned strictly to their primary Federal Reserve head office, or should multi-district states support dual VP attribution?
