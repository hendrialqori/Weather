export const Format = d => {
    const date = new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    }).format(d)
}