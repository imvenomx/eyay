import {ImageResponse} from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const title = (searchParams.get('title') || 'Eey Aay').slice(0, 140)
    const subtitle = (searchParams.get('subtitle') || 'AI & Automazione per il Business Moderno').slice(0, 200)
    const eyebrow = (searchParams.get('eyebrow') || 'Eey Aay // Italia').slice(0, 60)

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    padding: 64,
                    fontFamily: 'sans-serif',
                }}>
                <div style={{display: 'flex', alignItems: 'center', gap: 16, fontSize: 18, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.25em', fontFamily: 'monospace'}}>
                    <div style={{width: 10, height: 10, borderRadius: 999, backgroundColor: '#22c55e'}}/>
                    <span>{eyebrow}</span>
                </div>

                <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
                    <div style={{
                        fontSize: title.length > 60 ? 60 : 76,
                        fontWeight: 900,
                        lineHeight: 1.05,
                        letterSpacing: '-0.02em',
                        maxWidth: 1000,
                    }}>{title}</div>
                    <div style={{fontSize: 24, color: 'rgba(255,255,255,0.55)', maxWidth: 900, lineHeight: 1.3}}>
                        {subtitle}
                    </div>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: 16, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.25em', fontFamily: 'monospace'}}>
                    <span>eeyaay.it</span>
                    <span>Intelligenza fatta a mano</span>
                </div>

                {/* Crosshair corners */}
                <div style={{position: 'absolute', top: 24, left: 24, width: 32, height: 2, backgroundColor: 'rgba(255,255,255,0.5)'}}/>
                <div style={{position: 'absolute', top: 24, left: 24, width: 2, height: 32, backgroundColor: 'rgba(255,255,255,0.5)'}}/>
                <div style={{position: 'absolute', top: 24, right: 24, width: 32, height: 2, backgroundColor: 'rgba(255,255,255,0.5)'}}/>
                <div style={{position: 'absolute', top: 24, right: 24, width: 2, height: 32, backgroundColor: 'rgba(255,255,255,0.5)'}}/>
                <div style={{position: 'absolute', bottom: 24, left: 24, width: 32, height: 2, backgroundColor: 'rgba(255,255,255,0.5)'}}/>
                <div style={{position: 'absolute', bottom: 24, left: 24, width: 2, height: 32, backgroundColor: 'rgba(255,255,255,0.5)'}}/>
                <div style={{position: 'absolute', bottom: 24, right: 24, width: 32, height: 2, backgroundColor: 'rgba(255,255,255,0.5)'}}/>
                <div style={{position: 'absolute', bottom: 24, right: 24, width: 2, height: 32, backgroundColor: 'rgba(255,255,255,0.5)'}}/>
            </div>
        ),
        {width: 1200, height: 630}
    )
}
