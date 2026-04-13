import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../api/postApi';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost(id).then(setPost);
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    await deletePost(id);
    navigate('/');
  };

  if (!post) return <p>로딩 중...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <div className="post-meta">
        <span>작성자: {post.author}</span>
        <span>작성일: {new Date(post.createdAt).toLocaleString('ko-KR')}</span>
        {post.updatedAt !== post.createdAt && (
          <span>수정일: {new Date(post.updatedAt).toLocaleString('ko-KR')}</span>
        )}
      </div>
      <div className="post-content">{post.content}</div>
      <div className="btn-group">
        <Link to="/" className="btn">목록</Link>
        <Link to={`/posts/${id}/edit`} className="btn btn-primary">수정</Link>
        <button onClick={handleDelete} className="btn btn-danger">삭제</button>
      </div>
    </div>
  );
}
