import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Composants
import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';
import SingleArticle from 'src/components/SingleArticle';
import NotFound from 'src/components/NotFound';
import Spinner from 'src/components/Spinner';

// data, styles et utilitaires
import categoriesData from 'src/data/categories';
import postsData from 'src/data/posts';
import './styles.scss';
import axios from 'axios';

// une fonction pure qui renvoie, pour un tableau de posts donné
// les posts filtrés par catégorie
// cas particulier : si la catégorie est "accueil" je renvoie tous les posts
const getPostsByCategory = (posts, categoryName) => {
  if (categoryName === 'Accueil') {
    return posts;
  }
  return posts.filter((post) => post.category === categoryName);
};

// == Composant
function Blog() {
  // useState nous permet d'accéder a un state
  // dans nos composants de type fonction
  // il est composé de 3 parties
  // 1 = valeur du state
  // 2 = fonction de modif
  // 3 = valeur initiale
  //        1             2                     3
  const [isZenMode, setIsZenMode] = useState(false);
  // le state qui contiendra nos posts
  const [posts, setPosts] = useState([]);
  // le state qui contiendra nos categories
  const [categories, setCategories] = useState([]);
  // un state pour savoir si je suis en cours de chargement ou pas
  const [isLoading, setIsLoading] = useState(false);

  const handleZenModeChange = () => {
    setIsZenMode(!isZenMode);
  };

  function loadData() {
    loadPosts();
    loadCategories();
  };

  async function loadPosts() {

    setIsLoading(true);
    try {
      const response = await axios.get('https://oclock-open-apis.vercel.app/api/blog/posts');
      setIsLoading(false);
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }

  };

  async function loadCategories() {

    setIsLoading(true);

    try {
      const response = await axios.get('https://oclock-open-apis.vercel.app/api/blog/categories');
      setIsLoading(false);
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <div className="blog">
      <Header
        categories={categoriesData}
        isZen={isZenMode}
        onZenToggle={handleZenModeChange}
      />
      <button
        type="button"
        onClick={loadData}
      >
        Récupérer les posts depuis l'api
      </button>
      {isLoading && <Spinner />}
      <Routes>
        {/* nous allons créer une route par categorie. */}
        {/* ca tombe bien, on a un tableau de catégories, mappons dessus ! */}
        {
          categoriesData.map((category) => (
            // pour chaque catégorie, je crée sa route
            <Route
              key={category.route}
              path={category.route}
              element={(
                <Posts
                  posts={getPostsByCategory(posts, category.label)}
                  isZen={isZenMode}
                />
              )}
            />
          ))
        }
        {/* une route paramétrée pour voir UN SEUL article */}
        {/* je vais donner tous les articles au composant SingleArticle */}
        {/* SingleArticle fera un filter sur les articles */}
        {/* en se basant sur le :id récupéré a travers useParams */}
        <Route
          path="/article/:id"
          element={(
            <SingleArticle
              isZen={isZenMode}
              posts={postsData}
            />
          )}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

// == Export
export default Blog;
