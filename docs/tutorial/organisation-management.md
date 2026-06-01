---
id: organisation-management
title: Organisation Management
sidebar_label: Organisation Management
sidebar_position: 7
description: Invite teammates, assign roles, manage billing, and keep an audit trail across your engineering org.
---

# Organisation Management

Load Curl is built for teams. An **Organisation** is a shared workspace where teammates can run tests, view results, and collaborate on scenarios — all under one subscription.

---

## Creating an organisation

1. Go to **Settings → Organisation**.
2. Click **Create Organisation**.
3. Enter your organisation name (e.g., `Acme Corp Engineering`).
4. Click **Create**.

You are automatically assigned the **Owner** role.

---

## Inviting members

1. In the Organisation settings, click **Invite Member**.
2. Enter the teammate's email address.
3. Select their role (see below).
4. Click **Send Invite**.

They will receive an email invitation. Once accepted, they appear in the **Members** list.

---

## Roles and permissions

Load Curl uses four roles. Each inherits all permissions of the roles below it.

| Role | Run tests | View results | Manage scenarios | Manage members | Manage billing |
|---|---|---|---|---|---|
| **Viewer** | ✗ | ✓ | ✗ | ✗ | ✗ |
| **Tester** | ✓ | ✓ | ✓ | ✗ | ✗ |
| **Admin** | ✓ | ✓ | ✓ | ✓ | ✗ |
| **Owner** | ✓ | ✓ | ✓ | ✓ | ✓ |

### Choosing the right role

- Give **Viewer** access to stakeholders and managers who need to see results but should not trigger tests.
- Give **Tester** access to QA engineers and developers.
- Give **Admin** access to team leads who need to manage membership.
- **Owner** should be limited to one or two people responsible for billing.

---

## Projects

Projects let you group related test scenarios and apply separate threshold sets. For example:

- `Production API` — high thresholds, strict alert policy
- `Internal Admin API` — relaxed thresholds, no CI/CD gate
- `Partner Webhooks` — webhook endpoint scenarios

To create a project:

1. Go to **Organisation → Projects**.
2. Click **New Project**.
3. Name the project and optionally assign it to specific members.

Scenarios and test history are scoped to their project. Team members can only see projects they have been granted access to.

---

## Shared test library

All saved scenarios are stored in the organisation's **Shared Test Library**. From there you can:

- Search by name or tag
- Duplicate a scenario to create a variant
- View the version history of a scenario
- Archive scenarios you no longer use

---

## Billing

The Owner manages billing from **Settings → Billing**. The page shows:

- Current plan and renewal date
- Number of seats in use vs. plan limit
- Monthly usage breakdown by member and project
- Invoice download links

All plans cover the full organisation under one subscription — there are no per-seat fees on the Starter or Pro plans.

| Plan | Seats | Concurrency |
|---|---|---|
| Starter (free) | Unlimited | 50 workers |
| Pro ($49/mo) | Up to 10 | 5,000 workers |
| Enterprise (custom) | Unlimited | 100,000+ workers |

---

## Audit log

Every action in your organisation is recorded in the **Audit Log** (**Settings → Audit Log**):

- Who ran a test and when
- Configuration changes to scenarios or thresholds
- Member invitations, role changes, and removals
- Billing changes

You can filter the log by member, action type, or date range, and export it as a CSV for compliance requirements.

---

## Session security

Under **Settings → Security**, every member can see all active login sessions for their own account, including:

| Column | Description |
|---|---|
| Device | Device type and browser |
| Location | Approximate city and country |
| IP Address | The originating IP |
| Last active | Timestamp of most recent activity |
| Status | Current / Active / Idle |

To revoke a suspicious session, click **Revoke** on that row. To sign out of all other devices at once, click **Revoke all other sessions**.

---

## Next step

You've completed the core tutorial. Head to [**Frequently Asked Questions**](./faq) or explore the **API Reference** to integrate Load Curl programmatically.
