import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { Task } from '@/types/types'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useQueryTasks = () => {
  const getTasks = async () => {
    const { data } = await axios.get<Task[]>(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `${process.env.REACT_APP_REST_URL}/tasks/`
    )

    return data
  }

  return useQuery<Task[], Error>({
    queryKey: ['tasks'],
    queryFn: getTasks,
    staleTime: 0,
  })
}
