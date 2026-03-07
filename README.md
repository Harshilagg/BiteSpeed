# BiteSpeed Identity Reconciliation API

## Overview

This project implements the **Identity Reconciliation Service** for the BiteSpeed backend task.

The service receives a user's **email and/or phone number** and identifies whether the contact already exists in the system. If multiple records belong to the same person, the system links them together and returns a **consolidated identity response**.

The API ensures that:

* Duplicate identities are merged
* The **oldest contact remains the primary contact**
* New information is stored as **secondary contacts**
* The response contains the **full set of linked emails and phone numbers**

---

# Live API

Deployed on Render:

```
https://bitespeed-mt8n.onrender.com/identify
```

---

# API Endpoint

## POST /identify

### Request Body

```
{
  "email": "string | null",
  "phoneNumber": "string | null"
}
```

At least **one field must be provided**.

---

### Example Request

```
POST /identify
Content-Type: application/json

{
  "email": "lorraine@hillvalley.edu",
  "phoneNumber": "123456"
}
```

---

### Example Response

```
{
  "contact": {
    "primaryContactId": 1,
    "emails": [
      "lorraine@hillvalley.edu",
      "mcfly@hillvalley.edu"
    ],
    "phoneNumbers": [
      "123456",
      "999999"
    ],
    "secondaryContactIds": [2,3]
  }
}
```

---

# Identity Reconciliation Logic

The service follows these rules:

1. If **no matching contacts exist**, a new **primary contact** is created.
2. If a matching **email or phone number exists**, the existing identity is used.
3. If a request introduces **new information**, a **secondary contact** is created and linked to the primary.
4. If two **primary contacts later match**, the **oldest contact becomes the primary**, and the other becomes secondary.
5. The response returns the **complete merged identity graph**.

---

# Database Schema

Contact table fields:

| Field          | Description                            |
| -------------- | -------------------------------------- |
| id             | Unique identifier                      |
| email          | Email address                          |
| phoneNumber    | Phone number                           |
| linkedId       | Points to primary contact if secondary |
| linkPrecedence | primary / secondary                    |
| createdAt      | Contact creation timestamp             |
| updatedAt      | Last updated timestamp                 |
| deletedAt      | Soft delete timestamp                  |

---

# Tech Stack

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* SQLite (for development)
* Render (deployment)

---

# Project Structure

```
src
 ├ controllers
 │   identify.controller.ts
 ├ services
 │   identity.services.ts
 ├ repositories
 │   contact.repository.ts
 ├ routes
 │   identify.routes.ts
 ├ utils
 │   prisma.ts
 │   responseBuilder.ts
 └ server.ts

prisma
 └ schema.prisma
```

---

# Edge Cases Handled

The system correctly handles:

* Duplicate contact entries
* Multiple emails linked to the same phone
* Multiple phones linked to the same email
* Merging of two previously separate identities
* Requests with only email or only phone

---

# Deployment

The service is deployed on **Render**.

Live endpoint:

```
https://bitespeed-mt8n.onrender.com/identify
```

---

# Author

Harshil Aggarwal
