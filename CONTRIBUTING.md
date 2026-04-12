# Contributing to Nyx UI

Thank you for your interest in contributing to Nyx UI! This document provides guidelines and instructions to help you contribute effectively.

## Getting Started

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/YOUR_USERNAME/nyxui.git
cd nyxui
```

3. Add the upstream remote:

```bash
git remote add upstream https://github.com/MihirJaiswal/nyxui.git
```

### Development Setup

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The site will be available at `http://localhost:3000`.

## Project Structure

```
nyxui/
├── app/             # Next.js app router pages
├── components/      # React components
│   └── ...          # components used for website
├── content/         # MDX content files
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── public/          # Static assets
├── registry/        # Component registry for shadcn
│   ├── ui/          # UI components
│   ├── example/     # Component demo/examples
│   ├── lib/         # Registry utilities
│   └── ...          # Other registry items
├── scripts/         # Build and automation scripts
└── styles/          # Global styles
```

## How to Contribute

### Reporting Bugs

Before creating a bug report, please check if the issue already exists. When reporting bugs, include:

- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser/environment info

### Suggesting Features

Feature requests are welcome! Please provide:

- Clear description of the feature
- Use cases and motivation
- Any design ideas or references

### Adding Components

To add a new component:

1. Create a discussion or issue first to discuss the component
2. Place UI components in `registry/ui/` directory
3. Follow the existing code style and patterns
4. Ensure the component is accessible
5. Add documentation in MDX format in the `content` directory
6. Register the component in `registry/registry-ui.ts`
7. Update the registry if needed:

```bash
pnpm registry:build
```

### Code Style

We use ESLint and Prettier for code formatting. Please run these before committing:

```bash
# Lint code
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format
```

### Commit Guidelines

- Use clear, descriptive commit messages
- Reference issues/PRs when relevant
- Keep commits focused and atomic

Example:

```
Add interactive card component with hover effects

- Implements 3D tilt animation
- Adds accessibility attributes
- Includes TypeScript types

Closes #123
```

## Pull Request Process

1. **Sync your fork** with upstream:

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

2. **Create a feature branch**:

```bash
git checkout -b feature/your-feature-name
```

3. **Make your changes** following the guidelines above

4. **Test your changes**:

```bash
pnpm build
pnpm typecheck
```

5. **Commit and push**:

```bash
git add .
git commit -m "Your descriptive commit message"
git push origin feature/your-feature-name
```

6. **Open a Pull Request**:
   - Provide a clear title and description
   - Link related issues
   - Include screenshots for UI changes
   - Ensure all checks pass

## Development Guidelines

### Component Guidelines

- Use TypeScript for all components
- Export proper prop types
- Include JSDoc comments for complex props
- Support both controlled and uncontrolled patterns where applicable
- Ensure keyboard navigation works
- Test with screen readers for accessibility

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow the existing color scheme and design tokens
- Support both light and dark themes
- Use `cn()` utility for conditional classes
- Avoid arbitrary values;

### Animation Guidelines

- Use Motion for animations
- Respect `prefers-reduced-motion`
- Keep animations performant (use transform/opacity)
- Provide options to disable/customize animations

## Community

- Be respectful and constructive in discussions
- Help others in issues and discussions
- Share your work built with Nyx UI

## Questions?

Feel free to open a discussion or reach out on [X/Twitter](https://x.com/mihir_jaiswal_).

Thank you for contributing! 🚀
