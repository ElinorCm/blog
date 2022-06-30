import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import Post from 'src/components/Post';

import './styles.scss';

function Posts({ posts, isZen }) {
  const navigate = useNavigate();

  return (
    // si isZen est vrai, je vais appliquer une classe modifier
    // posts--zen
    <main className={classNames('posts', { 'posts--zen': isZen })}>
      <h1 className="posts-title">Dev Of Thrones</h1>
      <div className="posts-list">
        {
          posts.map((post) => (
            <Post
              key={post.id}
              // ici comme les props de Post
              // ont le meme nom de que les clés de l'objet post
              // je peux utiliser le spread operator
              // pour "déverser" le contenu de post
              // dans les props
              {...post}
              onPostClick={() => {
                navigate(`/article/${post.id}`);
              }}
              // équivalent d'avoir écrit :
              // title={post.title}
              // category={post.category}
              // excerpt={post.excerpt}
            />
          ))
        }
      </div>
    </main>
  );
}

Posts.propTypes = {
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

export default Posts;
