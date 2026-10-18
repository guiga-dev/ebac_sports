import { Provider } from 'react-redux'
import Header from './components/Header'
import Produtos from './containers/Produtos'
import { GlobalStyle } from './styles'
import {
  store,
  useGetProdutosQuery,
  useAppSelector,
  useAppDispatch,
  adicionar,
  alternar
} from './store'
export type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
}
function Loja() {
  const {
    data: produtos = [],
    isLoading,
    isError,
    refetch
  } = useGetProdutosQuery()
  const carrinho = useAppSelector((s) => s.carrinho)
  const favoritos = useAppSelector((s) => s.favoritos)
  const dispatch = useAppDispatch()
  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header favoritos={favoritos} itensNoCarrinho={carrinho} />
        {isLoading && <p role="status">Carregando produtos...</p>}
        {isError && (
          <div role="alert">
            <p>N�o foi poss�vel carregar os produtos.</p>
            <button onClick={() => refetch()}>Tentar novamente</button>
          </div>
        )}
        <Produtos
          produtos={produtos}
          favoritos={favoritos}
          favoritar={(p) => dispatch(alternar(p))}
          adicionarAoCarrinho={(p) => dispatch(adicionar(p))}
        />
      </div>
    </>
  )
}
export default function App() {
  return (
    <Provider store={store}>
      <Loja />
    </Provider>
  )
}
