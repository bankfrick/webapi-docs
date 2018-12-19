# camt.052

This message is used to download a camt.052 report. This export format only contains booked transactions as intraday information and provides a near real time view of the accounts.

`GET /v2/camt052`

> Request

```xml--sandbox
GET https://olbtest.bankfrick.li/webapi/camt052?iban=LI11188110101101K001E
Content-Type: */*
Accept: application/xml
Authorization: ...
Signature: ...
algorithm: ...
```

```xml--production
DELETE https://olb.bankfrick.li/webapi/camt052?iban=LI11188110101101K001E
Content-Type: */*
Accept: application/xml
Authorization: ...
Signature: ...
algorithm: ...
```

Retrieve a camt052 (intraday information) report.

**Request Parameters**

| name | type | description |
| ---- | ---- | ----------- |
| Authorization | header | Bearer \<**token**\> |
| Signature | header | \<**signature**\> |
| algorithm | header | The used signing algorithm, e.g. rsa-sha512 |
| iban |	query |	(mandatory) The iban of the account to get the camt052 report for. If an account does not have an iban, accountnumber must be used. | 
| accountnumber |	query | (mandatory) The account number of the account to get the camt053/052 report for, this parameter should be URL-Encoded. Either **iban or accountnumber** must be given; the report can only be created for one account per request. If an account does not have an iban, accountnumber must be used. |
| maxAmount |	query |	(optional) Maximum amount for a transaction to appear in the report, this parameter should be URL-Encoded |
| minAmount |	query |	(optional) Minimum amount for a transaction to appear in the report, this parameter should be URL-Encoded |
| reference |	query |	(optional) Search in the reference (transaction information), this parameter should be URL-Encoded |
| searchIban |	query |	(optional) Search of either the beneficiary account iban or sender account, depending on the transaction type, this parameter should be URL-Encoded |
| searchName |	query	| (optional) Search of either the beneficiary name or sender account, depending on the transaction type, this parameter should be URL-Encoded |

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/xml | Document (XML) |	The camt052 response message as xml. |

**Response Codes**

| code | condition | type |
| ---- | --------- | ---- |
| 200 | Request successful | Document (XML) |

**Response Headers**

| name | description |
| ---- | ----------- |
| signature | \<**signature**\> |
| algorithm | The used signing algorithm, e.g. rsa-sha512 |


## Response

> Response

