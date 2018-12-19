# camt.053

This message is used to download a camt053 report. This export format only contains booked transactions either from successful processed payment orders or other external transactions, similar to the “Executed” tab in the transaction overview of the online banking frontend.

`GET /v2/camt053`

> Request

```xml--sandbox
GET https://olbtest.bankfrick.li/webapi/camt053?iban=LI11188110101101K001E
Content-Type: */*
Accept: application/xml
Authorization: ...
Signature: ...
algorithm: ...
```

```xml--production
DELETE https://olb.bankfrick.li/webapi/camt053?iban=LI11188110101101K001E
Content-Type: */*
Accept: application/xml
Authorization: ...
Signature: ...
algorithm: ...
```

Retrieve a camt053 report.

**Request Parameters**

| name | type | description |
| ---- | ---- | ----------- |
| Authorization | header | Bearer \<**token**\> |
| Signature | header | \<**signature**\> |
| algorithm | header | The used signing algorithm, e.g. rsa-sha512 |
| iban |	query |	(mandatory) The iban of the account to get the camt053 report for. If an account does not have an iban, accountnumber must be used. | 
| accountnumber |	query |	(mandatory) The account number of the account to get the camt053/052 report for, this parameter should be URL-Encoded. Either **iban or accountnumber** must be given; the report can only be created for one account per request. If an account does not have an iban, accountnumber must be used. |
| fromDate |	query |	(optional) Starting date of the timespan for which to retrieve the data. The date should be provided in ISO 8601 format: YYYY-MM-DD, defaults to current day minus 30 days. |
| toDate | 	query |	(optional) Ending date of the timespan for which to retrieve the data. The date should be provided in ISO 8601 format: YYYY-MM-DD |
| maxAmount |	query |	(optional) Maximum amount for a transaction to appear in the report, this parameter should be URL-Encoded |
| minAmount |	query |	(optional) Minimum amount for a transaction to appear in the report, this parameter should be URL-Encoded |
| reference |	query |	(optional) Search in the reference (transaction information), this parameter should be URL-Encoded |
| searchIban |	query |	(optional) Search of either the beneficiary account iban or sender account, depending on the transaction type, this parameter should be URL-Encoded |
| searchName |	query	| (optional) Search of either the beneficiary name or sender account, depending on the transaction type, this parameter should be URL-Encoded |

**Response Body**

| media type | data type | description |
| ---------- | --------- | ----------- |
| application/xml | Document (XML) |	The camt053 response message as xml. |

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

