import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostDetail, clearPostDetail } from '../../features/postDetail/postDetailSlice';
import PostContent from '../../components/PostContent/PostContent';
import PostContentSkeleton from '../../components/PostContentSkeleton/PostContentSkeleton';
import './PostDetailPage.css';

const PostDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, comments, status, error } = useSelector((state) => state.postDetail);

  useEffect(() => {
    dispatch(fetchPostDetail(id));

    return () => {
      dispatch(clearPostDetail());
    };
  }, [dispatch, id]);

  const defaultAvatar = "https://www.redditstatic.com/avatars/avatar_default_02_24A0ED.png";

  return (
    <div className="post-detail-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {status === 'loading' ? (
        <>
          <PostContentSkeleton />
          <h4>Comments</h4>
          <ul className="comments-list">
            {Array(3).fill().map((_, i) => (
              <li key={i} className="comment-skeleton">
                <div className="comment-skeleton-header">
                  <div className="skeleton-avatar"></div>
                  <div className="skeleton-text small author"></div>
                </div>
                <div className="skeleton-text body"></div>
              </li>
            ))}
          </ul>
        </>
      ) : status === 'failed' ? (
        <p>Error: {error}</p>
      ) : (
        <>
          {post && <PostContent post={post} />}
          <h4>Comments</h4>
          <ul className="comments-list">
            {comments.map((comment) => (
              <li key={comment.id} className="comment">
                <img
                  src={comment.icon_img || defaultAvatar}
                  alt={comment.author}
                  className="comment-avatar"
                />
                <div className="comment-content">
                  <p className="comment-author">{comment.author}</p>
                  <p className="comment-body">{comment.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default PostDetailPage;
