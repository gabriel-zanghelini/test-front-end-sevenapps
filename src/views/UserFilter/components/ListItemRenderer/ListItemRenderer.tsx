import React from 'react'
import { User } from '../../UserFilter'

type ListItemRendererProps = {
  index: number
  style: React.CSSProperties
  data: User[]
}

export const ListItemRenderer: React.FC<ListItemRendererProps> = ({
  index,
  style,
  data,
}) => {
  const user = data[index]

  return (
    <div
      style={{
        ...style,
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: '#f9f9f9',
        borderBottom: '1px solid #ffffff',
      }}
    >
      <span style={{ width: 55 }}>{user.id}</span>
      <strong style={{ width: 160 }}>{user.name}</strong>
      <span style={{ width: 65 }}>Idade: {user.age}</span>
    </div>
  )
}
