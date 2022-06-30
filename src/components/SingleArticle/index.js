import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import NotFound from 'src/components/NotFound';
import Post from 'src/components/Post';

function SingleArticle({ posts, isZen }) {
  const params = useParams();

  // objectif maintenant : trouver dans posts le bon post par son id
  // attention : les params d'url sont tjrs des string, ici je dois retransformer en Nbr
  const foundPost = posts.find((post) => post.id === parseInt(params.id, 10));

  if (!foundPost) {
    return <NotFound />;
  }

  // puis l'afficher (pour l'afficher c'est facile, on a déja un composant <Post /> de prêt)
  return (
    <div>
      <Post
        title={foundPost.title}
        category={foundPost.category}
        excerpt={foundPost.excerpt}
      />
    </div>
  );
}

SingleArticle.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired,
    }),
  ).isRequired,
  isZen: PropTypes.bool.isRequired,
};

export default SingleArticle;
