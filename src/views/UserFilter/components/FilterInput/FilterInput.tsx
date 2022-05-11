import React from 'react'

type FilterInputProps = {
  disabled: boolean
  onChangeFilterInput: React.ChangeEventHandler<HTMLInputElement>
  onChangeFilterType: React.ChangeEventHandler<HTMLSelectElement>
}

export const FilterInput: React.FC<FilterInputProps> = ({
  disabled,
  onChangeFilterInput,
  onChangeFilterType,
}) => {
  return (
    <>
      <input
        type='search'
        disabled={disabled}
        placeholder='Pesquise...'
        onChange={onChangeFilterInput}
      />
      <select
        name='filterType'
        disabled={disabled}
        onChange={onChangeFilterType}
      >
        <option value='name'>Nome</option>
        <option value='age'>Idade</option>
      </select>
    </>
  )
}
