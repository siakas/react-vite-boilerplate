import { useEffect, useState } from 'react'

import axios from 'axios'

import { useStateContext } from '@/context/StateProvider'

// REST API にアクセスしてデータを取得するためのカスタムフック
// useEffect でデータを取得後、tasks、isLoading、isError を返す
// tasks は useContext を通じた値なので、他のコンポーネントかもアクセス可能となっている

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useClassicalFetch = () => {
  const { tasks, setTasks } = useStateContext()
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setError(false)
      setLoading(true)

      try {
        const res = await axios('http://127.0.0.1:8000/api/tasks/')
        setTasks(res.data)
      } catch (error) {
        setError(true)
      }

      setLoading(false)
    }

    void fetchData()
  }, [setTasks])

  return { tasks, isLoading, isError }
}
