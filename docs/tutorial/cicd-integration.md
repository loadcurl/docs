---
id: cicd-integration
title: CI/CD Integration
sidebar_label: CI/CD Integration
sidebar_position: 6
description: Plug Load Curl into GitHub Actions, GitLab CI, or Jenkins to block deploys on failing load tests.
---

# CI/CD Integration

Load Curl fits into your existing deployment pipeline. Run a load test on every pull request or deploy, and automatically block the release if the results fall below your thresholds.

---

## Installing the CLI

The `lf` CLI is the bridge between your pipeline and the Load Curl platform.

```bash
npm install -g loadcurl-cli
```

Verify the installation:

```bash
lf --version
```

### Authenticating

Generate an API token from **Settings → API Tokens**, then expose it as an environment secret in your CI provider.

```bash
lf auth login --token $LOADCURL_API_TOKEN
```

---

## GitHub Actions

Add a workflow file to your repository at `.github/workflows/load-test.yml`:

```yaml
name: Load Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  load-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Install Load Curl CLI
        run: npm install -g loadcurl-cli

      - name: Run load test
        env:
          LOADCURL_API_TOKEN: ${{ secrets.LOADCURL_API_TOKEN }}
        run: |
          lf test \
            --endpoint https://api.yourapp.com/v2/users \
            --workers 500 \
            --duration 60s \
            --ramp 10s \
            --fail-on-grade C \
            --fail-on-threshold
```

### What each flag does

| Flag | Description |
|---|---|
| `--endpoint` | The API URL to test |
| `--workers` | Peak concurrent workers |
| `--duration` | Total test duration |
| `--ramp` | Ramp-up period |
| `--fail-on-grade C` | Exit non-zero if the report card grade is C or below |
| `--fail-on-threshold` | Exit non-zero if any saved threshold is breached |

### Using a saved scenario

If you have a multi-endpoint scenario saved in Load Curl, reference it by name:

```yaml
- name: Run scenario load test
  run: |
    lf test \
      --scenario "User Auth Flow" \
      --workers 1000 \
      --duration 120s \
      --fail-on-grade B
```

---

## GitLab CI

Add a job to your `.gitlab-ci.yml`:

```yaml
load_test:
  stage: test
  image: node:20
  script:
    - npm install -g loadcurl-cli
    - lf auth login --token $LOADCURL_API_TOKEN
    - lf test
        --endpoint https://api.yourapp.com/v2/users
        --workers 500
        --duration 60s
        --fail-on-grade C
        --fail-on-threshold
  variables:
    LOADCURL_API_TOKEN: $LOADCURL_API_TOKEN
  only:
    - main
    - merge_requests
```

---

## Jenkins

Add a stage to your `Jenkinsfile`:

```groovy
stage('Load Test') {
    steps {
        sh 'npm install -g loadcurl-cli'
        withCredentials([string(credentialsId: 'loadcurl-token', variable: 'LOADCURL_API_TOKEN')]) {
            sh '''
                lf auth login --token $LOADCURL_API_TOKEN
                lf test \
                    --endpoint https://api.yourapp.com/v2/users \
                    --workers 500 \
                    --duration 60s \
                    --fail-on-grade C \
                    --fail-on-threshold
            '''
        }
    }
}
```

---

## Reading CLI output

When a test completes, the CLI prints a summary to stdout:

```
▶ Spawning workers across 12 regions...
✓ 1000/1000 workers online

· RPS            8,420 req/s
· P95 latency    342 ms
· Error rate     0.04 %
· Throughput     1.2 GB/s

■ Report card ready → Grade: A-
  View full report: https://app.loadcurl.com/reports/run-2847
```

If a threshold is breached or the grade threshold is hit, the exit code is `1` and the failing metrics are listed:

```
✖ Threshold breached: P95 latency 612 ms > 400 ms limit
✖ Grade C is below required minimum B

Pipeline step failed. Deploy blocked.
```

---

## Recommended pipeline placement

| Placement | Use case |
|---|---|
| **PR check** | Catch regressions before they merge. Use lower concurrency (100–500 workers) for speed. |
| **Pre-deploy gate** | Full-scale test on staging before pushing to production. |
| **Post-deploy smoke test** | 60-second low-concurrency test to confirm production is healthy after deployment. |

:::tip
Keep your PR check fast (under 2 minutes) by using a short duration and a saved low-concurrency scenario. Reserve the full-scale test for the pre-deploy gate.
:::

---

## Next step

Learn how to invite your team and manage permissions in [**Organisation Management**](./organisation-management).
