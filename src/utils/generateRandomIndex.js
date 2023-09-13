
//принимает 2 аргумента - ключ и значение
// export function assoc<K extends string, T>(key: K, value: T) {
//     // возвращает фун-цию
//     return <O extends object>(obj: O) => ({
//         //дкструкция object-а
//         ...obj,
//         [key]: value,
//         // если K (ключ) расширяет О (т.е. если ключ там уже был)
//     }) as K extends keyof O ? (Omit<O, K> & Record<K, T>) : (O & Record<K, T>)
// }

function assoc(key, value) {
    return function(obj) {
        if (key in obj) {
            return obj;
        } else {
            return {
                ...obj,
                [key]: value(),
            };
        }
    }
}

export const generateRandomString = () => Math.random().toString(36).substring(2, 15);
export const assignId = assoc('id', generateRandomString);
