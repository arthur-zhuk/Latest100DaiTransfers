import {
  useContract,
  useContractEvent,
  erc20ABI,
  useQuery,
  useProvider,
} from "wagmi"
import { ethers } from "ethers"
import React, { useEffect, useState } from "react"
import Script from "next/script"

export default function Home() {
  const provider = useProvider()
  const [isMounted, setIsMounted] = useState(false)
  const [senderInput, setSenderInput] = useState("")
  const [recipientInput, setRecipientInput] = useState("")
  const [amountSortType, setAmountSortType] = useState("asc")
  const [timestampSortType, setTimestampSortType] = useState("asc")

  // HACK: workaround for wagmi <-> next hydration issue
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const contract = useContract({
    addressOrName: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    contractInterface: erc20ABI,
    signerOrProvider: provider,
  })

  const { data: transferEvents, isLoading: isLoadingDaiXfers } = useQuery(
    ["transferEvents"],
    async () => {
      const filter = contract.filters.Transfer()
      let events = []
      try {
        // parsing back 2000 blocks from the current block as that's the limit per queryFilter call
        events = await contract.queryFilter(filter, -2000)
        const first100Events = events.slice(-100)
        const first100EventsRemapped = await Promise.all(
          first100Events.map(async (event) => {
            const { timestamp } = await event.getBlock()

            return {
              etherscanLink: `https://etherscan.io/tx/${event.transactionHash}`,
              timestamp: timestamp,
              amount: ethers.utils.formatEther(event.args[2]),
              sender: event.args[0],
              recipient: event.args[1],
            }
          })
        )

        return first100EventsRemapped.sort((a, b) => a.timestamp - b.timestamp)
      } catch (e) {
        throw new Error(e)
      }
    },
    { enabled: !!contract, initialData: [] }
  )

  const [daiTransfers, setDaiTransfers] = React.useState(transferEvents)

  useContractEvent({
    addressOrName: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    contractInterface: erc20ABI,
    eventName: "Transfer",
    listener: async (event) => {
      const eventProvider = event[3]
      const { timestamp } = await eventProvider.getBlock()
      const additionalXferEvent = {
        etherscanLink: `https://etherscan.io/tx/${eventProvider.transactionHash}`,
        timestamp: timestamp,
        amount: ethers.utils.formatEther(eventProvider.args[2]),
        sender: eventProvider.args[0],
        recipient: eventProvider.args[1],
      }
      setDaiTransfers((daiTransfers) =>
        [additionalXferEvent, ...daiTransfers].slice(0, 100)
      )
    },
  })

  if (!isMounted) return null
  if (isLoadingDaiXfers) return <span>Loading DAI Transactions</span>

  return (
    <>
      <Script src="./node_modules/flowbite/dist/flowbite.js" />

      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-violet-600 from-emerald-500">
            Latest 100 DAI Transactions
          </span>
        </h1>
        <div className="mb-4">
          <label
            for="default-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Sender
          </label>
          <input
            type="text"
            className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={senderInput}
            onChange={(e) => setSenderInput(e.target.value)}
            disabled={recipientInput}
          />
          <label
            for="default-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Recipient
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={recipientInput}
            onChange={(e) => setRecipientInput(e.target.value)}
            disabled={senderInput}
          />
        </div>
        <div className="flex flex-row">
          <button
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-emerald-600 to-purple-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            onClick={() => {
              timestampSortType === "asc"
                ? setTimestampSortType("desc")
                : setTimestampSortType("asc")
              if (timestampSortType === "asc") {
                setDaiTransfers((daiTransfers) =>
                  [...daiTransfers].sort((a, b) => a.timestamp - b.timestamp)
                )
              } else {
                setDaiTransfers((daiTransfers) =>
                  [...daiTransfers].sort((a, b) => b.timestamp - a.timestamp)
                )
              }
            }}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Sort by timestamp {timestampSortType === "desc" ? "👆" : "👇"}
            </span>
          </button>
          <button
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-emerald-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
            onClick={() => {
              amountSortType === "asc"
                ? setAmountSortType("desc")
                : setAmountSortType("asc")
              if (amountSortType === "asc") {
                setDaiTransfers((daiTransfers) =>
                  [...daiTransfers].sort((a, b) => a.amount - b.amount)
                )
              } else {
                setDaiTransfers((daiTransfers) =>
                  [...daiTransfers].sort((a, b) => b.amount - a.amount)
                )
              }
            }}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Sort by amount {amountSortType === "desc" ? "👆" : "👇"}
            </span>
          </button>
        </div>
        <div className="divider" />
        <div className="overflow-x-auto relative mt-2">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-700">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6">
                  Etherscan
                </th>
                <th scope="col" class="py-3 px-6">
                  Timestamp
                </th>
                <th scope="col" class="py-3 px-6">
                  Amount
                </th>
                <th scope="col" class="py-3 px-6">
                  Sender
                </th>
                <th scope="col" class="py-3 px-6">
                  Recipient
                </th>
              </tr>
            </thead>
            <tbody>
              {daiTransfers
                .filter((xfer) => xfer.sender.includes(senderInput))
                .filter((xfer) => xfer.recipient.includes(recipientInput))
                .map((transfer, i) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={i}
                  >
                    <th className="py-4 px-6">
                      <a
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        href={transfer.etherscanLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Link
                      </a>
                    </th>
                    <th className="py-4 px-6">{transfer.timestamp}</th>
                    <th className="py-4 px-6">{transfer.amount}</th>
                    <th className="py-4 px-6">{transfer.sender}</th>
                    <th className="py-4 px-6">{transfer.recipient}</th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
