---
id: faq
title: Frequently Asked Questions
sidebar_label: FAQ
sidebar_position: 6
description: Answers about Load Curl accounts, tests, workspaces, reports, and security.
---

# Frequently Asked Questions

---

## General

### What is Load Curl?

Load Curl is a cloud HTTP load testing product. You configure a request in the [dashboard](https://app.loadcurl.com), set target RPS, ramp-up, and duration, and Load Curl runs the traffic. You get live metrics and a detailed report (latency, throughput, HTTP outcomes) plus PDF export.

### Do I need to install anything?

No. Use the web dashboard. There is no CLI or CI/CD integration in the current product.

### Is there a free way to start?

Yes. Register without a credit card. A personal workspace is created automatically. See **Wallet** in the app for plan comparison (Free, Starter, Growth, Scale).

---

## Tests

### How do I run a test?

Dashboard → **Create test** → method and URL (or paste curl / Postman) → set target traffic, ramp-up, and duration → **Start test**. Details: [Getting Started](./getting-started).

### What HTTP methods are supported?

GET, POST, PUT, PATCH, DELETE in the dashboard (the API also accepts HEAD and OPTIONS). Body must be a JSON object when used.

### Can I chain multiple endpoints in one scenario?

Not in the current product. Each test is a single HTTP request repeated under the load profile.

### What are the live limits?

Duration **30–120 seconds**, target traffic up to **10,000 RPS**, and a **per-workspace test count** (shown as remaining tests on the Dashboard). Some internal accounts may be unrestricted.

### Will this hit production?

Yes if you enter a production URL. Traffic is real. Use staging when you are exploring. Only test systems you are allowed to test.

### Can I stop a test?

Yes. Stop from the Dashboard or the run page while it is running.

### How do I get a report?

Open the run from history. When processing finishes, view metrics on the page and download a PDF. Reports are not public links.

---

## Workspaces

### Do I need to create an organization?

No. Sign-up creates a personal workspace. Upgrade from **Settings** when you want a company.

### How do I upgrade individual to company?

Settings → **Upgrade to company** → enter a name → confirm. One-way. See [Workspaces and company upgrade](./organisation-management).

### What roles exist?

**Owner**, **Admin**, and **Member**. There is no Viewer or Tester role.

### Can I be in two companies at once?

No. One active organization per user. Joining a company parks your personal workspace.

---

## Account and security

### How do I manage devices?

Settings → **Sessions**. Sign out one device or log out all others.

### How are credentials stored for tests?

Request headers and bodies you enter are stored to run the test and show the report. Treat tokens like secrets; prefer staging credentials. Data is sent over TLS to the API.

### What cookies does the app use?

An HttpOnly **refresh_token** cookie keeps you signed in. The access token stays in memory. A device id is stored in local storage. See the [Cookie Policy](https://loadcurl.com/cookies).

### Does Load Curl support Google sign-in?

Yes, on the login and register screens.

---

## Billing

### Where are plans and credits?

**Wallet** in the dashboard. Company members share credits. Members can view balance; Owner and Admin see plans.

### Is checkout live?

Wallet pricing in the API is marked illustrative until payment checkout is connected. Use the in-app Wallet as the source of truth for what you can purchase.

---

## Support

### How do I get help?

Email [hello@loadcurl.io](mailto:hello@loadcurl.io). Product docs: [docs.loadcurl.com](https://docs.loadcurl.com). Guide on the marketing site: [loadcurl.com/load-test](https://loadcurl.com/load-test).
