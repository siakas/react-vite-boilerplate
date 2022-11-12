import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from 'react'

import { Task } from '@/types/types'

// StateContext がグローバルステートとして扱うデータの型
interface StateContextType {
  tasks: Task[] | null
  dark: boolean
  setTasks: React.Dispatch<React.SetStateAction<Task[] | null>>
  setDark: React.Dispatch<React.SetStateAction<boolean>>
}

// 本コンポーネントの Props の型
interface Props {
  children: ReactNode
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const StateContext = createContext({} as StateContextType)

export const StateProvider: FC<Props> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[] | null>(null)
  const [dark, setDark] = useState(false)

  return (
    <StateContext.Provider value={{ tasks, setTasks, dark, setDark }}>
      {children}
    </StateContext.Provider>
  )
}

// StateContext の返す値を取り出すためのカスタムフック
export const useStateContext = (): StateContextType => useContext(StateContext)
