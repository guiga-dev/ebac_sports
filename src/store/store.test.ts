import { carrinhoReducer, favoritosReducer, adicionar, alternar } from '.'
const produto = { id: 1, nome: 'T�nis', preco: 100, imagem: 'tenis.png' }
test('adiciona ao carrinho uma �nica vez', () => {
  const state = carrinhoReducer([], adicionar(produto))
  expect(state).toEqual([produto])
  expect(carrinhoReducer(state, adicionar(produto))).toHaveLength(1)
})
test('alterna favorito sem alterar o carrinho', () => {
  const state = favoritosReducer([], alternar(produto))
  expect(state).toEqual([produto])
  expect(favoritosReducer(state, alternar(produto))).toEqual([])
})
