#!/usr/bin/env tsx
/**
 * seed-blog-posts.ts
 *
 * Inserts 9 curated AI/automation blog posts into Supabase (or the
 * file store, depending on the active driver).
 *
 *   npx tsx --env-file=.env.local scripts/seed-blog-posts.ts
 *
 * Flags:
 *   --dry-run       just print what would be inserted
 *   --force         re-create (delete-then-insert) posts whose slug
 *                   already exists. Default: skip existing.
 */
import {createClient} from '@supabase/supabase-js'

interface PostInput {
    slug: string
    title: string
    excerpt: string
    body: string
    category: 'ai' | 'automation' | 'growth' | 'case-study'
    author: string
    coverImage: string
    published: boolean
}

const POSTS: PostInput[] = [
    {
        slug: 'chatbot-ai-pmi-italiana-guida-pratica',
        title: 'Chatbot AI per la PMI italiana: la guida pratica 2026',
        excerpt: 'Quando un chatbot AI ha davvero senso per una PMI italiana, quanto costa, e come misurare il ritorno entro 90 giorni.',
        body: `## Perché ora

Le PMI italiane stanno scoprendo che un chatbot AI non è più solo un widget di chat: è un **sistema commerciale** che qualifica lead, prenota appuntamenti e fa supporto di primo livello 24/7. Il costo di entrata è crollato del 70% negli ultimi 18 mesi grazie ai modelli più piccoli e veloci.

## Quando ha senso (e quando no)

**Ha senso se:**
- Ricevi più di 50 richieste/mese ripetitive (prezzi, disponibilità, orari)
- Hai una knowledge base scritta (manuali, FAQ, documentazione)
- Vuoi qualificare i lead prima di passarli al commerciale
- Hai un team di 1-3 persone sovraccaricato dal primo livello

**Non ha senso se:**
- Vendi prodotti altamente custom dove ogni richiesta è unica
- La tua audience non è digitale (es. clientela B2B over-60 in settori tradizionali)
- Non hai dati storici per addestrare le risposte

## I numeri reali

Da un nostro cliente B2B SaaS, dopo 90 giorni:
- **-68%** ticket di supporto in arrivo
- **+3x** lead qualificati al mese
- **-54%** costo per lead
- **~30 ore/settimana** liberate per il team

## Stack tipico

Il chatbot moderno per PMI italiana usa tipicamente:
1. **LLM commerciale** (OpenAI, Anthropic, Mistral) o self-hosted
2. **RAG** sulla tua knowledge base
3. **Integrazione CRM** (HubSpot, Pipedrive, Salesforce)
4. **Multi-canale** (sito web + WhatsApp Business)
5. **Escalation** intelligente a operatore umano

## Tempi e costi

Per un chatbot completo, in media:
- **Setup**: 3-6 settimane
- **Investimento iniziale**: 2.500€ - 7.500€
- **Costo mensile** (LLM + hosting): 50€ - 300€/mese
- **Payback**: 2-4 mesi per la maggior parte dei progetti

## I tre errori più comuni

1. **Cercare di sostituire l'umano al 100%**. Il chatbot deve gestire il 70-80% delle richieste e passare il resto a un umano.
2. **Saltare la fase di training sui dati reali**. Senza esempi storici, il bot suona generico.
3. **Non misurare**. Se non tracci tasso di risoluzione, NPS e lead qualificati, non sai se sta funzionando.

## Da dove iniziare

Se vuoi capire se un chatbot ha senso per la tua azienda, ti consigliamo di partire da una **chiamata di scoperta di 20 minuti**. Nessun impegno, nessun preventivo via email senza prima aver capito il problema.`,
        category: 'ai',
        author: 'Eey Aay',
        coverImage: '',
        published: true,
    },
    {
        slug: 'rag-vs-fine-tuning-quale-scegliere',
        title: 'RAG o fine-tuning? Come scegliere senza sbagliare',
        excerpt: 'La differenza tra RAG e fine-tuning spiegata senza fuffa, con una matrice di decisione pratica per scegliere il giusto approccio.',
        body: `## La confusione che vediamo ogni settimana

"Vogliamo un AI che conosca i nostri documenti. Dobbiamo fare fine-tuning di un modello?"

Nove volte su dieci, la risposta è **no**. Quello che vi serve è **RAG** (Retrieval-Augmented Generation). Vediamo perché.

## Cosa sono in due righe

- **Fine-tuning**: insegni a un modello nuovi pattern di risposta. Cambia *come* il modello pensa.
- **RAG**: dai al modello accesso ai documenti al momento della query. Non cambia il modello, gli dai più contesto.

## Quando usare RAG

Usa RAG quando:
- I tuoi dati cambiano spesso (politiche, prezzi, prodotti)
- Vuoi citare le fonti
- Vuoi controllare cosa il modello "sa"
- Hai meno di 10.000 documenti

Esempio: un chatbot che risponde su prodotti di un e-commerce. I prodotti cambiano ogni settimana. RAG vince a mani basse.

## Quando usare fine-tuning

Usa fine-tuning quando:
- Vuoi insegnare uno **stile** specifico (es. tono di voce del brand)
- Vuoi insegnare un **formato** strutturato (es. estrarre dati da contratti)
- Hai migliaia di esempi input → output
- Le risposte non dipendono da informazioni che cambiano

Esempio: un classificatore di sentiment su recensioni in italiano. Fine-tuning di un modello piccolo (es. Mistral 7B) è imbattibile per costo e latenza.

## La matrice di decisione

| Cosa vuoi fare | RAG | Fine-tuning |
|---|---|---|
| Rispondere su documenti aziendali | ✅ | ❌ |
| Mantenere uno stile di scrittura | ⚠️ | ✅ |
| Estrarre dati strutturati | ⚠️ | ✅ |
| Knowledge base che cambia spesso | ✅ | ❌ |
| Latenza bassa, costi bassi | ⚠️ | ✅ |
| Citare le fonti | ✅ | ❌ |

## Cosa facciamo spesso: ibrido

I sistemi più potenti che abbiamo costruito usano **entrambi**:
1. Fine-tuning per insegnare il tono e il formato delle risposte
2. RAG per fornire i fatti aggiornati al momento della query

Il fine-tuning fa "parlare bene", RAG fa "dire la cosa giusta".

## Costi indicativi

- **RAG su 1.000 documenti**: 200€ setup + ~50€/mese
- **Fine-tuning di un modello 7B**: 500€-2.000€ una tantum
- **Sistema ibrido production-grade**: 5.000€-15.000€

## La regola pratica

Inizia sempre con RAG. È più veloce, più economico, più trasparente. Passa a fine-tuning solo quando hai un **problema specifico** che RAG non risolve — non perché "suona più cool".`,
        category: 'ai',
        author: 'Eey Aay',
        coverImage: '',
        published: true,
    },
    {
        slug: 'voice-ai-vs-call-center-roi-reale',
        title: 'Voice AI vs call center tradizionale: il ROI reale dopo 6 mesi',
        excerpt: 'Numeri di un cliente che ha sostituito il 60% delle chiamate inbound con un agente vocale AI. Cosa funziona, cosa no.',
        body: `## Il setup iniziale

Un cliente nostro nel settore servizi B2B aveva un call center inbound di 4 persone che gestiva ~800 chiamate/settimana. Il 70% delle chiamate erano routine: prendere appuntamenti, dare orari, verificare lo stato di un ordine.

Sei mesi fa abbiamo deployato un **agente vocale AI** che gestisce le chiamate ripetitive. Ecco i numeri reali.

## Numeri dopo 6 mesi

| Metrica | Prima | Dopo |
|---|---|---|
| Chiamate gestite dall'AI | 0% | 62% |
| Tempo medio di attesa | 4 min | 12 sec |
| Costo per chiamata | 2,30€ | 0,45€ |
| NPS | 6,8 | 7,2 |
| Costo mensile | 12.000€ | 7.800€ |

## Cosa funziona benissimo

- **Prendere appuntamenti**: l'AI legge il calendario, propone slot, conferma via SMS. Zero attriti.
- **Verificare info**: stato ordine, orari, indirizzi sedi. L'AI legge dal CRM in tempo reale.
- **Triage**: l'AI capisce in 30 secondi se serve un umano e fa l'handoff con contesto pre-caricato.
- **Disponibilità 24/7**: il 35% delle chiamate ora arriva fuori orario d'ufficio. Erano lead persi prima.

## Cosa NON funziona

- **Reclami emotivi**: se il cliente è arrabbiato, deve parlare con un umano. Subito.
- **Negoziazione di prezzo**: l'AI non chiude deal. Qualifica e passa.
- **Casi tecnici complessi**: oltre 2 livelli di profondità, l'AI passa a un tecnico umano.
- **Dialetti regionali stretti**: l'AI capisce italiano standard. Su dialetti molto regionali ci sono ancora errori del 5-8%.

## Stack tecnico

- **Voice-to-text**: Whisper (OpenAI) — multilingua, accurato
- **LLM**: GPT-4o-mini per la logica conversazionale
- **Text-to-voice**: ElevenLabs italiano — voce naturale, indistinguibile
- **Telefonia**: Twilio Voice
- **CRM**: integrazione bidirezionale con il loro Salesforce

Costo dell'infrastruttura: ~0,18€/chiamata di 5 minuti.

## Le 3 cose che faremmo diverse

1. **Misurare il "tasso di handoff intelligente" prima del NPS**. Quanti % di handoff sono fatti al momento giusto è più predittivo della soddisfazione finale.
2. **Fare A/B test sulla voce**. Voce maschile vs femminile vs androgina cambia il NPS del 8% in alcuni segmenti.
3. **Investire prima nella knowledge base**. Il bottleneck non è mai il modello — è la qualità dei dati a cui ha accesso.

## Quando ha senso per te

Voice AI ha ROI positivo se:
- Hai più di 200 chiamate/settimana ripetitive
- Il tuo costo per FTE in customer care è > 1.500€/mese
- Hai un CRM strutturato dove leggere i dati cliente

Sotto questi numeri, il setup non si ripaga. Sopra, di solito il break-even è a 3-4 mesi.`,
        category: 'ai',
        author: 'Eey Aay',
        coverImage: '',
        published: true,
    },
    {
        slug: 'automazione-crm-integrazione-prima-settimana',
        title: 'Integrazione CRM senza dolori: cosa fare la prima settimana',
        excerpt: 'La checklist che usiamo per evitare il 90% dei problemi nei progetti di integrazione CRM. Salva tempo, soldi e relazioni.',
        body: `## Perché tante integrazioni CRM falliscono

Su 10 progetti di integrazione CRM (HubSpot, Salesforce, Pipedrive, ecc.) che entrano in difficoltà, 9 hanno lo stesso pattern:

1. Nessuno ha mappato i dati prima di iniziare
2. Si è cominciato a costruire l'integrazione prima di pulire i dati esistenti
3. Non c'era una persona "responsabile" lato cliente

## La checklist della settimana 1

Prima di toccare codice, fai questi 7 step.

### 1. Inventario delle fonti dati

Lista TUTTI i sistemi che contengono dati cliente:
- CRM principale
- Marketing automation (Mailchimp, ActiveCampaign)
- E-commerce (Shopify, WooCommerce)
- Helpdesk (Zendesk, Intercom)
- Fogli Excel "del commerciale" sul desktop
- Database custom legacy
- Form di contatto del sito

L'80% delle volte ce ne sono 2-3 che il cliente "si era dimenticato".

### 2. Mappa i campi

Per ogni fonte: che campi ha? Sono obbligatori? Come si chiamano? Esempio reale: \`telefono\` su Mailchimp era \`phone_number\` su HubSpot era \`tel\` sul vecchio Excel. Tutti contenevano la stessa cosa con format diversi.

### 3. Definisci la fonte di verità

Per ogni campo cliente, **una** fonte vince in caso di conflitto. Il CRM è quasi sempre la fonte di verità. Documentalo per iscritto.

### 4. Audit della qualità dei dati

Su un campione di 100 record nel CRM:
- Quanti hanno email valida?
- Quanti telefoni in formato E.164?
- Quanti duplicati?
- Quanti "test" / "asdfasdf" da pulire?

Se la qualità è sotto il 70%, **pulisci prima** di integrare. Garbage in, garbage out — moltiplicato per ogni sistema collegato.

### 5. Identifica il "campo chiave"

Cosa identifica univocamente un cliente? Email è la scelta più comune ma:
- Stesso cliente, 2 email diverse
- Stesso cliente B2B, email aziendale e personale
- Cliente persona vs azienda

Definisci la logica di matching prima di iniziare a sincronizzare.

### 6. Stabilisci i flussi di sync

Per ogni integrazione:
- **Direzione**: A→B, B→A, o bidirezionale?
- **Frequenza**: real-time, ogni ora, ogni notte?
- **Trigger**: cosa fa scattare l'aggiornamento?

Bidirezionale real-time suona figo ma è il 10x più complesso di "tutte le notti alle 3am". Spesso non serve.

### 7. Documenta lo "stato target"

Disegna un diagramma con: tutte le fonti dati, frecce per i flussi, frequenza, fonte di verità. Una pagina A4 è sufficiente. Senza questo, durante i bug tutti si daranno la colpa a vicenda.

## Cosa succede in settimana 2

Ora puoi cominciare a costruire. Senza i 7 step sopra, il 90% dei progetti finisce con un "ma perché HubSpot ha dati diversi da Salesforce?" che nessuno sa risolvere.

## La regola d'oro

Un'integrazione CRM è un progetto **dati**, non un progetto **codice**. Se passi il 70% del tempo a pulire e mappare i dati e il 30% a scrivere codice, sei sulla buona strada.`,
        category: 'automation',
        author: 'Eey Aay',
        coverImage: '',
        published: true,
    },
    {
        slug: 'rpa-vs-ai-agents-quando-usare-cosa',
        title: 'RPA vs AI agents: due strumenti per due problemi diversi',
        excerpt: 'L\'RPA non è morto, anzi. Ma sapere quando usare uno scrip RPA vs un agente AI fa la differenza tra un progetto che funziona e uno che esplode.',
        body: `## La narrativa sbagliata

"L'AI sostituisce l'RPA." No.

L'RPA e gli agenti AI risolvono problemi diversi. Confonderli costa decine di migliaia di euro in progetti fallimentari.

## RPA in due righe

**RPA (Robotic Process Automation)** automatizza task **strutturati e ripetitivi** che seguono regole deterministiche. Un bot RPA fa esattamente quello che gli dici, nel modo che gli dici, in millisecondi.

Esempio: ogni notte, prendi gli ordini dal CRM, formatta in CSV, caricali nel gestionale.

## Agente AI in due righe

Un **agente AI** prende decisioni basate su contesto, gestisce ambiguità, e può adattarsi a input mai visti prima.

Esempio: leggi una mail di un cliente, capisci se è una richiesta di preventivo o un reclamo, classifica e instrada.

## La matrice di decisione

| Caratteristica | RPA | AI Agent |
|---|---|---|
| Regole deterministiche | ✅ | ⚠️ |
| Dati strutturati | ✅ | ✅ |
| Dati non strutturati (testo libero) | ❌ | ✅ |
| Decisioni con ambiguità | ❌ | ✅ |
| Velocità di esecuzione | Velocissimo | Lento (secondi) |
| Costo per esecuzione | Quasi zero | $0.001-0.10 |
| Manutenibilità quando l'app cambia | Fragile | Robusto |
| Tracciabilità delle decisioni | Trasparente | Opaco |

## I 3 casi d'uso dove RPA vince ancora

1. **Riconciliazioni notturne**: prendere dati da 3 sistemi, fare un controllo numerico, segnalare le discrepanze. Veloce, deterministico, perfetto.

2. **Bulk update**: aggiornare 10.000 record nel CRM con dati da un Excel. RPA in 5 minuti, AI in 50.

3. **Workflow di approval strutturati**: timesheet, ferie, expense report. Se il flusso è 100% prevedibile, RPA è 100x più affidabile dell'AI.

## I 3 casi d'uso dove AI agent vince

1. **Classificazione di email entranti**: capire se una mail è un reclamo, una richiesta di info, un ordine. RPA non può.

2. **Estrazione di dati da documenti non standardizzati**: fatture PDF di 50 fornitori diversi, ognuna con un layout diverso. AI è imbattibile.

3. **Customer support di primo livello**: rispondere a "come faccio a resettare la password" senza un albero di FAQ predefinito.

## La combinazione vincente

I sistemi più affidabili che abbiamo costruito usano **entrambi**:

\`\`\`
Email in arrivo →
  AI Agent (classifica) →
    Se è "ordine" → RPA (inserisce nel gestionale)
    Se è "reclamo" → escalation umana con riassunto AI
    Se è "info" → AI risponde con RAG sulla KB
\`\`\`

L'AI fa il **giudizio**, RPA fa l'**esecuzione**. Ognuno per quello che sa fare meglio.

## La domanda da farsi

Per ogni task che vuoi automatizzare, chiediti:
- "Una persona nuova, con un manuale di 1 pagina, può fare questo?" → **RPA**
- "Servono giudizio, esperienza, leggere tra le righe?" → **AI**

Se la risposta è "tutti e due", probabilmente è un workflow ibrido. Ed è dove ci divertiamo di più.`,
        category: 'automation',
        author: 'Eey Aay',
        coverImage: '',
        published: true,
    },
    {
        slug: 'email-marketing-automation-2026-cosa-funziona',
        title: 'Email marketing automation nel 2026: cosa funziona davvero',
        excerpt: 'Dopo 200+ campagne, ecco i 7 pattern che ancora generano ROI nel 2026. E i 5 che dovresti smettere di fare oggi.',
        body: `## L'email non è morta. Le tue automazioni sì.

Nel 2026, l'email rimane il canale con il **miglior ROI** (33:1 in media per il B2B). Ma le automazioni standard che andavano nel 2020 oggi vengono ignorate. Vediamo perché.

## I 5 pattern da smettere oggi

1. **"Benvenuto!" email statica**. Tutti la mandano. Nessuno la legge. Il tasso di apertura medio è crollato dal 47% nel 2020 al 28% nel 2026.

2. **Newsletter mensile generica**. Una volta al mese, tutti gli stessi argomenti, lista non segmentata. Disiscrizione rate alta, conversione zero.

3. **Drip sequence di 14 email**. Le sequenze lunghe funzionavano quando l'email era novità. Oggi le persone si stancano al 4°.

4. **Soggetti con emoji 🚀💥🎯**. Vengono filtrati come spam dal 2024. Tasso di apertura -30% rispetto a soggetti puliti.

5. **"Hai abbandonato il carrello!" con discount immediato**. Educa i clienti ad abbandonare il carrello per ottenere lo sconto. Erode il margine.

## I 7 pattern che ancora funzionano

### 1. Trigger basati su comportamento, non su tempo

Mandare dopo 3 giorni dalla registrazione è obsoleto. Mandare dopo che ha visitato 3 volte la pagina prezzi senza convertire è gold.

### 2. Email "1-to-1 looking"

Niente template HTML pesante. Una mail in plain text dal CEO o dal commerciale, scritta come se fosse personale, batte qualsiasi grafica del 5-10x in conversione B2B.

### 3. Segmentazione su intent, non su demographics

Non "donne 30-45 in Lombardia". Sì "ha visitato la pagina pricing 2 volte nelle ultime 48 ore".

### 4. Email di nurture asincroni, brevissimi

Una mail = una idea = un'azione. Massimo 100 parole. CTA chiara. Niente fronzoli.

### 5. Re-engagement con valore vero

"Ci manchi" non funziona. "Ecco i 3 articoli più letti questo mese" funziona se ha contesto.

### 6. Personalizzazione AI sull'oggetto

Generare l'oggetto in modo dinamico via AI in base a: ultima pagina vista + interest score + segmento. Tasso di apertura +18% medio nei nostri test.

### 7. A/B test continuo

Non un test ogni 6 mesi. Ogni campagna deve avere almeno 2 varianti su soggetto o CTA. Senza A/B test sistematico, voli alla cieca.

## Lo stack pratico

Per una PMI italiana 2026:
- **Tool**: ActiveCampaign, Mailchimp, o HubSpot
- **Deliverability**: SPF + DKIM + DMARC configurati correttamente (l'80% dei brand sbaglia questo)
- **Tracking**: link tracking + UTM strutturati
- **Segmentation engine**: il tuo CRM o una customer data platform light

Costi tipici: 50€ - 300€/mese di tool, ROI tipico 15-30x sul costo.

## La metrica che conta

Smetti di misurare il tasso di apertura. È una vanity metric ormai inquinata da iOS Mail Privacy.

Misura:
1. **Click-through rate** (CTR)
2. **Conversione attribuita** (con UTM)
3. **Revenue per email inviata**

Se non hai questi tre numeri per ogni campagna, stai facendo email marketing al buio.

## Il setup minimo che ha sempre senso

Per un'azienda B2B che parte da zero, queste 4 automazioni hanno ROI positivo nell'80% dei casi:

1. **Welcome email + 3 follow-up** brevi (giorno 1, 3, 7)
2. **Trigger su pagina prezzi visitata** 2+ volte
3. **Re-engagement** dopo 60 giorni di silenzio
4. **Quarterly value email** dal CEO

Tutto il resto è opzionale finché questi quattro non sono ottimizzati.`,
        category: 'automation',
        author: 'Eey Aay',
        coverImage: '',
        published: true,
    },
    {
        slug: 'seo-italia-2026-come-cambia',
        title: 'SEO in Italia 2026: come cambia con la Generative Search',
        excerpt: 'Google AI Overviews ha cambiato le regole. Cosa devi fare oggi se vuoi visibilità nel 2026 e oltre.',
        body: `## Il contesto: cosa è successo

Da fine 2024, Google mostra **AI Overviews** (riassunti generati dall'AI in cima ai risultati) per oltre il 40% delle query informazionali in Italia. Risultato: il CTR organico medio è sceso dal 32% al 18% per le query informative.

Ma — e questo è il punto — i siti che si **adattano** stanno guadagnando traffico, non perdendolo. Vediamo perché.

## Le 3 nuove regole del 2026

### 1. Citation > Rank

Non basta più essere in prima posizione. Devi essere **citato** dentro l'AI Overview. La citazione genera click anche se non sei in prima posizione tradizionale.

Come ottenerla:
- Risposte dirette nei primi 100 caratteri di ogni paragrafo
- Heading H2/H3 che sembrano domande naturali
- Fonti citate, dati concreti, numeri

### 2. Topical Authority > Keyword Density

Google ora valuta se sei un'**autorità sul topic** valutando l'insieme dei contenuti. 50 articoli superficiali su 50 topic battono nettamente 10 articoli profondi su un singolo topic.

Strategia: scegli 3-5 topic core e copri ogni angolatura. Non disperdere.

### 3. E-E-A-T raddoppiato

Experience, Expertise, Authoritativeness, Trustworthiness. Google premia:
- Autori reali con bio + foto + link LinkedIn
- Aggiornamenti datati e visibili
- Citazioni a fonti autorevoli
- Brand mentions su altri siti (anche senza link)

## Cosa fare oggi

### Per pagine esistenti

1. **Audit**: identifica le top 20 pagine che generavano traffico nel 2023. Quante hanno perso il 50%+? Quelle vanno rifatte con i nuovi pattern.

2. **Riscrivi gli H2**: trasformali in domande naturali. "Caratteristiche del prodotto" → "Quali sono le caratteristiche di [prodotto]?"

3. **Aggiungi schema.org**: FAQ schema, Article schema, breadcrumb. È letteralmente gratis e aumenta la chance di citazione AI del 20-30%.

4. **Datalo**: aggiungi data di ultimo aggiornamento visibile. Google e gli LLM la usano per decidere se citare.

### Per nuovi contenuti

1. **Pillar pages**: per ogni topic core, fai una pagina lunga (3.000-5.000 parole) che copra tutto, poi articoli satelliti che linkano.

2. **Personal voice**: scrivi in prima persona ("nel nostro caso", "abbiamo notato che..."). Gli LLM citano contenuti con voce personale 2-3x più spesso.

3. **Numeri concreti**: "+34% conversione" batte "molto di più". Sempre.

4. **Niente AI puro**: contenuti scritti 100% da AI senza human-edit hanno performance scarsa. Edit umano è obbligatorio.

## La SEO locale è ancora oro

Per le PMI italiane, **Google Maps + SEO locale** è il canale più sottovalutato. AI Overviews tocca poco le query locali ("dentista milano", "ristorante torino centro"), quindi il CTR è rimasto stabile.

Investi su:
- Google Business Profile completo al 100%
- Recensioni recenti (>4.5 stelle, >50 totali)
- Citazioni NAP consistenti
- Foto fresche ogni mese

ROI tipico: 1.500€ di lavoro iniziale + 200€/mese, payback in 60-90 giorni per servizi locali.

## Quello che NON funziona più

- Link building massiccio da blog network → punito
- Keyword stuffing → ignorato
- Pagine "AI-generated" pure → declassate
- Backlink da siti non in tema → zero peso

## Il piano di 90 giorni

Mese 1: audit + technical SEO + schema.org su pagine esistenti
Mese 2: riscrittura top 10 pagine con i nuovi pattern + 4 nuovi articoli pillar
Mese 3: link building strategico (relazioni reali, non network) + Google Business Profile push

Il risultato medio dopo 90 giorni nei nostri progetti: **+40% traffico qualificato** rispetto al baseline, anche con AI Overviews attivi.`,
        category: 'growth',
        author: 'Eey Aay',
        coverImage: '',
        published: true,
    },
    {
        slug: 'ecommerce-conversion-rate-quattro-cose-davvero-importanti',
        title: 'Conversion rate e-commerce: le 4 cose che muovono davvero il fatturato',
        excerpt: 'Dopo aver ottimizzato 30+ store italiani, ecco i 4 leverage che cambiano il fatturato del 20-50%. Spoiler: non è il colore del bottone CTA.',
        body: `## La verità scomoda dell'e-commerce italiano

La media del conversion rate per e-commerce italiani nel 2026 è **1,9%**. I top performer stanno tra il 3,5% e il 5%.

La differenza non è il template Shopify. È queste 4 cose, in ordine di impatto.

## 1. Velocità della pagina prodotto (impatto: +15-25%)

Ogni 100ms di Largest Contentful Paint costano l'1,2% di conversione. Sul mobile è ancora peggio.

Test reale: un nostro cliente ha portato la pagina prodotto da 3,2s LCP a 1,4s. Risultato: **+22% conversion rate** in 30 giorni, senza toccare nessun altro elemento.

Come fare:
- Immagini in WebP/AVIF, lazy loading aggressivo
- Niente JS bloccante sopra la fold
- CDN per gli asset statici
- Server-side render delle pagine prodotto
- Defer di tutti i pixel di tracking non critici

## 2. Trust signals sopra la fold (impatto: +10-20%)

I clienti italiani sono **diffidenti**. Più del retail nordico, più dello statunitense.

Cose che funzionano:
- Recensioni reali e datate, non i 5 stelle generici
- "Reso gratuito entro 30 giorni" visibile, non nascosto nel footer
- Numero di telefono italiano vero (anche se mostri il prefisso)
- Foto del team in About / Chi siamo
- Logo dei partner / pagamenti accettati subito visibili

Test: aggiungere "Spedizione gratuita sopra 49€" sopra il bottone "Aggiungi al carrello" sui prodotti < 49€ → +14% conversione.

## 3. Checkout in 1 schermata (impatto: +20-30%)

Il checkout standard di Shopify / WooCommerce ha 4-5 step. Il tuo competitor migliore ne ha 1.

Ottimizzazioni:
- Express checkout (Apple Pay, Google Pay) come prima opzione
- Indirizzo auto-completato (Google Places API)
- Validazione live, non on-submit
- Mostra il totale finale dall'inizio (no sorprese spese di spedizione)
- Offri checkout come guest sempre

Un cliente nostro ha fatto checkout in 1 schermata + Apple Pay first → **+28% completion rate**.

## 4. Recupero carrello abbandonato (impatto: +5-15% revenue totale)

Il 70% dei carrelli viene abbandonato. Anche solo recuperarne il 10% è enorme.

Sequenza che funziona:
- **30 min dopo**: email + WhatsApp con link diretto al carrello, foto del prodotto, niente sconto
- **24 ore dopo**: email con social proof ("X clienti hanno comprato questo questa settimana")
- **3 giorni dopo**: email con sconto del 10% (solo se sopra una certa soglia)
- **7 giorni dopo**: ultima email di "remarketing storia del prodotto"

Funziona meglio del classico "10% subito" perché non educa i clienti ad abbandonare.

## Quello su cui NON perdere tempo

- **Colore del bottone CTA**: il 99% dei casi è marginale (<1% di impatto)
- **Posizione esatta del bottone "aggiungi al carrello"**: marginale
- **Pop-up del 10% di sconto**: convertono male, peggiorano il brand
- **Chat live "Ciao posso aiutarti?"**: irritante per il 70% degli utenti

## La regola pratica

Fai i test in quest'ordine. Se non hai ottimizzato 1, 2, 3, 4, non perdere tempo sull'ottimizzazione del colore del bottone.

Per una PMI italiana che vende online tra 50k€ e 500k€/anno, queste 4 cose insieme portano in media **+35% di fatturato** in 60-90 giorni. Senza spendere un euro in più di acquisition.`,
        category: 'growth',
        author: 'Eey Aay',
        coverImage: '',
        published: true,
    },
    {
        slug: 'machine-learning-pmi-quando-ha-senso',
        title: 'Machine Learning per la PMI: quando ha davvero senso',
        excerpt: 'ML non è solo per Google. Ma neanche per ogni azienda. Ecco quando un modello custom ha ROI reale per una PMI italiana — e quando è solo hype.',
        body: `## La promessa e la realtà

"Useremo il machine learning per ottimizzare X". Quante volte hai sentito questa frase senza poi vedere risultati?

Il ML per PMI funziona, ma solo in casi specifici. Vediamo quali.

## I 3 casi dove ML ha sempre ROI

### 1. Forecasting della domanda

Hai dati storici di vendite per SKU? Un modello ML semplice (anche un Prophet di Meta o un XGBoost) batte il foglio Excel del responsabile vendite del 15-30% mediamente.

Costo: setup 3.000-8.000€, mantenimento bassissimo. Payback tipico 2-4 mesi.

### 2. Prediction del churn cliente

Se hai abbonamenti o ricorrenze, identificare i clienti che stanno per andare via 60 giorni prima ti permette di intervenire. Tasso di retention recuperato: 15-40%.

Funziona se hai almeno 500 clienti e 6 mesi di storia.

### 3. Pricing dinamico

Per e-commerce con > 100 SKU e variabilità di domanda, modelli che ottimizzano prezzo per SKU per momento aumentano il margine del 5-12%.

Funziona solo con volumi e infrastruttura adeguata.

## I 3 casi dove ML è hype puro per la PMI

### 1. "Customer segmentation con ML"

Quasi sempre puoi fare segmentazione con RFM analysis in Excel in mezza giornata. Il ML porta marginale.

### 2. "Recommendation engine"

Per cataloghi sotto 200 prodotti, le regole hard-coded ("chi compra X probabilmente vuole Y") battono i modelli. Sopra 1.000 prodotti diventa interessante.

### 3. "Sentiment analysis sulle recensioni"

Se hai 50 recensioni al mese, leggile a mano. Un modello ML qui è sproporzionato. Sopra 500/mese, ha senso.

## La regola dei tre dati

Per giudicare se ML ha senso, controlla:

1. **Volume**: hai abbastanza dati? Sotto le 1.000 osservazioni, ML quasi sempre perde contro regole semplici.

2. **Variabilità**: i dati cambiano nel tempo? Se ogni cliente è uguale agli altri, ML non aggiunge nulla.

3. **Impatto**: l'azione che prendi cambia abbastanza? Se la previsione di churn ti fa risparmiare 10€ per cliente, non vale 20.000€ di setup.

Se i 3 non sono soddisfatti, regole semplici battono sempre il ML in produzione.

## Cosa NON è ML che molti chiamano ML

- **Una formula di Excel complessa** → non è ML
- **"Quando vendi X manda Y email"** → non è ML, è una regola
- **Dashboard con grafici colorati** → BI, non ML
- **Chatbot con risposte preimpostate** → non è ML

ML implica un modello statistico che impara da dati. Niente impari = niente ML.

## Lo stack pragmatico per PMI

Se vuoi davvero iniziare con ML:

- **Tool**: Python + scikit-learn (gratuito, ben documentato)
- **Modelli da provare per primi**: regressione logistica, random forest, XGBoost
- **NO deep learning** per la PMI sotto i 100.000 record. Overkill.
- **Hosting modello**: cloud function (AWS Lambda, GCP Cloud Run). Sotto 100€/mese.
- **Monitoring**: tracking di model drift basilare ma essenziale

## Quanto costa davvero

Un progetto ML "fatto bene" per una PMI italiana costa tipicamente:

- **Discovery + audit dati**: 2.000-4.000€
- **Sviluppo modello v1**: 5.000-15.000€
- **Integrazione in produzione**: 3.000-8.000€
- **Mantenimento mensile**: 200-800€

Totale anno 1: 10.000-30.000€. ROI atteso, se le 3 condizioni sono rispettate: 3-10x.

## La domanda da farti prima

Prima di chiamare "il consulente ML", chiediti:

> "Se domani avessi la previsione perfetta su questo, cosa farei diverso?"

Se la risposta è vaga, non ti serve ML. Ti serve prima chiarezza sul processo decisionale.`,
        category: 'growth',
        author: 'Eey Aay',
        coverImage: '',
        published: true,
    },
]

