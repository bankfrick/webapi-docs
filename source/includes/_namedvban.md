# Named Virtual IBANs (beta)

<aside class="notice">Named Virtual IBANs are currently available on the <strong>test environment only</strong> and are released as a <strong>beta</strong>: the contract may still change before general availability. All examples in this section therefore show the test environment. Please coordinate your onboarding with your Bank Frick contact.</aside>

A Named Virtual IBAN (Named VBAN) is a virtual IBAN permanently tied to one **end customer** which is a natural
person or a legal entity that your company holds the relationship with. Incoming payments to a Named VBAN can
therefore be formally addressed to that end customer (Me-to-Me deposits) and are routed to the safeguarding account
(reference account) stored on the VBAN.

Named VBANs live in their own endpoint tree under `/named-virtual-ibans` and use their own end-customer register
under `/end-customers`. The existing [Virtual IBAN](#virtual-iban) endpoints are unchanged and continue to serve
plain VBANs only.

|                                    | plain VBAN                                          | Named VBAN                                                             |
|------------------------------------|-----------------------------------------------------|------------------------------------------------------------------------|
| Identity of the party              | optional free-text `name` and `address` on the VBAN | mandatory `endCustomer` record with the regulatorily required data set |
| Name of the payee                  | free-text, unverified                               | derived from the end customer (`matchingName`)                         |
| Name matching on incoming payments | never                                               | performed by Bank Frick                                                |
| Endpoints                          | `/virtual-ibans`                                    | `/named-virtual-ibans`, `/end-customers`                               |

## Base URL and authentication

The Named VBAN API is part of the VBAN API and uses the same base URL and the same authentication as plain
virtual IBANs.

The end-customer and Named VBAN endpoints are exposed on the test environment only for the duration of the beta testing.
Plain [Virtual IBAN](#virtual-iban) endpoints remain available on both environments.

Users need to be authenticated using the [authorize](#authorize) endpoint of the web API with scope `account`; the
returned JWT is sent in the `Authorization` header. Request payloads must be signed and responses are signed, exactly
as described under [Signatures](#getting-started-signatures).

Creating and approving end customers and Named VBANs requires signing permissions:

* **End-customer** writes are evaluated against the signing rules of the Bank Frick customer the record is registered
  under. Account restrictions do not apply, because an end customer is not bound to a single account.
* **Named VBAN** writes are evaluated against the signing rules of the reference account, exactly as for plain VBANs.

## Concepts

### End customer

An end customer is registered once and can then be reused for several Named VBANs — for example one Named VBAN per
currency, each on the matching safeguarding account. End customers are scoped to one Bank Frick customer number.
Registering the same end customer for two different customer numbers requires two separate end customer records.

An end customer is addressed by the `id` that Bank Frick issues on creation. The id is immutable, and it is the only
way to reference the record in write requests. In addition, you may store your own identifier in the optional
`externalReference` field; it is stored verbatim, returned on every read.

An end customer is created in state `PREPARED` and becomes `ACTIVE` once your signing rules are satisfied. Only an
`ACTIVE` end customer can be linked to a Named VBAN.

### Named VBAN

A Named VBAN carries no `name` and no `address` of its own (as opposed to plain VBANs) since these attributes
belong to the linked end customer.
The name that incoming payments are matched against is the end customer's `matchingName`:

* natural person: `firstName` followed by `lastName`
* legal entity: `companyName`

The Bank Frick customer number of a Named VBAN is derived from the reference account and checked against the
end customer's own customer number. A Named VBAN and its end customer must belong to the same Bank Frick customer.

States are the same as for plain VBANs: `PREPARED` → `ACTIVE` → `DEACTIVATION_REQUESTED` → `DEACTIVATED`.

### Every write names both the VBAN and the end customer

Each Named VBAN modification request, e.g. activation approval, deactivation, deactivation approval, carries **both**
the `vban` and the `endCustomerId`, and is rejected unless the two match the stored values.
This way, each approver confirms explicitly *which end customer* a Named VBAN should be linked to.

### The two endpoint trees are disjoint

Every VBAN appears in exactly one place:

* `GET /virtual-ibans` returns plain VBANs only; `GET /named-virtual-ibans` returns Named VBANs only.
* The `/virtual-ibans` write and single-read endpoints reject a Named VBAN, and the `/named-virtual-ibans` endpoints
  reject a plain VBAN.

If you need your full inventory, call both lists.
Detailed end customer information beyond the summary provided by `GET /named-virtual-ibans` needs to be queried
separately via `GET /end-customers` or `GET /end-customers/{endCustomerId}`.

## Lifecycle

1. **Register the end customer** — `POST /end-customers/natural-persons` or `POST /end-customers/legal-entities`.
   State `PREPARED`, `id` returned.
2. **Approve the end customer** — `PUT /end-customers/approvals`, once per required signature. State becomes
   `ACTIVE`.
3. **Create the Named VBAN** — `POST /named-virtual-ibans` with the reference account and the end-customer id.
   State `PREPARED`, the VBAN is returned.
4. **Approve the activation** — `PUT /named-virtual-ibans/activations/approvals` with `vban` and `endCustomerId`,
   once per required signature. State becomes `ACTIVE` and the VBAN accepts incoming payments.
5. **Deactivate when no longer needed** — `PUT /named-virtual-ibans/deactivations`, followed by
   `PUT /named-virtual-ibans/deactivations/approvals` where the signing rule requires it.

An end customer whose Named VBANs are all deactivated simply remains registered and can be reused.

## End customer data set

The required data set differs by kind.

**Natural person** — `POST /end-customers/natural-persons`

| field              | required | description                                                                          |
|--------------------|----------|--------------------------------------------------------------------------------------|
| customerNumber     | yes      | The Bank Frick customer number this end customer belongs to (max. 7 characters).     |
| firstName          | yes      | Given name(s), max. 255 characters.                                                  |
| lastName           | yes      | Family name, max. 255 characters.                                                    |
| dateOfBirth        | yes      | ISO 8601 date, e.g. `1984-03-27`.                                                    |
| address            | yes      | Residential address, see [Address format](#named-virtual-ibans-beta-address-format). |
| countryOfResidence | yes      | ISO 3166-1 alpha-2 country code.                                                     |
| nationality        | yes      | ISO 3166-1 alpha-2 country code.                                                     |
| externalReference  | no       | Your own identifier, max. 255 characters.                                            |

**Legal entity** — `POST /end-customers/legal-entities`

| field                   | required | description                                                                         |
|-------------------------|----------|-------------------------------------------------------------------------------------|
| customerNumber          | yes      | The Bank Frick customer number this end customer belongs to (max. 7 characters).    |
| companyName             | yes      | Name or company name, max. 255 characters.                                          |
| legalForm               | yes      | Legal form, max. 255 characters.                                                    |
| address                 | yes      | Registered address, see [Address format](#named-virtual-ibans-beta-address-format). |
| countryOfDomicile       | yes      | ISO 3166-1 alpha-2 country code.                                                    |
| incorporationDate       | yes      | ISO 8601 date.                                                                      |
| commercialRegisterEntry | no       | `place` and `date` of the commercial-register entry, where applicable.              |
| representatives         | yes      | Names of the representative bodies. At least one entry; the order is preserved.     |
| externalReference       | no       | Your own identifier, max. 255 characters.                                           |

## Address format

End-customer addresses use an ISO 20022 structure. The most relevant elements are:

| element                       | description                                                                                                     |
|-------------------------------|-----------------------------------------------------------------------------------------------------------------|
| StrtNm                        | Street name, max. 140 characters.                                                                               |
| BldgNb                        | Building number, max. 16 characters.                                                                            |
| BldgNm                        | Building name, max. 140 characters.                                                                             |
| Flr                           | Floor, max. 70 characters.                                                                                      |
| Room                          | Room, max. 70 characters.                                                                                       |
| PstBx                         | Post box, max. 16 characters.                                                                                   |
| PstCd                         | Postal code, max. 16 characters.                                                                                |
| TwnNm                         | Town / city name, max. 140 characters.                                                                          |
| TwnLctnNm                     | Town location name, max. 140 characters.                                                                        |
| DstrctNm                      | District name, max. 140 characters.                                                                             |
| CtrySubDvsn                   | Country subdivision, max. 35 characters.                                                                        |
| Ctry                          | ISO 3166-1 alpha-2 country code.                                                                                |
| AdrLine                       | Address lines, for data that cannot be mapped to the elements above, max. 7 entries of max. 70 characters each. |
| CareOf, Dept, SubDept, UnitNb | Further optional qualifiers.                                                                                    |

<aside class="notice">We recommend supplying at least <code>StrtNm</code>, <code>BldgNb</code>, <code>PstCd</code>, <code>TwnNm</code> and <code>Ctry</code>. End-customer data is stored exactly as you send it. We only validate formal constraints, but we do not verify the content, normalise or reformat it, since the KYC responsibility for your end customers remains with you.</aside>

## Register a natural person

> Request

```shell--test
POST https://api-test.bankfrick.li/vban/end-customers/natural-persons
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
algorithm: ...


{
  "customerNumber" : "1234567",
  "externalReference" : "customer-1234abc",
  "firstName" : "Nikita",
  "lastName" : "Muster",
  "dateOfBirth" : "1984-03-27",
  "address" : {
    "StrtNm" : "Landstrasse",
    "BldgNb" : "14",
    "PstCd" : "9490",
    "TwnNm" : "Vaduz",
    "Ctry" : "LI"
  },
  "countryOfResidence" : "LI",
  "nationality" : "AT"
}
```

```shell--production
Named Virtual IBANs are not available on the production environment yet.
Switch to the test tab for the request examples.
```

> Response

```shell
HTTP/1.1 201 CREATED
Content-Type: application/json
Signature: ...
algorithm: ...


{
  "id" : "0198f3c2-4e5a-7b1d-9c8e-3f5a6b7c8d90",
  "kind" : "NATURAL_PERSON",
  "customerNumber" : "1234567",
  "externalReference" : "customer-1234abc",
  "matchingName" : "Nikita Muster",
  "firstName" : "Nikita",
  "lastName" : "Muster",
  "dateOfBirth" : "1984-03-27",
  "address" : {
    "StrtNm" : "Landstrasse",
    "BldgNb" : "14",
    "PstCd" : "9490",
    "TwnNm" : "Vaduz",
    "Ctry" : "LI"
  },
  "countryOfResidence" : "LI",
  "nationality" : "AT",
  "state" : "PREPARED",
  "activationApprovals" : [ ],
  "createdBy" : "Contact 6789",
  "createdAt" : "2026-08-27T09:14:22.531Z",
  "lastModifiedBy" : "Contact 6789",
  "lastModifiedAt" : "2026-08-27T09:14:22.531Z"
}
```

Registering a legal entity works the same way against `POST /end-customers/legal-entities`, with the legal-entity
data set and `"kind" : "LEGAL_ENTITY"` in the response.

## Approve an end customer

An end customer must be approved before a Named VBAN can be linked to it.
Repeat the call using suitable contacts until the signing rule of your customer is satisfied.

> Request

```shell--test
PUT https://api-test.bankfrick.li/vban/end-customers/approvals
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
algorithm: ...


{
  "endCustomerId" : "0198f3c2-4e5a-7b1d-9c8e-3f5a6b7c8d90"
}
```

```shell--production
Named Virtual IBANs are not available on the production environment yet.
Switch to the test tab for the request examples.
```

> Response

```shell
HTTP/1.1 200 OK
Content-Type: application/json
Signature: ...
algorithm: ...


{
  "id" : "0198f3c2-4e5a-7b1d-9c8e-3f5a6b7c8d90",
  "kind" : "NATURAL_PERSON",
  "customerNumber" : "1234567",
  "externalReference" : "customer-1234abc",
  "matchingName" : "Nikita Muster",
  "firstName" : "Nikita",
  "lastName" : "Muster",
  "dateOfBirth" : "1984-03-27",
  "address" : {
    "StrtNm" : "Landstrasse",
    "BldgNb" : "14",
    "PstCd" : "9490",
    "TwnNm" : "Vaduz",
    "Ctry" : "LI"
  },
  "countryOfResidence" : "LI",
  "nationality" : "AT",
  "state" : "ACTIVE",
  "activationApprovals" : [
    {
      "contactNumber" : 6789,
      "signatureType" : "INDIVIDUAL",
      "signatureGroup" : 1,
      "createdBy" : "Contact 6789",
      "createdAt" : "2026-08-27T09:20:41.108Z"
    }
  ],
  "createdBy" : "Contact 6789",
  "createdAt" : "2026-08-27T09:14:22.531Z",
  "lastModifiedBy" : "Contact 6789",
  "lastModifiedAt" : "2026-08-27T09:20:41.108Z"
}
```

## Read and list end customers

`GET /end-customers/{endCustomerId}` returns one full record. `GET /end-customers` returns your end-customer
register, paginated with `pageIndex` and `pageSize` (default 100, maximum 1000) and the same `pagination` envelope
as, e.g., the plain VBAN list.

Filters: `kind`, `state`, `externalReference` and `lastModifiedAfter`. Results are ordered newest first and are
limited to the Bank Frick customers you are authorised for.

> Request

```shell--test
GET https://api-test.bankfrick.li/vban/end-customers?kind=NATURAL_PERSON&state=ACTIVE&pageSize=10
Accept: application/json
Authorization: ...
```

```shell--production
Named Virtual IBANs are not available on the production environment yet.
Switch to the test tab for the request examples.
```

> Response

```shell
HTTP/1.1 200 OK
Content-Type: application/json
Signature: ...
algorithm: ...


{
  "endCustomers" : [
    {
      "id" : "0198f3c2-4e5a-7b1d-9c8e-3f5a6b7c8d90",
      "kind" : "NATURAL_PERSON",
      "customerNumber" : "1234567",
      "externalReference" : "customer-1234abc",
      "matchingName" : "Nikita Muster",
      "firstName" : "Nikita",
      "lastName" : "Muster",
      "dateOfBirth" : "1984-03-27",
      "address" : {
        "StrtNm" : "Landstrasse",
        "BldgNb" : "14",
        "PstCd" : "9490",
        "TwnNm" : "Vaduz",
        "Ctry" : "LI"
      },
      "countryOfResidence" : "LI",
      "nationality" : "AT",
      "state" : "ACTIVE",
      "activationApprovals" : [
        {
          "contactNumber" : 6789,
          "signatureType" : "INDIVIDUAL",
          "signatureGroup" : 1,
          "createdBy" : "Contact 6789",
          "createdAt" : "2026-08-27T09:20:41.108Z"
        }
      ],
      "createdBy" : "Contact 6789",
      "createdAt" : "2026-08-27T09:14:22.531Z",
      "lastModifiedBy" : "Contact 6789",
      "lastModifiedAt" : "2026-08-27T09:20:41.108Z"
    }
  ],
  "pagination" : {
    "pageIndex" : 0,
    "pageSize" : 10,
    "totalCount" : 1,
    "hasMore" : false
  }
}
```

## Create a Named VBAN

Requires an `ACTIVE` end customer and a reference account of the same Bank Frick customer. Neither `name` nor
`address` nor `customerNumber` may be sent — none of the three is the caller's to state.

> Request

```shell--test
POST https://api-test.bankfrick.li/vban/named-virtual-ibans
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
algorithm: ...


{
  "referenceAccountIban" : "LI4408811MAINACCOUNT1",
  "endCustomerId" : "0198f3c2-4e5a-7b1d-9c8e-3f5a6b7c8d90",
  "description" : "EUR deposits Nikita Muster"
}
```

```shell--production
Named Virtual IBANs are not available on the production environment yet.
Switch to the test tab for the request examples.
```

> Response

```shell
HTTP/1.1 201 CREATED
Content-Type: application/json
Signature: ...
algorithm: ...


{
  "vban" : "LI1108811V07QJ4M2XB9K",
  "referenceAccountIban" : "LI4408811MAINACCOUNT1",
  "customerNumber" : "1234567",
  "description" : "EUR deposits Nikita Muster",
  "state" : "PREPARED",
  "endCustomer" : {
    "id" : "0198f3c2-4e5a-7b1d-9c8e-3f5a6b7c8d90",
    "kind" : "NATURAL_PERSON",
    "customerNumber" : "1234567",
    "externalReference" : "customer-1234abc",
    "matchingName" : "Nikita Muster",
    "firstName" : "Nikita",
    "lastName" : "Muster",
    "dateOfBirth" : "1984-03-27",
    "address" : {
      "StrtNm" : "Landstrasse",
      "BldgNb" : "14",
      "PstCd" : "9490",
      "TwnNm" : "Vaduz",
      "Ctry" : "LI"
    },
    "countryOfResidence" : "LI",
    "nationality" : "AT",
    "state" : "ACTIVE",
    "activationApprovals" : [
      {
        "contactNumber" : 6789,
        "signatureType" : "INDIVIDUAL",
        "signatureGroup" : 1,
        "createdBy" : "Contact 6789",
        "createdAt" : "2026-08-27T09:20:41.108Z"
      }
    ],
    "createdBy" : "Contact 6789",
    "createdAt" : "2026-08-27T09:14:22.531Z",
    "lastModifiedBy" : "Contact 6789",
    "lastModifiedAt" : "2026-08-27T09:20:41.108Z"
  },
  "activationApprovals" : [ ],
  "deactivationApprovals" : [ ],
  "createdBy" : "Contact 6789",
  "createdAt" : "2026-08-27T09:31:05.742Z",
  "lastModifiedBy" : "Contact 6789",
  "lastModifiedAt" : "2026-08-27T09:31:05.742Z"
}
```

## Approve a Named VBAN

Approving the activation is also what confirms the link between the VBAN and its end customer, so both
identifiers are required. A mismatch is rejected and **no** approval is recorded.

> Request

```shell--test
PUT https://api-test.bankfrick.li/vban/named-virtual-ibans/activations/approvals
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
algorithm: ...


{
  "vban" : "LI1108811V07QJ4M2XB9K",
  "endCustomerId" : "0198f3c2-4e5a-7b1d-9c8e-3f5a6b7c8d90"
}
```

```shell--production
Named Virtual IBANs are not available on the production environment yet.
Switch to the test tab for the request examples.
```

> Response

```shell
HTTP/1.1 200 OK
Content-Type: application/json
Signature: ...
algorithm: ...


{
  "vban" : "LI1108811V07QJ4M2XB9K",
  "referenceAccountIban" : "LI4408811MAINACCOUNT1",
  "customerNumber" : "1234567",
  "description" : "EUR deposits Nikita Muster",
  "state" : "ACTIVE",
  "endCustomer" : {
    "id" : "0198f3c2-4e5a-7b1d-9c8e-3f5a6b7c8d90",
    "kind" : "NATURAL_PERSON",
    "customerNumber" : "1234567",
    "externalReference" : "customer-1234abc",
    "matchingName" : "Nikita Muster",
    "firstName" : "Nikita",
    "lastName" : "Muster",
    "dateOfBirth" : "1984-03-27",
    "address" : {
      "StrtNm" : "Landstrasse",
      "BldgNb" : "14",
      "PstCd" : "9490",
      "TwnNm" : "Vaduz",
      "Ctry" : "LI"
    },
    "countryOfResidence" : "LI",
    "nationality" : "AT",
    "state" : "ACTIVE",
    "activationApprovals" : [
      {
        "contactNumber" : 6789,
        "signatureType" : "INDIVIDUAL",
        "signatureGroup" : 1,
        "createdBy" : "Contact 6789",
        "createdAt" : "2026-08-27T09:20:41.108Z"
      }
    ],
    "createdBy" : "Contact 6789",
    "createdAt" : "2026-08-27T09:14:22.531Z",
    "lastModifiedBy" : "Contact 6789",
    "lastModifiedAt" : "2026-08-27T09:20:41.108Z"
  },
  "activationApprovals" : [
    {
      "contactNumber" : 6789,
      "signatureType" : "INDIVIDUAL",
      "signatureGroup" : 1,
      "createdBy" : "Contact 6789",
      "createdAt" : "2026-08-27T09:33:12.019Z"
    }
  ],
  "deactivationApprovals" : [ ],
  "createdBy" : "Contact 6789",
  "createdAt" : "2026-08-27T09:31:05.742Z",
  "lastModifiedBy" : "Contact 6789",
  "lastModifiedAt" : "2026-08-27T09:33:12.019Z"
}
```

## Read and list Named VBANs

`GET /named-virtual-ibans/{vban}` returns one Named VBAN together with the **full** end-customer record.

`GET /named-virtual-ibans` lists Named VBANs only. Each entry carries an end-customer **summary** rather
than the full record. Use the single read when you need further details.

Filters: `account`, `state`, and `lastModifiedAfter`, plus `pageIndex` and `pageSize`.
When `state` is omitted, every state except `DEACTIVATED` is returned.

> Request

```shell--test
GET https://api-test.bankfrick.li/vban/named-virtual-ibans?account=LI4408811MAINACCOUNT1&state=ACTIVE
Accept: application/json
Authorization: ...
```

```shell--production
Named Virtual IBANs are not available on the production environment yet.
Switch to the test tab for the request examples.
```

> Response

```shell
HTTP/1.1 200 OK
Content-Type: application/json
Signature: ...
algorithm: ...


{
  "namedVirtualIbans" : [
    {
      "vban" : "LI1108811V07QJ4M2XB9K",
      "referenceAccountIban" : "LI4408811MAINACCOUNT1",
      "customerNumber" : "1234567",
      "description" : "EUR deposits Nikita Muster",
      "state" : "ACTIVE",
      "endCustomer" : {
        "id" : "0198f3c2-4e5a-7b1d-9c8e-3f5a6b7c8d90",
        "kind" : "NATURAL_PERSON",
        "matchingName" : "Nikita Muster"
      },
      "activationApprovals" : [
        {
          "contactNumber" : 6789,
          "signatureType" : "INDIVIDUAL",
          "signatureGroup" : 1,
          "createdBy" : "Contact 6789",
          "createdAt" : "2026-08-27T09:33:12.019Z"
        }
      ],
      "deactivationApprovals" : [ ],
      "createdBy" : "Contact 6789",
      "createdAt" : "2026-08-27T09:31:05.742Z",
      "lastModifiedBy" : "Contact 6789",
      "lastModifiedAt" : "2026-08-27T09:33:12.019Z"
    }
  ],
  "pagination" : {
    "pageIndex" : 0,
    "pageSize" : 100,
    "totalCount" : 1,
    "hasMore" : false
  }
}
```

## Deactivate a Named VBAN

`PUT /named-virtual-ibans/deactivations` requests the deactivation, `PUT /named-virtual-ibans/deactivations/approvals`
approves it. Both carry `vban` and `endCustomerId`, and both verify the link.

An `ACTIVE` Named VBAN moves to `DEACTIVATION_REQUESTED` and then to `DEACTIVATED` once the signing rule is
satisfied. A `PREPARED` Named VBAN is deactivated immediately.
The end customer itself is not affected and stays registered.

> Request

```shell--test
PUT https://api-test.bankfrick.li/vban/named-virtual-ibans/deactivations
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
algorithm: ...


{
  "vban" : "LI1108811V07QJ4M2XB9K",
  "endCustomerId" : "0198f3c2-4e5a-7b1d-9c8e-3f5a6b7c8d90"
}
```

```shell--production
Named Virtual IBANs are not available on the production environment yet.
Switch to the test tab for the request examples.
```

> Response

```shell
HTTP/1.1 200 OK
Content-Type: application/json
Signature: ...
algorithm: ...


{
  "vban" : "LI1108811V07QJ4M2XB9K",
  "referenceAccountIban" : "LI4408811MAINACCOUNT1",
  "customerNumber" : "1234567",
  "description" : "EUR deposits Nikita Muster",
  "state" : "DEACTIVATION_REQUESTED",
  "endCustomer" : {
    "id" : "0198f3c2-4e5a-7b1d-9c8e-3f5a6b7c8d90",
    "kind" : "NATURAL_PERSON",
    "customerNumber" : "1234567",
    "externalReference" : "customer-1234abc",
    "matchingName" : "Nikita Muster",
    "firstName" : "Nikita",
    "lastName" : "Muster",
    "dateOfBirth" : "1984-03-27",
    "address" : {
      "StrtNm" : "Landstrasse",
      "BldgNb" : "14",
      "PstCd" : "9490",
      "TwnNm" : "Vaduz",
      "Ctry" : "LI"
    },
    "countryOfResidence" : "LI",
    "nationality" : "AT",
    "state" : "ACTIVE",
    "activationApprovals" : [
      {
        "contactNumber" : 6789,
        "signatureType" : "INDIVIDUAL",
        "signatureGroup" : 1,
        "createdBy" : "Contact 6789",
        "createdAt" : "2026-08-27T09:20:41.108Z"
      }
    ],
    "createdBy" : "Contact 6789",
    "createdAt" : "2026-08-27T09:14:22.531Z",
    "lastModifiedBy" : "Contact 6789",
    "lastModifiedAt" : "2026-08-27T09:20:41.108Z"
  },
  "activationApprovals" : [
    {
      "contactNumber" : 6789,
      "signatureType" : "INDIVIDUAL",
      "signatureGroup" : 1,
      "createdBy" : "Contact 6789",
      "createdAt" : "2026-08-27T09:33:12.019Z"
    }
  ],
  "deactivationApprovals" : [ ],
  "createdBy" : "Contact 6789",
  "createdAt" : "2026-08-27T09:31:05.742Z",
  "lastModifiedBy" : "Contact 6789",
  "lastModifiedAt" : "2026-08-27T10:02:57.610Z"
}
```

## Upgrade a plain VBAN to a Named VBAN

An existing plain VBAN can be assigned to an already registered end customer and continue to be used as a Named
VBAN: `POST /named-virtual-ibans/upgrades` requests the upgrade and `PUT /named-virtual-ibans/upgrades/approvals`
approves it, both with `vban` and `endCustomerId`.

Until the signing rule is satisfied, the upgrade stays `PENDING` and the plain VBAN keeps working exactly as before.
When the upgrade completes, the VBAN's own `name` and `address` are **replaced** by the end customer's
data and are no longer available.

<aside class="notice">The upgrade endpoints are not functional yet in the beta: they answer with example payloads and do not change any VBAN. We will announce when the upgrade becomes available on the test environment.</aside>

## Errors

Errors use the same `{ "reason": ..., "status": ... }` body as the plain VBAN endpoints.

| code | condition                                                                                                                                                                                                                                                             |
|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 400  | Validation error, can have multiple reasons like a missing, unknown or invalid field, a missing or invalid request signature, a mismatch between `vban` and `endCustomerId`, an end customer that is not yet `ACTIVE`, or a VBAN of the wrong kind for this endpoint. |
| 401  | Missing or invalid JWT.                                                                                                                                                                                                                                               |
| 403  | The request was refused before it reached the service, e.g. due to IP restrictions of the API Key.                                                                                                                                                                    |
| 404  | Record does not exist, or the caller has no permission to access it.                                                                                                                                                                                                  |
| 409  | The record was modified concurrently. Please retry the request.                                                                                                                                                                                                       |

For your own protection, unauthorised requests that address a record of another Bank Frick customer answer as if the
record did not exist, and it is never disclosed which customer it belongs to.

## Full specifications

- [VBAN OpenAPI JSON](https://raw.githubusercontent.com/bankfrick/webapi-docs/refs/heads/master/source/files/openapi/vban-public-openapi.json)
- [VBAN OpenAPI YAML](https://raw.githubusercontent.com/bankfrick/webapi-docs/refs/heads/master/source/files/openapi/vban-public-openapi.yaml)
