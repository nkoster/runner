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
            const cell: Cell = {
                content: '',
                type: action.payload.type,
                id: randomId()
            }
            state.data[cell.id] = cell
            const index = state.order.findIndex(id => id === action.payload.id)
            if (index < 0) {
                state.order.push(cell.id)
            } else {
                state.order.splice(index, 0, cell.id)
            }
            return state

        case ActionTypes.MOVE_CELL:
            const { direction } = action.payload
            const currentIndex = state.order.findIndex(id => id === action.payload.id)
            const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
            if (newIndex < 0 || newIndex > state.order.length - 1) {
                return state
            }
            state.order[currentIndex] = state.order[newIndex]
            state.order[newIndex] = action.payload.id
            return state

        case ActionTypes.UPDATE_CELL:
            const { id, content } = action.payload
            state.data[id].content = content
            return state

        default: return state

    }
})

const randomId = () => {
    return Math.random().toString(36).substr(2, 5)
}

export default CellReducer
