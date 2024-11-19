import { renderHook } from '@testing-library/react';
import { useGetTablero } from '../../../../src/app/core/hooks/useGetTablero';
import { initialState, reducer } from '../../../../src/app/core/state/reducer';
import { AppContext } from '../../../../src/app/core/state/AppContext';
import { act, useReducer } from 'react';


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

function getContextWithReducerMock({ stateMock }: { stateMock: any}){

    return({children}) => {
        const [state, dispatch] = useReducer(reducer, stateMock);
        return (
            <AppContext.Provider value={{ state, dispatch }}>
                {children}
            </AppContext.Provider>
        )

    }
}


describe('Pruebas para el hook useGetTablero', () => {

    test('Verificar que el estado inicial del tablero es correcto', () => {
        const { result } = renderHook(() => useGetTablero(), { wrapper: wrapperMock })
        expect(result.current.tablero).toEqual(initialStateMock.tablero);
        expect(result.current.currentPlayer).toEqual(1);
        expect(result.current.isAWinner).toEqual(false);
        expect(result.current.winnerPlayer).toEqual(0);
    });

    test('Verificar que el handleClickButton no realiza nada si hay un ganador o empate', () => {

        const stateMock = {
            ...initialStateMock,
            isThereWinner: false,
        }

        const dispatchMock = vi.fn();
        const wrapperMock = getContextMock({ stateMock: stateMock, dispatch: dispatchMock })
        const { result } = renderHook(() => useGetTablero(), { wrapper: wrapperMock })

        act(() => result.current.handleClickButton(2));

        expect(dispatchMock).not.toHaveBeenCalledTimes();

    });

    test('Verificar que el handleClick cambie el estado del tablero', async() => {
        
        const stateMock = {
            ...initialStateMock,
            isThereWinner: false,
        }
        const wrapperMock = getContextWithReducerMock({ stateMock: stateMock})
        const { result } = renderHook(() => useGetTablero(), {wrapper : wrapperMock})

        await act(async ()=> result.current.handleClickButton(2))

        expect(result.current.tablero[5][1]).toBe(1)
        

    })

    test('Verificar que exista un cambio de turno del jugador actual', async() => {
        
        const stateMock = {...initialStateMock}
        const wrapperMock = getContextWithReducerMock({stateMock})
        const { result } = renderHook(() => useGetTablero(), {wrapper : wrapperMock})

        await act(async ()=> result.current.handleClickButton(2))

        expect(result.current.currentPlayer).toBe(2)
    
    });

    test('Verificar que exista un ganador', async () => {
        
        const wrapperMock = getContextWithReducerMock({stateMock : {...initialStateMock}})
        const {result } = renderHook(() => useGetTablero(), {wrapper : wrapperMock})

        await act(async () => {
            result.current.handleClickButton(1)
            result.current.handleClickButton(2)
            result.current.handleClickButton(1)
            result.current.handleClickButton(2)
            result.current.handleClickButton(1)
            result.current.handleClickButton(2)
            result.current.handleClickButton(1)
        })

        console.log({contexto : result.current})
        expect(result.current.isAWinner).toBe(true)
        expect(result.current.winnerPlayer).toBe(1)

    });

    test('Verificar que el reset vuelva a dejar limpio el estado', async () => {

        const stateMock = {...initialStateMock}

        const wrapperMock = getContextWithReducerMock({stateMock : {...initialStateMock}})

        const {result} = renderHook(() => useGetTablero(), {wrapper : wrapperMock})

        await act(async ()=> {result.current.handleClickButton(1)})

        expect(result.current.tablero).not.toEqual(stateMock.tablero)


        await act(async ()=> result.current.handleResetGame())

        expect(result.current.tablero).toEqual(stateMock.tablero)

    })

}); 