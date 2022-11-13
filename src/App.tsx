import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// const title = import.meta.env.VITE_APP_TITLE
// console.dir(import.meta.env)

// React Query を扱うための client を作成
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

const App: FC = () => {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>App</BrowserRouter>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  )
}

export default App
