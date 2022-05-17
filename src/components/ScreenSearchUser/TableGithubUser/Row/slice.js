import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import reducerRegister from '../../../helpers/reducerRegister'
import githubServices from '../../../services/githubServices'

export const fetchGithubRepos = createAsyncThunk(
  'repos/fetchGithubRepos',
  async (arg) => {
    const res = await githubServices.getRepoByUsername(
      arg.username,
      arg.page,
      arg.type,
    )
    return res.data
  },
)

export const fetchReadMeFile = createAsyncThunk(
  'repos/fetchReadMeFile',
  async (arg) => {
    const res = await githubServices.getReadMeTxt(
      arg.username,
      arg.selectedRepo,
    )
    return res.data
  },
)

const slice = createSlice({
  name: 'repos',
  initialState: {
    githubRepos: [],
    currentUser: null,
    readMeFile: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload
    },
    removeReadMeFile: (state) => {
      state.readMeFile = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGithubRepos.fulfilled, (state, action) => {
      if (action.meta.arg.type === 'replace') {
        state.githubRepos = [...action.payload]
      }
      if (action.meta.arg.type === 'add' && action.payload.length > 0) {
        state.githubRepos = [...state.githubRepos, ...action.payload]
      }
    })
    builder.addCase(fetchReadMeFile.fulfilled, (state, action) => {
      state.readMeFile = action.payload
    })
  },
})

reducerRegister.register(slice.name, slice.reducer)

export const getGithubRepos = (state) => state[slice.name].githubRepos
export const getCurrentUser = (state) => state[slice.name].currentUser
export const getReadMeFile = (state) => state[slice.name].readMeFile
export const { setCurrentUser, removeReadMeFile } = slice.actions
