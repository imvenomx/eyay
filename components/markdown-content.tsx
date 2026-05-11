import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

export default function MarkdownContent({source}: {source: string}) {
    return (
        <div className="markdown-body">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSlug]}
                components={{
                    h1: ({node, ...props}) => (
                        <h1 className="font-vcr text-3xl md:text-4xl mt-12 mb-4 leading-tight" style={{fontWeight: 900}} {...props}/>
                    ),
                    h2: ({node, ...props}) => (
                        <h2 className="font-vcr text-2xl md:text-3xl mt-10 mb-4 leading-tight" style={{fontWeight: 900}} {...props}/>
                    ),
                    h3: ({node, ...props}) => (
                        <h3 className="font-vcr text-xl md:text-2xl mt-8 mb-3 leading-tight" {...props}/>
                    ),
                    p: ({node, ...props}) => (
                        <p className="text-base text-black/75 leading-[1.75] my-5" {...props}/>
                    ),
                    a: ({node, ...props}) => (
                        <a className="underline decoration-black/30 underline-offset-4 hover:decoration-black transition-colors" {...props}/>
                    ),
                    ul: ({node, ...props}) => (
                        <ul className="list-disc list-outside ml-6 my-5 space-y-2 text-black/75" {...props}/>
                    ),
                    ol: ({node, ...props}) => (
                        <ol className="list-decimal list-outside ml-6 my-5 space-y-2 text-black/75" {...props}/>
                    ),
                    li: ({node, ...props}) => (
                        <li className="leading-[1.7]" {...props}/>
                    ),
                    blockquote: ({node, ...props}) => (
                        <blockquote className="relative border-l-2 border-black my-8 pl-6 py-2 italic text-black/80 text-lg" {...props}/>
                    ),
                    code: ({node, className, children, ...props}) => {
                        const isBlock = /language-/.test(className || '')
                        if (isBlock) {
                            return (
                                <code className={`${className} block w-full font-mono text-xs leading-relaxed text-white/90`} {...props}>
                                    {children}
                                </code>
                            )
                        }
                        return (
                            <code className="px-1.5 py-0.5 bg-black/[0.06] border border-black/10 font-mono text-[0.92em] text-black" {...props}>
                                {children}
                            </code>
                        )
                    },
                    pre: ({node, ...props}) => (
                        <pre className="relative my-8 p-5 bg-[#0a0a0a] border border-black/10 overflow-x-auto" {...props}/>
                    ),
                    hr: () => (
                        <hr className="my-12 border-t border-black/10"/>
                    ),
                    img: ({node, alt, ...props}) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img alt={alt || ''} className="my-8 w-full border border-black/10" {...props}/>
                    ),
                    table: ({node, ...props}) => (
                        <div className="my-8 overflow-x-auto border border-black/10">
                            <table className="w-full text-sm" {...props}/>
                        </div>
                    ),
                    th: ({node, ...props}) => (
                        <th className="px-4 py-3 text-left font-vcr text-[10px] uppercase tracking-[0.2em] text-black/60 border-b border-black/10 bg-black/[0.03]" {...props}/>
                    ),
                    td: ({node, ...props}) => (
                        <td className="px-4 py-3 border-b border-black/5 text-black/75" {...props}/>
                    ),
                    strong: ({node, ...props}) => (
                        <strong className="font-semibold text-black" {...props}/>
                    ),
                }}
            >
                {source}
            </ReactMarkdown>
        </div>
    )
}