sts<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:camt.053.001.07">
    <BkToCstmrStmt>
        <GrpHdr>
            <MsgId>1524148795099-aaa9380b-0bed-44a2-8a</MsgId>
            <CreDtTm>2018-04-19T16:39:50.954+02:00</CreDtTm>
            <MsgRcpt>
			    <PstlAdr>
                    <AdrLine>Kundenname XY</AdrLine>
                    <AdrLine>123 Road</AdrLine>
                    <AdrLine>123123 Bern</AdrLine>
                    <AdrLine>SCHWEIZ</AdrLine>
                </PstlAdr>
                <Id>
                    <PrvtId>
                        <Othr>
                            <Id>5697</Id>
                        </Othr>
                    </PrvtId>
                </Id>
            </MsgRcpt>
            <MsgPgntn>
                <PgNb>1</PgNb>
                <LastPgInd>true</LastPgInd>
            </MsgPgntn>
        </GrpHdr>
        <Stmt>
            <Id>1524148795099-b8258e37-ebc0-4c3f-92</Id>
            <CreDtTm>2018-04-19T16:39:50.954+02:00</CreDtTm>
            <FrToDt>
                <FrDtTm>1970-01-01T00:00:00.000+01:00</FrDtTm>
                <ToDtTm>2018-04-19T23:59:59.999+02:00</ToDtTm>
            </FrToDt>
            <Acct>
                <Id>
                    <IBAN>LI50088110111111K000C</IBAN>
                </Id>
                <Tp>
                    <Cd>CACC</Cd>
                </Tp>
                <Ccy>EUR</Ccy>
                <Nm>KONTOKORRENT                       </Nm>
                <Ownr>
                    <Nm>Test Company (remitter)</Nm>
                    <PstlAdr>
                        <AdrLine>TEST COMPANY (REMITTER)</AdrLine>
                        <AdrLine>Test street 99</AdrLine>
                        <AdrLine>9472 Grabs</AdrLine>
                        <AdrLine>SCHWEIZ</AdrLine>
                    </PstlAdr>
                    <Id>
                        <PrvtId>
                            <Othr>
                                <Id>0606323</Id>
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
                            <Id>53884</Id>
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
                <Amt Ccy="EUR">0.00</Amt>
                <CdtDbtInd>CRDT</CdtDbtInd>
                <Dt>
                    <Dt>2018-01-12+01:00</Dt>
                </Dt>
            </Bal>
            <Bal>
                <Tp>
                    <CdOrPrtry>
                        <Cd>CLBD</Cd>
                    </CdOrPrtry>
                </Tp>
                <Amt Ccy="EUR">1500.00</Amt>
                <CdtDbtInd>CRDT</CdtDbtInd>
                <Dt>
                    <Dt>2018-04-17+02:00</Dt>
                </Dt>
            </Bal>
            <Ntry>
                <Amt Ccy="EUR">305.00</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <Sts>
                    <Cd>BOOK</Cd>
                </Sts>
                <BookgDt>
                    <Dt>2018-04-17+02:00</Dt>
                </BookgDt>
                <ValDt>
                    <Dt>2018-04-17+02:00</Dt>
                </ValDt>
                <AcctSvcrRef>2520486</AcctSvcrRef>
                <BkTxCd>
                    <Domn>
                        <Cd>XTND</Cd>
                        <Fmly>
                            <Cd>NTAV</Cd>
                            <SubFmlyCd>NTAV</SubFmlyCd>
                        </Fmly>
                    </Domn>
                    <Prtry>
                        <Cd>081</Cd>
                        <Issr>Bank Frick OPID transaction code</Issr>
                    </Prtry>
                </BkTxCd>
                <NtryDtls>
                    <TxDtls>
                        <RmtInf>
                            <Ustrd>redemption foreign currency without Agio</Ustrd>
                        </RmtInf>
                    </TxDtls>
                </NtryDtls>
            </Ntry>
            <Ntry>
                <Amt Ccy="EUR">2097.00</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <Sts>
                    <Cd>BOOK</Cd>
                </Sts>
                <BookgDt>
                    <Dt>2018-03-01+01:00</Dt>
                </BookgDt>
                <ValDt>
                    <Dt>2018-03-01+01:00</Dt>
                </ValDt>
                <AcctSvcrRef>2466849</AcctSvcrRef>
                <BkTxCd>
                    <Domn>
                        <Cd>PMNT</Cd>
                        <Fmly>
                            <Cd>ICDT</Cd>
                            <SubFmlyCd>ESCT</SubFmlyCd>
                        </Fmly>
                    </Domn>
                    <Prtry>
                        <Cd>116-reimbursement SWIFT </Cd>
                        <Issr>Bank Frick OPID transaction code</Issr>
                    </Prtry>
                </BkTxCd>
                <NtryDtls>
                    <TxDtls>
                        <RltdPties>
                            <Dbtr>
                                <Pty>
                                    <Nm>TEST COMPANY (REMITTER) Test street 99</Nm>
                                </Pty>
                            </Dbtr>
                            <DbtrAcct>
                                <Id>
                                    <IBAN>LI50088110111111K000C</IBAN>
                                </Id>
                            </DbtrAcct>
                            <Cdtr>
                                <Pty>
                                    <Nm>BENEFICIARY_name</Nm>
                                </Pty>
                            </Cdtr>
                            <CdtrAcct>
                                <Id>
                                    <IBAN>AT026000000001349870</IBAN>
                                </Id>
                            </CdtrAcct>
                        </RltdPties>
                        <RltdAgts>
                            <CdtrAgt>
                                <FinInstnId>
                                    <Nm>TEST BANK</Nm>
                                </FinInstnId>
                            </CdtrAgt>
                        </RltdAgts>
                        <RmtInf>
                            <Ustrd>1109 7890 0011 6158</Ustrd>
                        </RmtInf>
                    </TxDtls>
                </NtryDtls>
            </Ntry>
            <Ntry>
                <Amt Ccy="EUR">1800.00</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <Sts>
                    <Cd>BOOK</Cd>
                </Sts>
                <BookgDt>
                    <Dt>2018-01-15+01:00</Dt>
                </BookgDt>
                <ValDt>
                    <Dt>2018-01-16+01:00</Dt>
                </ValDt>
                <AcctSvcrRef>2411569</AcctSvcrRef>
                <BkTxCd>
                    <Domn>
                        <Cd>PMNT</Cd>
                        <Fmly>
                            <Cd>ICDT</Cd>
                            <SubFmlyCd>PRCT</SubFmlyCd>
                        </Fmly>
                    </Domn>
                    <Prtry>
                        <Cd>117-REIMBURSEMENT SWIFT - Express </Cd>
                        <Issr>Bank Frick OPID transaction code</Issr>
                    </Prtry>
                </BkTxCd>
                <NtryDtls>
                    <TxDtls>
                        <RltdPties>
                            <Dbtr>
                                <Pty>
                                    <Nm>TEST COMPANY (REMITTER) Test street 99</Nm>
                                </Pty>
                            </Dbtr>
                            <DbtrAcct>
                                <Id>
                                    <IBAN>LI50088110111111K000C</IBAN>
                                </Id>
                            </DbtrAcct>
                            <Cdtr>
                                <Pty>
                                    <Nm>BENEFICIARY_name</Nm>
                                </Pty>
                            </Cdtr>
                            <CdtrAcct>
                                <Id>
                                    <IBAN>AT026000000001349870</IBAN>
                                </Id>
                            </CdtrAcct>
                        </RltdPties>
                        <RltdAgts>
                            <CdtrAgt>
                                <FinInstnId>
                                    <Nm>TEST BANK </Nm>
                                </FinInstnId>
                            </CdtrAgt>
                        </RltdAgts>
                        <RmtInf>
                            <Ustrd>ACCOUNTING ENTRY DSR0B21E7BSW0</Ustrd>
                            <Ustrd>Test Company (remitter) </Ustrd>
                            <Ustrd>20.1.-27.1.18</Ustrd>
                        </RmtInf>
                    </TxDtls>
                </NtryDtls>
            </Ntry>
        </Stmt>
    </BkToCstmrStmt>
