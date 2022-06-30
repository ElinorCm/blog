import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './styles.scss';

function Header({ categories, isZen, onZenToggle }) {
  return (
    <header className="menu">
      <nav>
        {
          categories.map((category) => (
            // NavLink fonctionne comme un link
            // a ceci pret qu'il peut ajouter une classe css au lien actif
            <NavLink
              key={category.route}
              // sur navlink, la prop className prend en parametre un callback
              // ce callback recoit en param un objet contenant le booléen isActive
              // que l'on peut utiliser pour construire notre className
              className={({ isActive }) => (isActive ? 'menu-link menu-link--selected' : 'menu-link')}
              to={category.route}
            >
              {category.label}
            </NavLink>
          ))
        }
        <button
          className="menu-btn"
          type="button"
          // lors du clic, j'appelle la fonction de modification du state
          // en donnant l'inverse de la prop isZen
          // afin d'inverser le booléen
          onClick={onZenToggle}
        >
          {isZen ? 'Désactiver le mode zen' : 'Activer le mode zen'}
        </button>
      </nav>
    </header>
  );
}

Header.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  isZen: PropTypes.bool.isRequired,
  onZenToggle: PropTypes.func.isRequired,
};

export default Header;
