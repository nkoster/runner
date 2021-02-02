import { ActionTypes } from '../action-types'
import { CellTypes } from '../cell'

export interface MoveCellAction {
    type: ActionTypes.MOVE_CELL,
    payload: {
        id: string,
        direction: 'up' | 'down'
    }
}

export interface DeleteCellAction {
    type: ActionTypes.DELETE_CELL,
    payload: string
}

export interface InsertCellAction {
    type: ActionTypes.INSERT_CELL,
    payload: {
        id: string,
        type: CellTypes
    }
}

export interface UpdateCellAction {
    type: ActionTypes.UPDATE_CELL,
    payload: {
        id: string,
        content: string
    }
}

export type Actions =
    MoveCellAction | DeleteCellAction |
    InsertCellAction | UpdateCellAction
