# Accounts

Listing of accounts, similar to the financial overview within the online banking. Will only show accounts visible to the user as defined by the customer to contact relation and permission.

## `GET /v2/accounts`

> Request

```shell--sandbox
GET https://olbtest.bankfrick.li/webapi/accounts
Content-Type: */*
Accept: application/json
Authentication: ...
           
...    
```

```shell--production
GET https://olb.bankfrick.li/webapi/accounts
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
  "date" : "2018-12-31",
  "moreResults" : false,
  "resultSetSize" : 2,
  "accounts" : [ {
    "account" : "00012345/001.000.001",
    "type" : "CURRENT ACCOUNT",
    "iban" : "LI6808811000000001234",
    "customer" : "00012345 Max Muster",
    "currency" : "CHF",
    "balance" : -1321.25,
    "available" : 0
  }, {
    "account" : "00012345/400.000.840",
    "type" : "TIME DEPOSITS/FIXED DEP. CUSTOMER",
    "customer" : "00012345 Max Muster",
    "currency" : "USD",
    "balance" : 515
  } ]
}
```

Get the list of accounts that are visible for the user.

**Request Parameters**

| name | type | description | default | constraints |
| ---- | ---- | ----------- | ------- | ----------- |
| Authentication | header | Bearer \<**token**\>
| firstPosition | query | (optional) Set the position of the first result to retrieve (offset), defaults to 0 | 0 | int |
| maxResults | query | 	(optional) Set the maximum number of results to retrieve (row_count), defaults to 100, max. 500 | 100 | int |
| order | query | (optional) Defines the ordering (by customer_number and account_number) of the result where order is one of (desc, asc), defaults to asc | asc

**Response Codes**

| code | condition | type |
| ---- | --------- | ---- |
| 200 | Request successful | Accounts (JSON) |
| 400 | Validation of input parameters failed | Errors (JSON) |
| 401 | If no JWT was provided or JWT is invalid | Errors (JSON) |
| 403 | API key is invalid or any other condition hinders the login | Errors (JSON) |
| 423 | The authentication is valid but the user account is locked and cannot be accessed | Errors (JSON) |

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | Accounts (JSON) | The list accounts according to the filter parameters as json object. |

**Response Headers**

| name | description |
| ---- | ----------- |
| signature | \<**signature**\> |
| algorithm | The used signing algorithm, e.g. rsa-sha512 |