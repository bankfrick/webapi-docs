---
title: Bank Frick webAPI Documentation

language_tabs: # must be one of https://git.io/vQNgJ
  - shell--sandbox: sandbox 
  - shell--production: production

toc_footers:
  - <a href='https://developers.bankfrick.li' target='_blank' rel='noopener noreferrer'>Visit Bank Frick Developers</a>
  - <a href='https://developers.bankfrick.li/signup' target='_blank' rel='noopener noreferrer'>Sign Up for a Developer Key</a>
  - <a href='https://github.com/bankfrick/webapi-docs' target='_blank' rel='noopener noreferrer'>Edit on GitHub</a>

includes:
  - authorize
  - accounts
  - custodyaccounts
  - info
  - requesttan
  - signtxwithtan
  - signtxwithouttan
  - trading
  - transactions
  - camt052
  - camt053
  - pain001
  - errors
  - datatypes

search: true
---

# Introduction

```nginx
  _   _      _ _        __        __         _     _ _ 
 | | | | ___| | | ___   \ \      / /__  _ __| | __| | |
 | |_| |/ _ \ | |/ _ \   \ \ /\ / / _ \| '__| |/ _` | |
 |  _  |  __/ | | (_) |   \ V  V / (_) | |  | | (_| |_|
 |_| |_|\___|_|_|\___/     \_/\_/ \___/|_|  |_|\__,_(_)                  
```

This is the Bank Frick online banking webAPI documentation. In this documentation the client can see what requirements must be fulfilled, which functionalities Bank Frick's online banking webAPI must have and how it must be set up.

The online banking webAPI enables to create and approve payment orders and receive account information in a simplified JSON format or standardized camt report without the requirement of logging in into the online banking frontend.

We have examples for the sandbox as well as for the production environment. You can view code examples in the dark area to the right, and you can switch the environment of the examples with the tabs in the top right.

# Getting Started

In order to use the online banking WebAPI, the client requires having an active account which allows him to access one or multiple customers depending on the user privileges and contact to customer assignments. The user account is identified by a contact number which also enables him to login into the online banking client gui. In general, the privileges to access accounts and create payment orders are the same for the gui and the WebAPI.

The client user must create an API-Key (Personal Access Token) which will later be used to identify a client application which uses the WebAPI. The API-Key can be created within the gui using the Manage API-Keys Dialog. The client user can define permissions that refer exclusively to the API-Key and set an expiration date. With the API-Key the client application will authenticate on the WebAPI interface.

The client application logs in by sending his API-Key and current password. The API-Key must be created in beforehand by the client user via the online banking gui (requires TAN).

The server verifies the key, it retrieves the client information, generates a JWT (JSON Web Token) containing user details and permissions that will be used to access the services, and the server also sets the expiration on the JWT. The expiration date of the JWT can be before the expiration date of the API-Key, but can never exceed it. At default it is unlimited.

The server signs and sends the JWT to the client as a response to the initial request with the API-Key. Note that the communication itself is stateless, meaning that once a JWT is acquired, the client application can use the token indefinitely respectively as long as stated in the token or the API-Key is revoked. The JWT is not stored on the server.

The client sends the stored JWT in the authorization header for every following request to the server.

For each request, the server takes the JWT from the authorization header and validates the signature, extracts the user data and permissions. If the JWT cannot be validated or is no longer accepted, the server will send a 401 HTTP code (unauthorized) as response.

Here you can sign up for an account: <a href="https://developers.bankfrick.li/signup" target="_blank" rel="noopener noreferrer">Sign up</a>

After the Sign Up, you will receive the following two informations by email to access your account and use the webAPI.

  * Contact number
  * Password

If you subsequently have an active Bank Frick account, you can start webAPI with the Online Banking setup.

Currently 2 environments are available

  * Production: <a href="https://olb.bankfrick.li/" target="_blank" rel="noopener noreferrer">https://olb.bankfrick.li</a>
  * Sandbox:    <a href="https://olbtest.bankfrick.li/" target="_blank" rel="noopener noreferrer">https://olbtest.bankfrick.li</a>

The API is available under the following path:<br>
BaseURL = \<Environment URL\>/webapi/v2/

Schemes: https

## Signatures

Message payloads must be signed by the sender of the message and be verified by the receiver. The signature will be transmitted in the ‘Signature’ header field of the HTTP Request/Response. The signature is a Base64-encoded binary SHA signature of the content of the message-body. The 'algorithm' header parameter is used to specify the digital signature algorithm to use when generating the signature. Valid values for this parameter are [rsa-sha512, rsa-sha384, rsa-sha256]. If ‘algorithm’ is not provided by the client the server will assume rsa-sha512.

### SSH-Key-Management

The public key of the client must be uploaded to the server using the online banking gui manage ssh key dialog and assigned to an access token. The user must give a unique title respectively a name to the public key. The public key itself can be copied into the input field and added with the "Add SSH-Key" button. The following formats for the public key are accepted:

  * X.509 SubjectPublicKeyInfo (PEM header: BEGIN PUBLIC KEY)

A public/private key pair can be created using various tools, e.g. via openssl command line

`$ openssl genrsa -out private.key 4096`<br>`$ openssl rsa -in private.key -outform PEM -pubout -out public.pem`

Or via Java:

`KeyPairGenerator instance = KeyPairGenerator.getInstance("RSA");`<br>`instance.initialize(4096, secureRandom);`<br>`KeyPair generateKeyPair = instance.generateKeyPair();`

**Note:** Private keys must be stored safely and never shared.

### Sample signing with openssl

`$ openssl dgst –sha512 –sign private.key –out request.body.sha512 request.body`<br>`$ openssl base64 -A –in request.body.sha512 -out request.signature`

### Sample signature verification using openssl

`$ openssl base64 -A –d –in response.signature -out response.body.sha512`<br>`$ openssl dgst –sha512 –verify public.pem –signature response.body.sha512 response.body`

### Sample signing with Java

 `public String getSignature(byte[] body, PrivateKey privateKey) throws Exception {`<br>`Signature privateSignature = Signature.getInstance("SHA512withRSA");`<br>`privateSignature.initSign(privateKey);`<br>`privateSignature.update(body);`<br>`byte[] signature = privateSignature.sign();`<br>`return Base64.getEncoder().encodeToString(signature);`<br>`}`

### Sample signature verification using Java

`public boolean isValid(byte[] body, String signature, PublicKey publicKey) throws Exception {`<br>`Signature publicSignature = Signature.getInstance("SHA512withRSA");`<br>`publicSignature.initVerify(publicKey);`<br>`publicSignature.update(body);`<br>`byte[] signatureBytes = Base64.getDecoder().decode(signature);`<br>`return publicSignature.verify(signatureBytes);`<br>`}`

## Manage API Keys

Now, you are able to generate a personal API-Key for an application which uses the webAPI. The API-Key replaces the user contact number for requesting a JWT from the authorization server, however for each further request it is still required that the user account is still active and accessible. If the you lock the account e.g. via the “Lock Password” function or by entering false passwords at the login, all client JWTs will lose access privileges temporarily until the user is unlocked again from an advisor in the backend.

An API-Key is a personalized access token which will be generated once by the server using the settings provided by the contact. The settings describe the name, expire date and scope of the access token. Also a client public key must be defined which will be used by the server to validate the signature of the messages send by the client.

A generated access token will be displayed after a successful entered TAN challenge for a limited amount of time. After that, the token cannot be accessed again. Changing a token would require to delete the old token and create a new one. You are responsible to save and handle the access key securely. 
Additionally, you can limit the access to the WebAPI of your account to a specific IP address or subnet. For that, the firewall must be configured accordingly so that your IP address is passed to the application server (transparent proxy) in the “X-FORWARDED-FOR” or any other suitable request header field.

![Upload API Keys](/images/documentation/bank-frick-webapi-upload-ssh-keys.png "Upload API Keys")

![Manage API Keys](/images/documentation/bank-frick-webapi-manage-api-keys.png "Manage API Keys")

## WebHooks

This dialog shows an overview of all created and active notification rules. You are able to define notification rules to be informed when a criteria matches, e.g. a charge or credit entry on an account or an executed payment order. New rules can be created, edited or deleted at any time. 

You are able to create or edit a notification rule which triggers on the defined event and notifies the user. You can define a rule for a specific customer or account or in a general case for all accounts. 
The notification rule condition is checked by the server in regular intervals and if a rule is fulfilled you are notified once via the selected method until the condition is reset and met again.

WebHooks allows the user to develop push notifications. These push notifications are simply an HTTP POST that is triggered by the defined action. The notification does contain information about the triggered notification rule but no further critical data. Also a signature of the body is added which can be verified by the server public key. 
The server will send a JSON message containing the relevant information about the rule.

If the message cannot be delivered, e.g. because the client server is not responding, the event will be discarded and not be send again until the notification condition is triggered again. The request is asynchronous meaning the server does not wait for a client response.

![WebHooks](/images/documentation/bank-frick-webapi-webhooks.png "WebHooks")

![WebHooks Details](/images/documentation/bank-frick-webapi-webhooks-details.png "WebHooks Details")