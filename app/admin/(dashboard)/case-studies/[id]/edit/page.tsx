import {notFound} from 'next/navigation'
import {getAdminCaseStudyById} from '@/lib/store'
import CaseStudyForm from '../../case-study-form'

export const dynamic = 'force-dynamic'

interface PageProps {
    params: Promise<{id: string}>
}

export default async function EditCaseStudyPage({params}: PageProps) {
    const {id} = await params
    const study = await getAdminCaseStudyById(id)
    if (!study) notFound()
    return <CaseStudyForm mode="edit" initial={study}/>
}
