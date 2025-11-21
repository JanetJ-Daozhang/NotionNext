export async function getServerSideProps({ res }) {
  const api = await fetch(`${process.env.NEXT_PUBLIC_URL || ''}/api/article`);
  const data = await api.json();

  const posts = data.filter(
    p => p.type === 'Post' && p.status === 'Published'
  );

  if (!posts.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  const random = posts[Math.floor(Math.random() * posts.length)].slug;

  return {
    redirect: {
      destination: `/${random}`,
      permanent: false
    }
  };
}

export default function Random() {
  return null; // 页面不需要渲染
}
