# Data Types

## Account

> Response

```json          
{
  "account" : "00012345/001.000.001",
  "type" : "CURRENT ACCOUNT",
  "iban" : "LI6808811000000001234",
  "customer" : "00012345 Satoshi Nakamoto",
  "currency" : "CHF",
  "balance" : 10000.0,
  "available" : 0.0
}
```

A single account instance

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| account |	string |	required |	The account number of the account |
| type |	string |	required |	The type of the account |
| iban |	string |	 |	The iban of the account if exists |
| customer |	string |	required |	The customer data of the account which consists of the customer number and name |
| currency |	string |	required |	The account currency |
| balance |	number |	required |	The current account balance |
| available |	number |	 |	The available amount of the account as defined in the online banking |

## Accounts

> Response

```json          
{
  "date" : "2018-12-31",
  "moreResults" : false,
  "resultSetSize" : 2,
  "accounts" : [ {
    "account" : "00012345/001.000.001",
    "type" : "CURRENT ACCOUNT",
    "iban" : "LI6808811000000001234",
    "customer" : "00012345 Satoshi Nakamoto",
    "currency" : "CHF",
    "balance" : 10000.0,
    "available" : 0.0
  }, {
    "account" : "00012345/001.000.978",
    "type" : "CURRENT ACCOUNT",
    "iban" : "LI6808811000000001234",
    "customer" : "00012345 Satoshi Nakamoto",
    "currency" : "EUR",
    "balance" : -1321.0,
    "available" : 0.0
  } ]
}
```

