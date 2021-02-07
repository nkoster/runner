import { stat } from 'fs'
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

const CellReducer = (state: CellState = initialState, action: Actions): CellState => {
    switch(action.type) {
        case ActionTypes.DELETE_CELL:
            return state
        case ActionTypes.INSERT_CELL:
            return state
        case ActionTypes.MOVE_CELL:
            return state
        case ActionTypes.UPDATE_CELL:
            const { id, content } = action.payload
            return {
                ...state,
                data: {
                    ...state.data,
                    [id]: { ...state.data[id], content }
                }
            }
        default: return state
    }
}

export default CellReducer
