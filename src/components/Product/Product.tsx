import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { deleteComment, getComments, postComment } from '../../api/Comments';
import { getProduct } from '../../api/Goods';
import { loadProductAction } from '../../store/actions';
import { getProductSelector } from '../../store/selectors';
import { EditProductForm } from '../EditProductForm/EditProductForm';
import './Product.scss';

export const Product: React.FC = () => {
  const product = useSelector(getProductSelector);
  const dispatch = useDispatch();
  const params = useParams();
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [newComment, setNewComment] = useState('');

  const loadProduct = async () => {
    if (params.id) {
      const productFromServer = await getProduct(+params.id);

      dispatch(loadProductAction(productFromServer));
    }
  };

  const loadComments = async () => {
    if (params.id) {
      const commentsFromServer = await getComments(+params.id);

      setComments(commentsFromServer);
    }
  };

  const handleDelete = async (commentId: number) => {
    deleteComment(commentId);
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  const handlePostComment = async () => {
    if (params.id) {
      const comment = {
        productId: +params.id,
        description: newComment,
        date: Date(),
      };

      await postComment(comment);
    }

    loadComments();
  };

  useEffect(() => {
    if (!product) {
      loadProduct();
    }

    loadComments();
  }, []);

  return (
    <>
      {product && (
        <div className="Product">
          <img
            className="Product__photo"
            src={product.imageUrl}
            alt="placeholder"
          />
          <h3 className="Product__name">{product.name}</h3>
          <p className="Product__info">
            {`Count: ${product.count}\n`}
            {`Width: ${product.size.width}\n`}
            {`Height: ${product.size.height}\n`}
            {`Weight: ${product.weight}\n`}
          </p>
          <div className="Product__comments">
            <h4 className="Product__comments-title">Comments:</h4>
            <ul>
              {comments.map(comment => (
                <li key={comment.id}>
                  {comment.description}
                  &nbsp;
                  <button
                    type="button"
                    className="Product__comment-delete button is-light"
                    onClick={() => handleDelete(comment.id)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
            <textarea
              className="textarea"
              placeholder="Your comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            >
            </textarea>
          </div>
          <div className="Product__buttons">
            <Link
              to="/"
              type="button"
              className="Product__button button"
            >
              Back
            </Link>
            <button
              type="button"
              className="Product__button button is-success"
              onClick={handlePostComment}
            >
              Comment
            </button>
            <EditProductForm />
          </div>
        </div>
      )}
    </>
  );
};
