# Instant Transaction Notification Rules

Instant transactions can trigger near real-time notifications (similar to
regular [Webhooks](#getting-started-webhooks-classic)).

Clients can [create notification rules](#instant-transaction-notification-rules-create-rules) that instruct the system
to perform Rest calls to the defined custom URLs upon selected events,
e.g. when an incoming instant transaction has been booked.

This is managed by rules, which can specify for which customer and which notification types which webhook URLs will be
posted to.
To be able to create such rules, users need to be authenticated and have access to all accounts the rule will apply to.

A single rule can notify about one or multiple event types.

### Notification Rules Full Specifications

- [Notification Rules OpenAPI JSON](https://raw.githubusercontent.com/bankfrick/webapi-docs/refs/heads/master/source/files/openapi/notification-rules-openapi.json)
- [Notification Rules OpenAPI YAML](https://raw.githubusercontent.com/bankfrick/webapi-docs/refs/heads/master/source/files/openapi/notification-rules-openapi.yaml)

### Webhooks Specifications

- [Webhooks OpenAPI JSON](https://raw.githubusercontent.com/bankfrick/webapi-docs/refs/heads/master/source/files/openapi/notification-webhook-openapi.json)
- [Webhooks OpenAPI YAML](https://raw.githubusercontent.com/bankfrick/webapi-docs/refs/heads/master/source/files/openapi/notification-webhook-openapi.yaml)

#### Expected Performance

The configured webhook target is expected to respond within 3 seconds on average,
and the call will time out after 10 seconds (values may change in the future).
If the target fails to send back a success status within this time, the call will automatically be retried twice 
with a delay of a few seconds. After that, the webhook call will be marked as failed and not be retried anymore.

We reserve the right to declare a webhook target as unsuitable for receiving notifications.
This may, for example, happen if the target is repeatedly not reachable or consistently fails to reach the
expected performance goal.
In such cases, the system will automatically deactivate rules that use this target.

#### Breaking Changes

We do not consider adding new fields to the Webhook specifications defined above as breaking change.
Consumers should thus tolerate additional/unknown fields in the payload.

## List Rules

Retrieve a list of rules the current user can see/edit.
The list will contain all rules the user has *currently* permission to see, regardless of who created them.
It is paginated and by default shows the first 100 rules (page 0, page size 100).

By default, deleted rules are excluded from the list. To include them, adjust the query filter
accordingly (see full specifications).

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

## Delete Rule

An inactive rule can be permanently deleted by sending a `DELETE` request with the rule ID in the request body.
To prevent accidental deletions, only inactive rules can be deleted — active rules must be [deactivated](#instant-transaction-notification-rules-deactivate-rule) first.
This ID can be obtained from the response of the initial rule creation, or
from the corresponding rule when listing all rules.

Note that deletion is a soft delete: the rule will still be visible when
[listing rules](#instant-transaction-notification-rules-list-rules) with the appropriate filter. However, deleted rules cannot be reactivated.

> Request

```shell--test
DELETE https://api-test.bankfrick.li/onlinebanking/notifications/topics/instant-transactions/rules
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
Algorithm: ...
Body: { "id": "af3fe4ef-a23f-436c-bfe9-aadeb9a85d36" }
```

```shell--production
DELETE https://api.bankfrick.li/onlinebanking/notifications/topics/instant-transactions/rules
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
Algorithm: ...
Body: { "id": "af3fe4ef-a23f-436c-bfe9-aadeb9a85d36" }
```

> Response

```shell--test
HTTP/1.1 204 No Content
Signature: ...
Algorithm: ...
```

```shell--production
HTTP/1.1 204 No Content
Signature: ...
Algorithm: ...
```
