# Accounts

Listing of accounts, similar to the financial overview within the online banking. Will only show accounts visible to the user as defined by the customer to contact relation and permission.

## GET Accounts

`GET /v2/accounts`

> Request

```shell--sandbox
GET https://olbtest.bankfrick.li/webapi/v2/accounts
Content-Type: */*
Accept: application/json
Authorization: ...
           
...    
```

```shell--production
GET https://olb.bankfrick.li/webapi/v2/accounts
Content-Type: */*
Accept: application/json
Authorization: ...
           
...    
```

> Response

```shell
HTTP/1.1 200 OK
Content-Type: application/json
Signature: ...
algorithm: ...

                
{
  "date" : "2018-12-31",
  "moreResults" : false,
  "resultSetSize" : 2,
  "accounts" : [ {
    "account" : "0012345/001.000.001",
    "type" : "CURRENT ACCOUNT",
    "iban" : "LI6808811000000012345",
    "customer" : "0012345 Max Muster",
    "currency" : "CHF",
    "balance" : -1321.25,
    "available" : 0
  }, {
    "account" : "0012345/400.000.840",
    "type" : "TIME DEPOSITS/FIXED DEP. CUSTOMER",
    "customer" : "0012345 Max Muster",
    "currency" : "USD",
    "balance" : 515
  } ]
}
```

Get the list of accounts that are visible for the user.

**Request Parameters**

| name | type | description | default | constraints |
| ---- | ---- | ----------- | ------- | ----------- |
| Authorization | header | Bearer \<**token**\>
| firstPosition | query | (optional) Set the position of the first result to retrieve (offset), defaults to 0 | 0 | int |
| maxResults | query | 	(optional) Set the maximum number of results to retrieve (row_count), defaults to 100, max. 500 | 100 | int |
| order | query | (optional) Defines the ordering (by customer_number and account_number) of the result where order is one of (desc, asc), defaults to asc | asc

**Response Codes**

