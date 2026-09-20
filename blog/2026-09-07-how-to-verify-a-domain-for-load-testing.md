---
slug: how-to-verify-a-domain-for-load-testing
title: How to Verify a Domain for Load Testing (DNS TXT vs HTTP File)
description: "Learn why Loadcurl requires domain verification, how DNS TXT and HTTP file challenges work, caps, expiry, and which method to choose."
authors: [loadcurl]
tags:
  - Loadcurl platform
  - domain verification
  - DNS TXT
  - security
date: 2026-09-07
---

Loadcurl will not send load-test traffic to arbitrary public URLs. Your workspace must **verify** the hostname first. That ownership gate protects the internet — and your own reputation — from accidental (or abusive) load.

{/* truncate */}

## Why verification exists

Without it, any account could aim cloud generators at someone else’s API. Verification proves you control the DNS or the HTTP origin for that host.

A test URL is allowed when its hostname **equals** a verified domain or is a **subdomain** of one. Example: verifying `example.com` also covers `api.example.com` and `staging.example.com`.

## Where to do it

In the dashboard: **Domains** (`/organization/domains`).

- Any member can **view** domains
- **Owner** and **Admin** can add, verify, and remove

### Caps

| Workspace | Max domains |
|---|---|
| Personal | **1** |
| Company | **10** |

The cap counts pending, failed, and verified rows.

## Method A: DNS TXT (preferred)

Add a TXT record:

| Field | Value |
|---|---|
| **Name / host** | `_loadcurl.{your-domain}` |
| **Value** | `loadcurl-verify={token}` |

The exact token is shown in the app when you add the domain. DNS can take a few minutes to propagate — then click **Verify** again.

**Choose DNS TXT when:** you control DNS, want a durable proof, or the app sits behind a CDN that makes file checks awkward.

## Method B: HTTP file

Serve this path over HTTPS (HTTP is tried if HTTPS fails):

`https://{your-domain}/.well-known/loadcurl-verification.txt`

The body must be the challenge token. **Redirects are rejected.** The check times out after a few seconds.

**Choose HTTP file when:** you can deploy a static file quickly but DNS changes are slow (or owned by another team).

## Challenge expiry and conflicts

- Pending challenges last **7 days**. If expired, add the domain again for a new token.
- You cannot verify a hostname another organization already has **verified**.
- Statuses: **Pending**, **Verified**, **Failed**.

## What you can enter

- A public DNS hostname (FQDN)
- Not an IP address, port, wildcard, `localhost`, or platform apex names like `vercel.app`

Paste a full URL if you want — Loadcurl keeps the **host** only.

## Recommended setup for teams

1. Verify the **staging** apex or API host first
2. Upgrade to a **company** workspace if you need multiple hosts (app, API, staging) — up to 10
3. Keep production verification only if you run planned game days
4. Document which method you used in the runbook

## Verification is not a safety guarantee

Proving ownership does **not** make unlimited production load safe. Prefer staging, use ramp-up, and set abort criteria. See [Staging vs Production Load Testing](/blog/staging-vs-production-load-testing).

## After verification

Open **New test**, compose or paste curl / Postman, set duration / ramp-up / target RPS, and start. Only verified hosts (and their subdomains) are accepted.

Full product steps: [docs — Verify a domain](/docs/tutorial/domains).
