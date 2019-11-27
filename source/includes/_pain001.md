# pain.001

Resource for the pain.001 message upload.

`PUT /v2/pain001`

Upload a pain.001 message. Note that errors respectively the status regarding pain001 is returned as pain002 message with the HTTP 200 or 207 status code.

**Request Parameters**

| name | type | description |
| ---- | ---- | ----------- |
| Authorization | header | Bearer \<**token**\> |
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

**Payment Types and Example Files**

| Description | Local Instrument | Creditor Account |  Creditor Agent | Currency |
| ---- | ------ | --------- | ----------- | ----------- |
| <a href="/files/pain001-ESR-OrangeSlip.xml" download>Domestic Payment (CH/LI) - ESR (Orange payment slip)</a> | CH01 |   |   | CHF |
| <a href="/files/pain001-za2_2-SWIFTwitIhBAN.xml" download>Domestic Payment (CH/LI) - with IBAN</a> |  | IBAN in CH/LI |    | CHF/EUR |
| <a href="/files/pain001-za3-InlandWithIBAN.xml" download>Domestic Payment (CH/LI) - with IBAN</a> |  | IBAN in CH/LI |   | All except CHF/EUR |
| <a href="/files/pain001-za5-SEPA.xml" download>Foreign Payment - SEPA</a> |  | IBAN in Europe |   | EUR |
| <a href="/files/pain001-za6a-SWIFTwithIBAN.xml" download>Foreign Payment not SEPA - SWIFT</a> |  | IBAN | BIC | Any Currency |
| <a href="/files/pain001-za6b-SWIFTwithAccountNr.xml" download>Foreign Payment not SEPA - SWIFT</a> |  | Account Number | BIC | Any Currency |

## Response

<aside class="notice">Please note that the following parameters are required for all pain.001 responses, but depending on the payment method used, additional parameters may be required. These can be found in the following chapter <a href="#pain-001-case-specific-attributes">Case-Specific Attributes</a></aside>

**Header**

| Path | Format | Mandatory | Description |
| ---- | ------ | --------- | ----------- |
| MsgId | string | yes | Checking for duplicates usually takes place at the Swiss financial institutions at document (message) level. This is why the „Message Identification“ element must have a unique value. The uniqueness is checked by most of the financial institutions over a period of at least 90 days. It is recommended that the „Message“ |
| CreDtTm | string | yes | Recommendation: Should be the same as the actual date/time of creation. |
| NbOfTxs | string | yes | If there is an error, the whole message is rejected. Messages that exceed 99,999 payments (C-Level) will be rejected by the financial institutions. Depending on the financial institution, the size of the message that can be delivered may be smaller. |
| CtrlSum | decimal |  | Value is the same as the sum of all the „Amount elements“ („Instructed Amount“ or „Equivalent Amount“) (2.42) Recommendation: the control sum should be sent in this element in Level A. If there is an error, the whole message is rejected. |
| InitgPty (Group) |  | yes | At least one of the two elements „Name“ or „Identification“ must be sent. |
| InitgPty/Nm | string |  | Name of the message sender, maximum 70 characters. |

**Payment**

| Path | Format | Mandatory | Description |
| ---- | ------ | --------- | ----------- |
| PmtInfId | string | yes | Value must be unique within the whole message (is used as reference in the Status Report „pain.002“). Only the SWIFT character set is permitted for this element (see section 2.4.1). |
| PmtMtd | string | yes | TRA and „TRF“: same meaning, no effect on the way the debit advices are controlled. In Switzerland the „TRA“ value is processed in the same way as the „TRF“ value, it has no special function. Furthermore, for check payments, the „CHK“ value is permitted. |
| BtchBookg | boolean |  | The option „true“ is recommended. „true“: Wherever possible, one batch booking is made per „Payment Information“ (B). A separate B-level must be created for each currency being transferred. The booking is identified using the Payment Information Identification (B). „false“: One booking should be made for each „Credit Transfer Transaction Information“ (C). Bookings are usually identified by the „Payment Identification“ (C). Alternatively, the financial institution can also identify the booking using, for example, the „Payment Information Identification“ (B) element. If this element is not sent, then the booking proceeds as for „true“. |
| ReqdExctnDt | string | yes | Contains the required date of execution. Where appropriate, the value data is automatically modified to the next possible banking/Post Office business day. |
| Dbtr (Group) |  | yes | The debtor is only identified by the „Debtor Account“ element. Information in the „Debtor“ field will be ignored. What is required is the master data for the financial institution for this debtor. |
| Dbtr/Nm | string |  | Recommendation: Use, maximum 70 characters. |
| DbtrAcct (Group) |  | yes | Recommendation: IBAN should be used. . However, „Other“ is currently also still permitted by some financial institutions for the proprietary account number. The „Type/Proprietary“ element can also be used to define the way the debit advice is controlled. When using the AOS „Additional participants“ (multi-banking), the third-party bank must be specified here. |
| DbtrAcct/Id/IBAN | string |  | Recommendation: Use. If used, „Other“ must not be present. |
| DbtrAgt (Group) |  | yes | The Swiss financial institutions recommend entering the BIC or IID (institutional identification) in this element. When using the AOS „Additional participants“ (multi-banking), the third-party bank must be specified here. |
| DbtrAgt/FinInstnId/BIC | string |  | BIC of the Debtor Bank. If used, then „Clearing System Member Identification“ must not be present. |

