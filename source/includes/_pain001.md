# pain.001

Resource for the pain.001 message upload.

`PUT /v2/pain001`

Upload a pain.001 message. Note that errors respectively the status regarding pain001 is returned as pain002 message with the HTTP 200 or 207 status code.

**Request Parameters**

| name | type | description |
| ---- | ---- | ----------- |
| Authentication | header | Bearer \<**token**\> |
| Signature | header | \<**signature**\> |
| algorithm | header | The used signing algorithm, e.g. rsa-sha512 |

**Request Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/xml | Document (XML) | The pain.001 message as xml. |

**Response Codes**

| code | condition | type |
| ---- | --------- | ---- |
| 200 | Request successful | Document (XML) |
| 207 | Request successful, but with pain.002 error states | Document (XML) |

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/xml | Document (XML) | The pain.002 response message as xml. |

**Response Headers**

| name | description |
| ---- | ----------- |
| signature | \<**signature**\> |
| algorithm | The used signing algorithm, e.g. rsa-sha512 |

**Example Files**

* <a href="/files/pain.001-ESR-OrangeSlip.xml" download>Domestic Payment (Switzerland) - ESR (Orange payment slip)</a>
* <a href="/files/pain.001-za2_2-SWIFTwitIhBAN.xml" download>Domestic Payment (Switzerland) - SWIFT with IBAN</a>
* <a href="/files/pain.001-za3-InlandWithIBAN.xml" download>Domestic Payment (Switzerland) - with IBAN</a>
* <a href="/files/pain.001-za5-SEPA.xml" download>Foreign Payments - SEPA</a>
* <a href="/files/pain.001-za6a-SWIFTwithIBAN.xml" download>Foreign Payments not SEPA - SWIFT with IBAN</a>
* <a href="/files/pain.001-za6b-SWIFTwithAccountNr.xml" download>Foreign Payments not SEPA - SWIFT with BIC International</a>

## Response

