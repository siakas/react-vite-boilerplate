import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { ClassicalFetchA } from '@/components/ClassicalFetchA'
import { ClassicalFetchB } from '@/components/ClassicalFetchB'
import { Layout } from '@/components/Layout'
import { MainContext } from '@/components/MainContext'
import { MainRTKit } from '@/components/MainRTKit'
import { ReactQueryA } from '@/components/ReactQueryA'
import { ReactQueryB } from '@/components/ReactQueryB'
import { StateProvider } from '@/context/StateProvider'

// const title = import.meta.env.VITE_APP_TITLE
// console.dir(import.meta.env)

// new QueryClient で設定したオプションは、Provider で包含したすべての要素内で使用される useQuery に有効なオプションとなる
// また、ここで作成したクライアントは QueryClientProvider の client 属性の設定に必須となる
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // React Query ではフェッチに失敗したら自動的に 3 回再試行するのを無効化
      refetchOnWindowFocus: false, // ユーザーがブラウザにフォーカスした際に自動的にフェッチ処理が実行されるのを無効化
    },
  },
})

const App: FC = () => {
  return (
    // プロジェクト全体で React Query の取得した値を参照するには、全体を QueryClientProvider でラップする
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <StateProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<ReactQueryA />} />
              <Route path="/query-b" element={<ReactQueryB />} />
              <Route path="/fetch-a" element={<ClassicalFetchA />} />
              <Route path="/fetch-b" element={<ClassicalFetchB />} />
              <Route path="/main-context" element={<MainContext />} />
              <Route path="/main-rtkit" element={<MainRTKit />} />
            </Routes>
          </Layout>
        </StateProvider>
      </BrowserRouter>

      {/* ReactQueryDevtools を有効化するためのコンポーネントを読み込む */}
      {/* initialIsOpen はサーバ起動時に自動的に devtool が立ち上がる。ここではそれを無効化している */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
