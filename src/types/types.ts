// API から受け取るデータの型
export interface Task {
  id: number
  title: string
  created_at: string
  updated_at: string
  tag: number
  tag_name: string
}

// タスク編集の際に扱うデータの型
export interface EditTask {
  id: number
  title: string
  tag: number
}

// タグのデータ型
export interface Tag {
  id: number
  name: string
}
