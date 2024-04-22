# Trading

Resource for searching of securities, query of valuation rates, entry of a market order and MIFID confirmation.

## DELETE

`DELETE /v2/trading`

> Request

```shell--test
DELETE https://olbtest.bankfrick.li/webapi/v2/trading
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
algorithm: ...


{
  "marketorderIds" : [ 20771 ]
}
```

```shell--production
DELETE https://olb.bankfrick.li/webapi/v2/trading
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
algorithm: ...

                
{
  "marketorderIds" : [ 20771 ]
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
  "marketorders" : [ {
    "marketorderId" : 123,
    "customId" : "M123",
    "date" : "2020-10-11",
    "state" : "PREPARED",
    "tradingType" : "BUY",
    "totalQuantity" : 2,
    "instrument" : {
      "valoren" : "00000130666",
      "suffix" : "000",
      "symbol" : "BTC",
      "name" : "BITCOINS",
      "additionalName" : "BITCOINS USD",
      "currency" : "USD",
      "domicile" : "LI",
      "denomination" : 1.0E-6,
      "type" : "CRYPTO_CURRENCIES",
      "canTrade" : true,
      "recentPrice" : {
        "dateTime" : "2020-10-10T17:49:04",
        "price" : 11317.796311,
        "currency" : "USD",
        "percentPrice" : false
      }
    },
    "depot" : [ {
      "accountNumber" : "1234567/001.000.001",
      "name" : "Max Muster",
      "iban" : "LI6808811000000001234",
      "depot" : "1234567-000",
      "quantity" : 1,
      "riskClassification" : "CONFIRMATION_REQUIRED",
      "knowledge" : "CONFIRMED"
    }, {
      "accountNumber" : "1234567/001.000.001",
      "name" : "Max Muster",
      "iban" : "LI6808811000000001234",
      "depot" : "1234567-001",
      "quantity" : 1,
      "riskClassification" : "CONFIRMATION_REQUIRED",
      "knowledge" : "CONFIRMED"
    } ]
  } ]
}
```

Service to reject market orders. Only market orders that are not yet fully approved and in state PREPARED can be rejected.

**Request Parameters**

| name | type | description |
| ---- | ---- | ----------- |
| Authorization | header | Bearer \<**token**\> |
| Signature | header | \<**signature**\> |
| algorithm | header | The used signing algorithm, e.g. rsa-sha512 |

