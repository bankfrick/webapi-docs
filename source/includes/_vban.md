# Virtual IBAN

This API allows for creation, managing, and deactivation of associations between virtual IBANs (vIBANs) and reference
accounts (IBANs). This also includes the approval procedure for the activation and deactivation of vIBANs.

Users need to be authenticated using the `authorize` endpoint of the WebAPI with scope `account`.
Creating, approving, and deactivation of vIBANs requires signing permissions.

The base URL for all virtual IBANs is:

* **Test Environment**: `https://api-test.bankfrick.li/vban`
* **Production Environment**: `https://api.bankfrick.li/vban`

<aside class="notice">

- [OpenAPI JSON](https://raw.githubusercontent.com/bankfrick/webapi-docs/refs/heads/master/source/files/vban-public-openapi.json)
- [OpenAPI YAML](https://raw.githubusercontent.com/bankfrick/webapi-docs/refs/heads/master/source/files/vban-public-openapi.yaml)

</aside>

## Virtual IBAN States

Virtual IBANs follow a specific lifecycle with the following states:

* **PREPARED**: Initial state after creation, awaiting approval for activation
* **ACTIVE**: Virtual IBAN is active and can receive payments
* **DEACTIVATION_REQUESTED**: Deactivation has been initiated, awaiting approval
* **DEACTIVATED**: Virtual IBAN is permanently deactivated

## List Virtual IBANs

`GET /virtual-ibans`

> Request

```shell--test
GET https://api-test.bankfrick.li/vban/virtual-ibans?state=ACTIVE&pageSize=10
Content-Type: application/json
Accept: application/json
```

```shell--production
GET https://api.bankfrick.li/vban/virtual-ibans?state=ACTIVE&pageSize=10
Content-Type: application/json
Accept: application/json
```

> Response

```shell
HTTP/1.1 200 OK
Content-Type: application/json
Signature: ...
algorithm: rsa-sha512

{
  "virtualIbans": [
    {
      "createdAt": "2021-10-24T13:24:13.541Z",
      "createdBy": "user123",
      "vban": "LI6808811000000012345",
      "referenceAccountIban": "LI6808811MAINACCOUNT1",
      "name": "Customer Project A",
      "description": "Payments for Project A",
      "address": {
        "street": "Landstrasse",
        "number": "14",
        "city": "Balzers",
        "postalCode": "9496",
        "country": "LI"
      },
      "state": "ACTIVE",
      "activationApprovals": [
        {
          "contactNumber": 12345,
          "signatureType": "INDIVIDUAL",
          "signatureGroup": 1,
          "creationDetails": {
            "createdBy": "user123",
            "createdAt": "2021-10-24T13:25:00.000Z"
          }
        }
      ],
      "deactivationApprovals": []
    }
  ],
  "pagination": {
    "totalCount": 1,
    "pageIndex": 0,
    "pageSize": 10,
    "hasMore": false
  }
}
```

Retrieve a list of virtual IBANs with optional filtering and pagination.

### Request Parameters

| Parameter | Type  | Description                                                                        | Default |
| --------- | ----- | ---------------------------------------------------------------------------------- | ------- |
| account   | query | (optional) Filter by reference account IBANs (array)                               | -       |
| state     | query | (optional) Filter by state (PREPARED, ACTIVE, DEACTIVATION_REQUESTED, DEACTIVATED) | -       |
| pageIndex | query | (optional) Page index for pagination                                               | 0       |
| pageSize  | query | (optional) Number of results per page                                              | 100     |

### Response Codes

| Code | Description        | Type             |
| ---- | ------------------ | ---------------- |
| 200  | Request successful | VirtualIbansDto  |
| 400  | Bad request        | ErrorResponseDto |

### Response Headers

| Header    | Description                                   |
| --------- | --------------------------------------------- |
| signature | Cryptographic fingerprint of response body    |
| algorithm | Algorithm used for signing (e.g., rsa-sha512) |

## Get Virtual IBAN

`GET /virtual-ibans/{vban}`

> Request

```shell--test
GET https://api-test.bankfrick.li/vban/virtual-ibans/LI6808811000000012345
Content-Type: application/json
Accept: application/json
```

```shell--production
GET https://api.bankfrick.li/vban/virtual-ibans/LI6808811000000012345
Content-Type: application/json
Accept: application/json
```

> Response

```shell
HTTP/1.1 200 OK
Content-Type: application/json
Signature: ...
algorithm: rsa-sha512

{
  "createdAt": "2021-10-24T13:24:13.541Z",
  "createdBy": "user123",
  "vban": "LI6808811000000012345",
  "referenceAccountIban": "LI6808811MAINACCOUNT1",
  "name": "Customer Project A",
  "description": "Payments for Project A",
  "address": {
    "street": "Landstrasse",
    "number": "14",
    "city": "Balzers",
    "postalCode": "9496",
    "country": "LI"
  },
  "state": "ACTIVE",
  "activationApprovals": [
    {
      "contactNumber": 12345,
      "signatureType": "INDIVIDUAL",
      "signatureGroup": 1,
      "creationDetails": {
        "createdBy": "user123",
        "createdAt": "2021-10-24T13:25:00.000Z"
      }
    }
  ],
  "deactivationApprovals": []
}
```

Retrieve details of a specific virtual IBAN.

### Path Parameters

| Parameter | Type   | Description                 |
| --------- | ------ | --------------------------- |
| vban      | string | The virtual IBAN identifier |

### Response Codes

| Code | Description            | Type             |
| ---- | ---------------------- | ---------------- |
| 200  | Request successful     | VirtualIbanDto   |
| 400  | Bad request            | ErrorResponseDto |
| 404  | Virtual IBAN not found | ErrorResponseDto |

## Create Virtual IBAN

`POST /virtual-ibans`

> Request

```shell--test
POST https://api-test.bankfrick.li/vban/virtual-ibans
Content-Type: application/json
Accept: application/json
algorithm: rsa-sha512
signature: ...

{
  "referenceAccountIban": "LI6808811MAINACCOUNT1",
  "name": "Customer Project B",
  "description": "Dedicated IBAN for Project B payments",
  "address": {
    "street": "Landstrasse",
    "number": "14",
    "city": "Balzers",
    "postalCode": "9496",
    "country": "LI"
  }
}
```

```shell--production
POST https://api.bankfrick.li/vban/virtual-ibans
Content-Type: application/json
Accept: application/json
algorithm: rsa-sha512
signature: ...

{
  "referenceAccountIban": "LI6808811MAINACCOUNT1",
  "name": "Customer Project B",
  "description": "Dedicated IBAN for Project B payments",
  "address": {
    "street": "Landstrasse",
    "number": "14",
    "city": "Balzers",
    "postalCode": "9496",
    "country": "LI"
  }
}
```

> Response

```shell
HTTP/1.1 201 CREATED
Content-Type: application/json
Signature: ...
algorithm: rsa-sha512

{
  "createdAt": "2021-10-24T14:30:00.000Z",
  "createdBy": "user123",
  "vban": "LI6808811000000012346",
  "referenceAccountIban": "LI6808811MAINACCOUNT1",
  "name": "Customer Project B",
  "description": "Dedicated IBAN for Project B payments",
  "address": {
    "street": "Landstrasse",
    "number": "14",
    "city": "Balzers",
    "postalCode": "9496",
    "country": "LI"
  },
  "state": "PREPARED",
  "activationApprovals": [],
  "deactivationApprovals": []
}
```

Create a new virtual IBAN linked to a reference account. The virtual IBAN will be created in PREPARED state and requires approval before activation.

### Request Headers

| Header    | Type   | Description                             | Required |
| --------- | ------ | --------------------------------------- | -------- |
| algorithm | string | Signing algorithm (e.g., rsa-sha512)    | Yes      |
| signature | string | Cryptographic signature of request body | Yes      |

### Request Body

| Field                | Type   | Description                              | Required |
| -------------------- | ------ | ---------------------------------------- | -------- |
| referenceAccountIban | string | IBAN of the main account                 | No       |
| name                 | string | Name/label for the virtual IBAN          | No       |
| description          | string | Description of the virtual IBAN purpose  | No       |
| address              | object | Address associated with the virtual IBAN | No       |

### Response Codes

| Code | Description                       | Type             |
| ---- | --------------------------------- | ---------------- |
| 201  | Virtual IBAN created successfully | VirtualIbanDto   |
| 400  | Bad request                       | ErrorResponseDto |

# Activation

## Approve Activation

`PUT /virtual-ibans/activations/approvals`

> Request

```shell--test
PUT https://api-test.bankfrick.li/vban/virtual-ibans/activations/approvals
Content-Type: application/json
Accept: application/json
algorithm: rsa-sha512
signature: ...

{
  "vban": "LI6808811000000012346"
}
```

```shell--production
PUT https://api.bankfrick.li/vban/virtual-ibans/activations/approvals
Content-Type: application/json
Accept: application/json
algorithm: rsa-sha512
signature: ...

{
  "vban": "LI6808811000000012346"
}
```

> Response

```shell
HTTP/1.1 200 OK
Content-Type: application/json
Signature: ...
algorithm: rsa-sha512

{
  "createdAt": "2021-10-24T14:30:00.000Z",
  "createdBy": "user123",
  "vban": "LI6808811000000012346",
  "referenceAccountIban": "LI6808811MAINACCOUNT1",
  "name": "Customer Project B",
  "description": "Dedicated IBAN for Project B payments",
  "address": {
    "street": "Landstrasse",
    "number": "14",
    "city": "Balzers",
    "postalCode": "9496",
    "country": "LI"
  },
  "state": "ACTIVE",
  "activationApprovals": [
    {
      "contactNumber": 12345,
      "signatureType": "INDIVIDUAL",
      "signatureGroup": 1,
      "creationDetails": {
        "createdBy": "user456",
        "createdAt": "2021-10-24T14:35:00.000Z"
      }
    }
  ],
  "deactivationApprovals": []
}
```

Approve the activation of a virtual IBAN that is in PREPARED state. After sufficient approvals according to the signature rules, the virtual IBAN becomes ACTIVE.

### Request Headers

| Header    | Type   | Description                             | Required |
| --------- | ------ | --------------------------------------- | -------- |
| algorithm | string | Signing algorithm (e.g., rsa-sha512)    | Yes      |
| signature | string | Cryptographic signature of request body | Yes      |

### Request Body

| Field | Type   | Description                 | Required |
| ----- | ------ | --------------------------- | -------- |
| vban  | string | The virtual IBAN to approve | Yes      |

### Response Codes

| Code | Description         | Type             |
| ---- | ------------------- | ---------------- |
| 200  | Approval successful | VirtualIbanDto   |
| 400  | Bad request         | ErrorResponseDto |

# Deactivation

## Initiate Deactivation

`PUT /virtual-ibans/deactivations`

> Request

```shell--test
PUT https://api-test.bankfrick.li/vban/virtual-ibans/deactivations
Content-Type: application/json
Accept: application/json
algorithm: rsa-sha512
signature: ...

{
  "vban": "LI6808811000000012345"
}
```

```shell--production
PUT https://api.bankfrick.li/vban/virtual-ibans/deactivations
Content-Type: application/json
Accept: application/json
algorithm: rsa-sha512
signature: ...

{
  "vban": "LI6808811000000012345"
}
```

> Response

```shell
HTTP/1.1 200 OK
Content-Type: application/json
Signature: ...
algorithm: rsa-sha512

{
  "createdAt": "2021-10-24T13:24:13.541Z",
  "createdBy": "user123",
  "vban": "LI6808811000000012345",
  "referenceAccountIban": "LI6808811MAINACCOUNT1",
  "name": "Customer Project A",
  "description": "Payments for Project A",
  "address": {
    "street": "Landstrasse",
    "number": "14",
    "city": "Balzers",
    "postalCode": "9496",
    "country": "LI"
  },
  "state": "DEACTIVATION_REQUESTED",
  "activationApprovals": [...],
  "deactivationApprovals": []
}
```

Initiate the deactivation of an active virtual IBAN. The state changes to DEACTIVATION_REQUESTED and requires approval to complete.

### Request Headers

| Header    | Type   | Description                             | Required |
| --------- | ------ | --------------------------------------- | -------- |
| algorithm | string | Signing algorithm (e.g., rsa-sha512)    | Yes      |
| signature | string | Cryptographic signature of request body | Yes      |

### Request Body

| Field | Type   | Description                    | Required |
| ----- | ------ | ------------------------------ | -------- |
| vban  | string | The virtual IBAN to deactivate | Yes      |

### Response Codes

| Code | Description            | Type             |
| ---- | ---------------------- | ---------------- |
| 200  | Deactivation initiated | VirtualIbanDto   |
| 400  | Bad request            | ErrorResponseDto |

## Approve Deactivation

`PUT /virtual-ibans/deactivations/approvals`

> Request

```shell--test
PUT https://api-test.bankfrick.li/vban/virtual-ibans/deactivations/approvals
Content-Type: application/json
Accept: application/json
algorithm: rsa-sha512
signature: ...

{
  "vban": "LI6808811000000012345"
}
```

```shell--production
PUT https://api.bankfrick.li/vban/virtual-ibans/deactivations/approvals
Content-Type: application/json
Accept: application/json
algorithm: rsa-sha512
signature: ...

{
  "vban": "LI6808811000000012345"
}
```

> Response

```shell
HTTP/1.1 200 OK
Content-Type: application/json
Signature: ...
algorithm: rsa-sha512

{
  "createdAt": "2021-10-24T13:24:13.541Z",
  "createdBy": "user123",
  "vban": "LI6808811000000012345",
  "referenceAccountIban": "LI6808811MAINACCOUNT1",
  "name": "Customer Project A",
  "description": "Payments for Project A",
  "address": {
    "street": "Landstrasse",
    "number": "14",
    "city": "Balzers",
    "postalCode": "9496",
    "country": "LI"
  },
  "state": "DEACTIVATED",
  "activationApprovals": [...],
  "deactivationApprovals": [
    {
      "contactNumber": 12346,
      "signatureType": "INDIVIDUAL",
      "signatureGroup": 1,
      "creationDetails": {
        "createdBy": "user789",
        "createdAt": "2021-10-24T16:00:00.000Z"
      }
    }
  ]
}
```

Approve the deactivation of a virtual IBAN that is in DEACTIVATION_REQUESTED state. After sufficient approvals, the virtual IBAN becomes permanently DEACTIVATED.

### Request Headers

| Header    | Type   | Description                             | Required |
| --------- | ------ | --------------------------------------- | -------- |
| algorithm | string | Signing algorithm (e.g., rsa-sha512)    | Yes      |
| signature | string | Cryptographic signature of request body | Yes      |

### Request Body

| Field | Type   | Description                              | Required |
| ----- | ------ | ---------------------------------------- | -------- |
| vban  | string | The virtual IBAN deactivation to approve | Yes      |

### Response Codes

| Code | Description         | Type             |
| ---- | ------------------- | ---------------- |
| 200  | Approval successful | VirtualIbanDto   |
| 400  | Bad request         | ErrorResponseDto |