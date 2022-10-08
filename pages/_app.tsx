import "../styles/globals.css"
import { publicProvider } from "wagmi/providers/public"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { WagmiConfig, createClient, configureChains, chain } from "wagmi"
import { AppProps } from "next/app"

const ALCHEMY_API_KEY = "P7f6hhhIkxHMliGbHZKZOiggSKiuRYmv" // Typically stored in .env and not exposed publicly.

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet],
  [alchemyProvider({ apiKey: ALCHEMY_API_KEY }), publicProvider()]
)

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>
    </>
  )
}

export default MyApp
