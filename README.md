---
runme:
  id: 01HPRQ5PPATJEDEV5R2Q2GABHR
  version: v3
---

# Node Affiliate port

Welcome to our Affiliate Port Node.js Monorepo! This project aims to streamline the integration of various CPA (Cost Per Action) networks into your applications. We leverage the power of Nx for efficient monorepo management and follow industry-standard practices such as conventional commits and maintaining a high test coverage.

## Features

- **Admitad Integration/Mitgo**: In Progress. For detailed information see [Admitad Integration] README (#)
- **Gdeslon**: Planed
- **Awin**: Planed
- **CityAds**: Planed

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository: `git clone https://github.com/affiliateforge/node-affiliate-port`
2. Install dependencies: `yarn install`
3. Build lib: `nx run admitad-port:build`
4. Run tests: `nx test admitad-port:test`

## Conventional Commits

We follow the conventional commits specification, which allows for a consistent and structured commit history. Each commit should have a type, scope, and a short description. For example:

- `feat(admitad): add authentication endpoint`
- `fix(admitad): handle error in order processing`

Refer to [Conventional Commits](https://www.conventionalcommits.org/) for more details.

## Test Coverage

Maintaining a high test coverage is crucial for ensuring the reliability and stability of our codebase. We aim to keep our unit test coverage above 80%, ensuring that most of our code resides in the "green zone".

## Roadmap

### Admitad Integration
- [x] Authentication
- [x] Deep link creation
- [ ] Reporting
- [ ] Commission Tracking

## Contributing

We welcome contributions from the community! If you'd like to contribute, please follow these steps:
1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes following the conventional commits guidelines.
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Nx for providing a powerful toolkit for monorepo management.
- Conventional Commits for maintaining a clean and structured commit history.
- Our contributors and users for their valuable feedback and contributions.

---

Feel free to customize this README further according to your project's specific needs. Happy coding! 🚀
