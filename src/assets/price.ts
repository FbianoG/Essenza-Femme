export const price = (value: number) => {
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'brl' })
}