// API から取得するデータ型の定義
export interface Task {
  id: number
  title: string
  created_at: string
  updated_at: string
  tag: number
  tag_name: string
}
