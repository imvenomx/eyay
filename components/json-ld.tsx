import React from 'react'

export default function JsonLd({data}: {data: object}) {
    return (
        <script
            type="application/ld+json"
            // JSON.stringify is safe here — we control all inputs.
            dangerouslySetInnerHTML={{__html: JSON.stringify(data)}}
        />
    )
}
