---
slug: pre-launch-load-testing-checklist
title: "Pre-Launch Load Testing Checklist"
description: "A practical pre-launch API load testing checklist: domain verify, RPS targets, SLOs, staging safety, quota, reports, and abort criteria."
authors: [loadcurl]
tags:
  - Best practices
  - checklist
  - launch
  - API load testing
date: 2026-09-19
---

Use this checklist before a launch or big traffic moment. Print it, paste it in the runbook, or attach PDFs next to each checked item.

{/* truncate */}

## 1. Scope

- [ ] Critical HTTP endpoints listed (not “the whole monorepo”)
- [ ] Expected peak **RPS** estimated per endpoint
- [ ] Latency SLOs written (percentile + threshold + RPS context)
- [ ] Error / timeout budgets written

## 2. Environment

- [ ] Staging sized meaningfully (or scale factor documented)
- [ ] Hostname **verified** in Loadcurl Domains
- [ ] Staging credentials only in the composer
- [ ] Production game day only if explicitly approved

## 3. Request realism

- [ ] curl / Postman request matches production shape
- [ ] Auth path enabled (not a fake bypass)
- [ ] Bodies and params representative
- [ ] One endpoint per Loadcurl test (hottest first)

## 4. Load profile

- [ ] Smoke run completed
- [ ] Ramp-up set (not always `0`)
- [ ] Duration long enough for steady-state
- [ ] Quota hold `duration × RPS` fits **Available**
- [ ] Plan max RPS / duration sufficient

## 5. Observability

- [ ] App, DB, queue, and dependency dashboards open
- [ ] On-call informed for high RPS / prod windows
- [ ] Abort criteria agreed (error %, p99, customer impact)

## 6. Execute the ladder

- [ ] Baseline (~50% peak)
- [ ] Target peak load
- [ ] Optional stress on staging
- [ ] Optional soak if leak risk is high

## 7. Read and share

- [ ] Throughput vs target reviewed
- [ ] Successful p95/p99 vs SLO
- [ ] 4xx/5xx/timeouts explained
- [ ] PDF downloaded and attached to launch doc
- [ ] Bottlenecks filed or fixed before go-live

## 8. After launch

- [ ] Keep a short regression profile for post-deploy runs
- [ ] Revisit RPS assumptions with real traffic

## Loadcurl quick path

Register → verify domain → New test (paste curl/Postman) → set duration / ramp-up / RPS → Start → poll run → report → PDF.

Guides: [Staging vs Production](/blog/staging-vs-production-load-testing) · [Read a report](/blog/how-to-read-an-api-load-test-report) · [Getting started](/docs/tutorial/getting-started)
