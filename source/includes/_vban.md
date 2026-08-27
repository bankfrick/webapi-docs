# Virtual IBAN

This API allows for creation, managing, and deactivation of associations between virtual IBANs (VBANs) and reference
accounts (IBANs). This also includes the approval procedure for the activation and deactivation of VBANs.

Users need to be authenticated using the `authorize` endpoint of the web API with scope `account`.
Creating, approving, and deactivation of VBANs requires signing permissions.

Virtual IBANs that are tied to a registered end customer are documented separately under
[Named Virtual IBANs (beta)](#named-virtual-ibans-beta). The endpoints below serve plain VBANs only: a Named VBAN
is not returned by `GET /virtual-ibans`, and the read and write endpoints below will reject Named VBANs.
For callers that use plain VBANs only, nothing changes.

All details are specified in the openApi specs below:

- [OpenAPI JSON](https://raw.githubusercontent.com/bankfrick/webapi-docs/refs/heads/master/source/files/openapi/vban-public-openapi.json)
- [OpenAPI YAML](https://raw.githubusercontent.com/bankfrick/webapi-docs/refs/heads/master/source/files/openapi/vban-public-openapi.yaml)
