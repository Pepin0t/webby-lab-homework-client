import React from "react";

import Container from "./components/Container";
import UserInterface from "./components/UserInterface";
import ListOfFilms from "./components/ListOfFilms";
import NewFilmModal from "./components/modals/add_new_film/NewFilmModal";

import ErrorBoundary from "./components/ErrorBoundary";
import ModalPortal from "./ModalPortal";

function App() {
    return (
        <Container>
            <UserInterface />
            <ErrorBoundary>
                <ListOfFilms />
            </ErrorBoundary>
            <ModalPortal>
                <NewFilmModal />
            </ModalPortal>
        </Container>
    );
}

export default App;
