---
id: faq
title: Frequently Asked Questions
sidebar_label: FAQ
sidebar_position: 8
description: Answers to common questions about Load Curl's plans, limits, protocols, and security.
---

# Frequently Asked Questions

---

## General

### What is Load Curl?

Load Curl is a cloud-based API load testing platform. You provide an endpoint URL, configure a load profile, and Load Curl's distributed workers simulate thousands of concurrent users hitting your API. You get real-time metrics and a graded Report Card when the test finishes.

### Do I need to install anything to get started?

No. The web interface at [app.loadcurl.com](https://app.loadcurl.com) is all you need for basic tests. The `lf` CLI is optional and only needed for CI/CD integration.

### Is there a free plan?

Yes. The **Starter plan** is free forever. It includes 50 concurrent workers and 5 test runs per month — enough for regular regression checks on small teams.

---

## Limits and plans

### What happens if I exceed my monthly test limit?

On the Starter plan, you will be prompted to upgrade or wait until your quota resets at the start of the next calendar month. Unused runs do not roll over.

### Can I upgrade mid-month?

Yes. When you upgrade to Pro, you immediately get access to 5,000 concurrent workers and unlimited test runs for the remainder of the billing period. You are charged a prorated amount for the days remaining in the month.

### How many seats are included in the Pro plan?

The Pro plan includes up to 10 seats. Additional seats can be added for a per-seat fee, or you can upgrade to the Enterprise plan for unlimited seats.

---

## Tests and accuracy

### How many regions do Load Curl workers run in?

The current beta footprint distributes workers across 12 regions. Additional global regions are on the roadmap. You can see the active regions listed in the **Configure Load Profile** step before starting a test.

### Can I target a specific region?

Yes. In the load profile, expand the **Target Regions** dropdown and select one or more regions. Workers are distributed evenly across the regions you select.

### Does Load Curl test both REST and GraphQL?

Yes. Both REST and GraphQL endpoints are supported today. You can set the Content-Type header to `application/graphql` and paste your query into the request body. gRPC and WebSocket support are planned for a future release.

### Will the test affect real users in production?

Load Curl tests are real HTTP traffic. If you are testing a production environment, ensure your infrastructure can handle the concurrency you configure, or use a staging environment for exploratory testing.

---

## Results and data

### How long are test results stored?

| Plan | Result history |
|---|---|
| Starter | 30 days |
| Pro | 12 months |
| Enterprise | Custom (configurable) |

### Can I export my results?

On the Pro plan and above, you can export any Report Card as a PDF. The audit log can be exported as a CSV on all plans.

### Can I share results with someone who doesn't have a Load Curl account?

Yes. Every Report Card can be made public via a shareable link. The recipient does not need an account to view it.

---

## Security

### How does Load Curl handle my API credentials?

Authentication headers and request bodies you configure in a test are stored encrypted at rest and transmitted over TLS. They are never logged or exposed in the public Report Card link.

### Can I see who has access to my account?

Yes. Under **Settings → Security**, you can view all active login sessions — including device type, location, IP address, and last activity — and revoke any session individually or all at once.

### Does Load Curl support SSO?

SSO/SAML 2.0 is available on the **Enterprise plan**.

---

## Billing and invoicing

### Is there a contract or minimum commitment?

No. Pro is month-to-month and can be cancelled at any time. You retain access until the end of the paid period.

### What payment methods are accepted?

All major credit and debit cards are accepted. Enterprise customers can also pay by invoice.

### Where can I download my invoices?

Go to **Settings → Billing → Invoice History**. All invoices are available as PDFs and include a per-member usage breakdown.

---

## Support

### How do I get help?

- **Free / Starter:** Community support via the in-app chat.
- **Pro:** Priority email support. Expect a response within 1 business day.
- **Enterprise:** Dedicated Slack channel with a named support contact.

For urgent issues or to report a bug, email [hello@loadcurl.io](mailto:hello@loadcurl.io).
