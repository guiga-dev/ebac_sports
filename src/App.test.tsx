import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'
const produto = {
  id: 1,
  nome: 'T�nis de corrida',
  preco: 100,
  imagem: 'tenis.png'
}
test('carrega pela API e atualiza carrinho e favoritos via Redux', async () => {
  const original = global.fetch
  global.fetch = jest
    .fn()
    .mockResolvedValue(
      new Response(JSON.stringify([produto]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    )
  render(<App />)
  expect(await screen.findByText('T�nis de corrida')).toBeInTheDocument()
  fireEvent.click(screen.getByText('Adicionar ao carrinho'))
  expect(screen.getByText(/1 itens, valor total/)).toHaveTextContent('100,00')
  fireEvent.click(screen.getByText('+ Adicionar aos favoritos'))
  expect(screen.getByText('1 favoritos')).toBeInTheDocument()
  global.fetch = original
})
