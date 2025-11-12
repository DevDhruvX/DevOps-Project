# Contributing to StudySync DevOps Platform

We love your input! We want to make contributing to StudySync as easy and transparent as possible.

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Development Setup

```bash
# Clone the repository
git clone https://github.com/DevDhruvX/DevOps-Project.git
cd DevOps-Project

# Start development environment
docker compose up -d

# Frontend development
cd frontend
npm install
npm run dev

# Backend development  
cd backend
npm install
npm run dev
```

## Testing

```bash
# Run frontend tests
cd frontend
npm test

# Run backend tests
cd backend
npm test

# Integration tests
docker compose -f docker-compose.test.yml up --build
```

## Code Style

- Use ESLint for JavaScript/TypeScript
- Follow Prettier formatting
- Write meaningful commit messages
- Add comments for complex logic

## Reporting Issues

Use GitHub issues to report bugs. Please include:

- OS version
- Node.js version
- Docker version
- Steps to reproduce
- Expected behavior
- Actual behavior

## License

By contributing, you agree that your contributions will be licensed under the MIT License.