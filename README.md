# Latest 100 DAI Transfers

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Wagmi](https://img.shields.io/badge/Wagmi-000000?style=for-the-badge&logo=wagmi&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Next.js application that displays the latest 100 DAI token transfers from the Ethereum blockchain. Features real-time updates, filtering, and sorting capabilities.

## Features

- **Real-time Updates**: Listens to DAI contract and appends latest transfers
- **Filtering**: Filter results by sender and recipient address
- **Sorting**: Sort table by timestamp and amount value
- **Auto-caching**: Server-state data cached automatically via wagmi
- **E2E Testing**: Cypress tests for critical interactions

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Web3**: wagmi (leveraging react-query and ethers.js)
- **Styling**: Tailwind CSS
- **UI Components**: Flowbite
- **Testing**: Cypress for E2E tests
- **Package Manager**: pnpm

## Installation

```bash
git clone https://github.com/arthur-zhuk/Latest100DaiTransfers.git
cd Latest100DaiTransfers
pnpm install
```

## Usage

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features Explained

- **Auto-caching**: wagmi uses react-query under the hood for efficient data caching
- **Wei Formatting**: ethers.js formats wei values to user-friendly formats
- **Developer Experience**: Tech choices optimized for DX, reduced boilerplate, and performance

## Development

```bash
pnpm run dev    # Start development server
pnpm run build  # Build for production
```

## Testing

```bash
pnpm run test   # Run E2E tests with Cypress
```

## License

MIT
