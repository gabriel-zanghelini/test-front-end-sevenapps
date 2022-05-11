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
    <div style={{ marginTop: '10px', marginBottom: '10px', width: '90%' }}>
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
        mt={3}
        placeholder='Palavra-chave'
        disabled={disabled}
        onChange={onChangeFilterInput}
      />
    </div>
  )
}
