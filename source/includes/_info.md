# Info

Utility resource to receive status information from the backend. This is the only resource which can be used by anyone without any authorization. It can be used to test connectivity and the general availability of the service. In later releases, this method also returns important system messages which would normally be shows on the login screen.

## GET

`GET /v2/info`

> Request 

```shell--test
GET https://olbtest.bankfrick.li/webapi/v2/info
Content-Type: */*
Accept: application/json
       
...
```

```shell--production
GET https://olb.bankfrick.li/webapi/v2/info
Content-Type: */*
Accept: application/json
       
...
```

> Response

```shell
HTTP/1.1 200 OK
Content-Type: application/json
Signature: ...
algorithm: ...

                
{
  "version" : "2.2.5-20180831-1144",
  "environment" : "production",
  "messages" : [ {
    "title" : "Maintenance",
    "message" : "Due to maintenance work, online banking will not be available on 26.07.2021 from 05:00 to 06:00. We apologize for any inconvenience."
  } ]
}
```
Get the server status information. This includes the current version number of the application on the server as well as the current environment. If available, global status messages are returned as well.

**Response Codes**

| code | condition | type |
| ---- | --------- | ---- |
| 200 | Request successful | [Info](#data-types-info) (JSON) |

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/json | [Info](#data-types-info) (JSON) | The status information as json object |

**Response Headers**

| name | description |
| ---- | ----------- |
| signature | \<**signature**\> |
| algorithm | The used signing algorithm, e.g. rsa-sha512 |