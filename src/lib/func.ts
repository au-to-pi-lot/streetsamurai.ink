const id = <T, >(x: T): T => x;


const range = (length: number): number[] => [...Array(length).keys()];

function objMap<A, B>(
    obj: Record<string, A>,
    keyfunc: (
        key: string,
        value: A,
        index: number,
        obj: Record<string, A>
    ) => string
        = (key) => key,
    valuefunc: (
        key: string,
        value: A,
        index: number,
        obj: Record<string, A>
    ) => B
        = (_key, value) => value as undefined as B,
): Record<string, B> {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value], index: number) => {
            const newKey: string = keyfunc(key, value, index, obj);
            const newVal: B = valuefunc(key, value, index, obj)
            return [newKey, newVal]
        }
    ))
}

export {id, objMap};
