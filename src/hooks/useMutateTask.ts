import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import { useAppDispatch } from '@/app/hooks'
import { resetEditedTask } from '@/slices/todoSlice'
import { Task, EditTask } from '@/types/types'

export const useMutateTask = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  // Task を新規作成するためのミューテーション
  const createTaskMutation = useMutation(
    async (task: Omit<EditTask, 'id'>) =>
      await axios.post<Task>(`${process.env.REACT_APP_REST_URL}/tasks/`, task),
    {
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<Task[]>(['tasks'])
        if (previousTodos) {
          queryClient.setQueryData<Task[]>(
            ['tasks'],
            [...previousTodos, res.data]
          )
        }
        dispatch(resetEditedTask())
      },
    }
  )
}