```xml
HTTP/1.1 200 OK
Content-Type: application/xml
Signature: ...
algorithm: ...

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Document xmlns:ns2="urn:iso:std:iso:20022:tech:xsd:camt.052.001.07">
    <BkToCstmrAcctRpt>
        <GrpHdr>
            <MsgId>1536245450821-b6de4c97-08c4-4a74-92</MsgId>
            <CreDtTm>2018-09-06T16:50:50.755+02:00</CreDtTm>
            <MsgRcpt>
                <Nm>Firstname Lastname</Nm>
                <PstlAdr>
                    <AdrLine>Lastname Firstname</AdrLine>
                    <AdrLine>123 Road</AdrLine>
                    <AdrLine>123123 Balzers</AdrLine>
                    <AdrLine>LIECHTENSTEIN</AdrLine>
                </PstlAdr>
                <Id>
                    <PrvtId>
                        <Othr>
                            <Id>12345</Id>
                        </Othr>
                    </PrvtId>
                </Id>
            </MsgRcpt>
            <MsgPgntn>
                <PgNb>1</PgNb>
                <LastPgInd>true</LastPgInd>
            </MsgPgntn>
        </GrpHdr>
        <Rpt>
            <Id>1234245450922-1a85b471-e995-1234-9e</Id>
            <CreDtTm>2018-09-06T17:00:00.755+02:00</CreDtTm>
            <FrToDt/>
            <Acct>
                <Id>
                    <IBAN>LI12345610609195K000E</IBAN>
                </Id>
                <Tp>
                    <Cd>CACC</Cd>
                </Tp>
                <Ccy>EUR</Ccy>
                <Nm>CURRENT ACCOUNT                    </Nm>
                <Ownr>
                    <Nm>Company Name Ltd.</Nm>
                    <PstlAdr>
                        <AdrLine>Company Name Ltd.</AdrLine>
                        <AdrLine>8 Street</AdrLine>
                        <AdrLine>The Central</AdrLine>
                        <AdrLine>123456 SINGAPORE</AdrLine>
                    </PstlAdr>
                    <Id>
                        <PrvtId>
                            <Othr>
                                <Id>0600000</Id>
                            </Othr>
                        </PrvtId>
                    </Id>
                </Ownr>
                <Svcr>
                    <FinInstnId>
                        <BICFI>BFRILI22XXX</BICFI>
                        <Nm>Bank Frick &amp; Co. Aktiengesellschaft</Nm>
                        <PstlAdr>
                            <AdrLine>Landstrasse 14</AdrLine>
                            <AdrLine>9496 Balzers</AdrLine>
                            <AdrLine>Liechtenstein</AdrLine>
                        </PstlAdr>
                        <Othr>
                            <Id>12345</Id>
                            <Issr>VAT-ID</Issr>
                        </Othr>
                    </FinInstnId>
                </Svcr>
            </Acct>
            <Bal>
                <Tp>
                    <CdOrPrtry>
                        <Cd>OPBD</Cd>
                    </CdOrPrtry>
                </Tp>
                <Amt Ccy="EUR">100000.00</Amt>
                <CdtDbtInd>CRDT</CdtDbtInd>
                <Dt>
                    <Dt>2018-09-03</Dt>
                </Dt>
            </Bal>
            <Bal>
                <Tp>
                    <CdOrPrtry>
                        <Cd>ITBD</Cd>
                        <Prtry>Interim booked balance</Prtry>
                    </CdOrPrtry>
                </Tp>
                <Amt Ccy="EUR">100000.00</Amt>
                <CdtDbtInd>CRDT</CdtDbtInd>
                <Dt>
                    <Dt>2018-09-06</Dt>
                </Dt>
            </Bal>
            <Bal>
                <Tp>
                    <CdOrPrtry>
                        <Cd>ITAV</Cd>
                        <Prtry>Interim value balance</Prtry>
                    </CdOrPrtry>
                </Tp>
                <Amt Ccy="EUR">100000.00</Amt>
                <CdtDbtInd>CRDT</CdtDbtInd>
                <Dt>
                    <Dt>2018-09-06</Dt>
                </Dt>
            </Bal>
            <Ntry>
                <Amt Ccy="EUR">100.00</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <Sts>
                    <Cd>PDNG</Cd>
                </Sts>
                <ValDt>
                    <Dt>2018-08-09</Dt>
                </ValDt>
                <AcctSvcrRef>payment order id: 1234</AcctSvcrRef>
                <BkTxCd>
                    <Domn>
                        <Cd>PMNT</Cd>
                        <Fmly>
                            <Cd>ICDT</Cd>
                            <SubFmlyCd>FICT</SubFmlyCd>
                        </Fmly>
                    </Domn>
                    <Prtry>
                        <Cd>BANK_INTERNAL</Cd>
                        <Issr>Bank Frick payment order type</Issr>
                    </Prtry>
                </BkTxCd>
                <NtryDtls>
                    <TxDtls>
                        <RltdPties>
                            <Dbtr>
                                <Pty>
                                    <Nm>Company Name Ltd.</Nm>
                                </Pty>
                            </Dbtr>
                            <DbtrAcct>
                                <Id>
                                    <IBAN>LI12345610609195K000E</IBAN>
                                </Id>
                            </DbtrAcct>
                            <Cdtr>
                                <Pty>
                                    <Nm>Company XY Ltd.</Nm>
                                </Pty>
                            </Cdtr>
                            <CdtrAcct>
                                <Id>
                                    <IBAN>LI12345610609195K000E</IBAN>
                                </Id>
                            </CdtrAcct>
                        </RltdPties>
                        <RltdAgts>
                            <DbtrAgt>
                                <FinInstnId>
                                    <BICFI>BFRILI22XXX</BICFI>
                                    <Nm>Bank Frick &amp; Co. Aktiengesellschaft</Nm>
                                </FinInstnId>
                            </DbtrAgt>
                            <CdtrAgt>
                                <FinInstnId>
                                    <BICFI>BFRILI22XXX</BICFI>
                                    <Nm>Bank Frick and Co. Aktiengesellschaft, LIECHTENSTEIN</Nm>
                                </FinInstnId>
                            </CdtrAgt>
                        </RltdAgts>
                    </TxDtls>
                </NtryDtls>
            </Ntry>
        </Rpt>
    </BkToCstmrAcctRpt>
</Document>
```
**Header**

**Path:** Prefix: Document/BkToCstmrRpt

