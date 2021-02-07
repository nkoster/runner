import produce from 'immer'
import { ActionTypes }  from '../action-types'
import { Actions } from '../actions'
import { Cell } from '../cell'

interface CellState {
    loading: boolean,
    error: string | null,
    order: string[],
    data: {
        [key: string]: Cell
    }
}

const initialState: CellState = {
    loading: false,
    error: null,
    order: [],
    data: {}
}

const CellReducer = produce((state: CellState = initialState, action: Actions) => {
    switch(action.type) {
        case ActionTypes.DELETE_CELL:
            delete state.data[action.payload]
            state.order = state.order.filter(id => id !== action.payload)
            return state
        case ActionTypes.INSERT_CELL:
            return state
        case ActionTypes.MOVE_CELL:
            const { direction } = action.payload
            const index = state.order.findIndex(id => id === action.payload.id)
            const newIndex = direction === 'up' ? index - 1 : index + 1
            if (newIndex < 0 || newIndex > state.order.length - 1) {
                return
            }
            state.order[index] = state.order[newIndex]
            state.order[newIndex] = action.payload.id
            return
        case ActionTypes.UPDATE_CELL:
            const { id, content } = action.payload
            state.data[id].content = content
            return
        default: return state
    }
})

export default CellReducer
