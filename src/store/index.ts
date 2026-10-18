import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { Produto } from '../App'
export const produtosApi = createApi({
  reducerPath: 'produtosApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api-ebac.vercel.app/api/' }),
  endpoints: (builder) => ({
    getProdutos: builder.query<Produto[], void>({ query: () => 'ebac_sports' })
  })
})
const carrinho = createSlice({
  name: 'carrinho',
  initialState: [] as Produto[],
  reducers: {
    adicionar: (state, action: PayloadAction<Produto>) => {
      if (!state.some((p) => p.id === action.payload.id))
        state.push(action.payload)
    }
  }
})
const favoritos = createSlice({
  name: 'favoritos',
  initialState: [] as Produto[],
  reducers: {
    alternar: (state, action: PayloadAction<Produto>) =>
      state.some((p) => p.id === action.payload.id)
        ? state.filter((p) => p.id !== action.payload.id)
        : [...state, action.payload]
  }
})
export const { adicionar } = carrinho.actions
export const { alternar } = favoritos.actions
export const carrinhoReducer = carrinho.reducer
export const favoritosReducer = favoritos.reducer
export const store = configureStore({
  reducer: {
    carrinho: carrinho.reducer,
    favoritos: favoritos.reducer,
    [produtosApi.reducerPath]: produtosApi.reducer
  },
  middleware: (getDefault) => getDefault().concat(produtosApi.middleware)
})
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export const { useGetProdutosQuery } = produtosApi
