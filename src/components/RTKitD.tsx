import { FC } from 'react'

import { selectMode } from '@/slices/CounterSlice'

import { useAppSelector } from '@/app/hooks'

export const RTKitD: FC = () => {
  const mode = useAppSelector(selectMode)
  console.log('rendered RTKitD')

  return (
    <div className="flex justify-center items-center flex-col">
      <p className="font-bold my-3">RTKitD</p>
      <p className="text-blue-500">{mode ? 'mode on' : 'mode off'}</p>
    </div>
  )
}
