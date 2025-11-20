# Instant Transaction Notifications

Instant transactions can trigger instant notifications (similar to regular [WebHooks](#getting-started-webhooks)). 

This is managed by rules, which can specify for which customer and which notification types which webhook URLs will be 
posted to.  
To be able to create such rules, users need to be authenticated and have access to the customer the rule will apply to.

A single rule can send to multiple webhooks (e.g. a logging endpoint and a Slack channel), and it can notify about one
or multiple event types.

### POST

A `POST` request is used to create a new rule.

#### Requirements

- the rule MUST specify at least one webhook URL
- webhook URLs MUST explicitly use the `https://` scheme
- the rule MUST specify at least one event type

#### Event Types
*Incoming instant transactions*

- INSTANT_TRANSACTION_RECEIVED


### GET
A `GET` request is used to retrieve a list of rules the current user can see/edit. It is paginated and by default shows
the first 100 rules (page 0, page size 100).   
The list will contain all rules the user has *currently* permission to see, regardless of who created them.

### Full Specifications

#### Notification Rules API
- [OpenAPI JSON](https://raw.githubusercontent.com/bankfrick/webapi-docs/refs/heads/master/source/files/instant-notification-rules-openapi.json)
- [OpenAPI YAML](https://raw.githubusercontent.com/bankfrick/webapi-docs/refs/heads/master/source/files/instant-notification-rules-openapi.yaml)

#### Webhook Payload
- [OpenAPI JSON](https://raw.githubusercontent.com/bankfrick/webapi-docs/refs/heads/master/source/files/instant-notification-webhook-openapi.json)
- [OpenAPI YAML](https://raw.githubusercontent.com/bankfrick/webapi-docs/refs/heads/master/source/files/instant-notification-webhook-openapi.yaml)
