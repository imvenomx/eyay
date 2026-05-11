export interface SiteStat {
    value: number
    suffix: string
    labelKey: string // key in language-context translations
}

// Edit these once and they propagate to the homepage stats section.
export const SITE_STATS: SiteStat[] = [
    {value: 150, suffix: '+', labelKey: 'stats.projects'},
    {value: 50, suffix: '+', labelKey: 'stats.models'},
    {value: 10, suffix: 'K+', labelKey: 'stats.hours'},
    {value: 98, suffix: '%', labelKey: 'stats.retention'},
]
