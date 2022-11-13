import { FC } from 'react'

import { useDispatch } from 'react-redux'

import { toggleMode } from '@/slices/CounterSlice'

export const RTKitC: FC = () => {
  const dispatch = useDispatch()
  console.log('rendered RTKitC')

  return (
    <div className="flex justify-center items-center flex-col">
      <p className="font-bold my-3">RTKitC</p>
      <button
        className="py-2 px-3 mt-3 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded"
        onClick={() => dispatch(toggleMode())}
      >
        toggle mode
      </button>
    </div>
  )
}
