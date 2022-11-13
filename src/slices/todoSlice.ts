import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@/app/store'
import { EditTask, Tag } from '@/types/types'

// ここで定義している型は Redux 上で取り扱うオブジェクトの型を定義している
export interface TaskState {
  editedTask: EditTask
  editedTag: Tag
}

const initialState: TaskState = {
  editedTask: {
    id: 0,
    title: '',
    tag: 0,
  },
  editedTag: {
    id: 0,
    name: '',
  },
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    // editedTask を更新する処理
    // action で受け取った payload をそのまま state に格納している
    // action の型を PayloadAction で定義することで、payload として渡されるオブジェクトの型を定義している
    setEditedTask: (state, action: PayloadAction<EditTask>) => {
      state.editedTask = action.payload
    },

    // editedTask を初期化する処理
    // state に initialState で定義されている初期値を格納している
    resetEditedTask: (state) => {
      state.editedTask = initialState.editedTask
    },

    setEditedTag: (state, action: PayloadAction<Tag>) => {
      state.editedTag = action.payload
    },
    resetEditedTag: (state) => {
      state.editedTag = initialState.editedTag
    },
  },
})

// taskSlice で定義した reducers を React コンポーネントから呼び出せるようにエクスポートする
export const { setEditedTask, resetEditedTask, setEditedTag, resetEditedTag } =
  taskSlice.actions

// state の editedTask や editedTag の値を返す関数を定義してエクスポートする
// これによって React コンポーネントから state の値を取り出すことができる
// 返す値の型は initialState で定義している型となる
export const selectTask = (state: RootState): EditTask => state.task.editedTask
export const selectTag = (state: RootState): Tag => state.task.editedTag

export default taskSlice.reducer
