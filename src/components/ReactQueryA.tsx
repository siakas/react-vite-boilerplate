import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { ChevronDoubleRightIcon } from '@heroicons/react/solid'

import { useQueryTasks } from '@/hooks/useQueryTasks'

export const ReactQueryA: FC = () => {
  const navigate = useNavigate()

  // useQuery の返り値は status と data で決まっている
  // data は queryFn で処理した結果が格納される
  // status は通信状況のステータスが格納される
  const { status, data } = useQueryTasks()

  console.log('rendered ReactQueryA')

  // status の内容に応じて画面の表示を設定
  if (status === 'loading') return <div>Loading...</div>
  if (status === 'error') return <div>Error</div>

  return (
    <>
      <p className="font-bold my-3">ReactQueryA</p>
      {data?.map((task) => (
        <p key={task.id}>{task.title}</p>
      ))}

      <ChevronDoubleRightIcon
        onClick={() => navigate('/query-b')}
        className="h-5 w-5 mt-2 text-blue-500 cursor-pointer"
      />
      <p className="text-sm">react query B</p>
    </>
  )
}
