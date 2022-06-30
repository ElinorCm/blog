import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// == Import : local
// Composants
import Blog from 'src/components/Blog';

// La cible du DOM (là où la structure doit prendre vie dans le DOM)
const target = document.getElementById('root');

const root = createRoot(target);
// Le rendu de React => DOM

const elementToRender = (
  <BrowserRouter>
    <Blog />
  </BrowserRouter>
);

root.render(elementToRender);
