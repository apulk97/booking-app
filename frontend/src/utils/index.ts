export const getInitialSearchValues = (key:string, defaultVal: number | string) => {
    if(sessionStorage.getItem('search')) {
        return JSON.parse(sessionStorage.getItem('search') ?? '')[key]
    }
    return defaultVal
}