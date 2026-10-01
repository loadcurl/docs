---
id: mcp
title: MCP keys
sidebar_label: MCP
sidebar_position: 7
description: Create an MCP key and connect a client so it can run, poll, stop, and report on Loadcurl load tests.
---

# MCP keys

Loadcurl exposes an [MCP](https://modelcontextprotocol.io) endpoint so a client such as Claude can run the same HTTP load tests as the dashboard. The client authenticates with an **MCP key** created in the app. The browser dashboard keeps using your account session and does not call this endpoint.

Keys are managed at [app.loadcurl.com/organization/mcp-keys](https://app.loadcurl.com/organization/mcp-keys). **Owner** and **Admin** can open that page. Members see a notice that MCP keys are limited to owners and admins. A personal workspace owner can create keys; the page is not limited to company workspaces.

---

## Create a key

1. Sign in and open **MCP keys** in the sidebar (under Workspace).
2. Click **Create key**.
3. Enter a **name** (1–80 characters) and **expires in days** (a whole number from **1** to **365**). Presets are 7, 30, 90, and 365 days.
4. Click **Create key**.

The dialog then shows the secret **once**:

- A **connector link** for Claude (the link itself is the secret).
- The **access key** (`lcak_…`).
- The **secret key** (`lcsk_…`).
- A **client config** JSON block.
- **Download CSV** with `name`, `access_key`, `secret_key`, `expires_at`, and `mcp_url`.

Confirm that you saved the secret before closing. Loadcurl stores only a hash of the secret. If you lose it, revoke the key and create a new one.

Your email must be **verified** before you can create, list, or revoke keys.

An organization can keep **20** keys that are not revoked. Expired keys still count until you revoke them. Revoke an unused key before creating another when you are at the limit.

---

## Connect a client

The endpoint path is `/mcp` on the Loadcurl API. The create dialog prints the full URL for your environment. Use that URL.

Send both credentials on every request. Use headers when the client can set them. If it only accepts a URL, put the same credentials in the query string. If both are sent, the headers are used.

| Header | Query parameter |
|---|---|
| `X-Access-Key` | `access_key` |
| `X-Secret-Key` | `secret_key` |

### Client config (custom headers)

Paste this into an MCP client that accepts a remote server config. Replace the URL and both keys with the values from the create dialog.

```json
{
  "mcpServers": {
    "loadcurl": {
      "url": "https://<api-origin>/mcp",
      "headers": {
        "X-Access-Key": "lcak_…",
        "X-Secret-Key": "lcsk_…"
      }
    }
  }
}
```

### URL only (no custom headers)

Some clients, including Claude custom connectors, cannot set `X-Access-Key` and `X-Secret-Key`. Use the connector link from the create dialog. It is the same endpoint with both keys in the query string:

```text
https://<api-origin>/mcp?access_key=lcak_…&secret_key=lcsk_…
```

That link is the secret. In Claude, open **Settings → Connectors → Add custom connector** and paste it. Do not share it, and do not commit it. If you lose it, revoke the key and create a new one.

---

## Tools

The server name is `loadcurl`. A typical run is `run_test`, then `get_test_status` until the test finishes, then `get_test_report`. Call `get_test_limits` before choosing a load that may exceed the plan.

| Tool | What it does |
|---|---|
| `run_test` | Start a load test for the organization that owns the key. Returns the scenario id. |
| `get_test_status` | Current status and recent status history. Poll until the status is completed or failed. |
| `get_test_report` | Report after the test finishes. `report_status` is `processing` until the report is ready. |
| `list_tests` | Tests for the organization, newest first. Optional page, limit (max 100), status, and search. |
| `stop_test` | Stop a test that is still pending, provisioned, or running. |
| `get_test_limits` | Test counts and the current plan limits for duration and requests per second. |

`run_test` accepts:

| Field | Required | Notes |
|---|---|---|
| `url` | Yes | HTTP or HTTPS URL |
| `method` | Yes | `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, or `OPTIONS` |
| `name` | No | Display name, up to 255 characters |
| `headers` | No | JSON object |
| `query` | No | JSON object |
| `body` | No | JSON object |
| `duration_seconds` | No | Defaults to 10 |
| `requests_per_second` | No | Defaults to 1 |
| `ramp_up_seconds` | No | Defaults to 0 |

`list_tests` status filter: `pending`, `provisioned`, `running`, `completed`, or `failed`. The `running` filter also includes pending and provisioned.

---

## Same rules as the dashboard

A test started over MCP is a normal Loadcurl test. It uses the workspace of the key, the plan caps, request quota (`duration × RPS`), and domain rules. On the free plan, only one test may be pending, provisioned, or running. The run page labels the source **MCP** and shows the key id. You can open that run, download the PDF, and stop it from the dashboard as well.

The key acts as the member who created it. If that person is no longer an active member of the organization, the key stops working.

---

## Keys after creation

The list shows name, access key, a secret hint (`lcsk_…` plus the last four characters), status, expiry, last used, and created time. You can copy the access key. The secret is not listed again.

| Status | Meaning |
|---|---|
| **Active** | Not revoked and not past `expires_at` |
| **Expired** | Past `expires_at`, still counting toward the limit of 20 |
| **Revoked** | Stopped. Clients receive an error. Revoking again is safe. |

**Revoke** is available until the key is revoked. Revoking does not delete past tests.

---

## Next step

See [**Workspaces and company upgrade**](./organisation-management.md) for who can manage keys, or [**Getting Started**](./getting-started.md) for the same test from the dashboard.
