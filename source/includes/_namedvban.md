# Named Virtual IBANs (beta)

<aside class="notice">Named Virtual IBANs are currently available on the <strong>test environment only</strong> and are released as a <strong>beta</strong>: the contract may still change before general availability. All examples in this section therefore show the test environment. Please coordinate your onboarding with your Bank Frick contact.</aside>

A Named Virtual IBAN (Named VBAN) is a virtual IBAN permanently tied to one **end customer** which is a natural
person or a legal entity that your company holds the relationship with. Incoming payments to a Named VBAN can
therefore be formally addressed to that end customer (Me-to-Me deposits) and are routed to the reference account stored on the VBAN.

Named VBANs live in their own endpoint tree under `/named-virtual-ibans` and use their own end customer records
under `/end-customers`. The existing [Virtual IBAN](#virtual-iban) endpoints are unchanged and continue to serve
VBANs only.

|                                    | VBAN                                                | Named VBAN                                                             |
|------------------------------------|-----------------------------------------------------|------------------------------------------------------------------------|
| Identity of the party              | optional free-text `name` and `address` on the VBAN | mandatory `endCustomer` record with the regulatorily required data set |
| Endpoints                          | `/virtual-ibans`                                    | `/named-virtual-ibans`, `/end-customers`                               |

## Base URL and authentication

The Named VBAN API is part of the VBAN API and uses the same base URL and the same authentication as the
existing VBAN endpoints.

The end customer and Named VBAN endpoints are exposed on the test environment only for the duration of the beta testing.
[Virtual IBAN](#virtual-iban) endpoints remain available on both environments.

Users need to be authenticated using the [authorize](#authorize) endpoint of the web API with scope `account`; the
returned JWT is sent in the `Authorization` header. Request payloads must be signed and responses are signed, exactly
as described under [Signatures](#getting-started-signatures).

Creating and approving end customers and Named VBANs requires signing permissions:

* **End-customer** writes are evaluated against the signing rules of the Bank Frick customer the record is created
  under. Account restrictions do not apply, because an end customer is not bound to a single account.
* **Named VBAN** writes are evaluated against the signing rules of the reference account, exactly as for VBANs.

## Concepts

### End customer

An end customer is created once and can then be reused for several Named VBANs — for example one Named VBAN per
currency, each on the matching reference account. End customers are scoped to one Bank Frick customer number.
Creating the same end customer for two different customer numbers requires two separate end customer records.

An end customer is addressed by the `id` that Bank Frick issues on creation. The id is immutable, and it is the only
way to reference the record in write requests. In addition, you may store your own identifier in the optional
`externalReference` field; it is stored verbatim, returned on every read.

An end customer is created in state `PREPARED` and becomes `ACTIVE` once your signing rules are satisfied. Only an
`ACTIVE` end customer can be linked to a Named VBAN.

### Named VBAN

A Named VBAN carries no `name` and no `address` of its own, since these attributes belong to the linked
end customer.
The name that incoming payments are matched against is the end customer's `matchingName`:

* natural person: `firstName` followed by `lastName`
* legal entity: `companyName`

The Bank Frick customer number of a Named VBAN is derived from the reference account and checked against the
end customer's own customer number. A Named VBAN and its end customer must belong to the same Bank Frick customer.

States are the same as for VBANs: `PREPARED` → `ACTIVE` → `DEACTIVATION_REQUESTED` → `DEACTIVATED`.

### Every modification requires both the VBAN and the end customer as input

Each Named VBAN modification request, e.g. activation approval, deactivation, deactivation approval, carries **both**
the `vban` and the `endCustomerId`, and is rejected unless the two match the stored values.
This way, each approver confirms explicitly *which end customer* a Named VBAN should be linked to.

### The two endpoint trees are disjoint

Every VBAN appears in exactly one place:

* `GET /virtual-ibans` returns VBANs only; `GET /named-virtual-ibans` returns Named VBANs only.
* The `/virtual-ibans` write and single-read endpoints reject a Named VBAN, and the `/named-virtual-ibans` endpoints
  reject any VBAN that is not a Named VBAN.

If you need your full inventory, call both lists.
Detailed end customer information beyond the summary provided by `GET /named-virtual-ibans` needs to be queried
separately via `GET /end-customers` or `GET /end-customers/{endCustomerId}`.

## Lifecycle

1. **Create the end customer** — `POST /end-customers/natural-persons` or `POST /end-customers/legal-entities`.
   State `PREPARED`, `id` returned.
2. **Approve the end customer** — `PUT /end-customers/approvals`, once per required signature. State becomes
   `ACTIVE`.
3. **Create the Named VBAN** — `POST /named-virtual-ibans` with the reference account and the end customer id.
   State `PREPARED`, the VBAN is returned.
4. **Approve the Named VBAN** — `PUT /named-virtual-ibans/activations/approvals` with `vban` and `endCustomerId`,
   once per required signature. State becomes `ACTIVE` and the VBAN accepts incoming payments.
5. **Deactivate when no longer needed** — `PUT /named-virtual-ibans/deactivations`, followed by
   `PUT /named-virtual-ibans/deactivations/approvals` where the signing rule requires it.

An end customer whose Named VBANs are all deactivated simply remains available and can be reused.

## End customer data set

The required data set differs by type.

**Natural person** — `POST /end-customers/natural-persons`

| field                   | required | description                                                                          |
|-------------------------|----------|--------------------------------------------------------------------------------------|
| customerNumber          | yes      | The Bank Frick customer number this end customer belongs to (7 characters).          |
| firstName               | yes      | Given name(s), max. 255 characters.                                                  |
| lastName                | yes      | Family name(s), max. 255 characters.                                                 |
| preferredName           | no       | Preferred or commonly used name or alias, max. 255 characters. Required if available. |
| dateOfBirth             | yes      | ISO 8601 date, e.g. `1984-03-27`.                                                    |
| countryOfBirth          | yes      | Country where the individual was born, as ISO 3166-1 alpha-2 country code.           |
| placeOfBirth            | no       | City, town, municipality, county, or other available information specifying the individual's place of birth. Required if available. |
| address                 | yes      | Residential address, see [Address format](#named-virtual-ibans-beta-address-format). |
| nationalities           | yes      | All nationalities of the individual, as ISO 3166-1 alpha-2 country codes. At least one entry, max. 10. |
| taxIdentificationNumber | no       | Tax identification number assigned to the individual, max. 50 characters. Required if available. |
| externalReference       | no       | Your own identifier, max. 255 characters.                                            |

**Legal entity** — `POST /end-customers/legal-entities`

| field                    | required | description                                                                         |
|--------------------------|----------|-------------------------------------------------------------------------------------|
| customerNumber           | yes      | The Bank Frick customer number this end customer belongs to (7 characters).         |
| companyName              | yes      | Name or company name, max. 255 characters.                                          |
| legalForm                | yes      | Legal form, max. 255 characters.                                                    |
| tradeName                | no       | Name under which the legal entity conducts business, if different from the company name, max. 255 characters. Required if available. |
| address                  | yes      | Registered address, see [Address format](#named-virtual-ibans-beta-address-format). |
| incorporationDate        | yes      | ISO 8601 date.                                                                      |
| principalPlaceOfBusiness | no       | Primary location where the entity conducts its business activities, if different from the registered address, max. 255 characters. Required if available. |
| incorporationCountry     | no       | Country in which the business was incorporated, if different from the registered address, as ISO 3166-1 alpha-2 country code. Required if available. |
| commercialRegisterEntry  | no       | `place` and `date` of the commercial-register entry, where applicable.              |
| registrationNumber       | no       | Official number assigned to the entity by the relevant register, max. 50 characters. Required if available. |
| taxIdentificationNumber  | no       | Tax identification number assigned to the legal entity, max. 50 characters. Required if available. |
| legalEntityIdentifier    | no       | Legal Entity Identifier (LEI) or any available equivalent official identifier, max. 50 characters. Required if available. |
| legalRepresentatives     | yes      | First Name(s) and Last Name(s) of the legal representatives (management body). At least one entry, max. 50 entries of max. 511 characters each. |
| nomineeShareholders      | no       | Names of individuals or entities acting as nominee shareholders, max. 50 entries of max. 511 characters each. Required if available. |
| nomineeDirectors         | no       | Names of individuals acting as nominee directors, max. 50 entries of max. 511 characters each. Required if available.            |
| externalReference        | no       | Your own identifier, max. 255 characters.                                           |

## Address format

End-customer addresses use an ISO 20022 structure. The town name (`TwnNm`) and the country (`Ctry`) are
required, every other element is optional. The most relevant elements are:

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

<aside class="notice">Note: Where available, the postal code, street name, post boxes, building number and apartment number are required fields. End-customer data is stored exactly as you send it. We only validate formal constraints, but we do not verify the content, normalise or reformat it, since the KYC responsibility for your end customers remains with you.</aside>

## Create a natural person

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
  "preferredName" : "Niki",
  "dateOfBirth" : "1984-03-27",
  "countryOfBirth" : "AT",
  "placeOfBirth" : "Innsbruck",
  "address" : {
    "StrtNm" : "Landstrasse",
    "BldgNb" : "14",
    "PstCd" : "9490",
    "TwnNm" : "Vaduz",
    "Ctry" : "LI"
  },
  "nationalities" : [ "AT", "LI" ],
  "taxIdentificationNumber" : "1234567890"
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
  "type" : "NATURAL_PERSON",
  "customerNumber" : "1234567",
  "externalReference" : "customer-1234abc",
  "matchingName" : "Nikita Muster",
  "firstName" : "Nikita",
  "lastName" : "Muster",
  "preferredName" : "Niki",
  "dateOfBirth" : "1984-03-27",
  "countryOfBirth" : "AT",
  "placeOfBirth" : "Innsbruck",
  "address" : {
    "StrtNm" : "Landstrasse",
    "BldgNb" : "14",
    "PstCd" : "9490",
    "TwnNm" : "Vaduz",
    "Ctry" : "LI"
  },
  "nationalities" : [ "AT", "LI" ],
  "taxIdentificationNumber" : "1234567890",
  "state" : "PREPARED",
  "activationApprovals" : [ ],
  "createdBy" : "Contact 6789",
  "createdAt" : "2026-08-27T09:14:22.531Z",
  "lastModifiedBy" : "Contact 6789",
  "lastModifiedAt" : "2026-08-27T09:14:22.531Z"
}
```

Creating a legal entity works the same way against `POST /end-customers/legal-entities`, with the legal-entity
data set and `"type" : "LEGAL_ENTITY"` in the response.

## Approve an end customer

An end customer must be approved before a Named VBAN can be linked to it.
Repeat the call using suitable contacts until the signing rule is satisfied.

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
  "type" : "NATURAL_PERSON",
  "customerNumber" : "1234567",
  "externalReference" : "customer-1234abc",
  "matchingName" : "Nikita Muster",
  "firstName" : "Nikita",
  "lastName" : "Muster",
  "preferredName" : "Niki",
  "dateOfBirth" : "1984-03-27",
  "countryOfBirth" : "AT",
  "placeOfBirth" : "Innsbruck",
  "address" : {
    "StrtNm" : "Landstrasse",
    "BldgNb" : "14",
    "PstCd" : "9490",
    "TwnNm" : "Vaduz",
    "Ctry" : "LI"
  },
  "nationalities" : [ "AT", "LI" ],
  "taxIdentificationNumber" : "1234567890",
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

`GET /end-customers/{endCustomerId}` returns one full record. `GET /end-customers` returns your end customer
records, paginated with `pageIndex` and `pageSize` (default 100, maximum 1000) and the same `pagination` envelope
as, e.g., the VBAN list.

Filters: `type`, `state`, `externalReference` and `lastModifiedAfter`. Results are ordered newest first and are
limited to the Bank Frick customers you are authorised for.

> Request

```shell--test
GET https://api-test.bankfrick.li/vban/end-customers?type=NATURAL_PERSON&state=ACTIVE&pageSize=10
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
      "type" : "NATURAL_PERSON",
      "customerNumber" : "1234567",
      "externalReference" : "customer-1234abc",
      "matchingName" : "Nikita Muster",
      "firstName" : "Nikita",
      "lastName" : "Muster",
      "preferredName" : "Niki",
      "dateOfBirth" : "1984-03-27",
      "countryOfBirth" : "AT",
      "placeOfBirth" : "Innsbruck",
      "address" : {
        "StrtNm" : "Landstrasse",
        "BldgNb" : "14",
        "PstCd" : "9490",
        "TwnNm" : "Vaduz",
        "Ctry" : "LI"
      },
      "nationalities" : [ "AT", "LI" ],
      "taxIdentificationNumber" : "1234567890",
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
    "type" : "NATURAL_PERSON",
    "customerNumber" : "1234567",
    "externalReference" : "customer-1234abc",
    "matchingName" : "Nikita Muster",
    "firstName" : "Nikita",
    "lastName" : "Muster",
    "preferredName" : "Niki",
    "dateOfBirth" : "1984-03-27",
    "countryOfBirth" : "AT",
    "placeOfBirth" : "Innsbruck",
    "address" : {
      "StrtNm" : "Landstrasse",
      "BldgNb" : "14",
      "PstCd" : "9490",
      "TwnNm" : "Vaduz",
      "Ctry" : "LI"
    },
    "nationalities" : [ "AT", "LI" ],
    "taxIdentificationNumber" : "1234567890",
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
    "type" : "NATURAL_PERSON",
    "customerNumber" : "1234567",
    "externalReference" : "customer-1234abc",
    "matchingName" : "Nikita Muster",
    "firstName" : "Nikita",
    "lastName" : "Muster",
    "preferredName" : "Niki",
    "dateOfBirth" : "1984-03-27",
    "countryOfBirth" : "AT",
    "placeOfBirth" : "Innsbruck",
    "address" : {
      "StrtNm" : "Landstrasse",
      "BldgNb" : "14",
      "PstCd" : "9490",
      "TwnNm" : "Vaduz",
      "Ctry" : "LI"
    },
    "nationalities" : [ "AT", "LI" ],
    "taxIdentificationNumber" : "1234567890",
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

`GET /named-virtual-ibans/{vban}` returns one Named VBAN together with the **full** end customer record.

`GET /named-virtual-ibans` lists Named VBANs only. Each entry carries an end customer **summary** rather
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
        "type" : "NATURAL_PERSON",
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
The end customer itself is not affected and stays available.

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
    "type" : "NATURAL_PERSON",
    "customerNumber" : "1234567",
    "externalReference" : "customer-1234abc",
    "matchingName" : "Nikita Muster",
    "firstName" : "Nikita",
    "lastName" : "Muster",
    "preferredName" : "Niki",
    "dateOfBirth" : "1984-03-27",
    "countryOfBirth" : "AT",
    "placeOfBirth" : "Innsbruck",
    "address" : {
      "StrtNm" : "Landstrasse",
      "BldgNb" : "14",
      "PstCd" : "9490",
      "TwnNm" : "Vaduz",
      "Ctry" : "LI"
    },
    "nationalities" : [ "AT", "LI" ],
    "taxIdentificationNumber" : "1234567890",
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

## Upgrade a VBAN to a Named VBAN

An existing VBAN can be assigned to an existing end customer and continue to be used as a Named
VBAN: `POST /named-virtual-ibans/upgrades` requests the upgrade and `PUT /named-virtual-ibans/upgrades/approvals`
approves it, both with `vban` and `endCustomerId`.

Until the signing rule is satisfied, the upgrade stays `PENDING` and the VBAN keeps working exactly as
before: it is still served by the VBAN endpoints, which report the request under `pendingUpgrade`.

> Request

```shell--test
POST https://api-test.bankfrick.li/vban/named-virtual-ibans/upgrades
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
algorithm: ...


{
  "vban" : "LI3808811V07QJ4M2XC44",
  "endCustomerId" : "0198f3c2-4e5a-7b1d-9c8e-3f5a6b7c8d90"
}
```

```shell--production
Named Virtual IBANs are not available on the production environment yet.
Switch to the test tab for the request examples.
```

> Response

```shell
HTTP/1.1 201 Created
Content-Type: application/json
Signature: ...
algorithm: ...


{
  "vban" : "LI3808811V07QJ4M2XC44",
  "endCustomer" : {
    "id" : "0198f3c2-4e5a-7b1d-9c8e-3f5a6b7c8d90",
    "type" : "NATURAL_PERSON",
    "matchingName" : "Nikita Muster"
  },
  "state" : "PENDING",
  "approvals" : [ ],
  "createdBy" : "Contact 6789",
  "createdAt" : "2026-08-27T10:12:31.204Z",
  "lastModifiedBy" : "Contact 6789",
  "lastModifiedAt" : "2026-08-27T10:12:31.204Z"
}
```

## Approve an upgrade

Once the signing rule is satisfied, the upgrade moves to `COMPLETED` and the VBAN becomes a Named VBAN: it is
served by the Named VBAN endpoints from then on, and the VBAN endpoints reject it. The VBAN's own `name` and
`address` are **replaced** by the end customer's data and are no longer available. The upgrade's approvals stay
readable on the Named VBAN under `upgradeApprovals`.

> Request

```shell--test
PUT https://api-test.bankfrick.li/vban/named-virtual-ibans/upgrades/approvals
Content-Type: application/json
Accept: application/json
Authorization: ...
Signature: ...
algorithm: ...


{
  "vban" : "LI3808811V07QJ4M2XC44",
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
  "vban" : "LI3808811V07QJ4M2XC44",
  "endCustomer" : {
    "id" : "0198f3c2-4e5a-7b1d-9c8e-3f5a6b7c8d90",
    "type" : "NATURAL_PERSON",
    "matchingName" : "Nikita Muster"
  },
  "state" : "COMPLETED",
  "approvals" : [
    {
      "contactNumber" : 6789,
      "signatureType" : "INDIVIDUAL",
      "signatureGroup" : 1,
      "createdBy" : "Contact 6789",
      "createdAt" : "2026-08-27T10:17:44.856Z"
    }
  ],
  "createdBy" : "Contact 6789",
  "createdAt" : "2026-08-27T10:12:31.204Z",
  "lastModifiedBy" : "Contact 6789",
  "lastModifiedAt" : "2026-08-27T10:17:44.856Z"
}
```

## Errors

Errors use the same `{ "reason": ..., "status": ... }` body as the VBAN endpoints.

| code | condition                                                                                                                                                                                                                                                             |
|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 400  | Validation error, can have multiple reasons like a missing, unknown or invalid field, a missing or invalid request signature, a mismatch between `vban` and `endCustomerId`, an end customer that is not yet `ACTIVE`, or a VBAN of the wrong type for this endpoint. |
| 401  | Missing or invalid JWT.                                                                                                                                                                                                                                               |
| 403  | The request was refused before it reached the service, e.g. due to IP restrictions of the API Key.                                                                                                                                                                    |
| 404  | Record does not exist, or the caller has no permission to access it.                                                                                                                                                                                                  |
| 409  | The record was modified concurrently. Please retry the request.                                                                                                                                                                                                       |

For your own protection, unauthorised requests that address a record of another Bank Frick customer answer as if the
record did not exist, and it is never disclosed which customer it belongs to.

## Full specifications

- [VBAN OpenAPI JSON](https://raw.githubusercontent.com/bankfrick/webapi-docs/refs/heads/master/source/files/openapi/vban-public-openapi.json)
- [VBAN OpenAPI YAML](https://raw.githubusercontent.com/bankfrick/webapi-docs/refs/heads/master/source/files/openapi/vban-public-openapi.yaml)
