import { getGlobalData } from '@/lib/db/getSiteData'
import BLOG from '@/blog.config'

export async function getServerSideProps(context) {
	// 获取所有页面数据
	const props = await getGlobalData({ from: 'random', locale: context.locale })
	const posts = props.allPages?.filter(
		page => page.type === 'Post' && page.status === 'Published'
	)

	if (!posts || posts.length === 0) {
		// 没有文章则跳转到首页
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	// 随机选取一篇文章
	const randomIndex = Math.floor(Math.random() * posts.length)
	const randomPost = posts[randomIndex]

	// 文章路径，假设为 /post/[slug]，可根据你的路由实际调整
	const destination = `/post/${randomPost.slug || randomPost.id}`

	return {
		redirect: {
			destination,
			permanent: false,
		},
	}
}

// 该页面不会渲染内容，跳转后不会闪烁
export default function Random() {
	return null
}
