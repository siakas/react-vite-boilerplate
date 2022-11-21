import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import { useAppDispatch } from '@/app/hooks'
import { resetEditedTag } from '@/slices/todoSlice'
import { Tag } from '@/types/types'

export const useMutateTag = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  // Tag を新規作成するためのミューテーション
  const createTagMutation = useMutation(
    async (tag: Omit<Tag, 'id'>) =>
      await axios.post<Tag>(`${process.env.REACT_APP_REST_URL}/tags/`, tag),
    {
      onSuccess: (res) => {
        const previousTags = queryClient.getQueryData<Tag[]>(['tags'])
        if (previousTags) {
          queryClient.setQueryData<Tag[]>(['tags'], [...previousTags, res.data])
        }
        dispatch(resetEditedTag())
      },
    }
  )

  // Tag をアップデートするためのミューテーション
  const updateTagMutation = useMutation(
    async (tag: Tag) =>
      await axios.put<Tag>(
        `${process.env.REACT_APP_REST_URL}/tags/${tag.id}`,
        tag
      ),
    {
      onSuccess: (res, variables) => {
        const previousTags = queryClient.getQueryData<Tag[]>(['tags'])
        if (previousTags) {
          queryClient.setQueryData<Tag[]>(
            ['tags'],
            previousTags.map((tag) =>
              tag.id === variables.id ? res.data : tag
            )
          )
        }
        dispatch(resetEditedTag())
      },
    }
  )

  // Tag を削除するためのミューテーション
  const deleteTagMutation = useMutation(
    async (id: number) =>
      await axios.delete(`${process.env.REACT_APP_REST_URL}/tags/${id}`),
    {
      onSuccess: (res, variables) => {
        const previousTags = queryClient.getQueryData<Tag[]>(['tags'])
        if (previousTags) {
          queryClient.setQueryData<Tag[]>(
            ['tags'],
            previousTags.filter((tag) => tag.id !== variables)
          )
        }
        dispatch(resetEditedTag())
      },
    }
  )

  return {
    createTagMutation,
    updateTagMutation,
    deleteTagMutation,
  }
}
