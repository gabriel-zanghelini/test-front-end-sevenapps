import React from 'react'
import { User } from '../../UserFilter'

type ListItemRendererProps = {
  index: number
  style: React.CSSProperties
  data: User[]
}

export const ListItemRenderer: React.FC<ListItemRendererProps> = ({ index, style, data }) => {
  const user = data[index]

  return (
    <div style={style}>
      <strong>{user.name}</strong>
      <small> | Idade: {user.age}</small>
    </div>
  )
}
