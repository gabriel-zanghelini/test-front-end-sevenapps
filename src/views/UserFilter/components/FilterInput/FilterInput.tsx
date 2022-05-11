import React from 'react'
import { Input, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'

type FilterInputProps = {
  disabled: boolean
  onChangeFilterInput: React.ChangeEventHandler<HTMLInputElement>
  onChangeFilterType: (nextValue: string) => void
}

export const FilterInput: React.FC<FilterInputProps> = ({
  disabled,
  onChangeFilterInput,
  onChangeFilterType,
}) => {
  return (
    <div
      style={{
        padding: 5,
        width: '70%',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 4,
        border: '1px solid #c9c9c9',
        backgroundColor: '#f9f9f9',
      }}
    >
      <div style={{ textAlign: 'left' }}>
        <Text as='strong'>Filtrar por:</Text>
        <RadioGroup defaultValue='name' onChange={onChangeFilterType} size='sm'>
          <Stack direction='row'>
            <Radio value='name'>Nome</Radio>
            <Radio value='age'>Idade</Radio>
          </Stack>
        </RadioGroup>
      </div>
      <Input
        size='sm'
        mt={2}
        backgroundColor='#ffffff'
        placeholder='Palavra-chave'
        disabled={disabled}
        onChange={onChangeFilterInput}
      />
    </div>
  )
}
