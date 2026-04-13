import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchPosts } from '../api/postApi';

export default function PostList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '0', 10);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchPosts(page).then(setData);
  }, [page]);

  if (!data) return <p>로딩 중...</p>;

  return (
    <div>
      <div className="header">
        <h1>게시판</h1>
        <Link to="/posts/new" className="btn btn-primary">글쓰기</Link>
      </div>

      <table>
        <thead>
          <tr>
            <th style={{ width: '60px' }}>번호</th>
            <th>제목</th>
            <th style={{ width: '120px' }}>작성자</th>
            <th style={{ width: '160px' }}>작성일</th>
          </tr>
        </thead>
        <tbody>
          {data.content.length === 0 ? (
            <tr><td colSpan="4" style={{ textAlign: 'center' }}>게시글이 없습니다.</td></tr>
          ) : (
            data.content.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td><Link to={`/posts/${post.id}`}>{post.title}</Link></td>
                <td>{post.author}</td>
                <td>{new Date(post.createdAt).toLocaleDateString('ko-KR')}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button
          disabled={page <= 0}
          onClick={() => setSearchParams({ page: page - 1 })}
        >
          이전
        </button>
        <span>{page + 1} / {data.totalPages || 1}</span>
        <button
          disabled={page + 1 >= data.totalPages}
          onClick={() => setSearchParams({ page: page + 1 })}
        >
          다음
        </button>
      </div>
    </div>
  );
}
