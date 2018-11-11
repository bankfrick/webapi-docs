# Transactions

Listing of payment orders similar to the transaction overview within the online banking. Returns only orders that were created within the context of the online banking. Booked and external transactions must be retrieved using the camt.052/camt.053 services.

## DELETE

`DELETE /v2/transactions`

> Request

```shell--sandbox
DELETE https://olbtest.bankfrick.li/webapi/deleteTransaction
Content-Type: application/json
Accept: application/json
Authentication: ...
Signature: ...
algorithm: ...

                
{
  "orderIds" : [ 20771 ]
}
```

```shell--production
DELETE https://olb.bankfrick.li/webapi/deleteTransaction
Content-Type: application/json
Accept: application/json
Authentication: ...
Signature: ...
algorithm: ...

                
{
  "orderIds" : [ 20771 ]
}
```

> Response

```shell
HTTP/1.1 200 OK
Content-Type: application/json
Signature: ...
algorithm: ...

                
{
  "moreResults" : false,
  "resultSetSize" : 1,
  "transactions" : [ {
    "orderId" : 20771,
    "customId" : "4711",
    "type" : "SEPA",
    "state" : "DELETED",
    "amount" : "1.000,00",
    "currency" : "EUR",
    "valuta" : "2018-08-02",
    "express" : false,
    "reference" : "Invoice number 123",
    "debitor" : {
      "accountNumber" : "00012345/001.000.001",
      "iban" : "LI6808811000000001234"
    },
    "creditor" : {
      "name" : "Max Muster",
      "iban" : "DE12500105170648489890",
      "bic" : "INGDDEFFXXX",
      "creditInsitution" : "ING-DiBa GERMANY"
    },
    "creator" : "6789 Max Muster",
    "right" : "Bevollmächtigter kollektiv zu 2",
    "groupPolicy" : "Group intern",
    "group" : 1,
    "approvals" : [ {
      "contact" : "6789 Max Muster",
      "group" : 1
    } ]
  } ]
}
```

Delete payment orders that are not yet fully approved, only payment orders in the PREPARED state and are created by the user can be deleted.

**Request Parameters**

| name | type | description |
| ---- | ---- | ----------- |
| Authentication | header | Bearer \<**token**\> |
| Signature | header | \<**signature**\> |
| algorithm | header | The used signing algorithm, e.g. rsa-sha512 |

