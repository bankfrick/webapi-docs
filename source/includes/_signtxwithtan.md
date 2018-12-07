# Sign Transaction with TAN

With this message, one or multiple payment orders can be approved by the contact with a TAN that was previously requested by the RequestTan message. Only payment orders can be approved that were previously referred in the TAN challenge request. Only one TAN challenge can be active at the time per API-Key.

`POST /v2/signTransactionWithTan``

> Request

```shell--sandbox
POST https://olbtest.bankfrick.li/webapi/signTransactionWithTan
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
algorithm: ...


{
  "challengeId" : "c6f8dd20-aad0-11e8-98d0-529269fb1459",
  "tan" : "123456"
}
```

```shell--production
POST https://olb.bankfrick.li/webapi/signTransactionWithTan
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
algorithm: ...


{
  "challengeId" : "c6f8dd20-aad0-11e8-98d0-529269fb1459",
  "tan" : "123456"
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
    "amount" : "1000.00",
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

Sign a transaction with a previously requested tan.

**Request Parameters**

| name | type | description |
| ---- | ---- | ----------- |
| Authorization | header | Bearer \<**token**\> |
| Signature | header | \<**signature**\> |
| algorithm | header | The used signing algorithm, e.g. rsa-sha512 |

**Request Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [SignTransactionsWithTan](#data-types-signtransactionswithtan) (JSON) | The request TAN delete body |

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