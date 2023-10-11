# Sign Transaction without TAN

With this resource, one or multiple transactions/orders can be approved without a TAN challenge. The contact must be eligible for this resource and it might be used to automate the creation and approval of orders without direct user interaction.

## POST

`POST /v2/signTransactionWithoutTan`

> Request

```shell--sandbox
POST https://olbtest.bankfrick.li/webapi/v2/signTransactionWithoutTan
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
algorithm: ...


{
  "orderIds" : [ 20771, 20772 ]
}
```

```shell--production
POST https://olb.bankfrick.li/webapi/v2/signTransactionWithoutTan
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
algorithm: ...


{
  "orderIds" : [ 20771, 20772 ]
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
      "name" : "Satoshi Nakamoto",
      "iban" : "DE12500105170648489890",
      "bic" : "INGDDEFFXXX",
      "creditInsitution" : "ING-DiBa GERMANY"
    },
    "creator" : "6789 Satoshi Nakamoto",
    "right" : "Bevollmächtigter kollektiv zu 2",
    "groupPolicy" : "Group intern",
    "group" : 1,
    "quorum" : 2,
    "approvals" : [ {
      "contact" : "6789 Satoshi Nakamoto",
      "group" : 1,
      "dateOfApproval" : "2018-08-22T10:07:02"
    } ]
  } ]
}
```

Sign a transaction without previously requesting a tan. This resource must be activated for the contact in the backend.

**Request Parameters**

| name | type | description |
| ---- | ---- | ----------- |
| Authorization | header | Bearer \<**token**\> |
| Signature | header | \<**signature**\> |
| algorithm | header | The used signing algorithm, e.g. rsa-sha512 |

**Request Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [SignTransactionsWithoutTan](#data-types-signtransactionswithouttan) (JSON) | The sign transactions without tan message body |

**Response Codes**

| code | condition | type |
| ---- | --------- | ---- |
| 200 | Request successful | [Transactions](#data-types-transactions) (JSON) |

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [Transactions](#data-types-transactions) (JSON) | The list of signed transactions as json object. |

**Response Headers**

| name | description |
| ---- | ----------- |
| signature | \<**signature**\> |
| algorithm | The used signing algorithm, e.g. rsa-sha512 |

# Sign Marketorder without TAN

## POST

`POST /v2/signTransactionWithoutTan/marketorder`

> Request

```shell--sandbox
POST https://olbtest.bankfrick.li/webapi/v2/signTransactionWithoutTan/marketorder
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
POST https://olb.bankfrick.li/webapi/v2/signTransactionWithoutTan/marketorder
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
      "name" : "Satoshi Nakamoto",
      "iban" : "LI6808811000000001234",
      "depot" : "1234567-000",
      "quantity" : 1,
      "riskClassification" : "CONFIRMATION_REQUIRED",
      "knowledge" : "CONFIRMED"
    }, {
      "accountNumber" : "1234567/001.000.001",
      "name" : "Satoshi Nakamoto",
      "iban" : "LI6808811000000001234",
      "depot" : "1234567-001",
      "quantity" : 1,
      "riskClassification" : "CONFIRMATION_REQUIRED",
      "knowledge" : "CONFIRMED"
    } ]
  } ]
}
```

Sign an order without previously requesting a tan. The contact must be eligible for this resource. If the order requires MiFID confirmation, the order must first be confirmed before it can be signed.

**Request Parameters**

| name | type | description |
| ---- | ---- | ----------- |
| Authorization | header | Bearer \<**token**\> |
| Signature | header | \<**signature**\> |
| algorithm | header | The used signing algorithm, e.g. rsa-sha512 |

**Request Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [	SignOrdersWithoutTan](#data-types-signorderswithouttan) (JSON) | The sign transactions without tan message body |

**Response Codes**

| code | condition | type |
| ---- | --------- | ---- |
| 200 | Request successful | [Marketorders](#data-types-marketorders) (JSON) |

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [Marketorders](#data-types-marketorders) (JSON) | The list of signed orders as json object. |

**Response Headers**

| name | description |
| ---- | ----------- |
| signature | \<**signature**\> |
| algorithm | The used signing algorithm, e.g. rsa-sha512 |