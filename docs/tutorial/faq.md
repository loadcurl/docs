---
id: faq
title: Frequently Asked Questions
sidebar_label: FAQ
sidebar_position: 8
description: Answers about Loadcurl accounts, tests, domains, workspaces, reports, billing, and security.
---

# Frequently Asked Questions

---

## General

### What is Loadcurl?

Loadcurl is a cloud HTTP load testing product. You configure a request in the [dashboard](https://app.loadcurl.com), verify the host, set target RPS, ramp-up, and duration, and Loadcurl runs the traffic. You get live status (polled about every 3 seconds) and a detailed report (latency, throughput, HTTP outcomes) plus PDF export. Usage is gated by **request quota** on your plan.

### Do I need to install anything?

No. Use the web dashboard. There is no CLI or CI/CD integration in the current product.

### Is there a free way to start?

Yes. Register without a credit card. A personal workspace is created on the **Free** plan. See **Plan** in the app for live prices and limits (US or India).

---

## Tests

### How do I run a test?

1. Verify a domain (**Domains**).
2. **New test** → method and URL (or paste curl / Postman).
3. Set target traffic, ramp-up, and duration.
4. **Start test** (needs enough available quota).

Details: [Getting Started](./getting-started.md).

### What HTTP methods are supported?

GET, POST, PUT, PATCH, DELETE in the dashboard. Body must be a JSON object when used (POST, PUT, PATCH).

### Can I chain multiple endpoints in one scenario?

Not in the current product. Each test is a single HTTP request repeated under the load profile.

### Why can't I start a test?

Common blockers:

- No **verified domain** matching the URL host
- Not enough **available** requests (`duration × RPS`)
- Duration or RPS above the **current plan** cap
- Workspace **test count** cap reached (currently **5**)

### Will this hit production?

Yes if you enter a production URL. Traffic is real. Use staging when you are exploring. Only test systems you are allowed to test. Domain verification proves you control the host; it does not make production traffic safe.

### Can I stop a test?

Yes. Stop from the Dashboard live list or the run page. Unused quota hold is released.

### How do I get a report?

Open the run from Dashboard or Tests. When processing finishes, view metrics on the page and download a PDF. Reports are not public links.

### Does the run page use websockets?

No. It polls about every 3 seconds for status, then for the report after the run finishes.

---

## Domains

### Do I have to verify a domain?

Yes. Tests may only target a verified hostname or a subdomain of one. Personal workspaces: **1** domain. Company: **10**. See [Verify a domain](./domains.md).

---

## Workspaces

### Do I need to create an organization?

No. Sign-up creates a personal workspace. Upgrade from **Account** when you want a company.

### How do I upgrade individual to company?

Account → **Upgrade to a company** → enter a name → confirm. One-way. See [Workspaces and company upgrade](./organisation-management.md).

### What roles exist?

**Owner**, **Admin**, and **Member**. There is no Viewer or Tester role.

### Can I be in two companies at once?

No. One active organization per user. Joining a company parks your personal workspace.

---

## Account and security

### How do I manage devices?

Account → **Sessions**. Sign out one device or log out all others. New-device sign-ins can send an inbox notification and email.

### How are credentials stored for tests?

Request headers and bodies you enter are stored to run the test and show the report. Treat tokens like secrets; prefer staging credentials. Data is sent over TLS to the API.

### What cookies does the app use?

An HttpOnly **refresh_token** cookie keeps you signed in. The access token stays in memory. A device id is stored in local storage. See the [Cookie Policy](https://loadcurl.com/cookies).

### Does Loadcurl support Google sign-in?

Yes, on the login and register screens.

---

## Billing

### Where are plans and quota?

**Plan** is checkout and comparison. **Usage** is allotted / available / held / used, holds, and the ledger. Company members share one pool. Members can view; Owner and Admin check out with Razorpay.

### How does a hold work?

Start reserves `duration × RPS`. After the report, actual hits are consumed and leftover hold returns. Unused period quota does not roll into the next period.

### Is checkout live?

Yes, for paid plans via Razorpay (Owner/Admin). You can apply an upgrade now, queue a recharge after the current period, cancel a pending checkout, or activate a scheduled plan.

---

## Support

### How do I get help?

Open **Support** in the dashboard and create a ticket, or email [hello@loadcurl.io](mailto:hello@loadcurl.io). Product docs: [docs.loadcurl.com](https://docs.loadcurl.com). Guide on the marketing site: [loadcurl.com/load-test](https://loadcurl.com/load-test).
