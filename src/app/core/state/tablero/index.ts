import { verifyWinUser } from '../../../utils/verifyWin';
import { GameState } from '../../interfaces/gameState';
import { tableroActionTypes } from './actions';


export const tableroInitialState: GameState = {
    tablero: Array(6).fill(Array(7).fill(null)),
    tableroRow: 0,
    tableroColumn: 0,
    tableroCell: 0,
    isPlayerOneTurn: true,
    isThereWinner: false,
    winnerPlayer: 0
}


export const tableroCases = {

    [tableroActionTypes.SET_TABLERO]: (state: GameState) => {
        return {
            ...state
        }
    },

    [tableroActionTypes.RESET_TABLERO]: () => {
        return tableroInitialState
    },

    [tableroActionTypes.CHANGE_TURN]: (state: GameState) => {
        return {
            ...state,
            isPlayerOneTurn: !state.isPlayerOneTurn
        }
    },

    [tableroActionTypes.DROP_COIN]: (state: GameState, payload: number) => {
        const { tablero, isPlayerOneTurn } = state
        const auxBoard = tablero.map(row => [...row]);

        let placedRow
        let placedColumn
        for (let row = auxBoard.length - 1; row >= 0; row--) {

            if (auxBoard[row][payload] === null) {
                // Colocar la ficha del jugador actual
                // TODO obtener la posicion actual cuando mejore mi estomago
                auxBoard[row][payload] = isPlayerOneTurn ? 1 : 2;
                placedRow = row;
                placedColumn = payload;

                break;
            }
        }

        return {
            ...state,
            tableroRow: placedRow,
            tableroColumn: placedColumn,
            tablero: auxBoard
        }

    },


    [tableroActionTypes.HANDLE_CLICK]: (state: GameState) => {

        console.table(state.tablero)
        return {
            ...state
        }

    },

    [tableroActionTypes.VERIFY_WIN]: (state: GameState) => {

        const { isPlayerOneTurn } = state

        const isAWinner = verifyWinUser(state)

        // console.log({ isAWinner })
        return {
            ...state,
            isThereWinner: isAWinner,
            winnerPlayer: isPlayerOneTurn ? 1 : 2
        }


    },


    [tableroActionTypes.VERIFY_DRAW]: (state: GameState) => {

        return {
            ...state,
            isThereWinner: false,
            winnerPlayer: -1
        }

    }

}

