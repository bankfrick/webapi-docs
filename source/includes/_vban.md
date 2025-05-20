# Virtual IBAN

This API allows for creation, managing, and deactivation of associations between virtual IBANs (vIBANs) and reference
accounts (IBANs). This also includes the approval procedure for the activation and deactivation of vIBANs.

Users need to be authenticated using the `authorize` endpoint of the web API with scope `account`.
Creating, approving, and deactivation of vIBANs requires signing permissions.

All details are specified in the openApi specs below:

- [OpenAPI JSON](https://raw.githubusercontent.com/bankfrick/webapi-docs/refs/heads/master/source/files/vban-public-openapi.json)
- [OpenAPI YAML](https://raw.githubusercontent.com/bankfrick/webapi-docs/refs/heads/master/source/files/vban-public-openapi.yaml)
