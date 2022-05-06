import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'http://localhost:8000/posts'
const numberOfPosts = 8

const initialState = {
    postsList: [],
    loading: false,
    error: '',
    idFetched: false,
    pageList: [],
    lazyLoading: false,
    postIdList: []
}

export const fetchPostsDiscover = createAsyncThunk(
    'posts/fetchPostsDiscover',
        async () => {
            const response = await axios.get(url)
            if(!(response.status === 200)) {
                return Promise.reject(new Error(response.data))
            }
            return response.data
        }
)

export const fetchPostsFriends = createAsyncThunk(
    'posts/fetchPostsFriends',
    async (user) => {
        if(!user) return Promise.reject(new Error('Not connected'))
        let posts = []
        for(let i = 0 ; i < user.friends.length ; i++) {
            await axios.post(url + '/getPostsUser', {userID: user.friends[i]})
                .then(response => {
                    if(!(response.status === 200)) return Promise.reject(new Error(response.data))
                    posts = [].concat(posts, response.data.posts)
                })
                .catch(error => {
                        return Promise.reject(new Error('Could not find posts of ' + user.friends[i] + '\n'+  error))
                    })
        }
        return posts
    }
)

export const lazyFetchPostsDiscover = createAsyncThunk(
    'posts/lazyFetchPostsDiscover',
    async (IdList) => {
        if(!IdList.length) return Promise.reject(new Error('No Id list'))
        if(IdList.length < numberOfPosts) return Promise.reject(new Error('You saw all the posts'))
        let queryId = []
        let newIdList = [...IdList]
        let random = 0
        for(let i = 0 ; i < numberOfPosts ; i++) {
            random = Math.floor(Math.random() * newIdList.length)
            if(!newIdList[random]._id) return Promise.reject(new Error('Could not load anymore posts'))
            queryId = [].concat(queryId, newIdList[random]._id)
            newIdList.splice(random, 1)
        }
        const postsList = await axios.post(url + '/getPostsId', {IdList: queryId})
            .catch(err => Promise.reject(new Error(`Could not find the post ${err}`)))
        if(!(postsList.status === 200)) return Promise.reject(new Error(`Could not find the posts, status = ${postsList.status} `))
        return {pageList: postsList.data, newIdList: newIdList}
    }

)

export const fetchAllId = createAsyncThunk(
    '/posts/fetchAllId',
    async (empty, thunkApi) => {
        thunkApi.dispatch(postsSlice.actions.setIdFetched())
        const response = await axios.post(url + '/getAllId')
            .catch(() =>  Promise.reject(new Error('Could not find the id')))
        if(!(response.status === 200)) return Promise.reject(new Error('Could not find the id'))
        return response.data
    }
)


export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reset: () => initialState,
        setIdFetched: (state) => {
            return {
                ...state,
                idFetched: true
            }
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostsDiscover.pending, (state) => {
                state.loading = true
                state.postsList = []
                state.error = ''
            })
            .addCase(fetchPostsDiscover.fulfilled, (state, action) => {
                state.loading = false
                state.postsList = action.payload
            })
            .addCase(fetchPostsDiscover.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(fetchPostsFriends.pending, (state) => {
                state.loading = true
                state.postsList = []
                state.error = ''
            })
            .addCase(fetchPostsFriends.fulfilled, (state, action) => {
                state.loading = false
                state.postsList = action.payload
            })
            .addCase(fetchPostsFriends.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(fetchAllId.pending, (state) => {
                state.loading = true
                state.postIdList = []
                state.error = ''
            })
            .addCase(fetchAllId.fulfilled, (state, action) => {
                state.loading = false
                state.postIdList = action.payload
            })
            .addCase(fetchAllId.rejected, (state, action) => {
                state.loading = false
                state.postIdList = action.error.message
            })
            .addCase(lazyFetchPostsDiscover.pending, (state) => {
                state.lazyLoading = true
                state.error = ''
            })
            .addCase(lazyFetchPostsDiscover.fulfilled, (state, action) => {
                state.lazyLoading = false
                state.pageList = [].concat(state.pageList, [action.payload.pageList])
                state.postIdList = action.payload.newIdList
            })
            .addCase(lazyFetchPostsDiscover.rejected, (state, action) => {
                state.lazyLoading = false
                state.errorLazy = action.error.message
            })

    }

})

export default postsSlice.reducer