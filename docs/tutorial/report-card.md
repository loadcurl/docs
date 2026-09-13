---
id: report-card
title: Tests and reports
sidebar_label: Tests and reports
sidebar_position: 4
description: Create tests, follow a live run, and read latency, throughput, and PDF export in Loadcurl.
---

# Tests and reports

Tests live under **Tests** in the sidebar. Compose on **New test** (`/tests/new`). Open a run at `/tests/{runId}` from Dashboard or history.

---

## Tests list

**Tests** (`/tests`) shows workspace KPIs (**Your tests** or **Team tests**, completed, failed, running) and **Test history**:

- Search by name or URL
- Filter: All / Running / Completed / Failed
- **New test** to open the composer

Running includes pending and provisioned as well as actively sending traffic.

Each workspace has a **test count cap** (currently **5** scenarios). Remaining capacity also shows on the Dashboard.

---

## Live run page

After **Start test**, the run page polls about every **3 seconds** (no websockets).

**Header:** back to Tests; **Stop Test** while the run is live.

You will see:

- Method, URL, status, created / started / completed times
- Duration, ramp-up, and target RPS
- Timeline: **Created → Resources → Testing → Report** plus failed or stopped
- **Request hold**: Reserved / Consumed / Returned (HELD, SETTLED, or RELEASED)

Stopping a live run marks it failed and **releases** the unused hold back to available quota.

Statuses: **pending → provisioned → running → completed** or **failed**.

---

## What the report contains

Every completed (or failed) run has a **report** on the same page. While it is still being calculated, you see a processing state — wait; it is not a letter grade.

The report is built from request summaries, throughput, and latency samples collected during the run.

### Highlights

- Success rate
- Total requests
- Average latency
- Average RPS

### Request summary

Counts and rates such as:

- Total, completed, successful, and failed requests
- Timeouts and transport errors
- HTTP 2xx / 3xx / 4xx / 5xx
- Success rate, completion rate, failure rate, timeout rate

Use this to see whether errors are HTTP status codes, timeouts, or connection failures.

### Throughput

- Target RPS (what you configured)
- Average, peak, and minimum RPS achieved
- Successful / completed RPS
- RPS vs target
- Response bytes and bytes per second (average and peak)

If average RPS is far below target, the endpoint or network could not keep up, or errors cut throughput.

### Latency

Percentiles and stats, often grouped for **all**, **completed**, and **successful** requests:

- Min, average, max, standard deviation
- p50, p75, p90, p95, p99

p95 / p99 describe what slower requests experienced.

### Request results

A paginated list of individual outcomes (**Completed**, **Timeout**, **Error**) with status codes. Expand a row for body or error detail when present.

### PDF

**Download PDF** after the report is ready. There is no public share link. Anyone who needs the numbers should be in the same workspace, or you can send the PDF.

---

## Live vs final report

| View | When | What you get |
|---|---|---|
| **Live status** | Pending, provisioned, or running | Timeline, live totals, success, failures, RPS |
| **Final report** | After the run completes or fails | Full summary, throughput, latency, request results |
| **PDF** | After the report is ready | Same metrics in a downloadable file |

---

## Quota after a run

Starting a test **holds** `duration × RPS` requests (minimum 1) from this period’s quota.

- When the report is ready, actual hits are **consumed** and unused hold is **returned**.
- If you stop the test or it fails before a report, the hold is **released**.

See [**Plan and usage**](./billing).

---

## Next step

See [**Dashboard and account**](./dashboard) for navigation, sessions, and Support.