**Request Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [DeleteMarketorders](#data-types-deletemarketorders) (JSON) | The reject market orders json object |

**Response Codes**

| code | condition | type |
| ---- | --------- | ---- |
| 200 | Request successful | [MarketOrders](#data-types-marketorders) (JSON) |

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [MarketOrders](#data-types-marketorders) (JSON) | The list of rejected market orders |

**Response Headers**

| name | description |
| ---- | ----------- |
| signature | \<**signature**\> |
| Trading-Hours | contains a note about the current stock exchange trading hours |
| algorithm | The used signing algorithm, e.g. rsa-sha512 |


## GET

`GET /v2/trading`

> Request

```shell--test
GET https://olbtest.bankfrick.li/webapi/v2/trading
Content-Type: application/json
Accept: application/json
Authorization: ...
      
...
```

```shell--production
GET https://olb.bankfrick.li/webapi/v2/trading
Content-Type: application/json
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
  "marketorders" : [ {
    "marketorderId" : 123,
    "customId" : "M123",
    "date" : "2020-10-11",
    "state" : "PREPARED",
    "tradingType" : "BUY",
    "totalQuantity" : 2,
    "instrument" : {
      "valoren" : "00000130666",
      "suffix" : "000",
      "symbol" : "BTC",
      "name" : "BITCOINS",
      "additionalName" : "BITCOINS USD",
      "currency" : "USD",
      "domicile" : "LI",
      "denomination" : 1.0E-6,
      "type" : "CRYPTO_CURRENCIES",
      "canTrade" : true,
      "recentPrice" : {
        "dateTime" : "2020-10-10T17:49:04",
        "price" : 11317.796311,
        "currency" : "USD",
        "percentPrice" : false
      }
    },
    "depot" : [ {
      "accountNumber" : "1234567/001.000.001",
      "name" : "Max Muster",
      "iban" : "LI6808811000000001234",
      "depot" : "1234567-000",
      "quantity" : 1,
      "riskClassification" : "CONFIRMATION_REQUIRED",
      "knowledge" : "CONFIRMED"
    }, {
      "accountNumber" : "1234567/001.000.001",
      "name" : "Max Muster",
      "iban" : "LI6808811000000001234",
      "depot" : "1234567-001",
      "quantity" : 1,
      "riskClassification" : "CONFIRMATION_REQUIRED",
      "knowledge" : "CONFIRMED"
    } ]
  } ]
}
```

Get the list of market orders based on the search parameters.

If a combination of filter parameters are applied, only orders that match all of the conditions are returned.

**Request Parameters**

| name | type | description | default | constraints |
| ---- | ---- | ----------- | ------- | ----------- |
| Authorization | header | Bearer \<**token**\>
| customId | query | (optional) Filter for custom marketorder id as it was assigned by the client on order creation.
| depot | query | (optional) Filter for depot number. 
| firstPosition | query | (optional) Set the position of the first result to retrieve (offset), defaults to 0 | 0 | int 
| fromDate | query | (optional) Starting date of the timespan for which to retrieve the data. The date should be provided in ISO 8601 format: YYYY-MM-DD, defaults to current day minus 30 days. 
| isin | query | (optional) Filter for isin.
| maxResults | query | (optional) Set the maximum number of results to retrieve (row_count), defaults to 100, max. 2500 | 100 | int
| order | query | 	(optional) Defines the ordering of the result where order is one of (desc, asc), defaults to asc | asc
| status | query | (optional) Filter for for market order status. The status of market orders that where created in the context of online banking can be one of (PREPARED, IN_PROGRESS, DELETED, EXPIRED, EXECUTED, REJECTED).
| toDate | query | (optional) Ending date of the timespan for which to retrieve the data. The date should be provided in ISO 8601 format: YYYY-MM-DD.
| valoren | query | (optional) Filter for valoren number.

**Response Codes**

| code | condition | type |
| ---- | --------- | ---- |
| 200 | Request successful | [MarketOrders](#data-types-marketorders) (JSON) |

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [MarketOrders](#data-types-marketorders) (JSON) | The list of market orders according to the filter parameters as json object. |

**Response Headers**

| name | description |
| ---- | ----------- |
| signature | \<**signature**\> |
| Trading-Hours | contains a note about the current stock exchange trading hours |
| algorithm | The used signing algorithm, e.g. rsa-sha512 |

## PUT

`PUT /v2/trading`

> Request

```shell--test
PUT https://olbtest.bankfrick.li/webapi/v2/trading
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
algorithm: ...


{
  "marketorders" : [ {
    "customId" : "1234",
    "valoren" : "130666",
    "suffix" : "000",
    "tradingType" : "BUY",
    "totalQuantity" : 2,
    "depot" : [ {
      "iban" : "LI6808811000000001234",
      "depot" : "1234567-000",
      "quantity" : 1
    }, {
      "iban" : "LI6808811000000001234",
      "depot" : "1234567-001",
      "quantity" : 1
    } ]
  } ]
}
```

```shell--production
PUT https://olb.bankfrick.li/webapi/v2/trading
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
algorithm: ...

                
{
  "marketorders" : [ {
    "customId" : "1234",
    "valoren" : "130666",
    "suffix" : "000",
    "tradingType" : "BUY",
    "totalQuantity" : 2,
    "depot" : [ {
      "iban" : "LI6808811000000001234",
      "depot" : "1234567-000",
      "quantity" : 1
    }, {
      "iban" : "LI6808811000000001234",
      "depot" : "1234567-001",
      "quantity" : 1
    } ]
  } ]
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
  "marketorders" : [ {
    "marketorderId" : 123,
    "customId" : "M123",
    "date" : "2020-10-11",
    "state" : "PREPARED",
    "tradingType" : "BUY",
    "totalQuantity" : 2,
    "instrument" : {
      "valoren" : "00000130666",
      "suffix" : "000",
      "symbol" : "BTC",
      "name" : "BITCOINS",
      "additionalName" : "BITCOINS USD",
      "currency" : "USD",
      "domicile" : "LI",
      "denomination" : 1.0E-6,
      "type" : "CRYPTO_CURRENCIES",
      "canTrade" : true,
      "recentPrice" : {
        "dateTime" : "2020-10-10T17:49:04",
        "price" : 11317.796311,
        "currency" : "USD",
        "percentPrice" : false
      }
    },
    "depot" : [ {
      "accountNumber" : "1234567/001.000.001",
      "name" : "Max Muster",
      "iban" : "LI6808811000000001234",
      "depot" : "1234567-000",
      "quantity" : 1,
      "riskClassification" : "CONFIRMATION_REQUIRED",
      "knowledge" : "CONFIRMED"
    }, {
      "accountNumber" : "1234567/001.000.001",
      "name" : "Max Muster",
      "iban" : "LI6808811000000001234",
      "depot" : "1234567-001",
      "quantity" : 1,
      "riskClassification" : "CONFIRMATION_REQUIRED",
      "knowledge" : "CONFIRMED"
    } ]
  } ]
}
```

Creates a new market order. A block order is implicitly created if the order contains more than one target depot.

**Request Parameters**

| name | type | description | default | constraints |
| ---- | ---- | ----------- | ------- | ----------- |
| Authorization | header | Bearer \<**token**\> | | |
| Signature | header | \<**signature**\> | | |
| algorithm | header | The used signing algorithm, e.g. rsa-sha512 | | |
| test | query | 	(optional) When given as true, the system validates the input and tries to process it but does not perform the final creation of the orders. | false | boolean |

**Request Body**

| media type | data type |
| ---------- | --------- |
| application/json | [CreateMarketorders](#data-types-createmarketorders) (JSON)

**Response Codes**

| code | condition | type |
| ---- | --------- | ---- |
| 200 | Request successful | [MarketOrders](#data-types-marketorders) (JSON) |

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [MarketOrders](#data-types-marketorders) (JSON) | The list of market orders that where or would be created in the system. |

**Response Headers**

| name | description |
| ---- | ----------- |
| signature | \<**signature**\> |
| Trading-Hours | contains a note about the current stock exchange trading hours |
| algorithm | The used signing algorithm, e.g. rsa-sha512 |

## POST Trading confirmMifid

`POST /v2/trading/confirmMifid`

> Request

```shell--test
POST https://olbtest.bankfrick.li/webapi/v2/trading/confirmMifid
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
algorithm: ...


{
  "marketorderIds" : [ 123, 456 ],
  "confirmRiskClassification" : false,
  "confirmKnowledge" : true
}
```

```shell--production
POST https://olb.bankfrick.li/webapi/v2/trading/confirmMifid
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
algorithm: ...

                
{
  "marketorderIds" : [ 123, 456 ],
  "confirmRiskClassification" : false,
  "confirmKnowledge" : true
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
  "marketorders" : [ {
    "marketorderId" : 123,
    "customId" : "M123",
    "date" : "2020-10-11",
    "state" : "PREPARED",
    "tradingType" : "BUY",
    "totalQuantity" : 2,
    "instrument" : {
      "valoren" : "00000130666",
      "suffix" : "000",
      "symbol" : "BTC",
      "name" : "BITCOINS",
      "additionalName" : "BITCOINS USD",
      "currency" : "USD",
      "domicile" : "LI",
      "denomination" : 1.0E-6,
      "type" : "CRYPTO_CURRENCIES",
      "canTrade" : true,
      "recentPrice" : {
        "dateTime" : "2020-10-10T17:49:04",
        "price" : 11317.796311,
        "currency" : "USD",
        "percentPrice" : false
      }
    },
    "depot" : [ {
      "accountNumber" : "1234567/001.000.001",
      "name" : "Max Muster",
      "iban" : "LI6808811000000001234",
      "depot" : "1234567-000",
      "quantity" : 1,
      "riskClassification" : "CONFIRMATION_REQUIRED",
      "knowledge" : "CONFIRMED"
    }, {
      "accountNumber" : "1234567/001.000.001",
      "name" : "Max Muster",
      "iban" : "LI6808811000000001234",
      "depot" : "1234567-001",
      "quantity" : 1,
      "riskClassification" : "CONFIRMATION_REQUIRED",
      "knowledge" : "CONFIRMED"
    } ]
  } ]
}
```

MiFID confirmation must explicitly be given if required before requesting a tan for approval of the order.

**Request Parameters**

| name | type | description |
| ---- | ---- | ----------- |
| Authorization | header | Bearer \<**token**\> |
| Signature | header | \<**signature**\> |
| algorithm | header | The used signing algorithm, e.g. rsa-sha512 |

**Request Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [ConfirmMifid](#data-types-confirmmifid) (JSON) | The confirm mifid message body |

**Response Codes**

| code | condition | type |
| ---- | --------- | ---- |
| 200 | Request successful | [MarketOrders](#data-types-marketorders) (JSON) |

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [MarketOrders](#data-types-marketorders) (JSON) | The list of confirmed marketorders as json object. |

**Response Headers**

| name | description |
| ---- | ----------- |
| signature | \<**signature**\> |
| Trading-Hours | contains a note about the current stock exchange trading hours |
| algorithm | The used signing algorithm, e.g. rsa-sha512 |

## GET Trading Instrument

`GET /v2/trading/instrument`

> Request

```shell--test
GET https://olbtest.bankfrick.li/webapi/v2/trading/instrument
Content-Type: application/json
Accept: application/json
Authorization: ...
      
...
```

```shell--production
GET https://olb.bankfrick.li/webapi/v2/trading/instrument
Content-Type: application/json
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
  "valoren" : "000000130666",
  "suffix" : "000",
  "symbol" : "BTC",
  "name" : "BITCOINS",
  "companyName" : "BITCOINS USD",
  "currency" : "USD",
  "domicile" : "LI",
  "denomination" : 1.0E-6,
  "type" : "CRYPTO_CURRENCIES",
  "canTrade" : true,
  "recentPrice" : {
    "dateTime" : "2020-10-02T09:48:04",
    "price" : 10504.56688,
    "currency" : "USD",
    "percentPrice" : false
  }
}
```

Reads a specific instrument including the recent valuation price. The requested securities must be identified either by isin or valoren number and suffix.

**Request Parameters**

| name | type | description |
| ---- | ---- | ----------- |
| Authorization | header | Bearer \<**token**\>
| isin | query | the isin of the financial instrument |
| suffix | query | the suffix in case if the valoren number is not unique |
| valoren | query | the valoren number |

**Response Codes**

| code | condition | type |
| ---- | --------- | ---- |
| 200 | Request successful | [Instrument](#data-types-instrument) (JSON) |

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [Instrument](#data-types-instrument) (JSON) | the found value paper information |

**Response Headers**

| name | description |
| ---- | ----------- |
| signature | \<**signature**\> |
| Trading-Hours | contains a note about the current stock exchange trading hours |
| algorithm | The used signing algorithm, e.g. rsa-sha512 |

## GET Trading Search

`GET /v2/trading/search`

> Request

```shell--test
GET https://olbtest.bankfrick.li/webapi/v2/trading/search
Content-Type: application/json
Accept: application/json
Authorization: ...
      
...
```

```shell--production
GET https://olb.bankfrick.li/webapi/v2/trading/search
Content-Type: application/json
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
  "moreResults" : true,
  "resultSetSize" : 2,
  "securities" : [ {
    "valoren" : "000000130496",
    "suffix" : "000",
    "symbol" : "BCH",
    "name" : "BITCOIN CASH",
    "companyName" : "BITCOIN CASH CHF",
    "currency" : "CHF",
    "domicile" : "LI",
    "denomination" : 1.0E-6,
    "type" : "CRYPTO_CURRENCIES",
    "canTrade" : true,
    "recentPrice" : {
      "dateTime" : "2020-10-02T09:48:04",
      "price" : 202.73984,
      "currency" : "CHF",
      "percentPrice" : false
    }
  }, {
    "valoren" : "000000130497",
    "suffix" : "000",
    "symbol" : "BCH",
    "name" : "BITCOIN CASH",
    "companyName" : "BITCOIN CASH EUR",
    "currency" : "EUR",
    "domicile" : "LI",
    "denomination" : 1.0E-6,
    "type" : "CRYPTO_CURRENCIES",
    "canTrade" : true,
    "recentPrice" : {
      "dateTime" : "2020-10-02T09:48:04",
      "price" : 188.086896,
      "currency" : "EUR",
      "percentPrice" : false
    }
  } ]
}
```

Allows to search for financial instruments.

**Request Parameters**

| name | type | description | default | constraints |
| ---- | ---- | ----------- | ------- | ----------- |
| Authorization | header | Bearer \<**token**\> | | |
| firstPosition | query | 	(optional) Set the position of the first result to retrieve (offset), defaults to 0 | 0 | int |
| input | query | 	the string to search for (must be url encoded), can be ISIN, NSIN-CH or generic search string. |
| maxResults | query | 	(optional) Set the maximum number of results to retrieve (row_count), defaults to 100, max. 2500 | 100 | int |
| order | query | (optional) Defines the ordering of the result where order is one of (desc, asc), defaults to asc | asc | |
| type |query | (optional) can be used to limit the securities types of the search result | |	"BONDS" or "CRYPTO_CURRENCIES" or "FUNDS" or "STOCKS" or "STRUCTURED_PRODUCTS" |

**Response Codes**

| code | condition | type |
| ---- | --------- | ---- |
| 200 | Request successful | [InstrumentSearchResult](#data-types-instrumentsearchresult) (JSON) |

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [InstrumentSearchResult](#data-types-instrumentsearchresult) (JSON) | The list of found securities as search result |

**Response Headers**

| name | description |
| ---- | ----------- |
| signature | \<**signature**\> |
| Trading-Hours | contains a note about the current stock exchange trading hours |
| algorithm | The used signing algorithm, e.g. rsa-sha512 |

## GET Trading {marketorderId}

`GET /v2/{marketorderId}`

> Request

```shell--test
GET https://olbtest.bankfrick.li/webapi/v2/trading/{marketorderId}
Content-Type: application/json
Accept: application/json
Authorization: ...
      
...
```

```shell--production
GET https://olb.bankfrick.li/webapi/v2/trading/{marketorderId}
Content-Type: application/json
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
  "marketorders" : [ {
    "marketorderId" : 123,
    "customId" : "M123",
    "date" : "2020-10-11",
    "state" : "PREPARED",
    "tradingType" : "BUY",
    "totalQuantity" : 2,
    "instrument" : {
      "valoren" : "00000130666",
      "suffix" : "000",
      "symbol" : "BTC",
      "name" : "BITCOINS",
      "additionalName" : "BITCOINS USD",
      "currency" : "USD",
      "domicile" : "LI",
      "denomination" : 1.0E-6,
      "type" : "CRYPTO_CURRENCIES",
      "canTrade" : true,
      "recentPrice" : {
        "dateTime" : "2020-10-10T17:49:04",
        "price" : 11317.796311,
        "currency" : "USD",
        "percentPrice" : false
      }
    },
    "depot" : [ {
      "accountNumber" : "1234567/001.000.001",
      "name" : "Max Muster",
      "iban" : "LI6808811000000001234",
      "depot" : "1234567-000",
      "quantity" : 1,
      "riskClassification" : "CONFIRMATION_REQUIRED",
      "knowledge" : "CONFIRMED"
    }, {
      "accountNumber" : "1234567/001.000.001",
      "name" : "Max Muster",
      "iban" : "LI6808811000000001234",
      "depot" : "1234567-001",
      "quantity" : 1,
      "riskClassification" : "CONFIRMATION_REQUIRED",
      "knowledge" : "CONFIRMED"
    } ]
  } ]
}
```

Get the list of market orders based on the search parameters.

If a combination of filter parameters are applied, only orders that match all of the conditions are returned.

**Request Parameters**

| name | type | description | default | constraints |
| ---- | ---- | ----------- | ------- | ----------- |
| Authorization | header | Bearer \<**token**\> | | |
| marketorderId | path | 	(optional) The market order id as it was assigned by the online banking. | | 	regex: ((?<=/)[0-9]{0,20})? |
| customId | query | (optional) Filter for custom marketorder id as it was assigned by the client on order creation. |
| depot | query | (optional) Filter for depot number. |
| firstPosition | query | (optional) Set the position of the first result to retrieve (offset), defaults to 0 | 0 | int |
| fromDate | query | (optional) Starting date of the timespan for which to retrieve the data. The date should be provided in ISO 8601 format: YYYY-MM-DD, defaults to current day minus 30 days. |
| isin | query | (optional) Filter for isin. |
| maxResults | query | (optional) Set the maximum number of results to retrieve (row_count), defaults to 100, max. 2500 | 100 | int |
| order | query | (optional) Defines the ordering of the result where order is one of (desc, asc), defaults to asc | asc |
| status | query | (optional) Filter for for market order status. The status of market orders that where created in the context of online banking can be one of (PREPARED, IN_PROGRESS, DELETED, EXPIRED, EXECUTED, REJECTED). |
| toDate | query | (optional) Ending date of the timespan for which to retrieve the data. The date should be provided in ISO 8601 format: YYYY-MM-DD. |
| valoren | query | (optional) Filter for valoren number. |

**Response Codes**

| code | condition | type |
| ---- | --------- | ---- |
| 200 | Request successful | [MarketOrders](#data-types-marketorders) (JSON) |

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [MarketOrders](#data-types-marketorders) (JSON) | The list of market orders according to the filter parameters as json object. |

**Response Headers**

| name | description |
| ---- | ----------- |
| signature | \<**signature**\> |
| Trading-Hours | contains a note about the current stock exchange trading hours |
| algorithm | The used signing algorithm, e.g. rsa-sha512 |