import React, { useEffect, useState } from 'react'

type User = {
  name: string
  age: number
}

export const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false)
  const [filtering, setFiltering] = useState<boolean>(false)
  const [filterName, setFilterName] = useState<string | undefined>(undefined)
  const [filterAge, setFilterAge] = useState<number | null>(null)
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])

  const getUsers = async () => {
    setLoadingUsers(true)
    const response = await fetch('https://random-persons.herokuapp.com/users', {
      method: 'GET',
    })

    const data = await response.json()
    setUsers(data)
    setLoadingUsers(false)
  }

  useEffect(() => {
    console.log('uma só');
    
    getUsers()
  }, [])

  const filterByName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const keyword = e.target.value

    if (keyword !== '') {
      setFiltering(true)
      const results = users.filter((user) => {
        return user.name.toLowerCase().startsWith(keyword.toLowerCase())
      })
      setFilteredUsers(results)
    } else {
      setFiltering(false)
    }
  }

  return (
    <>
      <h1>
        Listagem de Usuários ({(filtering ? filteredUsers : users).length})
      </h1>
      {loadingUsers ? <h2>Carregando...</h2> : null}
      <input type='search' onChange={filterByName} disabled={loadingUsers} />
      <ul>
        {(filtering ? filteredUsers : users).map((user, index) => (
          <li key={index}>
            {user.name} | {user.age}
          </li>
        ))}
      </ul>
    </>
  )
}
