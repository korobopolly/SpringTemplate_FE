import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createPost, fetchPost, updatePost } from '../api/postApi';

export default function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({ title: '', content: '', author: '' });

  useEffect(() => {
    if (isEdit) {
      fetchPost(id).then((post) =>
        setForm({ title: post.title, content: post.content, author: post.author })
      );
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await updatePost(id, { title: form.title, content: form.content });
    } else {
      await createPost(form);
    }
    navigate('/');
  };

  return (
    <div>
      <h1>{isEdit ? '게시글 수정' : '새 게시글'}</h1>
      <form onSubmit={handleSubmit}>
        {!isEdit && (
          <div className="form-group">
            <label htmlFor="author">작성자</label>
            <input
              id="author"
              name="author"
              value={form.author}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            name="content"
            rows="10"
            value={form.content}
            onChange={handleChange}
            required
          />
        </div>
        <div className="btn-group">
          <button type="button" className="btn" onClick={() => navigate(-1)}>취소</button>
          <button type="submit" className="btn btn-primary">
            {isEdit ? '수정' : '등록'}
          </button>
        </div>
      </form>
    </div>
  );
}
