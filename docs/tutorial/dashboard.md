---
id: dashboard
title: Dashboard and account
sidebar_label: Dashboard
sidebar_position: 4
description: Navigate the Load Curl dashboard — tests, Wallet, Profile, Settings, sessions, and password.
---

# Dashboard and account

After you sign in, everything happens in the [dashboard](https://app.loadcurl.com). This page maps the sidebar to what you can do.

---

## Sidebar

| Item | Where | What it is for |
|---|---|---|
| **Dashboard** | `/` | Create tests, summary cards, run history |
| **Organization** | `/organization` | Company workspaces only — members, invites, leave |
| **Wallet** | `/wallet` | Credits for this workspace and plan comparison |
| **Profile** | `/profile` | Name, email, verification status, personal vs company |
| **Settings** | `/settings` | Workspace name, upgrade, password, email, sessions |

Personal accounts do not see **Organization** in the sidebar. Upgrade first (see [Workspaces and company upgrade](./organisation-management)).

**New test** in the header jumps to the create-test form on the Dashboard.

---

## Dashboard home

1. **Summary** — total tests, running tests, remaining capacity for the workspace.
2. **Create test** — request builder, paste curl / Postman, load configuration, start.
3. **History** — search, filter by status (running / completed / failed), page through runs, open a run.

Company members share the same test list and remaining capacity. Copy in the UI says **Team tests** instead of **Your tests**.

---

## Test run page

Open a run from history (`/tests/{runId}`):

- Request method, URL, load config, status
- Live snapshot while running
- Full report when ready
- **Download PDF**

You can **stop** a running test from the run controls.

---

## Profile

**Profile** shows your name, email, whether email is verified, and whether the active workspace is personal or company.

---

## Settings

### Personal workspace name

If you are still on a personal workspace, Settings shows the workspace name. Owner/admin can **rename** it. Company owners and admins rename from the Organization page instead.

### Upgrade to company

Personal **Owner** sees **Upgrade to company**. That flow is documented in [Workspaces and company upgrade](./organisation-management).

### Password

**Change password** goes to `/auth/change`. You must enter the current password and a new one. Changing password signs out **all** sessions. Google-only accounts can keep using Google; they can still set a password later if the product offers it.

Forgot password: [app.loadcurl.com/auth/forgot](https://app.loadcurl.com/auth/forgot) sends a reset email.

### Email verification

If your inbox is not verified, resend the verification email from Settings. The link is valid for 24 hours.

### Sessions

Settings → **Sessions** lists devices signed in to your account:

- Device name (or browser · device type)
- **This device** badge for the current browser
- Last active time
- **Sign out** on a single session
- **Log out other devices** — keeps this browser signed in and revokes the rest

Each sign-in stores a device id in the browser (`app_device_id` in local storage) so refresh and session revoke can tell devices apart. New device logins can also trigger a **new session** email with approximate location from IP.

---

## Wallet

**Wallet** shows credits for the active workspace.

- Personal: credits stay in that workspace.
- Company: the team shares one credit pool. **Members** can view balance; **Owner** and **Admin** see plan comparison.

Plans listed in Wallet (Free, Starter, Growth, Scale) describe request volume, RPS, duration, history, and team size. Live test execution currently enforces duration **30–120 seconds** and up to **10,000 RPS**, with a per-workspace test cap.

---

## Auth you will use

| Action | Route |
|---|---|
| Register | `/auth/register` |
| Log in | `/auth/login` |
| Google | Same auth screens — continues with Google |
| Verify email | `/auth/verify` (from email link) |
| Forgot / reset password | `/auth/forgot`, `/auth/reset` |
| Change password | `/auth/change` |
| Accept invite | `/organization/invite/accept?token=…` |

The dashboard keeps your **access token in memory** and a **refresh token in an HttpOnly cookie**. Closing the tab clears the access token; the cookie is used to restore the session when you return.

---

## Next step

Invite a team with [**Workspaces and company upgrade**](./organisation-management).
