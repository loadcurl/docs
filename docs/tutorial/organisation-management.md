---
id: organisation-management
title: Workspaces and company upgrade
sidebar_label: Workspaces
sidebar_position: 5
description: Upgrade a personal workspace to a company, invite teammates, and manage Owner, Admin, and Member roles.
---

# Workspaces and company upgrade

Load Curl uses **organizations** (workspaces). You always have exactly **one active** workspace. Tests, reports, and credits belong to that workspace.

---

## Personal vs company

| | Personal | Company |
|---|---|---|
| **When** | Created automatically at sign-up | After you upgrade, or when you invite someone |
| **Members** | Only you (Owner) | Owner, Admins, Members |
| **Sidebar** | Dashboard, Wallet, Profile, Settings | Same, plus **Organization** |
| **Credits** | Yours | Shared by the team |
| **Tests** | Your tests | Team tests |

Company conversion is **one-way**. You cannot turn a company back into a personal workspace.

---

## Upgrade individual to company

You do **not** create a second organization. You convert the personal workspace you already have.

1. Sign in and open **Settings**.
2. In the workspace card, click **Upgrade to company**.
3. Enter a **company name** (you can keep the current name).
4. Confirm. You stay Owner. Invites, roles, and team credits become available.
5. You are taken to **Organization**.

You can stay the only member after upgrading. The change cannot be undone.

Inviting a teammate from a personal workspace also converts it to a company (same one-way rule).

---

## Inviting members

On **Organization** (company only), Owner and Admin can invite:

1. Enter the person's **email**.
2. Choose role **ADMIN** or **MEMBER** (you cannot invite someone as Owner).
3. Click **Invite**. They get an email with an accept link (valid **7 days**).

They must sign in with **that same email**, then open:

`https://app.loadcurl.com/organization/invite/accept?token=…`

Rules:

- They cannot already be an active member of **another company**.
- If they only have a personal workspace, it is **parked**. After they leave your company, that personal workspace is restored (or a new one is created).
- You cannot invite yourself.

---

## Roles

| Role | Run tests | View wallet | Invite / remove | Rename org | Upgrade | Billing / plans | Leave |
|---|---|---|---|---|---|---|---|
| **Member** | Yes | View balance | No | No | No | No | Yes |
| **Admin** | Yes | View + plans | Invite; remove Members; promote Member → Admin | Yes | No | Yes | Yes |
| **Owner** | Yes | View + plans | All of the above; transfer Owner; remove Admins | Yes | Yes (from personal) | Yes | No — transfer first |

- You cannot change your own role.
- Only Owner can **downgrade** a role or **transfer ownership** (the previous Owner becomes Admin).
- Owner cannot be removed. Transfer ownership before leaving.

---

## Managing members

On **Organization**:

- Change a member's role from the role dropdown (permissions as above).
- **Remove** a member. They return to their personal workspace. Company credits stay with the company.
- **Leave organization** (Admin or Member). Same as being removed: personal workspace comes back.

---

## Rename

- Personal: **Settings** → rename workspace.
- Company: **Organization** → rename (Owner or Admin).

---

## Credits and tests

The workspace **Wallet** holds credits. Company credits are shared. Tests count against the organization's cap, not per person.

---

## Next step

See [**FAQ**](./faq) for limits, security, and billing questions.
