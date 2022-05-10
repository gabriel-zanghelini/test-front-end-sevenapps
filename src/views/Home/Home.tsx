import React, { useEffect, useState } from 'react'
import { FixedSizeList } from 'react-window'
import { RowRenderer } from './components/RowRenderer'

const USERS_API = 'https://random-persons.herokuapp.com/users'

export type User = {
  name: string
  age: number
}

export const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false)
  const [filterType, setFilterType] = useState<'name' | 'age'>('name')
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])

  const getUsers = async () => {
    setLoadingUsers(true)

    const response = await fetch(USERS_API, { method: 'GET' })
    const { data } = await response.json()

    setUsers(data)
    setFilteredUsers(data)
    setLoadingUsers(false)
  }

  useEffect(() => {
    getUsers()
  }, [])

  const filterByName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const keyword = e.target.value

    if (keyword !== '') {
      const results = users.filter((user) => {
        if (filterType === 'name') {
          return user.name.toLowerCase().startsWith(keyword.toLowerCase())
        }

        return user.age.toString() === keyword
      })
      setFilteredUsers(results)
    } else {
      setFilteredUsers(users)
    }
  }

  return (
    <>
      <h1>Listagem de Usuários ({filteredUsers.length})</h1>
      {loadingUsers ? <h2>Carregando...</h2> : null}
      <input
        type='search'
        onChange={filterByName}
        disabled={loadingUsers}
        placeholder='Pesquise...'
      />
      <select
        name='filterType'
        onChange={(e) => setFilterType(e.target.value as 'name' | 'age')}
      >
        <option value='name'>Nome</option>
        <option value='age'>Idade</option>
      </select>
      <FixedSizeList
        height={500}
        itemCount={filteredUsers.length}
        itemSize={30}
        width={300}
        itemData={filteredUsers}
      >
        {RowRenderer}
      </FixedSizeList>
    </>
  )
}
