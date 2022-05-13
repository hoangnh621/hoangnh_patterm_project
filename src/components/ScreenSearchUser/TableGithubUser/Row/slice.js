import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import reducerRegister from '../../../helpers/reducerRegister'
import githubServices from '../../../services/githubServices'

export const fetchGithubRepos = createAsyncThunk(
  'repos/fetchGithubRepos',
  async (arg) => {
    // @ts-ignore
    const res = await githubServices.getRepoByUsername(arg.username, arg.page)
    return res.data
  },
)

const slice = createSlice({
  name: 'repos',
  initialState: {
    githubRepos: [],
    currentUser: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGithubRepos.fulfilled, (state, action) => {
      state.githubRepos = [...state.githubRepos, ...action.payload]
    })
  },
})

reducerRegister.register(slice.name, slice.reducer)

export const getGithubRepos = (state) => state[slice.name].githubRepos
export const getCurrentUser = (state) => state[slice.name].currentUser
export const { setCurrentUser } = slice.actions
