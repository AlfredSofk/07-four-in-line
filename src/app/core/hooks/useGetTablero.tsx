import { useContext } from "react"
import { AppContext } from "../state/AppContext"
import { changeTurn, handleClick, handleDrop, resetTablero, verifyDraw, verifyWin } from '../state/tablero/actions';
import { verifyDrawUser } from "../../utils/verifyWin";

export const useGetTablero = () => {

    const { state, dispatch } = useContext(AppContext)


    const handleClickButton = (column: number) => {

        if (state.isThereWinner || state.winnerPlayer == -1) return

        let inputColumn = column

        if (inputColumn < 0 || inputColumn == 0) {
            inputColumn = 0;
        } else if (inputColumn >= 7) {
            inputColumn = 6;
        } else {
            // Si está entre 0 y 7, restar 1
            inputColumn -= 1;
        }



        dispatch(handleDrop(inputColumn))
        dispatch(handleClick())


        const isADraw = verifyDrawUser(state.tablero)
        if (isADraw) {
            dispatch(verifyDraw())
            return
        }

        dispatch(verifyWin())

        if (!state.isThereWinner) {
            dispatch(changeTurn())
        }
    }


    const handleResetGame = () => {
        dispatch(resetTablero())
    }

    return {
        currentPlayer: state.isPlayerOneTurn ? 1 : 2,
        isAWinner: state.isThereWinner,
        winnerPlayer: state.winnerPlayer,
        tablero: state.tablero,
        handleClickButton,
        handleResetGame
    }

}