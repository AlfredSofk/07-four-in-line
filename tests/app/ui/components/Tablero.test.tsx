import React from "react";
import { render } from "@testing-library/react";
import Tablero from '../../../../src/app/ui/components/Tablero/index';
import { handleDrop } from '../../../../src/app/core/state/tablero/actions';


describe('Pruebas para el componente Tablero', () => {

    test('Match Snapshot', () => {
        const handleClickMock = vi.fn();
        const tableroMock = Array(6).fill(Array(7).fill(null));
        const { asFragment } = render(<Tablero handleSelectColumn={handleClickMock} tablero={tableroMock} />);
        expect(asFragment()).toMatchSnapshot();
    });


    test('No iniciar el tablero hasta que se de click', () => {
        const handleClickMock = vi.fn();
        const tableroMock = Array(6).fill(Array(7).fill(null));
        render(<Tablero handleSelectColumn={handleClickMock} tablero={tableroMock} />);
        expect(handleClickMock).toHaveBeenCalledTimes(0);
    });



    // test('Ejecutar el handleClick', () => {

    //     const dispatchMock1 = jest.fn();
    //     const dispatchMock2 = jest.fn();
    //     const verifyDrawMock = jest.fn();



    // });


});