interface Args {
    dryRun: boolean
    force: boolean
}

function parseArgs(argv: string[]): Args {
    const args: Args = {dryRun: false, force: false}
    for (const a of argv) {
        if (a === '--dry-run') args.dryRun = true
        else if (a === '--force') args.force = true
    }
    return args
}

async function main() {
    const args = parseArgs(process.argv.slice(2))

    const url = process.env.SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) {
        console.error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required.')
        process.exit(1)
    }
    const client = createClient(url, key, {auth: {persistSession: false, autoRefreshToken: false}})

    console.log(`Seeding ${POSTS.length} blog posts into ${url}${args.dryRun ? ' (DRY RUN)' : ''}\n`)

    let inserted = 0
    let skipped = 0
    let replaced = 0
    let failed = 0

    for (const post of POSTS) {
        const {data: existing} = await client.from('posts').select('id').eq('slug', post.slug).maybeSingle()
        if (existing) {
            if (!args.force) {
                console.log(`  skip   ${post.slug} (exists)`)
                skipped++
                continue
            }
            if (args.dryRun) {
                console.log(`  would replace  ${post.slug}`)
                continue
            }
            const {error: delErr} = await client.from('posts').delete().eq('slug', post.slug)
            if (delErr) {
                console.log(`  FAIL   ${post.slug}: could not delete existing — ${delErr.message}`)
                failed++
                continue
            }
        }

        if (args.dryRun) {
            console.log(`  would insert  ${post.slug}  (${post.title.length} char title)`)
            continue
        }

        const now = new Date().toISOString()
        const {data, error} = await client.from('posts').insert({
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            body: post.body,
            category: post.category,
            author: post.author,
            cover_image: post.coverImage || null,
            published: post.published,
            published_at: post.published ? now : null,
        }).select('id').single()

        if (error || !data) {
            console.log(`  FAIL   ${post.slug}: ${error?.message || 'no data'}`)
            failed++
        } else {
            console.log(`  ok    ${post.slug}  → id=${data.id.slice(0, 8)}…`)
            if (existing) replaced++
            else inserted++
        }
    }

    console.log(`\nDone. inserted=${inserted} replaced=${replaced} skipped=${skipped} failed=${failed}`)
    if (failed > 0) process.exit(2)
}

main().catch(err => { console.error(err); process.exit(1) })
