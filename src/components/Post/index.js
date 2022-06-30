import PropTypes from 'prop-types';
import './styles.scss';

function Post({
  title,
  category,
  excerpt,
  onPostClick,
}) {
  return (
    <article
      className="post"
      onClick={onPostClick}
    >
      <h2 className="post-title">{title}</h2>
      <div className="post-category">{category}</div>
      <p className="post-excerpt">{excerpt}</p>
    </article>
  );
}

Post.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  onPostClick: PropTypes.func.isRequired,
};

export default Post;
