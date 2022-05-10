import React from 'react'
import { User } from '../../Home'

type RowRendererProps = {
  index: number
  style: React.CSSProperties
  data: User[]
}

export const RowRenderer: React.FC<RowRendererProps> = ({ index, style, data }) => {
  const user = data[index]

  return (
    <div style={style}>
      <strong>{user.name}</strong>
      <small> | Idade: {user.age}</small>
    </div>
  )
}