The accounts message response body.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| date|	string |	required |	The balance date (today) |
| moreResults |	boolean |	required |	Attribute indicates that more results are available on the server |
| resultSetSize |	number |	required |	Number of results in the returned result set |
| accounts |	array of [Account](#data-types-account)	| |	The list of accounts |

## Approval

> Response

```json          
{
  "contact" : "1234 Satoshi Nakamoto",
  "group" : 1,
  "dateOfApproval" : "2018-08-22T10:07:02"
}
```

A approval of a transaction.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| contact |	string | |	The contact information about the user who gave the approval |
| group |	number | |	The contacts group if a special group policy applies |
| dateOfApproval |	string | |	The date the approval was given |

## Authorize

> Response

```json          
{
  "key" : "1234567890abcdefgHIJKLMN",
  "password" : "secret"
}
```

The authorization message request body.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| key |	string |	required |	The previously generated API-Key (Personal Access Token) |
| password |	string |	required |	The current user password |

## AuthorizeResponse

> Response

```json          
{
  "token" : "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJCYW5rIEZyaWNrIFdlYkFQSSIsInN1YiI6IlRhZ2VzYWJzY2hsdXNzIiwiY29udGFjdCI6IjY3ODkiLCJuYW1lIjoiTWF4IE11c3RlciIsInBlcm1pc3Npb25zIjpbImFjY291bnRzIiwidHJhbnNhY3Rpb25zIiwiY2FtdDA1MiIsImNhbXQwNTMiXSwiYXVkIjoicHJvZHVjdGlvbiIsImV4cCI6MTU0NjMwMDgwMCwiaWF0IjoxNTMzMTA5MzIzfQ.DlxpBZMGAZx1xK-UdA-s9SrHMrEIt60waF1kLYG6kCuTRMrcDiS3KR8p0bAyZaLUWlfSJF3TCMb2Tup5MyLFWc0fZRJfu0mBEyz74ZwbSN9iTrwzzsfIuX2E1d895hR1MgsMy2i1Qu-vwZgsW0WivnNCHBMLZH0jM94v1czt7f0"
}
```

The authorization message response body.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| token |	string |	required |	The assigned JWT for the login request |

## Charge

Enum values for the 'charge' field.

**Properties**

| value | description |
| ----- | ----------- |
| BEN |	beneficiary pays costs |
| OUR |	sender pays costs |
| SHA |	shared costs |

## CreateTransaction

> Request

```json          
{
  "transactions" : [ {
    "customId" : "A4711",
    "type" : "SEPA",
    "amount" : 1000.00,
    "currency" : "EUR",
    "express" : true,
    "valuta" : "2019-04-28",
    "valutaIsExecutionDate" : true,
    "reference" : "some individual text",
    "charge" : "SHA",
    "debitor" : {
      "iban" : "LI6808811000000001234"
    },
    "creditor" : {
      "name" : "Satoshi Nakamoto",
      "iban" : "DE12500105170648489890"
    }
  }, {
    "customId" : "A4712",
    "type" : "FOREIGN",
    "amount" : 1337.00,
    "currency" : "EUR",
    "express" : true,
    "reference" : "some individual text",
    "charge" : "SHA",
    "debitor" : {
      "iban" : "LI6808811000000001234"
    },
    "creditor" : {
      "accountNumber" : "123456123",
      "name" : "Satoshi Nakamoto",
	    "address" : "Street 100",
	    "postalcode" : "150004",
	    "city" : "Tokyo",
	    "country" : "Japan",
      "bic" : "MHCBJPJ6",
      "creditInstitution" : "MIZUHO BANK"
    }
  } ]
}
```

The create transactions request body.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| transactions | array of [Transaction (new instance)](#data-types-transaction-new-instance) |	required |	the list of transactions to be created |


## CustodyAccounts

> Example

```json          
{
  "date" : "2018-12-31",
  "moreResults" : false,
  "resultSetSize" : 2,
  "custodyAccount" : "00012345-000",
  "type" : "DEPOT Satoshi Nakamoto",
  "customer" : "00012345 Satoshi Nakamoto",
  "positions" : [ {
    "valorNumber" : "000037310703-000",
    "valorName" : "BK FRICK CRYPTOCURRENCY I 01.7.22",
    "isin" : "LI0373107031",
    "valorCurrency" : "CHF",
    "currency" : "CHF",
    "currentPrice" : 234.14,
    "quantity" : 10.0,
    "marketValutation" : 2341.40,
    "valorCategory" : "181 - HYBRIDE INSTRUMENTE EIGENE",
    "courseDate" : "2018-04-10",
    "acqPrice" : 420000.0,
    "avePrice" : 450000.0,
    "winLoss" : 14250.0
  }, {
    "valorNumber" : "000000324410-000",
    "valorName" : "BMW AG",
    "isin" : "DE0005190003",
    "valorCurrency" : "EUR",
    "currency" : "CHF",
    "currentPrice" : 125.0,
    "quantity" : 4500.0,
    "marketValutation" : 562500.0,
    "valorCategory" : "201 - AKTIEN",
    "courseDate" : "2018-04-10",
    "acqPrice" : 4200000.0,
    "avePrice" : 4500000.0,
    "winLoss" : 142500.0
  } ]
}
```

A single custody account instance

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| date |	string | | The market valutation date |
| moreResults |	boolean | |	Attribute indicates that more results are available on the server |
| resultSetSize |	number | |	Number of results in the returned result set |
| custodyAccount | string | required | The custody account number. This identifier can be used to access details information for the depot |
| type | string | | The depot name/type |
| customer | string | customer | The customer data of the account which consists of the customer number and name |
| positions | array of CustodyAccountPosition | | |

## CustodyAccountPosition

> Example

```json          
{
  "valorNumber" : "000000324410-000",
  "valorName" : "BMW AG",
  "isin" : "DE0005190003",
  "valorCurrency" : "EUR",
  "currency" : "CHF",
  "currentPrice" : 125.0,
  "quantity" : 4500.0,
  "marketValutation" : 562500.0,
  "valorCategory" : "201 - AKTIEN",
  "courseDate" : "2018-04-10",
  "acqPrice" : 4200000.0,
  "avePrice" : 4500000.0,
  "winLoss" : 142500.0
}
```

A single depot position item.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| valorNumber |	string | required | The valor number |
| valorName |	string | |	The valor name |
| isin |	string | |	The valor position ISIN International Securities Identification Number |
| valorCurrency | string | | The valor currency |
| currency | string | | The customer currency |
| currentPrice | string |  | The current market price |
| quantity | number | | The quantity |
| marketValutation | number | | The current market valutation |
| valorCategory | string | | The valor category |
| courseDate | string | | Date of the current rating |
| acqPrice | number | | The entry price of the position |
| avePrice | number | | The average price |
| winLoss | number | | The net profit/loss |

## CustodyAccountTransaction

> Example

```json          
{
  "refid" : "123123",
  "status" : "BOOKED",
  "orderType" : "VCN - REDEMPTION",
  "valorNumber" : "000000008882",
  "valorName" : "ACTIVE BOND FUND PLUS - CHF",
  "isin" : "LI0326842163",
  "rate" : 100.34,
  "transactionDate" : "2018-12-31",
  "quantity" : 123.1234,
  "courtage" : 10.0,
  "fees" : 10.0,
  "exchange" : "011 - BALZERS",
  "currency" : "CHF",
  "totalAmount" : 123.12
}
```

A single transaction on a custody account.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| refid | string | required | The transaction reference id |
| status | [TransactionStatus](#data-types-transactionstatus) | required | The transaction status |
| orderType | string | | The order type |
| valorNumber |	string | required | The valor number |
| valorName |	string | |	The valor name |
| isin |	string | |	The valor position ISIN International Securities Identification Number |
| rate | number | | The transaction rate |
| transactionDate | string | required | The transaction date |
| quantity | number | | The transaction quantiy |
| courtage | number | | Transaction courtage |
| fees | number | | Transaction fees amount |
| exchange | string | | The exchange place |
| currency | string | required | The transaction currency |
| totalAmount | number | required | The transaction total amount |

## CustodyAccountTransactions

> Example

```json          
{
  "date" : "2018-12-31",
  "moreResults" : false,
  "resultSetSize" : 2,
  "transactions" : [ {
    "refid" : "123123",
    "status" : "BOOKED",
    "orderType" : "VCN - REDEMPTION",
    "valorNumber" : "000000008882",
    "valorName" : "ACTIVE BOND FUND PLUS - CHF",
    "isin" : "LI0326842163",
    "rate" : 100.34,
    "transactionDate" : "2018-12-31",
    "quantity" : 123.1234,
    "courtage" : 10.0,
    "fees" : 10.0,
    "exchange" : "011 - BALZERS",
    "currency" : "CHF",
    "totalAmount" : 123.12
  }, {
    "refid" : "123123",
    "status" : "BOOKED",
    "orderType" : "VCN - REDEMPTION",
    "valorNumber" : "000000008882",
    "valorName" : "ACTIVE BOND FUND PLUS - CHF",
    "isin" : "LI0326842163",
    "rate" : 100.34,
    "transactionDate" : "2018-12-31",
    "quantity" : 123.1234,
    "courtage" : 10.0,
    "fees" : 10.0,
    "exchange" : "011 - BALZERS",
    "currency" : "CHF",
    "totalAmount" : 123.12
  } ]
}
```

The custodyaccounts transactions message response body.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| date |	string | required | The result set date |
| moreResults |	boolean | |	Attribute indicates that more results are available on the server |
| resultSetSize |	number | |	Number of results in the returned result set |
| transactions | array of [CustodyAccountTransaction](#data-types-custodyaccounttransaction)

## DeleteRequestTan

> Response

```json          
{
  "challengeId" : "c6f8dd20-aad0-11e8-98d0-529269fb1459"
}
```

The delete request tan request body.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| challengeId	| string |	required |	The challenge ID to be deleted, cancels the TAN challenge |

## DeleteTransaction

> Response

```json          
{
  "orderIds" : [ 12345, 12345 ]
}
```

The delete transactions request body.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| orderIds |	array of number |	required |	The order ids (as assigned from the server) to be deleted |

## ErrorMessage

> Response

```json          
{
  "language" : "en",
  "message" : "Parameter iban is missing",
  "code" : "request_body_validation_error"
}
```

A single error message instance.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| language | string | required | The language of the message as ISO 639-1 code |
| message |	string |	required |	An explanation about the error |
| code |	string |	required |	An internal error code |

## Errors

> Response

```json          
{
  "errors" : [ {
    "language" : "en",
    "message" : "Parameter iban is missing",
    "code" : "request_body_validation_error"
  }, {
    "language" : "en",
    "message" : "Parameter iban is missing",
    "code" : "request_body_validation_error"
  } ]
}
```

The error message response body.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| errors |	array of [ErrorMessage](#data-types-errormessage) |	required |	the list of error messages |

## Info

> Response

```json          
{
  "version" : "2.2.5-20180831-1144",
  "environment" : "production",
  "messages" : [ {
    "title" : "Maintenance",
    "message" : "Due to maintenance work, online banking will not be available on 26.07.2018 from 05:00 to 06:00. We apologize for any inconvenience."
  }, {
    "title" : "Maintenance",
    "message" : "Due to maintenance work, online banking will not be available on 26.07.2018 from 05:00 to 06:00. We apologize for any inconvenience."
  } ]
}
```

The info response message body.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| version |	string |	required |	The version information of the webapi service |
| environment |	string |	required |	The webapi environment |
| messages |	array of [InfoMessage](#data-types-infomessage) | |	The list of messages |

## InfoMessage

> Response

```json          
{
  "language" : "en",
  "title" : "Maintenance",
  "message" : "Due to maintenance work, online banking will not be available on 26.07.2018 from 05:00 to 06:00. We apologize for any inconvenience."
}
```

A single info message instance.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| language | string | required | The language of the message as ISO 639-1 code |
| title |	string ||	The message title |
| message |	string ||	The message content |

## Method

Enum values for the 'method' field

**Properties**

| value | description |
| ----- | ----------- |
| SMS_TAN |	TAN send by SMS |
| PUSH_TAN | TAN send by PushTAN App |

## RequestTan

> Response

```json          
{
  "orderIds" : [ 12345, 12345 ],
  "customIds" : [ "...", "..."],
  "method" : "SMS_TAN"
}
```

The request tan request body.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| orderIds | array of number |  | The order ids (as assigned from the server) to request a tan for. Either orderIds, customIds or combination of both must be given. |
| customIds | array of string |  | The custom ids (as assigned from the client) to request a tan for. Either orderIds, customIds or combination of both must be given. |
| method |	[Method](#data-types-method) |	required |	The TAN method to be used for sending the TAN |

## RequestTanResponse

> Response

```json          
{
  "challange" : "c6f8dd20-aad0-11e8-98d0-529269fb1459",
  "expires" : "2018-08-22T10:07:02.895"
}
```

The request tan response body.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| challange |	string |	required |	A challenge id which must be returned to the server when resolving the tan request |
| expires |	string |	required |	The time until the tan challenge must be resolved |

## SignTransactionsWithTan

> Response

```json          
{
  "challengeId" : "zRsFYey8/uVscFn3UVxmpisAlbigLEsvy1M5crtRhMc=",
  "tan" : "123456"
}
```

The sign transactions with tan request body message.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| challengeId |	string |	required |	The challenge id as given in the requestTan response message |
| tan |	string |	required |	The received (SMS-)TAN |

## SignTransactionsWithoutTan

> Response

```json          
{
  "orderIds" : [ 12345, 12345 ]
}
```

The sign transactions without tan request body message.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| orderIds |	array of number |	required |	The order ids (as assigned from the server) to be approved by the user |

## State 

Enum values for the 'state' field.

**Properties**

| value | description |
| ----- | ----------- |
| PREPARED |	The transaction is stored but not yet processed |
| IN_PROGRESS	| The transaction is being processed |
| DELETED |	The transaction was deleted |
| EXPIRED |	The transaction expired |
| EXECUTED |	The transaction was executed |
| REJECTED |	The transaction was rejected |
| ERROR |	The transaction was faulty |

## Transaction (new instance)

> Request

```json          
{
    "transactions" : [ {
    "customId" : "A4711",
    "type" : "SEPA",
    "amount" : 1000.00,
    "currency" : "EUR",
    "express" : true,
    "valuta" : "2019-04-28",
    "valutaIsExecutionDate" : true,
    "reference" : "some individual text",
    "charge" : "SHA",
    "debitor" : {
      "iban" : "LI6808811000000001234"
    },
    "creditor" : {
      "name" : "Satoshi Nakamoto",
      "iban" : "DE12500105170648489890"
   }
  } ]
}
```

A single transaction instance to be created.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| customId |	string |	required, max size: 50, min size: 0 |	Unique custom id for a transaction given by the client |
| type |	[Type](#data-types-type) |	required |	The type of the payment order |
| amount |	number |	required, min: 0.01, max digits: 12 (integer), 2 (fraction) |	The amount of the transaction |
| currency |	string |	required, max size: 3, min size: 0 |	The transaction currency |
| express |	boolean |	required |	Information if it is a express transaction |
| valuta | string | | The value date or execution date of the transaction. If not set, it will be set to the current day (default) |
| valutaIsExecutionDate | boolean | | Indicates if the valuta date is the requested execution date (true) or desired value date (false). If not set it will be the requested execution date (default) |
| reference |	string |	max size: 140, min size: 0 |	The reference text or individual note |
| charge |	[Charge](#data-types-charge)	| required when type FOREIGN | 	The charging type |
| debitor |	[TransactionDebitorAccount](#data-types-transactiondebitoraccount) |	required |	The client information about the transaction |
| creditor |	[TransactionCreditorAccount](#data-types-transactioncreditoraccount) |	required |	The beneficiary information about the transaction |

## Transaction (existing instance)

> Response

```json          
{
  "orderId" : 20222,
  "customId" : "4711",
  "transactionNr": "3307348",
  "serviceType": "SIC",
  "type" : "FOREIGN",
  "state" : "EXECUTED",
  "amount" : 1321.00,
  "currency" : "EUR",
  "valuta" : "2018-08-27",
  "express" : true,
  "valuta" : "2019-04-28",
  "valutaIsExecutionDate" : true,
  "reference" : "Some Individual Text",
  "charge" : "SHA",
  "debitor" : {
    "accountNumber" : "00012345/001.000.001",
    "name" : "Satoshi Nakamoto",
    "iban" : "LI6808811000000001234",
    "bic" : "INGDDEFFXXX",
    "creditInstitution" : "ING-DiBa",
    "esr" : "961116900000006600000009284"
  },
  "creditor" : {
    "accountNumber" : "00012345/001.000.001",
    "name" : "Satoshi Nakamoto",
    "iban" : "LI6808811000000001234",
    "bic" : "INGDDEFFXXX",
    "creditInstitution" : "ING-DiBa",
    "esr" : "961116900000006600000009284"
  },
  "creator" : "1234 Satoshi Nakamoto",
  "createDate" : "2018-08-22T10:07:02",
  "right" : "Bevollmächtigter kollektiv zu 2",
  "groupPolicy" : "Group intern",
  "group" : 1,
  "quorum" : 2,
  "approvals" : [ {
    "contact" : "1234 Satoshi Nakamoto",
    "group" : 1,
    "dateOfApproval" : "2018-08-22T10:07:02"
  }, {
    "contact" : "1234 Satoshi Nakamoto",
    "group" : 1,
    "dateOfApproval" : "2018-08-22T10:07:02"
  } ]
}
```

A single transaction existing instance.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| orderId	| number	| |  The order id as assigned by the system |
| customId | string	 | | Unique custom id for a transaction given by the client |
| transactionNr | number | | Unique reference of the booking assigned by the financial institution |
| serviceType | string | required | The type of the transaction - SWIFT / SIC / EUROSIC |
| type |	[Type](#data-types-type) |	required |	The type of the payment order |
| state |	[State](#data-types-state)	| required |	The state of the payment order |
| amount |	number |	required |	The amount of the transaction |
| currency |	string |	required |	The transaction currency |
| valuta |	string |	required |	The (est.) valuta date of the transaction |
| express |	boolean |	required |	Information if it is a express transaction |
| valuta | string | | The value date or execution date of the transaction. If not set, it will be set to the current day (default) |
| valutaIsExecutionDate | boolean | | Indicates if the valuta date is the requested execution date (true) or desired value date (false). If not set it will be the requested execution date (default) |
| reference |	string	| |	The reference text of individual notes |
| charge |	[Charge](#data-types-charge)	| |	The charging system of the transaction |
| debitor |	[TransactionAccount](#data-types-transactionaccount) |	required |	The client information about the transaction |
| creditor |	[TransactionAccount](#data-types-transactionaccount) |	required |	The beneficiary information about the transaction |
| creator |	string |	required |	The creator contact information |
| createDate |	string	| |	The create date |
| right |	string |	required |	The write privilege of the creator in regards to the customer |
| groupPolicy |	string	| |	Information about applied group policy |
| group |	number	| |	Information about the creators group in case a group policy applies |
| quorum |	number	| |	The total number of approvals required for the transaction |
| approvals |	array of [Approval](#data-types-approval)	| |	A list of approvals given to the payment order |

## TransactionAccount

> Request

```json          
{
  "accountNumber" : "00012345678",
  "iban" : "DE12500105170648489890",
  "name" : "Satoshi Nakamoto",
	"address" : "Street 100",
	"postalcode" : "150004",
	"city" : "Tokyo",
	"country" : "Japan",
  "bic" : "MHCBJPJ6",
  "creditInstitution" : "MIZUHO BANK",
  "esr" : "961116900000006600000009284"
}
```

Debitor or creditor account information of the transaction.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| accountNumber	| string |	max size: 30, min size: 0 |	The account number of the recipient (instead of IBAN, only [type](#data-types-type) = FOREIGN ) |
| aba | string | max size: 11, min size: 0 | The aba routing number of the recipient credit institution (only [type](#data-types-type) = FOREIGN) |
| iban |	string |	max size: 34, min size: 0	| The iban of the recipient account |
| name |	string |	required, max size: 35, min size: 0   |	The name of the recipient |
| address |	string |	max size: 70, min size: 0  | Address information of the recipient (e.g. Street), for international transfers or payments in USD |
| postalcode |	string |	max size: 11, min size: 0   |	Postalcode of the recipient address, for international transfers or payments in USD |
| city |	string |	max size: 70, min size: 0  |	Postalcode of the recipient address, for international transfers or payments in USD |
| country |	string |	max size: 70, min size: 0  |	Country of the recipient, for international transfers or payments in USD |
| bic |	string |	max size: 11, min size: 0 |	The bic of the recipient credit institution (only [type](#data-types-type) = FOREIGN) |
| creditInstitution	| string |	max size: 50, min size: 0 |	The recipient credit institution (only [type](#data-types-type) = FOREIGN) |
| esr	| string |	max size: 27, min size: 0 |	The esr number (only [type](#data-types-type) = ORANGE) |

## TransactionCreditorAccount

> Request

```json          
{
  "accountNumber" : "00012345678",
  "iban" : "DE12500105170648489890",
  "name" : "Satoshi Nakamoto",
	"address" : "Street 100",
	"postalcode" : "150004",
	"city" : "Tokyo",
	"country" : "Japan",
  "bic" : "MHCBJPJ6",
  "creditInstitution" : "MIZUHO BANK",
  "esr" : "961116900000006600000009284"
}
```

The transactions beneficiary account information.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| accountNumber	| string |	max size: 30, min size: 0 |	The account number of the recipient (instead of IBAN, only [type](#data-types-type) = FOREIGN ) |
| aba | string | max size: 11, min size: 0 | The aba routing number of the recipient credit institution (only [type](#data-types-type) = FOREIGN) |
| iban |	string |	max size: 34, min size: 0	| The iban of the recipient account |
| name |	string |	required, max size: 35, min size: 0   |	The name of the recipient |
| address |	string |	max size: 70, min size: 0  | Address information of the recipient (e.g. Street), for international transfers or payments in USD |
| postalcode |	string |	max size: 11, min size: 0   |	Postalcode of the recipient address, for international transfers or payments in USD |
| city |	string |	max size: 70, min size: 0  |	Postalcode of the recipient address, for international transfers or payments in USD |
| country |	string |	max size: 70, min size: 0  |	Country of the recipient, for international transfers or payments in USD |
| bic |	string |	max size: 11, min size: 0 |	The bic of the recipient credit institution (only [type](#data-types-type) = FOREIGN) |
| creditInstitution	| string |	max size: 50, min size: 0 |	The recipient credit institution (only [type](#data-types-type) = FOREIGN) |
| esr	| string |	max size: 27, min size: 0 |	The esr number (only [type](#data-types-type) = ORANGE) |

## TransactionDebitorAccount

> Request

```json          
{
  "iban" : "LI6808811000000001234"
}
```

The transactions client account information.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| iban |	string |	required, max size: 34, min size: 0	| the account iban of the sender |

## Type

Enum values for the 'type' field

**Properties**

| value | currency | description |
| ----- | -------- | ----------- |
| INTERNAL | Any | Internal transfers within the same company |
| BANK_INTERNAL |	Any | Bank Frick Internal Transfer to a different company where the contact is linked to |
| SEPA | Euro |	SEPA Payment (Only transactions in Euro to European countries) |
| FOREIGN	| Any | International Transfer (SWIFT) |
| RED |	CHF & EUR | Red Payment Slip |
| ORANGE | CHF & EUR |	Orange Payment Slip with ESR number (Only in Switzerland) |

## Transactions

> Response

```json          
{
  "moreResults" : false,
  "resultSetSize" : 2,
  "transactions" : [ {
    "orderId" : 20222,
    "customId" : "4711",
    "type" : "FOREIGN",
    "state" : "EXPIRED",
    "amount" : 1321.00,
    "currency" : "EUR",
    "valuta" : "2018-08-27",
    "express" : true,
    "valuta" : "2019-04-28",
    "valutaIsExecutionDate" : true,
    "reference" : "Some Individual Text",
    "charge" : "OUR",
    "debitor" : {
      "accountNumber" : "00012345/001.000.001",
      "name" : "Satoshi Nakamoto",
      "iban" : "LI6808811000000001234",
      "bic" : "INGDDEFFXXX",
      "creditInstitution" : "ING-DiBa",
      "esr" : "961116900000006600000009284"
    },
    "creditor" : {
      "accountNumber" : "00012345/001.000.001",
      "name" : "Satoshi Nakamoto",
      "iban" : "LI6808811000000001234",
      "bic" : "INGDDEFFXXX",
      "creditInstitution" : "ING-DiBa",
      "esr" : "961116900000006600000009284"
    },
    "creator" : "1234 Satoshi Nakamoto",
    "createDate" : "2018-08-22T10:07:02",
    "right" : "Bevollmächtigter kollektiv zu 2",
    "groupPolicy" : "Group intern",
    "group" : 1,
    "quorum" : 2,
    "approvals" : [ {
      "contact" : "1234 Satoshi Nakamoto",
      "group" : 1,
      "dateOfApproval" : "2018-08-22T10:07:02"
    }, {
      "contact" : "1234 Satoshi Nakamoto",
      "group" : 1,
      "dateOfApproval" : "2018-08-22T10:07:02"
    } ]
  }, 
    {
      "orderId": 12345,
      "transactionNr": "1234567",
      "serviceType": "SIC",
      "transactionCode": "102-Transfer int. with Avis/Geb",
      "state": "BOOKED",
      "amount": -200.00,
      "totalAmount": 10060.00,
      "currency": "CHF",
      "valuta": "2020-04-01",
      "bookingDate": "2020-04-01",
      "reference": "Payment to Satoshi Nakamoto",
      "debitor": {
        "name": "Michael Tester",
        "iban": "LI6808811000000001234",
        "bic": "BFRILI22XXX",
        "creditInstitution": "Bank Frick and Co. AG"
      },
      "creditor": {
        "name": "Satoshi Nakamoto",
        "iban": "DE12500105170648489890",
        "bic": "INGDDEFFXXX",
        "creditInstitution": "ING-DiBa GERMANY"
      }
    }
  ]
}
```

The transactions message response body.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| moreResults |	boolean	| required |	Attribute indicates that more results are available on the server |
| resultSetSize |	number |	required |	Number of results in the returned result set |
| transactions |	array of [Transaction (existing instance)](#data-types-transaction-existing-instance) |	required |	the list of transactions |

## TransactionStatus

Enum values for the 'status' field.

**Properties**

| name | description |
| ---- | ----------- |
| BOOKED |