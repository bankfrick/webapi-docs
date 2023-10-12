# CustodyAccounts

Access to custody accounts. Listing of custody accounts and depot transactions.

## GET

`GET /v2/custodyaccounts`

> Request

```shell--sandbox
GET https://olbtest.bankfrick.li/webapi/v2/custodyaccounts
Content-Type: */*
Accept: application/json
Authorization: ...
           
...    
```

```shell--production
GET https://olb.bankfrick.li/webapi/v2/custodyaccounts
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
  "date" : "2019-12-31",
  "moreResults" : false,
  "resultSetSize" : 2,
  "accounts" : [ {
    "custodyAccount" : "0012345-000",
    "type" : "DEPOT MAX MUSTER",
    "customer" : "0012345 Max Muster"
  }, {
    "custodyAccount" : "0012345-001",
    "type" : "SECOND DEPOT MAX MUSTER",
    "customer" : "0012345 Max Muster"
  } ]
}
```

Listing of depots for the contact with basic information like: Deposit number, name, customer.

**Request Parameters**

| name | type | description | default | constraints |
| ---- | ---- | ----------- | ------- | ----------- |
| Authorization | header | Bearer \<**token**\>
| firstPosition | query | (optional) Set the position of the first result to retrieve (offset), defaults to 0	| 0 | int |
| maxResults | query | 	(optional) Set the maximum number of results to retrieve (row_count), defaults to 100, max. 2500 | 100 | int |
| order | query | (optional) Defines the ordering of the result where order is one of (desc, asc), defaults to asc | asc

**Response Codes**