| Path | Format | Mandatory |  Description |
| ---- | ------ | --------- | ----------------- |
| GrpHdr	| |	yes |	Header |
| GrpHdr/MsgId |	1-35 characters |	yes |	Message Id |
| GrpHdr/CreDtTm	| IsoDateTime |	yes	| creation date |
| GrpHdr/MsgRcpt |	no |	Receiver
GrpHdr/MsgRcpt/Nm |	1-140 characters |	no |	Name of the receiver
GrpHdr/MsgRcpt/PstlAdr	|	no |	address
GrpHdr/MsgRcpt/PstlAdr/AdrLine |	1-70 characters	| no, 0..7 |	row of an address
GrpHdr/MsgRcpt/Id	|	no |	Id
GrpHdr/MsgRcpt/Id/PrvtId	|	yes (or OrgId)	||
GrpHdr/MsgRcpt/Id/PrvtId/Othr/Id |	1-35 characters	||	Identification of the private individual
GrpHdr/MsgPgntn	||	no	||
GrpHdr/MsgPgntn/PgNb |	1-5 digits |	yes |	Page number (in paging)
GrpHdr/MsgPgntn/LastPgInd	| boolean |	yes |	Last page?
Rpt	|| yes, 1…n	||
Rpt/Id |	1-35 characters |	yes |	identification
Rpt/CreDtTm |	IsoDateTime |	no |	creation date
Rpt/FrToDt	|	| no	| Time interval of the move-out
Rpt/FrToDt/FrDtTm	| IsoDateTime |	yes |	Starting time of the account statement
Rpt/FrToDt/ToDtTm |	IsoDateTime |	yes |	End time of the account statement
Rpt/Acct ||		yes	||
Rpt/Acct/Id	 ||	yes |	account identification structure
Rpt/Acct/Id/IBAN |	[A-Z]{2,2}[0-9]{2,2}[a-zA-Z0-9]{1,30} |	yes (or Othr) ||	
Rpt/Acct/Tp ||	no |	account type |
Rpt/Acct/Tp/Cd |	1-4 characters |	no |	account type
Rpt/Acct/Ccy |	3 capital letters |	no |	currency
Rpt/Acct/Nm |	1-70 characters |	no |	account name
Rpt/Acct/Ownr	||	no	||
Rpt/Acct/Ownr/Nm |	|	no |	Name of the Owner 
Rpt/Acct/Ownr/PstlAdr ||	no |	address
Rpt/Acct/Ownr/PstlAdr/AdrLine	||	no |	row of an address
Rpt/Acct/Ownr/Id	||	no	||
Rpt/Acct/Ownr/Id/PrvtId	||	no	||
Rpt/Acct/Ownr/Id/PrvtId/Othr	||	no	||
Rpt/Acct/Ownr/Id/PrvtId/Othr/Id	 ||	no |	Id |
Rpt/Acct/Svcr	||	no	||
Rpt/Acct/Svcr/FinInstnId	||	yes |	identification 
Rpt/Acct/Svcr/FinInstnId/BICFI |	BIC ( [A-Z]{6,6}[A-Z2-9][A-NP-Z0-9][A-Z0-9]{3,3}){0,1} |	no |	BIC
Rpt/Acct/Svcr/FinInstnId/Nm |	1-140 characters |	no	| Name of the bank
Rpt/Acct/Svcr/FinInstnId/PstlAdr || no, 0..7 |	mailing address
Rpt/Acct/Svcr/FinInstnId/PstlAdr/AdrLine |	1-70 characters |	no |	address bar
Rpt/Acct/Svcr/FinInstnId/Othr	||	no |	Further identification
Rpt/Acct/Svcr/FinInstnId/Othr/Id |	1-35 characters	| yes |	identification number
Rpt/Acct/Svcr/FinInstnId/Orth/Issr |	1-35 characters |	no |	Type of identification number
Rpt/Bal	||	yes, 1..n ||
Rpt/Ntry || no, 0..n |	transaction |

**Balance**

**Path:** Prefix: Document/BkToCstmrRpt/Rpt/Bal

Example of opening and closing balance

| Path | Format | Mandatory |  Description |
| ---- | ------ | --------- | ----------------- |
Tp	||	yes	||
Tp/CdOrPrtry ||		yes	||
Tp/CdOrPrtry/Cd |	1 to 4 characters |	yes (or Prtry) ||
Tp/CdOrPrtry/Prtry | Amt	18 digits (5 decimal places) |	yes |	amount
Amt/@Ccy |	1-3 characters |	yes |	currency
CdtDbtInd |	Enumeration |	yes ||
Dt	||	yes	| date
Dt/Dt |	YYYY-MM-DD |	yes (or DtTm)	| Date (as opposed to a date with time)


