---
id: dashboard
title: Dashboard and account
sidebar_label: Dashboard
sidebar_position: 5
description: Navigate the Loadcurl dashboard — tests, Plan, Usage, Account, sessions, notifications, and Support.
---

# Dashboard and account

After you sign in, everything happens in the [dashboard](https://app.loadcurl.com). This page maps the sidebar to what you can do.

---

## Sidebar

| Section | Item | Where | What it is for |
|---|---|---|---|
| Testing | **Dashboard** | `/` | Overview: quota, alerts, live and recent tests |
| Testing | **Tests** | `/tests` | History, filters, KPIs |
| Workspace | **\{org name\}** | `/organization` | Company only — members, invites, leave |
| Workspace | **Domains** | `/organization/domains` | Verify hosts you will load-test |
| Billing | **Plan** | `/billing` | Current plan, comparison, Razorpay checkout |
| Billing | **Usage** | `/wallet` | Request quota, holds, ledger |
| Account | **Account** | `/account` | Profile, email, password, sessions, upgrade |
| Help | **Support** | `/support` | Tickets |

Personal accounts do not see the company **Organization** item. Upgrade first (see [Workspaces and company upgrade](./organisation-management.md)). **Domains** is available for both personal and company workspaces.

**New test** in the header opens `/tests/new` (hidden while you are already on Tests or New test).

The header also shows a **request quota chip** (Available / Held / Plan quota) that links to **Usage**, plus **notifications**.

---

## Dashboard home

Dashboard is **not** the request builder. It is an overview:

1. Alerts — verify a domain, last test failed, low quota, period ending soon
2. Hero — first run prompt, or quota headline with **New test** / **Test history**
3. Quota panel — links to **Usage** and **Plan**
4. **Now** — live tests with Open / Stop
5. **Recent tests**

Company members share the same test list and quota. Copy in the UI says **Team tests** instead of **Your tests**.

---

## Account

**Account** (`/account`) replaces older Profile / Settings screens.

| Block | Content |
|---|---|
| Profile | Name, email, verified badge, personal vs company, role |
| Email | Resend verification if unverified (link valid **24 hours**) |
| Workspace | Rename a **personal** workspace; **Upgrade to a company** |
| Password | **Change password** → `/auth/change` |
| Sessions | Signed-in devices (`#sessions`) |

Company owners and admins rename the workspace from **Organization**, not Account.

### Password

**Change password** requires the current password and a new one. Changing password signs out **all** sessions. Google-only accounts that never set a password cannot use this until a password exists.

Forgot password: [app.loadcurl.com/auth/forgot](https://app.loadcurl.com/auth/forgot) sends a reset email. The reset link is valid for **15 minutes**. Successful reset also signs out every session.

### Sessions

Account → **Sessions** lists devices signed in to your account:

- Device name (or browser · device type)
- **This device** badge for the current browser
- Last active time
- **Sign out** on a single session
- **Log out other devices** — keeps this browser signed in and revokes the rest

Each sign-in stores a device id in the browser (`app_device_id` in local storage) so refresh and session revoke can tell devices apart. A **new device** sign-in can also create an inbox notification (and email) with approximate location from IP.

---

## Notifications

The bell opens an inbox. **Mark all as read** is available. Typical events:

| Event | Typical destination |
|---|---|
| New device signed in | Account → Sessions |
| Plan quota ending soon | Plan (`/billing?renew=1`) |
| Member joined / left / removed | Organization |
| Test started | Tests (other members) |
| Support reply / resolved / closed | That ticket |

Inbox rows are separate from the **run timeline** on a test page.

---

## Support

**Support** (`/support`) is in-app tickets, not only email.

1. **New ticket** — category (**Payment related**, **Test fail**, **Other**), subject, body
2. Open a ticket to reply
3. Close a ticket when you are done (closed tickets cannot take new replies — open a new one)

Statuses: Open, In progress, Waiting on you, Resolved, Closed.

You can also email [hello@loadcurl.io](mailto:hello@loadcurl.io).

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

The dashboard keeps your **access token in memory** (about **15 minutes**) and a **refresh token in an HttpOnly cookie** (about **30 days**). Closing the tab clears the access token; the cookie is used to restore the session when you return.

---

## Next step

Invite a team with [**Workspaces and company upgrade**](./organisation-management.md), or manage quota in [**Plan and usage**](./billing.md).
