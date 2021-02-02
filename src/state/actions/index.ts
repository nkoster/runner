import { ActionTypes } from '../action-types'
import { CellTypes } from '../cell'

interface MoveCellAction {
    type: ActionTypes.MOVE_CELL,
    payload: {
        id: string,
        direction: 'up' | 'down'
    }
}

interface DeleteCellAction {
    type: ActionTypes.DELETE_CELL,
    payload: string
}

interface InsertCellAction {
    type: ActionTypes.INSERT_CELL,
    payload: {
        id: string,
        type: CellTypes
    }
}

interface UpdateCellAction {
    type: ActionTypes.UPDATE_CELL,
    payload: {
        id: string,
        content: string
    }
}

export type Actions =
    MoveCellAction | DeleteCellAction |
    InsertCellAction | UpdateCellAction
