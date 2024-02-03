export const postCalls = async (data: FormData, url: string) => {
    return new Promise(async(Resolve, Reject) => {
        let res = await fetch(url, {
            method: 'POST',
            body: data
        })
        if (res.ok) {
            Resolve(await res.json());
        }
        else Reject(new Error("something wrong"));
    })
}