import React, { useEffect, useState } from 'react'
import { Heading, Text } from '@chakra-ui/react'
import { FixedSizeList } from 'react-window'
import { FilterInput } from './components/FilterInput'
import { ListItemRenderer } from './components/ListItemRenderer'

const USERS_API = 'https://random-persons.herokuapp.com/users'

export type User = {
  id: number
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
    const { data } = (await response.json()) as { data: User[] }

    const usersWithId = data.map((data, index) => ({ ...data, id: index + 1 }))
    
    setUsers(usersWithId)
    setFilteredUsers(usersWithId)
    setLoadingUsers(false)
  }

  const filterUser: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const keyword = e.target.value
    console.log(`keyword: ${keyword} | filter type: ${filterType}`)

    if (keyword !== '') {
      const results = users.filter((user) => {
        if (filterType === 'name') {
          return user.name.toLowerCase().includes(keyword.toLowerCase())
        }

        return user.age.toString() === keyword
      })
      setFilteredUsers(results)
    } else {
      setFilteredUsers(users)
    }
  }

  const changeFilterType: (nextValue: string) => void = (nextValue) =>
    setFilterType(nextValue as 'name' | 'age')

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <section
      style={{
        width: 400,
        margin: 'auto',
        marginTop: 40,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Heading as='h2' size='xl'>
        Usuários
      </Heading>
      <FilterInput
        disabled={loadingUsers}
        onChangeFilterInput={filterUser}
        onChangeFilterType={changeFilterType}
      />
      <Text
        fontSize='sm'
        style={{ width: 350, color: '#c9c9c9', textAlign: 'right' }}
      >
        {loadingUsers
          ? 'Carregando...'
          : `Exibindo: ${filteredUsers.length} resultados`}
      </Text>
      <FixedSizeList
        height={500}
        itemCount={filteredUsers.length}
        itemSize={30}
        width={350}
        itemData={filteredUsers}
        style={{ border: '1px solid #eeeeee', borderRadius: 5 }}
      >
        {ListItemRenderer}
      </FixedSizeList>
    </section>
  )
}