| code | condition | type |
| ---- | --------- | ---- |
| 200 | Request successful | [Accounts](#data-types-accounts) (JSON) |

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [Accounts](#data-types-accounts) (JSON) | The list accounts according to the filter parameters as json object. |

**Response Headers**

| name | description |
| ---- | ----------- |
| signature | \<**signature**\> |
| algorithm | The used signing algorithm, e.g. rsa-sha512 |

## GET Accounts Customer (filtered)

`GET /v2/accounts/{customer}/{account}`

> Request

```shell--sandbox
GET https://olbtest.bankfrick.li/webapi/v2/accounts/0012345/001.000.001
Content-Type: */*
Accept: application/json
Authorization: ...

                
...
```

```shell--production
GET https://olb.bankfrick.li/webapi/v2/accounts/0012345/001.000.001
Content-Type: */*
Accept: application/json
Authorization: ...

                
...
```

> Response

```shell
HTTP/1.1 200 OK
Content-Type: application/json
Signature: ...
algorithm: ...

                
{
  "date" : "2018-12-31",
  "moreResults" : false,
  "resultSetSize" : 2,
  "accounts" : [ {
    "account" : "0012345/001.000.001",
    "type" : "CURRENT ACCOUNT",
    "iban" : "LI6808811000000012345",
    "customer" : "0012345 Max Muster",
    "currency" : "CHF",
    "balance" : -1321.25,
    "available" : 0
  }, {
    "account" : "0012345/400.000.840",
    "type" : "TIME DEPOSITS/FIXED DEP. CUSTOMER",
    "customer" : "0012345 Max Muster",
    "currency" : "USD",
    "balance" : 515
  } ]
}
```

Get the list of accounts for the user and the given filter for customer number and account number. It is possible to search only for a customer or an account by leaving the filter parameter empty. E.g. /accounts/001.000.001 would search for accounts with the account number 001.000.001 on all visible customers for the user.

If a combination of filter parameters are applied, only accounts that match both conditions are returned.

**Request Parameters**

| name | type | description | default | constraints |
| ---- | ---- | ----------- | ------- | ----------- |
| Authorization | header | Bearer \<**token**\>
| account | path | (optional) The account to receive information for | | regex: ([0-9]{3}\.[0-9]{3}\.[0-9]{3})? |
| customer | path |	(optional) The customer number to receive account information for | | regex: ([0-9]{0,7})? |
| firstPosition | query | (optional) Set the position of the first result to retrieve (offset), defaults to 0 | 0 | int |
| maxResults | query | 	(optional) Set the maximum number of results to retrieve (row_count), defaults to 100, max. 2500 | 100 | int |
| order | query | (optional) Defines the ordering of the result where order is one of (desc, asc), defaults to asc | asc

**Response Codes**

| code | condition | type |
| ---- | --------- | ---- |
| 200 | Request successful | [Accounts](#data-types-accounts) (JSON) |

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [Accounts](#data-types-accounts) (JSON) | The list accounts according to the filter parameters as json object. |

**Response Headers**

| name | description |
| ---- | ----------- |
| signature | \<**signature**\> |
| algorithm | The used signing algorithm, e.g. rsa-sha512 |

## GET Accounts Customer Transactions

`GET /v2/accounts/{customer}/{account}/transactions`

`GET /v2/accounts/{customer}/{account}/transactions/{orderId}`

> Request

```shell--sandbox
GET https://olbtest.bankfrick.li/webapi/v2/accounts/0012345/001.000.001/transactions
Content-Type: */*
Accept: application/json
Authorization: ...
                
...
```

```shell--production
GET https://olb.bankfrick.li/webapi/v2/accounts/0012345/001.000.001/transactions
Content-Type: */*
Accept: application/json
Authorization: ...
                
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
    "amount" : "1000.00",
    "currency" : "EUR",
    "valuta" : "2018-08-02",
    "valutaIsExecutionDate" : true,
    "express" : false,
    "reference" : "Invoice number 123",
    "debitor" : {
      "accountNumber" : "0012345/001.000.001",
      "iban" : "LI6808811000000012345"
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

Get the list of payment orders for a given account. This will forward to the transactions resource. Returns orders that were created within the context of the online banking or external transactions. Booked and external transactions can also be retrieved using the camt052/camt053 services.

If a combination of filter parameters are applied, only orders that match all of the conditions are returned.

**Request Parameters**

| name | type | description | default | constraints |
| ---- | ---- | ----------- | ------- | ----------- |
| Authorization | header | Bearer \<**token**\>
| account | path | (optional) The account to receive information for | | regex: ([0-9]{3}\.[0-9]{3}\.[0-9]{3})? |
| customer | path | (optional) The customer number to filter the list of transactions for | | regex: ([0-9]{0,7})? |
| customId | query | (optional) Filter for custom id as it was assigned by the client on transaction creation. When searching for BOOKED transactions, the fromDate filter must be set accordingly, otherwise the query might not return the expected result.
| firstPosition | query | (optional) Set the position of the first result to retrieve (offset), defaults to 0 | 0 | int |
| fromDate | query | (optional) Starting date of the timespan for which to retrieve the data. The date should be provided in ISO 8601 format: YYYY-MM-DD, defaults to current day minus 30 days.
| maxAmount | query | (optional) Maximum amount for a transaction to appear in the report, this parameter should be URL-Encoded.
| maxResults | query | (optional) Set the maximum number of results to retrieve (row_count), defaults to 100, max. 2500 | 100 | int |
| minAmount | query | (optional) Minimum amount for a transaction to appear in the report, this parameter should be URL-Encoded.
| order | query | (optional) Defines the ordering (by orderId) of the result where order is one of (desc, asc), defaults to asc | asc
| reference | query | (optional) Filter for the reference (transaction information), this parameter should be URL-Encoded.
| searchIban | query | (optional) Filter for the beneficiary account iban.
| searchName | query | (optional) Filter for the beneficiary name, this parameter should be URL-Encoded.
| status | query | (optional) Filter for for transaction status. The status of transactions that where created in the context of online banking can be one of (PREPARED, IN_PROGRESS, DELETED, EXPIRED, EXECUTED, REJECTED, DELETION_REQUESTED). The status of booked transactions on the account is BOOKED. Note: BOOKED transactions (as known from the camt053 export) can only be queried by setting this filter to BOOKED otherwise only transactions that were created in the context of online banking are returned.
| toDate | query | (optional) Ending date of the timespan for which to retrieve the data. The date should be provided in ISO 8601 format: YYYY-MM-DD.	
| type | query | (optional) Filter for transaction type, expected one of (INTERNAL, BANK_INTERNAL, SEPA, FOREIGN, RED, ORANGE). Only relevant for transactions that were created in the context of online banking.	 

<aside class="notice">There is an additional request parameter when using <code>GET /v2/accounts/{customer}/{account}/transactions/{orderId}</code> </aside>

| name | type | description | default | constraints |
| ---- | ---- | ----------- | ------- | ----------- |
| orderId | path | (optional) The payment order id as it was assigned by the server to look for | | regex: ((?<=/)[0-9]{0,20})? |

**Response Codes**

| code | condition | type |
| ---- | --------- | ---- |
| 200 | Request successful | [Accounts](#data-types-accounts) (JSON) |

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | Accounts (JSON) | The list accounts according to the filter parameters as json object. |

**Response Headers**

| name | description |
| ---- | ----------- |
| signature | \<**signature**\> |
| algorithm | The used signing algorithm, e.g. rsa-sha512 |