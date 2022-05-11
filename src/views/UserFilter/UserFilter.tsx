import React, { useEffect, useState } from 'react'
import { FixedSizeList } from 'react-window'
import { FilterInput } from './components/FilterInput'
import { ListItemRenderer } from './components/ListItemRenderer'

const USERS_API = 'https://random-persons.herokuapp.com/users'

export type User = {
  name: string
  age: number
}

export const UserFilter: React.FC = () => {
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

  const filterUser: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const keyword = e.target.value
    console.log(`keyword: ${keyword} | filter type: ${filterType}`)

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

  const changeFilterType: React.ChangeEventHandler<HTMLSelectElement> = (e) =>
    setFilterType(e.target.value as 'name' | 'age')

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <h1>Listagem de Usuários ({filteredUsers.length})</h1>
      {loadingUsers ? <h2>Carregando...</h2> : null}
      <FilterInput
        disabled={loadingUsers}
        onChangeFilterInput={filterUser}
        onChangeFilterType={changeFilterType}
      />
      <FixedSizeList
        height={500}
        itemCount={filteredUsers.length}
        itemSize={30}
        width={300}
        itemData={filteredUsers}
      >
        {ListItemRenderer}
      </FixedSizeList>
    </>
  )
}