**Transaction**

| Path | Format | Mandatory | Description |
| ---- | ------ | --------- | ----------- |
| PmntId (Group) |  | yes |  |
| PmntId/InstrId | string |  | Recommendation: Should be used and be unique within the B-Level. Only the SWIFT character set is permitted for this element |
| PmntId/EndToEndId | string | yes | Customer reference, normally forwarded as far as the beneficiary. Only the SWIFT character set is permitted for this element |
| PmtTpInf/InstrPrty | string |  | Any information about the Express processing should be sent at B- Level, values in this element are ignored. |
| PmtTpInf/LclInstrm (Group)
| Amt/InstdAmt | | yes | If used, then „Equivalent Amount“ must not be present. |
| Amt/InstdAmt/@Ccy | string
| CdtrAgt (Group)
| Cdtr/Nm | string | yes | Must be used if "Creditor" is used, maximum 70 characters. |
| CdtrAcct/Id (Group) |  | yes | Recommendation: Whenever possible the IBAN should be used. Must be used if "Creditor Account" is used. |
| RmtInf/Strd/CdtrRefInf (Gruppe) |  | yes 

## Case-Specific Attributes

<aside class="notice">The following attributes are only relevant when using <code>Foreign Payments (SEPA)</code> </aside>

**Payment**

| Path | Format | Mandatory | Description |
| ---- | ------ | --------- | ----------- |
| PmtTpInf | |  | Can be used at B-Level or C-Level, but generally not in both at the same time. Some institutions permit it to be sent at both levels but not the same sub-element at both levels. |
| PmtTpInf/SvcLvl |  |  | Service Level affects the way payment is made at the financial institution. The focus is on achieving the fastest possible credit for the creditor. |
| PmtTpInf/SvcLvl/Cd |  | string |  | Codes according „Payments External Code Lists“ [8]. The following values will be accepted by the financial institutions: • SEPA (Single Euro Payments Area) • PRPT (EBA Priority Service) • SDVA (Same Day Value) • URGP (Urgent Payment) These values SEPA, PRPT, SDVA, URGP are taken into account if the financial institution offers the service in question, otherwise they are ignored. If used, then „Proprietary“ must not be present. |

**Transaction**

| Path | Format | Mandatory | Description |
| ---- | ------ | --------- | ----------- |
| CdtrAcct/Id/Othr/IBAN | string

<aside class="notice">The following attributes are only relevant when using <code>Domestic Payment (Switzerland) - ESR (Orange payment slip)</code></aside>

**Transaction**

| Path | Format | Mandatory | Description |
| ---- | ------ | --------- | ----------- |
| PmtTpInf/LclInstrm/Prtry | string |  | If used, then „Code“ must not be present. |
| CdtrAcct/Id/Othr/Id | string |  | Must be used if "Other" is used. |
| RmtInf/Strd/CdtrRefInf/Ref | string

<aside class="notice">The following attributes are only relevant when using <code>Domestic Payment (Switzerland)- SWIFT with IBAN</code></aside>

**Transaction**

| Path | Format | Mandatory | Description |
| ---- | ------ | --------- | ----------- |
| PmtTpInf/LclInstrm/Prtry | string |  | If used, then „Code“ must not be present. |
| CdtrAcct/Id/Othr/IBAN | string

<aside class="notice">The following attributes are only relevant when using <code>Foreign Payments not SEPA - SWIFT with BIC International</code></aside>

**Transaction**

| Path | Format | Mandatory | Description |
| ---- | ------ | --------- | ----------- |
| CdtrAgt/FinInstnId/BIC | string |  | If used, then "Clearing System Member Identification" must not be present. |
| CdtrAcct/Id/Othr/Id | string |  | Must be used if "Other" is used. |

<aside class="notice">The following attributes are only relevant when using <code>Domestic Payment (Switzerland) - with IBAN</code></aside>

**Transaction**

| Path | Format | Mandatory | Description |
| ---- | ------ | --------- | ----------- |
| CdtrAgt/FinInstnId/BIC | string |  | If used, then "Clearing System Member Identification" must not be present. |
| CdtrAcct/Id/Othr/IBAN | string

