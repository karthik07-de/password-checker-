# Contributing to SecurePass Guard

Thank you for your interest in contributing to SecurePass Guard! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/securepass-guard.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes thoroughly
6. Commit with clear messages: `git commit -m "Add feature: description"`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Create a Pull Request

## Development Setup

See [QUICKSTART.md](QUICKSTART.md) for detailed setup instructions.

## Code Style

### Backend (JavaScript/Node.js)
- Use ES6+ features
- Follow Express.js best practices
- Use async/await for asynchronous operations
- Add JSDoc comments for functions
- Keep functions small and focused

### Frontend (React)
- Use functional components with hooks
- Follow React best practices
- Use meaningful component and variable names
- Keep components small and reusable
- Use Tailwind CSS for styling

### General
- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Add comments for complex logic
- Write self-documenting code

## Commit Messages

Follow conventional commits format:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

Example: `feat: add password export functionality`

## Testing

Before submitting a PR:
1. Test all affected features manually
2. Ensure no console errors
3. Test on different screen sizes
4. Test in both light and dark modes
5. Verify API endpoints work correctly

## Pull Request Process

1. Update documentation if needed
2. Add description of changes
3. Reference any related issues
4. Ensure all tests pass
5. Request review from maintainers

## Feature Requests

- Open an issue with the `enhancement` label
- Describe the feature clearly
- Explain the use case
- Discuss implementation approach

## Bug Reports

Include:
- Clear description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Environment details (OS, browser, Node version)

## Security Issues

**DO NOT** open public issues for security vulnerabilities.
Email security@example.com instead.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the project
- Show empathy towards others

## Areas for Contribution

### High Priority
- Email notifications for breaches
- OAuth integration (Google, GitHub)
- Two-factor authentication
- Password import/export
- Browser extension

### Medium Priority
- Password history
- Secure notes
- File attachments
- Team sharing
- Mobile apps

### Low Priority
- Biometric authentication
- Emergency access
- Password audit reports
- Custom themes

## Questions?

Feel free to open an issue with the `question` label or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to SecurePass Guard! 🔒
