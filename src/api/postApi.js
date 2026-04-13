const BASE_URL = '/api/posts';

export async function fetchPosts(page = 0, size = 10) {
  const res = await fetch(`${BASE_URL}?page=${page}&size=${size}`);
  if (!res.ok) throw new Error('게시글 목록을 불러올 수 없습니다.');
  return res.json();
}

export async function fetchPost(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('게시글을 찾을 수 없습니다.');
  return res.json();
}

export async function createPost(data) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('게시글 생성에 실패했습니다.');
  return res.json();
}

export async function updatePost(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('게시글 수정에 실패했습니다.');
  return res.json();
}

export async function deletePost(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('게시글 삭제에 실패했습니다.');
}
