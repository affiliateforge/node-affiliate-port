---
runme:
  id: 01HPRQSP5S34CK28PAWKEFRAV2
  version: v3
---

# Admitad CPA Integration Library

Welcome to the Admitad CPA Integration Library! This library provides a convenient way to integrate with the Admitad CPA network, allowing you to easily generate deep links, create tokens, and perform various API operations. 

## Features

- **Token Creation**: Generate tokens for accessing the Admitad API.
- **Deep Link Generation**: Easily create deep links for tracking affiliate actions.
- **Error Handling**: Robust error handling for managing API errors.

## Getting Started

To start using the Admitad CPA Integration Library in your project, follow these steps:

1. Install the library via npm or yarn:

```bash
npm install admitad-cpa-library
```

or

```bash
yarn add admitad-cpa-library
```

2. Import the library into your project:

```javascript
import { AdmitadCpa } from 'admitad-cpa-library';
```

3. Initialize the AdmitadCpa class with your Admitad API settings:

```javascript
const admitadApiSettings = {
  client_id: 'YOUR_CLIENT_ID',
  client_secret: 'YOUR_CLIENT_SECRET'
};

const admitad = new AdmitadCpa(admitadApiSettings);
```
More information about credentials you can find [here](https://developers.admitad.com/hc/ru/articles/7930242014353-%D0%9E%D0%B1%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-access-token)

4. Start using the library methods:

```javascript
// Create token
const tokenResponse = await admitad.createToken();

// Generate deep link
const deepLinkOptions = {
  // deep link options
};
const deepLinks = await admitad.deepLink(deepLinkOptions);
```

## Usage

### Check Admitad Site Availability

To check if the Admitad site is available, you can use the `checkSite` method:

```javascript
const response = await AdmitadCpa.checkSite();
console.log(response);
```

### Token Creation

To create a token for accessing the Admitad API, use the `createToken` method. This method returns a promise that resolves with the token response object. We make it public for the future integrations. Here's an example of how to use the `createToken` method:

```javascript
const tokenResponse = await admitad.createToken();
console.log(tokenResponse);
```

### Deep Link Generation

To generate deep links for tracking affiliate actions, use the `deepLink` method:

```javascript
const deepLinkOptions = {
  // deep link options
};
const deepLinks = await admitad.deepLink(deepLinkOptions);
console.log(deepLinks);
```

## Contributing

We welcome contributions from the community! If you'd like to contribute to the library, please follow the steps outlined in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Axios for handling HTTP requests.
- qs for serializing query parameters.
- Nx for efficient monorepo management.

---

Feel free to customize this README further according to your project's specific needs. Happy integrating with Admitad CPA! 🚀
