# 📋 Database Schema Documentation — B4B America

The database `b4b_america` currently contains **33 relational tables** synchronized with Prisma ORM:

| # | Table Name | Description |
|---|---|---|
| 1 | `user` | Core user accounts with credentials and roles |
| 2 | `rolepermission` | RBAC matrix mapping roles to 18 permission modules |
| 3 | `rankrule` | BizPro 9 progression ranks with volume & overrides |
| 4 | `bizproprofile` | B4B Coach profiles with district and rank details |
| 5 | `clientprofile` | SME Client company profiles and financial tier |
| 6 | `affiliateprofile` | Affiliate partners with referral links |
| 7 | `employerprofile` | Employer profiles with hiring details |
| 8 | `jobseekerprofile` | Job candidate profiles and resumes |
| 9 | `lead` | Leads CRM system |
| 10 | `job` | Public Job Board postings |
| 11 | `jobapplication` | Candidate job applications |
| 12 | `eboxdocument` | eBOX Document vault records |
| 13 | `fundingapplication`| SME Capital funding applications |
| 14 | `invoice` | Billing, payments, and invoices |
| 15 | `commissionledger` | Real-time commission ledger entries |
| 16 | `commissionrule` | Admin commission formula configurations |
| 17 | `serviceproduct` | Services and catalog inventory |
| 18 | `subscription` | User subscriptions |
| 19 | `subscriptionplan` | Available subscription tiers |
| 20 | `bulletinpost` | Bulletin feed posts |
| 21 | `bulletincomment` | Comments on bulletin posts |
| 22 | `bulletinreaction`| Post reactions and likes |
| 23 | `cmspage` | Website content CMS pages |
| 24 | `trainingmodule` | Video training courses |
| 25 | `territorydistrict` | Territory mapping districts |
| 26 | `territorynote` | District field notes |
| 27 | `scoreboardentry` | Monthly sales leaderboard scores |
| 28 | `scoreboardarchive`| Historical leaderboard archives |
| 29 | `scoreboardsetting`| Gamified scoreboard configurations |
| 30 | `scoreboardauditlog`| Scoreboard change audit history |
| 31 | `permissionauditlog`| RBAC modification logs |
| 32 | `pendingapproval` | Moderation queue |
| 33 | `affiliatepayout` | Partner commission payout batches |

