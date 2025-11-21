import { getAllPosts } from '@/lib/notion'

export async function getServerSideProps() {
  const posts = await getAllPosts({ status: 'Published' })

  if (!posts || posts.length === 0) {
    return {
      redirect: { destination: '/', permanent: false }
    }
  }

  const randomIndex = Math.floor(Math.random() * posts.length)
  const randomPost = posts[randomIndex]

  return {
    redirect: {
      destination: `/article/${randomPost.slug}`,
      permanent: false
    }
  }
}

export default function RandomPage() {
  return null
}