**Request Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [DeleteTransaction](#data-types-deletetransaction) (JSON) | The request TAN delete body |

**Response Codes**

| code | condition | type |
| ---- | --------- | ---- |
| 200 | Request successful | [Transactions](#data-types-transactions) (JSON) |

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [Transactions](#data-types-transactions) (JSON) | No content |

**Response Headers**

| name | description |
| ---- | ----------- |
| signature | \<**signature**\> |
| algorithm | The used signing algorithm, e.g. rsa-sha512 |


## GET

`GET /v2/transactions`

`GET /v2/transactions/{orderId}`

> Request

```shell--sandbox
GET https://olbtest.bankfrick.li/webapi//transactions
Content-Type: */*
Accept: application/json
Authentication: ...
      
...
```

```shell--production
GET https://olb.bankfrick.li/webapi//transactions
Content-Type: */*
Accept: application/json
Authentication: ...
      
...
```

> Response

```shell
HTTP/1.1 200 OK
Content-Type: application/json
Signature: ...
algorithm: ...

                
{
  "moreResults" : false,
  "resultSetSize" : 1,
  "transactions" : [ {
    "orderId" : 20771,
    "customId" : "4711",
    "type" : "SEPA",
    "state" : "PREPARED",
    "amount" : "1.000,00",
    "currency" : "EUR",
    "valuta" : "2018-08-02",
    "express" : false,
    "reference" : "Invoice number 123",
    "debitor" : {
      "accountNumber" : "00012345/001.000.001",
      "iban" : "LI6808811000000001234"
    },
    "creditor" : {
      "name" : "Max Muster",
      "iban" : "DE12500105170648489890",
      "bic" : "INGDDEFFXXX",
      "creditInsitution" : "ING-DiBa GERMANY"
    },
    "creator" : "6789 Max Muster",
    "right" : "Bevollmächtigter kollektiv zu 2",
    "groupPolicy" : "Group intern",
    "group" : 1,
    "quorum" : 2,
    "approvals" : [ {
      "contact" : "6789 Max Muster",
      "group" : 1,
      "dateOfApproval" : "2018-08-22T10:07:02"
    } ]
  } ]
}
```

Get the list of payment orders based on the search parameters. The user also requires corresponding read privileges for the customer account.

If a combination of filter parameters are applied, only orders that match all of the conditions are returned.

**Request Parameters**

| name | type | description | default | constraints |
| ---- | ---- | ----------- | ------- | ----------- |
| Authentication | header | Bearer \<**token**\>
| firstPosition | query | (optional) Set the position of the first result to retrieve (offset), defaults to 0 | 0 | int |
| fromDate | query | (optional) Starting date of the timespan for which to retrieve the data. The date should be provided in ISO 8601 format: YYYY-MM-DD, defaults to current day minus 30 days, if no specific search parameter orderId or customId was given.
| maxAmount | query | (optional) Maximum amount for a transaction to appear in the report, this parameter should be URL-Encoded.
| maxResults | query | (optional) Set the maximum number of results to retrieve (row_count), defaults to 100, max. 500 | 100 | int |
| minAmount | query | (optional) Minimum amount for a transaction to appear in the report, this parameter should be URL-Encoded.
| order | query | (optional) Defines the ordering (by orderId) of the result where order is one of (desc, asc), defaults to asc | asc
| reference | query | (optional) Filter for the reference (transaction information), this parameter should be URL-Encoded.
| searchIban | query | (optional) Filter for the beneficiary account iban.
| searchName | query | (optional) Filter for the beneficiary name, this parameter should be URL-Encoded.
| status | query | (optional) Filter for for transaction status, expected one of (PREPARED, IN_PROGRESS, DELETED, EXPIRED, EXECUTED, REJECTED).
| toDate | query | (optional) Ending date of the timespan for which to retrieve the data. The date should be provided in ISO 8601 format: YYYY-MM-DD.
| type | query | (optional) Filter for transaction type, expected one of (INTERNAL, BANK_INTERNAL, SEPA, FOREIGN, RED, ORANGE).

**Response Codes**

| code | condition | type |
| ---- | --------- | ---- |
| 200 | Request successful | [Transactions](#data-types-transactions) (JSON) |

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [Transactions](#data-types-transactions) (JSON) | No content |

**Response Headers**

| name | description |
| ---- | ----------- |
| signature | \<**signature**\> |
| algorithm | The used signing algorithm, e.g. rsa-sha512 |

## PUT

`PUT /v2/transactions``

> Request

```shell--sandbox 

```

```shell--production

```

> Response

```shell


```

Create new payment orders similar to the create payment order dialogs within the online banking frontend. The required fields and field validation for each payment order depends on the order type. The frontend dialog and pain001 mapping rules apply for field validation. New payment orders can only be created for accounts with proper write privileges for the customers account. Created payment orders will be added to the system in the PREPARED state and can be approved using the “signTransaction” methods. The application must assign an idempotent customId to allow the system to identify duplicate requests. The server will then assign a unique orderId which is used to identify the transaction later for approval or deletion.

**Request Parameters**

| name | type | description | default | constraints |
| ---- | ---- | ----------- | ------- | ----------- |
| Authentication | header | Bearer \<**token**\>
| Signature | header | \<**signature**\> |
| algorithm | header | The used signing algorithm, e.g. rsa-sha512
| test | query | (optional) When given as true, the system validates the input and tries to process it but does not perform the final creation of the orders. Does not check for unique customIds. | false | boolean |

**Request Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [CreateTransaction](#data-types-createtransaction) (JSON) | The request TAN delete body |

**Response Codes**

| code | condition | type |
| ---- | --------- | ---- |
| 200 | Request successful | [Transactions](#data-types-transactions) (JSON) |
| 201 | Transactions created successfully | [Transactions](#data-types-transactions) (JSON) |

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [Transactions](#data-types-transactions) (JSON) | No content |

**Response Headers**

| name | description |
| ---- | ----------- |
| signature | \<**signature**\> |
| algorithm | The used signing algorithm, e.g. rsa-sha512 |