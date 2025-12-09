# Instant Transaction Notification Rules

Instant transactions can trigger near real-time notifications (similar to
regular [Webhooks](#getting-started-webhooks-classic)).

Clients can [create notification rules](#instant-transaction-notification-rules-create-rule) that instruct the system
to perform Rest calls to the defined custom URLs upon selected events,
e.g. when an incoming instant transaction has been booked.

This is managed by rules, which can specify for which customer and which notification types which webhook URLs will be
posted to.
To be able to create such rules, users need to be authenticated and have access to all accounts the rule will apply to.

A single rule can notify about one or multiple event types.

### Notification Rules Full Specifications

- [Notification Rules OpenAPI JSON](https://raw.githubusercontent.com/bankfrick/webapi-docs/refs/heads/SDE-1164-document-instant-transaction-notifications/source/files/notification-rules-openapi.json)
- [Notification Rules OpenAPI YAML](https://raw.githubusercontent.com/bankfrick/webapi-docs/refs/heads/SDE-1164-document-instant-transaction-notifications/source/files/notification-rules-openapi.yaml)

### Webhooks Specifications

- [Webhooks OpenAPI JSON](https://raw.githubusercontent.com/bankfrick/webapi-docs/refs/heads/SDE-1164-document-instant-transaction-notifications/source/files/notification-webhook-openapi.json)
- [Webhooks OpenAPI YAML](https://raw.githubusercontent.com/bankfrick/webapi-docs/refs/heads/SDE-1164-document-instant-transaction-notifications/source/files/notification-webhook-openapi.yaml)

## List Rules

Retrieve a list of rules the current user can see/edit.
The list will contain all rules the user has *currently* permission to see, regardless of who created them.
It is paginated and by default shows the first 100 rules (page 0, page size 100).

> Request

```shell--test
GET https://api-test.bankfrick.li/onlinebanking/notifications/topics/instant-transactions/rules
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
Algorithm: ...
```

```shell--production
GET https://api.bankfrick.li/onlinebanking/notifications/topics/instant-transactions/rules
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
Algorithm: ...
```

> Response

```shell--test
HTTP/1.1 200 OK
Content-Type: application/json
Signature: ...
Algorithm: ...
Body: see full specifications
```

```shell--production
HTTP/1.1 200 OK
Content-Type: application/json
Signature: ...
Algorithm: ...
Body: see full specifications
```

## Create Rules

New rules can be created to notify about selected events for given accounts.
One rule will be created for each listed account.

> Request

```shell--test
POST https://api-test.bankfrick.li/onlinebanking/notifications/topics/instant-transactions/rules
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
Algorithm: ...
Body: see full specifications
```

```shell--production
POST https://api.bankfrick.li/onlinebanking/notifications/topics/instant-transactions/rules
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
Algorithm: ...
Body: see full specifications
```

> Response

```shell--test
HTTP/1.1 201 CREATED
Content-Type: application/json
Signature: ...
Algorithm: ...
Body: see full specifications
```

```shell--production
HTTP/1.1 201 CREATED
Content-Type: application/json
Signature: ...
Algorithm: ...
Body: see full specifications
```

### Requirements

- the rule MUST specify at least one webhook URL
- webhook URLs MUST explicitly use the `https://` scheme
- the rule MUST specify at least one event type
- the acting user MUST have access to ALL listed accounts

## Deactivate Rule

In order to deactivate a rule, the rule ID must be sent in the request body.
This ID can be obtained from the response of the initial rule creation, or
from the corresponding rule when listing all rules.

> Request

```shell--test
POST https://api-test.bankfrick.li/onlinebanking/notifications/topics/instant-transactions/rules/deactivation
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
Algorithm: ...
Body: { "id": "af3fe4ef-a23f-436c-bfe9-aadeb9a85d36" }
```

```shell--production
POST https://api.bankfrick.li/onlinebanking/notifications/topics/instant-transactions/rules/deactivation
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
Algorithm: ...
Body: { "id": "af3fe4ef-a23f-436c-bfe9-aadeb9a85d36" }
```

> Response

```shell--test
HTTP/1.1 200 OK
Content-Type: application/json
Signature: ...
Algorithm: ...
Body: see full specifications
```

```shell--production
HTTP/1.1 200 OK
Content-Type: application/json
Signature: ...
Algorithm: ...
Body: see full specifications
```

## Activate Rule

An inactive rule can also be reactivated. Again, the rule ID must be sent in the request body.
This ID can be obtained from the response of the initial rule creation, or
from the corresponding rule when listing all rules.

> Request

```shell--test
POST https://api-test.bankfrick.li/onlinebanking/notifications/topics/instant-transactions/rules/activation
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
Algorithm: ...
Body: { "id": "af3fe4ef-a23f-436c-bfe9-aadeb9a85d36" }
```

```shell--production
POST https://api.bankfrick.li/onlinebanking/notifications/topics/instant-transactions/rules/activation
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
Algorithm: ...
Body: { "id": "af3fe4ef-a23f-436c-bfe9-aadeb9a85d36" }
```

> Response

```shell--test
HTTP/1.1 200 OK
Content-Type: application/json
Signature: ...
Algorithm: ...
Body: see full specifications
```

```shell--production
HTTP/1.1 200 OK
Content-Type: application/json
Signature: ...
Algorithm: ...
Body: see full specifications
```
