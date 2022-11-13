import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { ChevronDoubleLeftIcon } from '@heroicons/react/solid'
import { useQueryClient } from '@tanstack/react-query'

import { Task } from '@/types/types'

export const ReactQueryB: FC = () => {
  const navigate = useNavigate()

  // useQuery がデータを取得後に格納したキャッシュにアクセスするには、
  // useQueryClient() でクライアントを作成する必要がある
  const queryClient = useQueryClient()

  // queryClient.getQueryData() で指定した queryKey のキャッシュを取り出すことができる
  const data = queryClient.getQueryData<Task[]>(['tasks'])

  console.log('rendered ReactQueryB')

  return (
    <>
      <p className="font-bold my-3">ReactQueryB</p>
      {data?.map((task) => (
        <p key={task.id}>{task.title}</p>
      ))}

      <ChevronDoubleLeftIcon
        onClick={() => navigate('/')}
        className="h-5 w-5 mt-2 text-blue-500 cursor-pointer"
      />
      <p className="text-sm">react query A</p>
    </>
  )
}
