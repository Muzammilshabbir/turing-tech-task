import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Axios } from '../services/Axios'
import { setLoading } from './loaderSlice'
import { toast } from 'react-toastify';

const initialState = {
    calls: [],
    call: {}
}

export const fetchCalls = createAsyncThunk('calls', async (offset, thunk) => {

    let url = 'calls'
    if (offset) {
        url = `calls/?offset=${offset}&limit=10`
    }
    thunk.dispatch(setLoading(true))
    const { data } = await Axios.get(url)
    thunk.dispatch(setLoading(false))
    return data
})

export const fetchSingleCall = createAsyncThunk('getByID', async (id, thunk) => {

    thunk.dispatch(setLoading(true))
    const { data } = await Axios.get(`calls/${id}`)

    thunk.dispatch(setLoading(false))
    return data
})

export const addNote = createAsyncThunk('addNote', async (value, thunk) => {

    thunk.dispatch(setLoading(true))
    const { data } = await Axios.post(`calls/${value.id}/note`,{content:value.content})
 
    toast('Note added successfully')

    thunk.dispatch(setLoading(false))
    return data
})

export const archiveCall = createAsyncThunk('archiveCall', async (id, thunk) => {

    thunk.dispatch(setLoading(true))
    const { data } = await Axios.put(`calls/${id}/archive`)

    thunk.dispatch(setLoading(false))
    console.log('thunk.getState().calls.calls.nodes :>> ', thunk.getState().calls.calls.nodes);
    const calls = JSON.parse(JSON.stringify(thunk.getState().calls.calls.nodes))

    const callIndex = thunk.getState().calls?.calls?.nodes.findIndex((call) => {
        return call.id === id
    })

    const call = { ...thunk.getState().calls?.calls?.nodes[callIndex]}

    call.is_archived ? call.is_archived = false : call.is_archived = true

    calls[callIndex] = call 
    return calls

})


const callSlice = createSlice({
    name: 'calls',
    initialState: initialState,
    reducers: {
        deleteCalls: (state, action) => {
            state.calls = action.payload
        }
    },
    extraReducers: {
        [fetchCalls.fulfilled]: (state, action) => {
            state.calls = action.payload;
        },
        [fetchSingleCall.fulfilled]: (state, action) => {
            return {...state, call:action.payload};
        },
        [addNote.fulfilled]: (state, action) => {
            return {...state, call:action.payload};
        },
        [archiveCall.fulfilled]: (state, action) => {
            state.calls.nodes = action.payload;
        }
    }
})

export const { deleteCalls } = callSlice.actions

export default callSlice.reducer