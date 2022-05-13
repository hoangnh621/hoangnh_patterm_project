import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import reducerRegister from '../../helpers/reducerRegister'
import githubServices from '../../services/githubServices'

export const fetchGithubUser = createAsyncThunk(
  'searchUser/fetchGithubUser',
  async (arg) => {
    const res = await githubServices.getUser(arg.username, arg.page)
    return res.data
  },
)

const searchSlice = createSlice({
  name: 'searchUser',
  initialState: {
    searchValue: '',
    githubUsers: [],
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
    removeGithubUser: (state) => {
      state.githubUsers = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGithubUser.fulfilled, (state, action) => {
      if (action.meta.arg.type === 'replace') {
        state.githubUsers = [...action.payload.items]
      }
      const newGithubUsers = [...state.githubUsers, ...action.payload.items]
      if (newGithubUsers.length && action.meta.arg.type === 'add') {
        const idGithubUsers = newGithubUsers.map((user) => user.id)
        state.githubUsers = newGithubUsers.filter(
          ({ id }, index) => !idGithubUsers.includes(id, index + 1),
        )
      }
    })
  },
})
reducerRegister.register(searchSlice.name, searchSlice.reducer)

export const getUserByUserName = (state) => state[searchSlice.name].githubUsers
export const getSearchValue = (state) => state[searchSlice.name].searchValue

export const { setSearchValue, removeGithubUser } = searchSlice.actions
