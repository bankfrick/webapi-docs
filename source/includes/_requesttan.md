# RequestTan

Request a TAN challenge in order to sign one or multiple transactions with the SignTransactionWithTan message.

## DELETE

`DELETE /v2/requestTan`

> Request

```shell--sandbox
DELETE https://olbtest.bankfrick.li/webapi/requestTan
Content-Type: application/json
Accept: application/json
Authentication: ...
Signature: ...
algorithm: ...

                
{
  "challengeId" : "c6f8dd20-aad0-11e8-98d0-529269fb1459"
}
```

```shell--production
DELETE https://olb.bankfrick.li/webapi/requestTan
Content-Type: application/json
Accept: application/json
Authentication: ...
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
| Authentication | header | Bearer \<**token**\> |
| Signature | header | \<**signature**\> |
| algorithm | header | The used signing algorithm, e.g. rsa-sha512 |

**Request Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | DeleteRequestTan (JSON) | The request TAN delete body |

**Response Codes**

| code | condition | type |
| ---- | --------- | ---- |
| 204 | Request successful
| 400 | Validation of input parameters failed or parameter is missing | Errors (JSON) |
| 401 | If no JWT was provided or JWT is invalid | Errors (JSON) |
| 403 | API key is invalid or any other condition hinders the login | Errors (JSON) |
| 423 | The authentication is valid but the user account is locked and cannot be accessed | Errors (JSON) |

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | object (JSON) | No content |

**Response Headers**

| name | description |
| ---- | ----------- |
| signature | \<**signature**\> |
| algorithm | The used signing algorithm, e.g. rsa-sha512 |

## POST

`POST /v2/requestTan`

Request a tan for previously created transactions used to sign the transactions. This will send a tan via the selected method to the contact. Only one tan challenge can be active per contact at a time and must be resolved within the returned expire time.

> Request

```shell--sandbox
POST https://olbtest.bankfrick.li/webapi/requestTan
Content-Type: application/json
Accept: application/json
Authentication: ...
Signature: ...
algorithm: ...

                
{
  "orderIds" : [ 20771, 20772 ],
  "method" : "SMS_TAN"
}
```

```shell--production
POST https://olb.bankfrick.li/webapi/requestTan
Content-Type: application/json
Accept: application/json
Authentication: ...
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
  "expires" : "2018-08-22T10:07:02.895"
}
```

**Request Parameters**

| name | type | description |
| ---- | ---- | ----------- |
| Authentication | header | Bearer \<**token**\> |
| Signature | header | \<**signature**\> |
| algorithm | header | The used signing algorithm, e.g. rsa-sha512 |

**Request Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | RequestTan (JSON) | The request TAN body |

**Response Codes**

| code | condition | type |
| ---- | --------- | ---- |
| 200 | Request successful | RequestTanResponse (JSON) |
| 400 | Validation of input parameters failed or parameter is missing | Errors (JSON) |
| 401 | If no JWT was provided or JWT is invalid | Errors (JSON) |
| 403 | API key is invalid or any other condition hinders the login | Errors (JSON) |
| 423 | The authentication is valid but the user account is locked and cannot be accessed | Errors (JSON) |

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | RequestTanResponse (JSON) | The request TAN response message as json object |

**Response Headers**

| name | description |
| ---- | ----------- |
| signature | \<**signature**\> |
| algorithm | The used signing algorithm, e.g. rsa-sha512 |