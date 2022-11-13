import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { ChevronDoubleRightIcon } from '@heroicons/react/solid'

import { useClassicalFetch } from '@/hooks/useClassicalFetch'

export const ClassicalFetchA: FC = () => {
  const navigate = useNavigate()

  // useClassicalFetch によってデータ取得をおこなっているため、本コンポーネントがマウントされるたびにフェッチ処理がおこなわれる
  const { isLoading, isError, tasks } = useClassicalFetch()
  console.log('rendered ClassicalFetchA')

  // ローディング時とエラー時に返す画面をシンプルに変更
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <div className="flex justify-center items-center flex-col">
      <p className="text-center font-bold mb-3">ClassicalFetchA</p>

      {tasks?.map((task) => (
        <p key={task.id}>{task.title}</p>
      ))}

      <p className="my-4 leading-7">
        本コンポーネント（ClassicalFetchA）がマウント（表示）されるたびに REST
        API へのデータ取得処理（fetch）が行われる。
        <br />
        コンソールログの「ネットワーク」タブ参照。
      </p>

      <ChevronDoubleRightIcon
        onClick={() => navigate('/fetch-b')}
        className="h-5 w-5 mt-2 text-blue-500 cursor-pointer"
      />
      <p className="text-sm">fetch B</p>
    </div>
  )
}
