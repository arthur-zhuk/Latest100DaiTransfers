This is a [Next.js](https://nextjs.org/) app that displays the latest 100 DAI Transfers.

## Description

This app displays a few properties of the latest 100 DAI transfers. It will listen to the DAI contract and append the latest transfer to the list of txns. It is able to filter results on sender and recipient address. It can also sort the table on timestamp and amount value.

## Tech

This app's core library is `wagmi`. `wagmi` is a powerful solution to interacting with contracts that leverages `react-query` and `ethers.js`. Due to `wagmi` the server-state data is cached automatically. `ethers` is used to format wei to a user friendly format. TailwindCSS is used for styling which provides the best developer experience when it comes to styling. Flowbite is used for UI components to make the app look elegant. `pnpm` is used as the pkg manager as it's the current best. All tech choices are picked to improve developer experience, reduce boilerplate, add a small amount of opinion, and improve performance. Cypress was used for E2E testing a few simple interactions. It is typically recommended to keep E2E tests simple as they are expensive. If more thorough testing is necessary then its better to use a library like `testing-library/react` and stub out data instead of depending on a remote source. The tests are simple enough to maintain in case there is a change of logic. Feedback loop timing is the crux in these testing trade-off considerations.

## Getting Started

First, run the development server:

```bash
pnpm run dev
# or
<your fav package manager> run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
