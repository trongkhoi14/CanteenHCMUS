import { Outlet } from 'react-router-dom';
import { Container, Header, Footer } from '../components/structure';

function HomeLayout() {
    return (
        <article>
            <Header />
            <Container>
                <Outlet />
            </Container>
            <Footer />
        </article>
    )
}

export default HomeLayout;