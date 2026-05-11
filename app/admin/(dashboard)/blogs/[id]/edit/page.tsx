import {notFound} from 'next/navigation'
import {getAdminPostById} from '@/lib/store'
import PostForm from '../../post-form'

export const dynamic = 'force-dynamic'

interface PageProps {
    params: Promise<{id: string}>
}

export default async function EditPostPage({params}: PageProps) {
    const {id} = await params
    const post = await getAdminPostById(id)
    if (!post) notFound()
    return <PostForm mode="edit" initial={post}/>
}
