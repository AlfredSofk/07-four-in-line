import React from "react";
import { render, screen } from "@testing-library/react";
import Cabecera from '../../../../src/app/ui/components/Cabecera/index';


describe('Pruebas para el componente Cabecera', () => {

    test('Match Snapshot', () => {
        const { asFragment } = render(<Cabecera currentPlayer={1} />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('Renderiza el texto de cabecera', () => {
        render(<Cabecera currentPlayer={1} />);
        expect(screen.getByText('Jugador 1')).toBeInTheDocument();
        expect(screen.getByText('Jugador 2')).toBeInTheDocument();
    });

    test('Verifica que el texto de cabecera muestra el turno del jugador', () => {
        render(<Cabecera currentPlayer={1} />);
        expect(screen.getByText('Turno del jugador: 1')).toBeTruthy();
    });
});
