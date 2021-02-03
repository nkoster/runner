import { ActionTypes } from '../action-types'
import { CellTypes } from '../cell'

import { 
    Actions,
    Direction,
    MoveCellAction,
    InsertCellAction,
    DeleteCellAction,
    UpdateCellAction
} from '../actions'

export const updateCell = (id: string, content: string): UpdateCellAction => {
    return {
        type: ActionTypes.UPDATE_CELL,
        payload: {
            id,
            content
        }
    }
}

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
    return {
        type: ActionTypes.MOVE_CELL,
        payload: {
            id,
            direction
        }
    }
}

export const insertCell = (id: string, type: CellTypes): InsertCellAction => {
    return {
        type: ActionTypes.INSERT_CELL,
        payload: {
            id,
            type
        }
    }
}

export const deleteCell = (id: string): DeleteCellAction => {
    return {
        type: ActionTypes.DELETE_CELL,
        payload: id
    }
}
