---
id: scenario-builder
title: Endpoint Scenario Builder
sidebar_label: Scenario Builder
sidebar_position: 5
description: Chain multiple API endpoints in a single test to simulate a real user journey.
---

# Endpoint Scenario Builder

Real user traffic is rarely a single endpoint in isolation. A user logs in, fetches their feed, opens a post, and posts a comment — four different endpoints in sequence. The **Scenario Builder** lets you model that journey as a single chained test.

---

## Why use scenarios?

- **Find cascading bottlenecks.** A slow auth endpoint adds latency to every downstream call. A single-endpoint test hides this.
- **Realistic load patterns.** Traffic is not uniform. Scenarios let you weight endpoints proportionally — e.g., 80 % reads and 20 % writes.
- **End-to-end latency.** Measure the total time for a complete user action, not just individual endpoints.

---

## Building your first scenario

:::note
The Scenario Builder is available on the **Pro plan**. Access it from the Dashboard under **New Test → Scenario**.
:::

1. Click **New Test → Scenario**.
2. You start with one empty step. Each step represents one HTTP request.

### Adding a step

Click **Add Step** to append a new request to the chain. For each step, configure:

| Field | Description |
|---|---|
| **Name** | A label for this step, e.g. `Login` |
| **Method** | GET, POST, PUT, DELETE, PATCH |
| **URL** | The endpoint URL |
| **Headers** | Key-value pairs; supports variables (see below) |
| **Body** | JSON or form-encoded request body |
| **Expected status** | The HTTP status code you expect; any other code counts as an error |

### Example scenario: User authentication flow

```
Step 1 — POST /auth/login
  Body: { "email": "user@example.com", "password": "..." }
  Expected: 200

Step 2 — GET /api/v1/profile
  Headers: Authorization: Bearer {{step1.response.token}}
  Expected: 200

Step 3 — GET /api/v1/feed?page=1
  Headers: Authorization: Bearer {{step1.response.token}}
  Expected: 200

Step 4 — POST /api/v1/feed/comments
  Headers: Authorization: Bearer {{step1.response.token}}
  Body: { "post_id": "{{step3.response.posts[0].id}}", "text": "Hello" }
  Expected: 201
```

---

## Variable chaining

Pass data from one step's response into the next step's request using double-curly-brace syntax:

```
{{stepN.response.<json_path>}}
```

### Common examples

| Expression | Extracts |
|---|---|
| `{{step1.response.token}}` | `token` field from step 1's JSON response body |
| `{{step1.response.user.id}}` | Nested `user.id` field |
| `{{step2.response.items[0].slug}}` | First element of an array |
| `{{step1.headers.x-request-id}}` | A response header value |

:::caution
If a variable expression cannot be resolved (e.g., the upstream step returned an error), the step is skipped and logged as a dependency failure in the Report Card.
:::

---

## Configuring step weights

By default, all steps run sequentially for every virtual user. You can also configure each step with an independent **weight** to run them with different probabilities:

- `Step 1 (Login): weight 1.0` — always runs
- `Step 2 (Read feed): weight 0.8` — 80 % of users do this
- `Step 3 (Post comment): weight 0.2` — 20 % of users do this

This models realistic read-heavy traffic patterns without artificially inflating write endpoint load.

---

## Scenario report card

The Report Card for a scenario test includes:

- **Overall grade** — weighted average across all steps
- **Per-step breakdown** — individual latency, error rate, and RPS for each step
- **Bottleneck highlight** — the step with the largest contribution to total latency is flagged automatically
- **Dependency failures** — any step that failed because an upstream variable was missing

---

## Saving and reusing scenarios

Scenarios are saved to your organisation's **Shared Test Library**. To save a scenario:

1. Click **Save Scenario** in the top right.
2. Give it a name and optional tags (e.g., `auth`, `regression`, `v2`).
3. It becomes available to all team members with Tester access or higher.

You can version scenarios by duplicating them before making changes. Previous runs stay linked to the version of the scenario that generated them.

---

## Next step

Learn how to block deploys automatically with [**CI/CD Integration**](./cicd-integration).
