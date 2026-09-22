---
id: billing
title: Plan and usage
sidebar_label: Plan & usage
sidebar_position: 7
description: Request quota, plan checkout with Razorpay, holds, and the usage ledger in Loadcurl.
---

# Plan and usage

Load tests spend **request quota** on the current workspace plan — not a separate credit pack. Two sidebar items cover this:

| Nav label | Route | Purpose |
|---|---|---|
| **Plan** | `/billing` | Current plan, comparison table, recharge / upgrade, plan payments |
| **Usage** | `/wallet` | Quota bar, active holds, request ledger |

**Plan** in the app is the source of truth for prices and feature limits. Markets are **US (USD)** and **India (INR)** — the marketing site and dashboard detect your market.

---

## Request quota

Each billing period has a wallet of requests:

| Bucket | Meaning |
|---|---|
| **Allotted** | Requests granted for this period (`requests / month × interval`) |
| **Used** | Requests consumed by settled tests |
| **Held** | Reserved for tests that have started but not settled |
| **Available** | What you can still reserve for a new test |

Starting a test holds `duration × RPS` (minimum **1**). If available is too low, start returns an error and the dashboard blocks the run.

After the report is ready, actual hits are consumed and unused hold is returned. Stopping a test (or a failed run without a usable report) **releases** the hold.

Unused requests **do not carry over** when the period ends.

The header **quota chip** and Dashboard quota panel both read this same wallet.

---

## Plans

Typical catalog (confirm live numbers on **Plan**):

| Plan | What it is for |
|---|---|
| **Free** | Start without a card. Lower monthly requests, RPS, and duration. |
| **Starter** | Paid monthly quota and higher load caps |
| **Growth** | Larger quota (often marked popular) |
| **Scale** | Highest published caps |

Each plan publishes features such as requests / month, max RPS, and max test duration. Duration and RPS on **New test** cannot exceed the **current** plan.

Free is provisioned automatically when the workspace is created. You cannot “buy” Free.

---

## Checkout (Owner and Admin)

On **Plan**:

1. **Current plan** — period dates, status, **Recharge**
2. Optional **waiting plan** — **Activate pending plan** if a prepaid period is queued
3. Comparison table — **Buy**, **Upgrade**, or **Recharge**
4. Confirm, then pay with **Razorpay**
5. **Plan payments** history

Behaviors:

- **Upgrade** (higher plan) can start **immediately** after payment.
- **Recharge** on the same paid plan **queues** the next period (one prepaid waiting plan at a time).
- Starting a new checkout supersedes an older pending checkout. You can **cancel** an in-flight checkout.
- Pending checkouts expire after about **60 minutes** if unpaid.
- **Members** can view Plan and Usage; they cannot check out.

A reminder goes to Owner and Admin about **3 days** before the period ends (inbox + email). The Dashboard and Plan page also show a renew banner.

When a paid period ends with no queued plan, the workspace returns to **Free**.

---

## Usage page

**Usage** shows:

1. `{Plan} usage` bar — Used / Held / Available
2. Stats — Plan quota, Used, Held, Available
3. **Recharge or upgrade** → Plan
4. **Active request holds**
5. **Request usage this period** ledger (quota added, reserved, used, unused hold returned, test stopped, adjustment)
6. **Credit top-ups** — if listed, they are separate from plan quota. **Tests spend plan quota**, not those credits.

---

## Holds on a test run

The run page repeats hold state: Reserved / Consumed / Returned. That is the same hold as **Usage**.

---

## Next step

See [**FAQ**](./faq.md) for billing, security, and product questions.
