export type TContent = {
    title: string,
    description: string,
    price: number,
    rating: number,
    category: string,
    brand: string,
    thumbnail: string,
    images: string[],
    id: number,
};

export type TComments = {
    id?: number | string,
    body: string,
    postId: number,
    user: {
        id?: number,
        username: string,
    },
};
