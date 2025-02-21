
# Wroom Rails Application

## Overview

Wroom is an innovative AI-powered platform designed to assist storytellers in the filmmaking process. It offers a suite of tools that streamline the creation of dynamic scenes, interactive story development, and customizable character building. Through its cutting-edge AI technology, Wroom enables filmmakers to unlock creative potential without needing to navigate complex technical barriers. This platform allows for effortless integration of AI into the filmmaking workflow, making it accessible to creators of all backgrounds.

This repository contains the Rails application for Wroom, which serves as the backend for the Wroom platform, offering APIs and services to support the AI-driven filmmaking features available on [wroom.ai](https://wroom.ai).

## Features

- **Rails 7.0.5** for powerful, modern web framework support.
- **PostgreSQL** as the database for robust, production-ready data management.
- **Puma** as the web server to handle high traffic.
- **Redis** integration for real-time functionalities like Action Cable.
- **Turbo & Stimulus** for seamless user interaction and SPA-like behavior.
- **Devise** for user authentication and secure access management.
- **Cancancan** for authorization and role-based access control.
- **Active Storage & Image Processing** for managing images and media assets.
- **Sidekiq** for background job processing.
- **Sentry** for error tracking and monitoring.

## Technologies

- **Ruby 3.2.2**
- **Ruby on Rails 7.0.5**
- **PostgreSQL** for database
- **Puma** for web server
- **Redis** for background job management and real-time features
- **Sidekiq** for background jobs
- **Google Cloud Storage** for file storage
- **Stripe** for payment processing
- **Devise** for user authentication
- **ActiveAdmin** for administrative dashboard
- **Sentry** for error monitoring

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Wroom-ai-Development/wroom-rails.git
   cd wroom-rails
   ```

2. Install dependencies:

   ```bash
   bundle install
   ```

3. Set up the database:

   ```bash
   rails db:create
   rails db:migrate
   ```

4. Set environment variables. You can use `dotenv` to manage sensitive configuration details like API keys and credentials. Create a `.env` file in the root directory and populate it with the necessary environment variables.

5. Start the Rails server:

   ```bash
   rails server
   ```

   The application will be available at `http://localhost:3000`.

## Gems & Libraries

### Key Gems

- **Devise**: Provides user authentication and management tools.
- **Cancancan**: Role-based authorization for controlling access permissions.
- **Sidekiq**: Handles background jobs and asynchronous processing.
- **ActiveAdmin**: A flexible and customizable admin dashboard.
- **Turbo & Stimulus**: Enhances user interaction by enabling SPA-like behavior.
- **ImageProcessing**: Manages image transformations and file handling.
- **Google Cloud Storage**: Integrates with Google Cloud for file storage.
- **Stripe**: Provides payment processing services.

### Development Tools

- **RSpec**: Testing framework for writing unit and integration tests.
- **FactoryBot**: Fixtures for setting up test data.
- **Rubocop**: Linting tool for maintaining code quality.
- **Brakeman**: Static analysis tool for detecting security vulnerabilities.
- **Faker**: Generates fake data for testing and seeding.
- **Pry**: Interactive shell for debugging and exploration.

## Configuration

### Redis Configuration

Wroom uses Redis to manage real-time updates and background tasks. Ensure Redis is running on your machine or on a remote server, and configure it in your `config/cable.yml` and `config/sidekiq.yml` files.

### Payment Integration with Stripe

Wroom integrates with Stripe to manage payments. To enable this, make sure you have the Stripe API keys set in your `.env` file.

```env
STRIPE_PUBLIC_KEY=your_public_key
STRIPE_SECRET_KEY=your_secret_key
```

## Usage

Wroom enables filmmakers and storytellers to enhance their projects with AI-powered features. Through this backend, users can:

- **Create and manage accounts** using Devise.
- **Upload and manipulate media files** with ActiveStorage and ImageProcessing.
- **Process payments** for premium features using Stripe.
- **Monitor and debug errors** using Sentry.
- **Interact with AI-powered tools** for script generation, character design, and scene creation.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

We welcome contributions! To contribute to this project:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-xyz`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-xyz`).
5. Create a new Pull Request.

## Acknowledgments

- **Ruby on Rails**: The backbone of the application.
- **PostgreSQL**: The database that ensures data integrity.
- **Stripe**: The payment provider that allows us to handle transactions seamlessly.
- **Redis & Sidekiq**: The tools that enable background job processing and real-time functionality.
- **Sentry**: For monitoring and tracking errors in production.

For more information, visit our [website](https://wroom.ai).
