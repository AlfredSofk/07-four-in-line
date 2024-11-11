import { changeTurn, handleClick, handleDrop, resetTablero, tableroActionTypes, verifyDraw, verifyWin } from "../../../../../src/app/core/state/tablero/actions";



describe('Pruebas para las acciones del tablero', () => {

    test('Verificar que las acciones del tablero son correctas', () => {

        const dispatchedActionMock = {
            SET_TABLERO: "SET_TABLERO",
            SET_TABLERO_ROW: "SET_TABLERO_ROW",
            SET_TABLERO_COLUMN: "SET_TABLERO_COLUMN",
            SET_TABLERO_CELL: "SET_TABLERO_CELL",
            RESET_TABLERO: "RESET_TABLERO",
            DROP_COIN: "DROP_COIN",
            HANDLE_CLICK: "HANDLE_CLICK",
            VERIFY_WIN: "VERIFY_WIN",
            VERIFY_DRAW: "VERIFY_DRAW",
            CHANGE_TURN: "CHANGE_TURN",
        };

        expect(dispatchedActionMock).toEqual(expect.objectContaining(tableroActionTypes));

    });


    test('Verificar que la accion reset_tablero retorne el objeto correcto', () => {
        const actionTypeMock = {
            type: "RESET_TABLERO",
        }

        const actionResetTablero = resetTablero();
        expect(actionResetTablero).toEqual(actionTypeMock);
    });

    test('Verificar que la accion change_turn retorne el objeto correcto', () => {
        const actionTypeMock = {
            type: "CHANGE_TURN",
            // payload
        }

        const actionChangeTurn = changeTurn();
        expect(actionChangeTurn).toEqual(actionTypeMock);
    });

    test('Verificar que la accion drop_coin retorne el objeto correcto', () => {

        const columnDropMock = 1

        const actionTypeMock = {
            type: "DROP_COIN",
            payload: columnDropMock
        }

        const actionDropCoin = handleDrop(columnDropMock);
        expect(actionDropCoin).toEqual(actionTypeMock);
    });

    test('Verificar que la accion handle_click retorne el objeto correcto', () => {

        const actionTypeMock = {
            type: "HANDLE_CLICK",
        }

        const actionHandleClick = handleClick();
        expect(actionHandleClick).toEqual(actionTypeMock);
    });

    test('Verificar que la accion verify_win retorne el objeto correcto', () => {

        const actionTypeMock = {
            type: "VERIFY_WIN",
        }

        const actionVerifyWin = verifyWin();
        expect(actionVerifyWin).toEqual(actionTypeMock);
    });


    test('Verificar que la accion verify_draw retorne el objeto correcto', () => {

        const actionTypeMock = {
            type: "VERIFY_DRAW",
        }

        const actionVerifyDraw = verifyDraw();
        expect(actionVerifyDraw).toEqual(actionTypeMock);
    });

});