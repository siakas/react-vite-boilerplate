import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { Task } from '@/types/types'

const getTasks = async () => {
  const { data } = await axios.get<Task[]>('http://127.0.0.1:8000/api/tasks/')

  return data
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useQueryTasks = () => {
  // useQuery は status と data を返す
  return useQuery<Task[], Error>({
    queryKey: ['tasks'],
    queryFn: getTasks,
    cacheTime: 10000, // useQuery を使用したコンポーネントがアンマウントされてからキャッシュデータが削除されるまでの時間
    staleTime: 30000, // キャッシュの有効時間。0 に設定するとキャッシュ化されなくなる
  })
}
