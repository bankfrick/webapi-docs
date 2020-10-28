# RequestTan

Request a TAN challenge in order to sign one or multiple transactions with the SignTransactionWithTan message.

## POST

`POST /v2/requestTan`

Request a tan for previously created transactions used to sign the transactions. This will send a tan via the selected method to the contact. Only one tan challenge can be active per contact at a time and must be resolved within the returned expire time.

> Request

```shell--sandbox
POST https://olbtest.bankfrick.li/webapi/v2/requestTan
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
algorithm: ...

                
{
  "orderIds" : [ 20771, 20772 ],
  "method" : "SMS_TAN"
}
```

```shell--production
POST https://olb.bankfrick.li/webapi/v2/requestTan
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
algorithm: ...

                
{
  "orderIds" : [ 20771, 20772 ],
  "method" : "SMS_TAN"
}
```

> Response

```shell
HTTP/1.1 200 OK
Content-Type: application/json
Signature: ...
algorithm: ...

                
{
  "challengeId" : "c6f8dd20-aad0-11e8-98d0-529269fb1459",
  "expires" : "2020-08-22T10:07:02.895"
}
```

**Request Parameters**

| name | type | description |
| ---- | ---- | ----------- |
| Authorization | header | Bearer \<**token**\> |
| Signature | header | \<**signature**\> |
| algorithm | header | The used signing algorithm, e.g. rsa-sha512 |

**Request Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [RequestTan](#data-types-requesttan) (JSON) | The request TAN body |

**Response Codes**

| code | condition | type |
| ---- | --------- | ---- |
| 200 | Request successful | [RequestTanResponse](#data-types-requesttanresponse) (JSON) |

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [RequestTanResponse](#data-types-requesttanresponse) (JSON) | The request TAN response message as json object |

**Response Headers**

| name | description |
| ---- | ----------- |
| signature | \<**signature**\> |
| algorithm | The used signing algorithm, e.g. rsa-sha512 |


## DELETE

`DELETE /v2/requestTan`

> Request

```shell--sandbox
DELETE https://olbtest.bankfrick.li/webapi/v2/requestTan
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
algorithm: ...

                
{
  "challengeId" : "c6f8dd20-aad0-11e8-98d0-529269fb1459"
}
```

```shell--production
DELETE https://olb.bankfrick.li/webapi/v2/requestTan
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
algorithm: ...

                
{
  "challengeId" : "c6f8dd20-aad0-11e8-98d0-529269fb1459"
}
```

> Response

```shell
HTTP/1.1 204 No Content
Content-Type: application/json
Signature: ...
algorithm: ...
      
...
```

Delete a ongoing TAN request challenge.

**Request Parameters**

| name | type | description |
| ---- | ---- | ----------- |
| Authorization | header | Bearer \<**token**\> |
| Signature | header | \<**signature**\> |
| algorithm | header | The used signing algorithm, e.g. rsa-sha512 |

**Request Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [DeleteRequestTan](#data-types-deleterequesttan) (JSON) | The request TAN delete body |
| orderIds | array of number | The order ids (as assigned from the server) to request a tan for. Either orderIds, customIds or combination of both must be given. |
| customIds | array of string | The custom ids (as assigned from the client) to request a tan for. Either orderIds, customIds or combination of both must be given. |

**Response Codes**

| code | condition | type |
| ---- | --------- | ---- |
| 204 | Request successful

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | object (JSON) | No content |

**Response Headers**

| name | description |
| ---- | ----------- |
| signature | \<**signature**\> |
| algorithm | The used signing algorithm, e.g. rsa-sha512 |


## POST marketorder

`POST /v2/requestTan/marketorder`

Request a tan for previously created orders used to sign the market orders. This will send a tan via the selected method to the contact. Only one tan challenge can be active per contact at a time and must be resolved within the returned expire time.

> Request

```shell--sandbox
POST https://olbtest.bankfrick.li/webapi/v2/requestTan/marketorder
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
algorithm: ...

                
{
  "orderIds" : [ 20771, 20772 ],
  "method" : "SMS_TAN"
}
```

```shell--production
POST https://olb.bankfrick.li/webapi/v2/requestTan/marketorder
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
algorithm: ...

                
{
  "orderIds" : [ 20771, 20772 ],
  "method" : "SMS_TAN"
}
```

> Response

```shell
HTTP/1.1 200 OK
Content-Type: application/json
Signature: ...
algorithm: ...

                
{
  "challengeId" : "c6f8dd20-aad0-11e8-98d0-529269fb1459",
  "expires" : "2020-08-22T10:07:02.895"
}
```

**Request Parameters**

| name | type | description |
| ---- | ---- | ----------- |
| Authorization | header | Bearer \<**token**\> |
| Signature | header | \<**signature**\> |
| algorithm | header | The used signing algorithm, e.g. rsa-sha512 |

**Request Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [RequestTanOrder](#data-types-requesttanorder) (JSON) | The request TAN body |

**Response Codes**

| code | condition | type |
| ---- | --------- | ---- |
| 200 | Request successful | [RequestTanResponse](#data-types-requesttanresponse) (JSON) |

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [RequestTanResponse](#data-types-requesttanresponse) (JSON) | The request TAN response message as json object |

**Response Headers**

| name | description |
| ---- | ----------- |
| signature | \<**signature**\> |
| algorithm | The used signing algorithm, e.g. rsa-sha512 |