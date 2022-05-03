import logo from '../styles/blackLogo.png';

function Header(): JSX.Element {
    return (
        <div className="header-wrapper">
            <header>
            <h1>Movie app</h1>
            <img className='logo' src={ logo } alt="Fabbeiru's logo" />
            </header>
        </div>
    )
}

export default Header;