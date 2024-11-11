import { renderHook } from '@testing-library/react';
import { useGetTablero } from '../../../../src/app/core/hooks/useGetTablero';
import { initialState } from '../../../../src/app/core/state/reducer';
import { AppContext } from '../../../../src/app/core/state/AppContext';
import { act } from 'react';


const initialStateMock = { ...initialState }

const wrapperMock = ({ children }: { children: React.ReactNode }) => (

    <AppContext.Provider value={{ state: initialState, dispatch: vi.fn() }}>
        {children}
    </AppContext.Provider>

)

function getContextMock({ stateMock, dispatch }: { stateMock: any, dispatch?: any }) {


    return ({ children }: { children: React.ReactNode }) => (

        <AppContext.Provider value={{ state: stateMock, dispatch }}>
            {children}
        </AppContext.Provider>
    );


}


describe('Pruebas para el hook useGetTablero', () => {

    test('Verificar que el estado inicial del tablero es correcto', () => {

        const wrapperMock = getContextMock({ stateMock: initialStateMock })
        // const resultGetContextMock = getContextMock({ stateMock: initialStateMock })
        const { result } = renderHook(() => useGetTablero(), { wrapper: wrapperMock })
        expect(result.current.tablero).toEqual(initialStateMock.tablero);
        expect(result.current.currentPlayer).toEqual(1);
        expect(result.current.isAWinner).toEqual(false);
        expect(result.current.winnerPlayer).toEqual(0);
    });

    test('Verificar que el handleClickButton no realiza nada si hay un ganador o empate', () => {

        const stateMock = {
            ...initialStateMock,
            isThereWinner: true,
        }

        const dispatchMock = vi.fn();
        const wrapperMock = getContextMock({ stateMock: stateMock, dispatch: dispatchMock })
        const { result } = renderHook(() => useGetTablero(), { wrapper: wrapperMock })

        act(() => result.current.handleClickButton(2));

        expect(dispatchMock).not.toHaveBeenCalledTimes(1);

    });



}); 