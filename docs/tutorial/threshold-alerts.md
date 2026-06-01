---
id: threshold-alerts
title: Threshold Alerts
sidebar_label: Threshold Alerts
sidebar_position: 4
description: Define SLA thresholds and get notified automatically when your API metrics breach limits.
---

# Threshold Alerts

Threshold alerts let you define the performance standards your API must meet. When a test result crosses a threshold, Load Curl sends an alert — so you catch regressions before they reach production.

:::info Plan availability
Threshold alerts are available on the **Pro plan** and above.
:::

---

## Creating a threshold

1. Open **Settings → Alerts** in the sidebar.
2. Click **New Threshold**.
3. Fill in the threshold form:

| Field | Description | Example |
|---|---|---|
| **Metric** | The metric to watch | P95 Latency |
| **Operator** | Condition direction | greater than |
| **Value** | The limit to enforce | 400 ms |
| **Scope** | Apply to all tests or a specific project | Production API |
| **Notify** | Email addresses to alert | team@yourapp.com |

4. Click **Save Threshold**.

The threshold is now active. Every time a test in the selected scope completes, Load Curl evaluates all thresholds against the results.

---

## Available metrics for alerting

You can create thresholds on any of the following:

- P50 / P95 / P99 latency (milliseconds)
- Error rate (percentage)
- Availability (percentage)
- Requests per second (floor — alert when RPS **drops below** a value)
- Server CPU peak (percentage)
- Overall report card grade (e.g., alert if grade drops below **B**)

---

## Notification channels

### Email (available now)

Every threshold alert sends an email to the addresses you configure. The email includes:

- Which threshold was breached
- The actual value vs. the threshold value
- A direct link to the Report Card
- The grade change from the previous run (if any)

### PagerDuty and additional channels (roadmap)

PagerDuty integration and further alert channels (Slack, webhooks) are planned for an upcoming release.

---

## Using thresholds in CI/CD

Thresholds integrate directly with the CLI and CI/CD pipeline. When a threshold is breached, the `lf test` command exits with a non-zero status code, which causes the pipeline step to fail.

```yaml
# GitHub Actions example
- name: Load test
  run: |
    lf test \
      --endpoint https://api.yourapp.com/v2/users \
      --workers 500 \
      --duration 60s \
      --fail-on-threshold
```

The `--fail-on-threshold` flag checks all thresholds you have configured for the project. If any are breached, the test is marked as failed and the deployment is blocked.

See [**CI/CD Integration**](./cicd-integration) for the full pipeline setup guide.

---

## Managing existing thresholds

From **Settings → Alerts** you can:

- **Edit** any threshold by clicking the row
- **Pause** a threshold temporarily (e.g., during planned maintenance)
- **Delete** a threshold you no longer need
- **View alert history** — a log of every time a threshold fired, with timestamps and the metric value that triggered it

---

## Next step

Learn how to test a full user journey with the [**Scenario Builder**](./scenario-builder).
