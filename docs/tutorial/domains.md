---
id: domains
title: Verify a domain
sidebar_label: Domains
sidebar_position: 3
description: Prove ownership of a hostname when a test goes above the free-plan limit.
---

# Verify a domain

A **verified email** is required before any test. A **verified domain** is required only when the test goes above the **free-plan limit** (`max_rps` and `max_test_duration`). Inside that limit the target domain does not have to be verified. Load above it is available after the domain is verified, on a plan that allows it. Open **Plan** for the current numbers.

Above that cap, Loadcurl only sends traffic to a hostname your workspace has **verified**, and only on a plan that allows the load. A test URL is then allowed when its hostname **equals** a verified domain, or is a **subdomain** of one. For example, verifying `example.com` also covers `api.example.com`.

You may only test systems you own or have permission to test, whether or not the domain is verified.

---

## Where to manage domains

Open **Domains** in the sidebar (`/organization/domains`).

- Personal: “Verify the site you will load-test.”
- Company: “Verify the hosts you will load-test, including app, API, and staging.” Company pages also have **Members | Domains** tabs.

Any member can **view** domains. **Owner** and **Admin** can add, verify, and remove them.

---

## Caps

| Workspace | Maximum domains |
|---|---|
| Personal | **1** |
| Company | **10** |

The cap counts pending, failed, and verified rows.

---

## Add and verify

1. Click **Add domain**.
2. Enter a hostname (or paste a URL — Loadcurl keeps the host only).
3. Choose a method and follow the instructions.
4. Click **Verify**.

Statuses: **Pending**, **Verified**, **Failed**.

### DNS TXT (preferred)

Add a TXT record:

| Field | Value |
|---|---|
| **Name / host** | `_loadcurl.{your-domain}` |
| **Value** | `loadcurl-verify={token}` |

DNS can take a few minutes to propagate. Then verify again.

### HTTP file

Serve this file over HTTPS (HTTP is tried if HTTPS fails):

`https://{your-domain}/.well-known/loadcurl-verification.txt`

The body must be the challenge token. Redirects are rejected. The check times out after a few seconds.

---

## Challenge expiry

Pending challenges last **7 days**. If the token expired, add the domain again to get a new token. Copy in the app: “Add this domain again to get a new token.”

You cannot verify a hostname that another organization already has **verified**.

---

## What you can enter

- A public DNS hostname (FQDN), not an IP address, not a port, not a wildcard.
- Not a public-suffix / platform apex such as `vercel.app`, and not names like `localhost`.

:::caution
Verification proves you control the host. It does not mean production is a good target. Prefer staging, start at low RPS, and only test systems you are allowed to test.
:::

---

## Next step

Continue to [**Getting Started**](./getting-started.md) to compose a request inside the free cap, or [**Reading test reports**](./report-card.md) after you run one.
