import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { Tag } from '@/types/types'

export const useQueryTags = () => {
  const getTags = async () => {
    const { data } = await axios.get<Tag[]>(
      `${process.env.REACT_APP_REST_URL}/tags/`
    )

    return data
  }

  // カスタムフックの返り値として、useQuery を実行した結果を返すようにする
  return useQuery<Tag[], Error>({
    queryKey: ['tags'],
    queryFn: getTags,
    staleTime: 60000,
  })
}
