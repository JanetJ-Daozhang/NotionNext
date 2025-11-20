import BLOG from '@/blog.config'
import { getGlobalNotionData } from '@/lib/notion/getNotionData'
import { useEffect } from 'react'
import Router from 'next/router'

export async function getStaticProps() {
  const notionData = await getGlobalNotionData({ from: 'random' })

  // 从所有文章中过滤可见文章
  const posts = notionData?.posts?.filter(post => post?.status === 'Published')

  return {
    props: {
      posts: posts || []
    },
    revalidate: 60
  }
}

export default function RandomPage({ posts }) {
  useEffect(() => {
    if (!posts || posts.length === 0) return

    const randomPost = posts[Math.floor(Math.random() * posts.length)]
    const randomSlug = randomPost.slug

    // 页面加载后立即跳转到文章
    Router.replace(`/article/${randomSlug}`)
  }, [posts])

  return (
    <div style={{ padding: '2rem', fontSize: '1.2rem' }}>
      Redirecting to a random post…
    </div>
  )
}
