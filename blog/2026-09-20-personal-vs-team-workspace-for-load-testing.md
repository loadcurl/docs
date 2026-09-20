---
slug: personal-vs-team-workspace-for-load-testing
title: Personal vs Team Workspace for Load Testing
description: "How Loadcurl personal and company workspaces differ — domains, shared quota, roles, and when to upgrade from solo testing to a team."
authors: [loadcurl]
tags:
  - Loadcurl platform
  - workspaces
  - teams
  - organization
date: 2026-09-20
---

Loadcurl organizes everything around a **workspace** (organization): tests, reports, domains, request quota, and billing. You always have exactly **one active** workspace.

{/* truncate */}

## Personal workspace

Created automatically when you register.

- You are the only member (**Owner**)
- Up to **1** verified domain
- Quota and billing are yours alone
- Sidebar: Dashboard, Tests, Domains, Plan, Usage, Account, Support

Ideal for solo engineers validating an API from the browser.

## Company workspace

Created when you **upgrade** from Account, or when you **invite** someone from a personal workspace.

- Roles: **Owner**, **Admin**, **Member**
- Up to **10** verified domains (app, API, staging, …)
- **Shared** request quota and plan
- Extra **Organization** nav for members
- Tests show as team history

Conversion is **one-way**. You cannot turn a company back into personal.

## Side-by-side

| | Personal | Company |
|---|---|---|
| Members | Only you | Owner / Admin / Member |
| Domains | 1 | Up to 10 |
| Quota | Solo | Shared pool |
| Invites | N/A | Owner/Admin invite Admin or Member |
| Best for | Solo rehearsal | Launch teams |

## When to upgrade

Upgrade when you need any of:

- Teammates to start runs or view reports without sharing a login
- Multiple verified hosts
- One shared monthly request pool and Razorpay plan
- Clear Owner/Admin checkout vs Member run access

You can upgrade and remain the only member — invites are optional.

## Roles in practice

- **Owner / Admin** — invite, manage domains, Razorpay checkout
- **Member** — run tests, view usage; cannot check out
- Invites go to email with a 7-day accept link; invitee must use that same email
- Owner cannot leave until ownership is transferred

## Quota implication for teams

Starting a test holds `duration × RPS` on the **shared** wallet. Coordinate large rehearsals on **Usage** so two peak runs do not collide. Unused requests still do not carry over at period end.

## How to upgrade

1. Open **Account**
2. **Upgrade to a company**
3. Enter company name → confirm
4. Invite from **Organization** when ready

Docs: [Workspaces](/docs/tutorial/organisation-management) · [Plan and usage](/docs/tutorial/billing)
