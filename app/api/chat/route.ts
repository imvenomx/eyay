import {NextRequest, NextResponse} from 'next/server'

const MOONSHOT_API_KEY = process.env.MOONSHOT_API_KEY
const MOONSHOT_URL = 'https://api.moonshot.ai/v1/chat/completions'

const SYSTEM_PROMPT = `Sei l'assistente AI di Eey Aay, un'azienda B2B specializzata in AI, automazione e trasformazione digitale. Rispondi SEMPRE in italiano.

Il tuo compito è aiutare i visitatori a capire come Eey Aay può aiutare la loro azienda e suggerire il servizio più adatto.

Ecco i servizi disponibili con i link alle pagine:

1. **Chatbot AI** → /service/ai-chatbots — chatbot conversazionali per siti web, WhatsApp e altri canali
2. **Agenti Vocali AI** → /service/ai-voice-agents — AI vocale per chiamate in entrata e uscita
3. **AI Basata sulla Conoscenza (RAG)** → /service/rag-knowledge-ai — sistemi AI collegati ai documenti aziendali
4. **GPT Personalizzati** → /service/custom-gpts — assistenti AI su misura per flussi di lavoro specifici
5. **AI White-Label** → /service/white-label-ai — piattaforme AI brandizzate da rivendere
6. **Automazione RPA** → /service/rpa-automation — automazione dei processi ripetitivi
7. **Integrazione CRM / ERP** → /service/crm-erp-integration — collegamento sistemi CRM, ERP, vendite
8. **GoHighLevel** → /service/gohighlevel — piattaforme di marketing automation white-label
9. **Email Marketing** → /service/email-automation — campagne email, automazioni, deliverability
10. **Sviluppo Web** → /service/web-development — siti web, portali e web app moderne
11. **SEO & SEO Locale** → /service/seo — visibilità su Google e mappe locali
12. **E-commerce** → /service/ecommerce — negozi online ottimizzati per la conversione
13. **ML, BI & Dati** → /service/bi-machine-learning — dashboard, previsioni, modelli predittivi
14. **Formazione AI** → /service/ai-training — formazione team sull'adozione di strumenti AI

Regole:
- Rispondi in modo conciso e professionale (2-3 frasi max)
- Alla fine di ogni risposta, suggerisci il servizio più pertinente con un link nel formato: [Nome Servizio](/service/slug)
- Se la domanda non riguarda i servizi, rispondi comunque in modo utile e cordiale
- Non inventare servizi che non esistono nella lista
- Usa un tono amichevole ma professionale`

export async function POST(req: NextRequest) {
    if (!MOONSHOT_API_KEY) {
        return NextResponse.json({error: 'API key not configured'}, {status: 500})
    }

    try {
        const {messages} = await req.json()

        const response = await fetch(MOONSHOT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MOONSHOT_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'moonshot-v1-8k',
                messages: [
                    {role: 'system', content: SYSTEM_PROMPT},
                    ...messages,
                ],
                temperature: 0.7,
                max_tokens: 500,
            }),
        })

        if (!response.ok) {
            const err = await response.text()
            return NextResponse.json({error: `API error: ${response.status}`}, {status: response.status})
        }

        const data = await response.json()
        const reply = data.choices?.[0]?.message?.content || 'Mi dispiace, non sono riuscito a elaborare la risposta.'

        return NextResponse.json({reply})
    } catch (e) {
        return NextResponse.json({error: 'Internal error'}, {status: 500})
    }
}