</Document>


```
**Header**

**Path:** Prefix: Document/BkToCstmrRpt

| Path | Format | Mandatory |  Description |
| ---- | ------ | --------- | ----------------- |
GrpHdr	||	yes	| Header
GrpHdr/MsgId | 1-35 characters | yes |	Message Id
GrpHdr/CreDtTm |	IsoDateTime	| yes |	creation date
GrpHdr/MsgRcpt	||	no |	Receiver
GrpHdr/MsgRcpt/PstlAdr	||	no|	address
GrpHdr/MsgRcpt/PstlAdr/AdrLine |	1-70 characters	| no, 0..7 |	row of an address
GrpHdr/MsgRcpt/Id	||	no |	Id
GrpHdr/MsgRcpt/Id/PrvtId	||	yes (or OrgId)	||
GrpHdr/MsgRcpt/Id/PrvtId/Othr/Id |	1-35 characters ||	Identification of the private individual
GrpHdr/MsgPgntn	||	no	||
GrpHdr/MsgPgntn/PgNb |	1-5 digits |	yes |	Page number (in paging)
GrpHdr/MsgPgntn/LastPgInd |	boolean |	yes	| Last page?
Stmt	||	yes, 1…n ||
Stmt/Id |	1-35 characters |	yes |	identification
Stmt/CreDtTm |	IsoDateTime |	no |	creation date
Stmt/FrToDt	||	no	| Time interval of the move-out
Stmt/FrToDt/FrDtTm |	IsoDateTime |	yes |	Starting time of the account statement
Stmt/FrToDt/ToDtTm |	IsoDateTime	| yes |	End time of the account statement
Stmt/Acct	||	yes	||
Stmt/Acct/Id	||	yes |	account identification structure
Stmt/Acct/Id/IBAN	| [A-Z]{2,2}[0-9]{2,2}[a-zA-Z0-9]{1,30}	yes (or Othr)	
Stmt/Acct/Tp	||	no |	account type
Stmt/Acct/Tp/Cd |	1-4 characters |	no |	account type
Stmt/Acct/Ccy |	3 capital letters |	no |	currency
Stmt/Acct/Nm |	1-70 characters	| no |	account name
Stmt/Acct/Ownr	||	no	||
Stmt/Acct/Ownr/Nm	||	no |	Name of the Owner
Stmt/Acct/Ownr/PstlAdr	||	no |	address |
Stmt/Acct/Ownr/PstlAdr/AdrLine	||	no |	row of an address
Stmt/Acct/Ownr/Id	|| || ||		
Stmt/Acct/Ownr/Id/PrvtId || || ||		
Stmt/Acct/Ownr/Id/PrvtId/Othr || || ||	
Stmt/Acct/Ownr/Id/PrvtId/Othr/Id || no | Id
Stmt/Acct/Svcr	||	no	||
Stmt/Acct/Svcr/FinInstnId	||	yes	| identification
Stmt/Acct/Svcr/FinInstnId/BICFI	| BIC ( [A-Z]{6,6}[A-Z2-9][A-NP-Z0-9][A-Z0-9]{3,3}{0,1} ) |	no |	BIC
Stmt/Acct/Svcr/FinInstnId/Nm |	1-140 characters |	no |	Name of the bank
Stmt/Acct/Svcr/FinInstnId/PstlAdr || no, 0..7 |	mailing address
Stmt/Acct/Svcr/FinInstnId/PstlAdr/AdrLine	| 1-70 characters |	no | address bar
Stmt/Acct/Svcr/FinInstnId/Othr	||	no |	Further identification
Stmt/Acct/Svcr/FinInstnId/Othr/Id |	1-35 characters |	yes	| identification number
Stmt/Acct/Svcr/FinInstnId/Orth/Issr	| 1-35 characters |	no |	Type of identification number
Stmt/Bal || yes, 1..n ||	 
Stmt/Ntry || no, 0..n |	transaction 


**Balance**

**Path:** Prefix: Document/BkToCstmrStmt/Stmt/Bal

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

**Path:** Prefix: Document/BkToCstmrStmt/Stmt/Ntry

| Path | Format | Mandatory |  Description |
| ---- | ------ | --------- | ----------------- |
Amt |	18 digits (5 decimal places) |	yes |	amount
Amt/@Ccy |	3 letters |	yes |	currency
CdtDbtInd |	enumeration |	yes |	Debit/Credit
Sts	|	yes |	Status
Sts/Cd |	1-4 characters |	yes (or Prtry) |	Status
BookgDt	||	no |	entry date
BookgDt/Dt  |	YYYY-MM-DD |	yes (alternate DtTm) |	date
ValDt	||	no |	valuta date
ValDt/Dt |	YYYY-MM-DD |	yes (or DtTm) |	date
AcctSvcrRef |	1 to 35 characters (if available) |	no |	Account Servicer Reference
BkTxCd	||	yes	||
BkTxCd/Domn	||	no |	Domain
BkTxCd/Domn/Cd |	1-4 characters |	yes	||
BkTxCd/Domn/Fmly	||	yes	||
BkTxCd/Domn/Fmly/Cd	1-4 characters |	yes	||
BkTxCd/Domn/Fmly/SubfmlyCd |	1-4 characters |	yes	 ||
BkTxCd/Prtry	||	no	||
BkTxCd/Prtry/Cd	| max 35. characters |	yes	||
BkTxCd/Prtry/Issr |	max 35. characters |	no	||
NtryDtls	||	no, 0..n ||
NtryDtls/TxDtls	||	no, 0..n ||	
NtryDtls/TxDtls/RltdPties	||	no	||
NtryDtls/TxDtls/RltdPties/Dbtr	||	no	||
NtryDtls/TxDtls/RltdPties/Dbtr/Pty	||	yes (or Agt)	||
NtryDtls/TxDtls/RltdPties/Dbtr/Pty/Nm	| 1-140 characters |	no	||
NtryDtls/TxDtls/RltdPties/DbtrAcct	||	no	||
NtryDtls/TxDtls/RltdPties/DbtrAcct/Id	||	yes	||
NtryDtls/TxDtls/RltdPties/DbtrAcct/Id/IBAN |	[A-Z]{2,2}[0-9]{2,2}[a-zA-Z0-9]{1,30} |	yes (or Othr)	||
NtryDtls/TxDtls/RltdPties/Cdtr	||	no	||
NtryDtls/TxDtls/RltdPties/Cdtr/Pty	||	yes (or Agt)||	
NtryDtls/TxDtls/RltdPties/Cdtr/Pty/Nm	| 1-140 characters |	no	||
NtryDtls/TxDtls/RltdPties/CdtrAcct	||	no	||
NtryDtls/TxDtls/RltdPties/CdtrAcct/Id	||	yes	||
NtryDtls/TxDtls/RltdPties/CdtrAcct/Id/IBAN |	[A-Z]{2,2}[0-9]{2,2}[a-zA-Z0-9]{1,30}	| yes (or Othr)	||
NtryDtls/TxDtls/RltdAgts	||	no	||
NtryDtls/TxDtls/RltdAgts/CdtrAgt	||	no	||
NtryDtls/TxDtls/RltdAgts/CdtrAgt/FinInstnId	 ||	yes |	financial institution
NtryDtls/TxDtls/RltdAgts/CdtrAgt/FinInstnId/Nm |	1 - 140 characters |	no |	Name
NtryDtls/TxDtls/RmtInf	||	no |	purpose of use
NtryDtls/TxDtls/RmtInf/Ustrd	 | 1 - 140 characters |	no |	purpose of use