| code | condition | type |
| ---- | --------- | ---- |
| 200 | Request successful | [CustodyAccounts](#data-types-custodyaccounts) (JSON) |

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [CustodyAccounts](#data-types-custodyaccounts) (JSON) | The list accounts according to the filter parameters as json object. |

**Response Headers**

| name | description |
| ---- | ----------- |
| signature | \<**signature**\> |
| algorithm | The used signing algorithm, e.g. rsa-sha512 |

## GET CustodyAccounts (filtered)

`GET /v2/custodyaccounts/{customer}`

> Request

```shell--sandbox
GET https://olbtest.bankfrick.li/webapi/v2/custodyaccounts/0012345
Content-Type: */*
Accept: application/json
Authorization: ...

                
...
```

```shell--production
GET https://olb.bankfrick.li/webapi/v2/custodyaccounts/0012345
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
  "date" : "2019-07-23",
  "moreResults" : true,
  "resultSetSize" : 2,
  "accounts" : [ {
    "custodyAccount" : "0012345-000",
    "type" : "DEPOT MAX MUSTER",
    "customer" : "0012345 Max Muster",
    "positions" : [ {
      "valorNumber" : "000001189343-000",
      "valorName" : "LYXOR ETF EURO STOXX 50 FCP DIST",
      "isin" : "FR0007054358",
      "valorCurrency" : "CHF",
      "currency" : "EUR",
      "currentPrice" : 29.84,
      "quantity" : 3505,
      "marketValutation" : 104589.2,
      "valorCategory" : "250 - FUNDS SECURITIES",
      "lastMovement" : "2018-12-07",
      "acqPrice" : 123236.26,
      "avePrice" : 35.16,
      "profLoss" : -18647.06
    }, {
      "valorNumber" : "000001963428-978",
      "valorName" : "ISHARES PLC CHINA LARGE CAP EUR",
      "isin" : "IE00B02KXK85",
      "valorCurrency" : "CHF",
      "currency" : "EUR",
      "currentPrice" : 101.77,
      "quantity" : 400,
      "marketValutation" : 40708,
      "valorCategory" : "250 - FUNDS SECURITIES",
      "lastMovement" : "2018-12-07",
      "acqPrice" : 40357.55,
      "avePrice" : 100.89,
      "profLoss" : 350.45
    } ]
  } ]
}
```

Access depot details including list of depot positions for a customer.

**Request Parameters**

| name | type | description | default | constraints |
| ---- | ---- | ----------- | ------- | ----------- |
| Authorization | header | Bearer \<**token**\>
| customer | path | The customer number to filter the list of depots | | regex: ((?<=/)[0-9]{0,7})? |
| firstPosition | query | (optional) Set the position of the first result to retrieve (offset), defaults to 0 | 0 | int |
| maxResults | query | (optional) Set the maximum number of results to retrieve (row_count), defaults to 100, max. 2500 | 100 | int |
| order | query | (optional) Defines the ordering of the result where order is one of (desc, asc), defaults to asc | asc |

**Response Codes**

| code | condition | type |
| ---- | --------- | ---- |
| 200 | Request successful | [CustodyAccounts](#data-types-custodyaccounts) (JSON) |

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [CustodyAccounts](#data-types-custodyaccounts) (JSON) | The custody account details including list of depot positions for the selected customer. |

**Response Headers**

| name | description |
| ---- | ----------- |
| signature | \<**signature**\> |
| algorithm | The used signing algorithm, e.g. rsa-sha512 |

<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

## GET CustodyAccounts Depot (filtered)

`GET /v2/custodyaccounts/{customer}-{depot}`

> Request

```shell--sandbox
GET https://olbtest.bankfrick.li/webapi/v2/custodyaccounts/0012345-000
Content-Type: */*
Accept: application/json
Authorization: ...
                
...
```

```shell--production
GET https://olb.bankfrick.li/webapi/v2/custodyaccounts/0012345-000
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
  "date" : "2019-07-23",
  "moreResults" : true,
  "resultSetSize" : 1,
  "accounts" : [ {
    "custodyAccount" : "0012345-000",
    "type" : "DEPOT MAX MUSTER",
    "customer" : "0012345 Max Muster",
    "positions" : [ {
      "valorNumber" : "000001189343-000",
      "valorName" : "LYXOR ETF EURO STOXX 50 FCP DIST",
      "isin" : "FR0007054358",
      "valorCurrency" : "CHF",
      "currency" : "EUR",
      "currentPrice" : 29.84,
      "quantity" : 3505,
      "marketValutation" : 104589.2,
      "valorCategory" : "250 - FUNDS SECURITIES",
      "lastMovement" : "2018-12-07",
      "acqPrice" : 123236.26,
      "avePrice" : 35.16,
      "profLoss" : -18647.06
    }]
  } ]
}
```

Access depot details including list of depot positions for a defined depot.


**Request Parameters**

| name | type | description | default | constraints |
| ---- | ---- | ----------- | ------- | ----------- |
| Authorization | header | Bearer \<**token**\>
| customer | path | The customer number to filter the list of depots | | regex: ((?<=/)[0-9]{0,7})? |
| depot | path | The depot number for which to retrieve the depot details information	
| firstPosition | query | (optional) Set the position of the first result to retrieve (offset), defaults to 0 | 0 | int |
| maxResults | query | (optional) Set the maximum number of results to retrieve (row_count), defaults to 100, max. 2500 | 100 | int |
| order | query | (optional) Defines the ordering of the result where order is one of (desc, asc), defaults to asc | asc |	 

**Response Codes**

| code | condition | type |
| ---- | --------- | ---- |
| 200 | Request successful | [CustodyAccounts](#data-types-custodyaccounts) (JSON) |

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [CustodyAccounts](#data-types-custodyaccounts) (JSON) | The custody account details including list of depot positions for the selected customer. |

**Response Headers**

| name | description |
| ---- | ----------- |
| signature | \<**signature**\> |
| algorithm | The used signing algorithm, e.g. rsa-sha512 |

<br><br><br><br>

## GET CustodyAccounts Depot Transactions (filtered)

`GET /v2/custodyaccounts/{customer}-{depot}/transactions`

> Request

```shell--sandbox
GET https://olbtest.bankfrick.li/webapi/v2/custodyaccounts/0012345-000/transactions
Content-Type: */*
Accept: application/json
Authorization: ...
                
...
```

```shell--production
GET https://olb.bankfrick.li/webapi/v2/custodyaccounts/0012345-000/transactions
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
  "date" : "2019-07-23",
  "moreResults" : true,
  "resultSetSize" : 1,
  "transactions" : [ {
    "refid" : "123456",
    "status" : "BOOKED",
    "orderType" : "VCN - REDEMPTION",
    "valorNumber" : "000000008882",
    "valorName" : "ACTIVE BOND FUND PLUS - CHF",
    "isin" : "LI0326842163",
    "rate" : 100.34,
    "transactionDate" : "2019-04-21",
    "quantity" : 200,
    "courtage" : 0,
    "fees" : 0,
    "exchange" : "011 - BALZERS",
    "currency" : "CHF",
    "totalAmount" : 20068
  } ]
}
```

Access order book with list of depot transactions within the defined period.


**Request Parameters**

| name | type | description | default | constraints |
| ---- | ---- | ----------- | ------- | ----------- |
| Authorization | header | Bearer \<**token**\>
| customer | path | The customer number to filter the list of depots |
| depot | path | The depot number for which to retrieve the depot details information	
| firstPosition | query | (optional) Set the position of the first result to retrieve (offset), defaults to 0 | 0 | int |
| fromDate | query | (optional) Starting date of the timespan for which to retrieve the data. The date should be provided in ISO 8601 format: YYYY-MM-DD, defaults to current day minus 30 days
| maxAmount | query | (optional) Maximum amount for a transaction to appear in the report, this parameter should be URL-Encoded
| maxResults | query | (optional) Set the maximum number of results to retrieve (row_count), defaults to 100, max. 2500 | 100 | int |
| minAmount | query | (optional) Minimum amount for a transaction to appear in the report, this parameter should be URL-Encoded
| order | query | (optional) Defines the ordering of the result where order is one of (desc, asc), defaults to asc | asc |	 
| toDate | query | (optional) Ending date of the timespan for which to retrieve the data. The date should be provided in ISO 8601 format: YYYY-MM-DD

**Response Codes**

| code | condition | type |
| ---- | --------- | ---- |
| 200 | Request successful | [CustodyAccountsTransactions](#data-types-custodyaccounttransactions) (JSON) |

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [CustodyAccountsTransactions](#data-types-custodyaccounttransactions) (JSON) | The custody account details including list of depot positions for the selected customer. |

**Response Headers**

| name | description |
| ---- | ----------- |
| signature | \<**signature**\> |
| algorithm | The used signing algorithm, e.g. rsa-sha512 |