**Entry**

**Path:** Prefix: Document/BkToCstmrRpt/Rpt/Ntry

| Path | Format | Mandatory |  Description |
| ---- | ------ | --------- | ----------------- |
Amt |	18 digits (5 decimal places) |	yes |	amount
Amt/@Ccy |	3 letters |	yes |	currency
CdtDbtInd |	enumeration |	yes |	Debit/Credit
Sts	|	yes |	Status
Sts/Cd |	1-4 characters |	yes (or Prtry) |	Status
ValDt	||	no |	valuta date
ValDt/Dt |	YYYY-MM-DD |	yes (or DtTm) |	date
AcctSvcrRef |	1 to 35 characters (if available) |	no |	Account Servicer Reference
BkTxCd	||	yes	||
BkTxCd/Domn	||	no |	Domaine
BkTxCd/Domn/Cd |	1-4 characters |	yes	||
BkTxCd/Domn/Fmly	||	yes	||
BkTxCd/Domn/Fmly/Cd |	1-4 characters |	yes	||
BkTxCd/Domn/Fmly/SubfmlyCd |	1-4 characters |	yes	||
BkTxCd/Prtry	||	no	||
BkTxCd/Prtry/Cd	| max 35. characters |	yes	||
BkTxCd/Prtry/Issr |	max 35. characters |	no	||
NtryDtls	||	no, 0..n ||
NtryDtls/TxDtls || no, 0..n ||
NtryDtls/TxDtls/RltdPties	||	no	||
NtryDtls/TxDtls/RltdPties/Dbtr	||	no	||
NtryDtls/TxDtls/RltdPties/Dbtr/Pty	||	yes (or Agt)	||
NtryDtls/TxDtls/RltdPties/Dbtr/Pty/Nm	1-140 characters ||	no	||
NtryDtls/TxDtls/RltdPties/DbtrAcct	||	no	||
NtryDtls/TxDtls/RltdPties/DbtrAcct/Id	||	yes	||
NtryDtls/TxDtls/RltdPties/DbtrAcct/Id/IBAN |	[A-Z]{2,2}[0-9]{2,2}[a-zA-Z0-9]{1,30} |	yes (or Othr)	||
NtryDtls/TxDtls/RltdPties/Cdtr	||	no	||
NtryDtls/TxDtls/RltdPties/Cdtr/Pty	||	yes (or Agt) ||	
NtryDtls/TxDtls/RltdPties/Cdtr/Pty/Nm	| 1-140 characters |	no	||
NtryDtls/TxDtls/RltdPties/CdtrAcct	||	no	||
NtryDtls/TxDtls/RltdPties/CdtrAcct/Id	||	yes	||
NtryDtls/TxDtls/RltdPties/CdtrAcct/Id/IBAN |	[A-Z]{2,2}[0-9]{2,2}[a-zA-Z0-9]{1,30} |	yes (or Othr)	||
NtryDtls/TxDtls/RltdAgts	||	no	||
NtryDtls/TxDtls/RltdAgts/DbtrAgt ||	no	||
NtryDtls/TxDtls/RltdAgts/DbtrAgt/FinInstnId	||	yes	||
NtryDtls/TxDtls/RltdAgts/DbtrAgt/FinInstnId/BICFI	| BIC ( [A-Z]{6,6}[A-Z2-9][A-NP-Z0-9][A-Z0-9]{3,3}{0,1} )	| no	||
NtryDtls/TxDtls/RltdAgts/DbtrAgt/FinInstnId/Nm |	1 - 140 characters |	no	||
NtryDtls/TxDtls/RltdAgts/CdtrAgt	||	no	||
NtryDtls/TxDtls/RltdAgts/CdtrAgt/FinInstnId	||	yes	| financial institution
NtryDtls/TxDtls/RltdAgts/CdtrAgt/FinInstnId/BICFI |	BIC ( [A-Z]{6,6}[A-Z2-9][A-NP-Z0-9][A-Z0-9]{3,3}{0,1} ) |	no |	BIC
NtryDtls/TxDtls/RltdAgts/CdtrAgt/FinInstnId/Nm |	1 - 140 characters |	no |	Name |
