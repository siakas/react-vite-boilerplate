import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { Task } from '@/types/types'

export const useQueryTasks = () => {
  // axios を使ったデータ取得の非同期関数
  const getTasks = async () => {
    const { data } = await axios.get<Task[]>(
      `${process.env.REACT_APP_REST_URL}/tasks/`
    )

    return data
  }

  // カスタムフックの返り値として、useQuery を実行した結果を返すようにする
  return useQuery<Task[], Error>({
    queryKey: ['tasks'],
    queryFn: getTasks,
    staleTime: 0,
  })
}
