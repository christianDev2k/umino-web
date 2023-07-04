const url = 'https://64a28223b45881cc0ae540aa.mockapi.io/ProductsList/';

export const postProduct = async product => {
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const putProduct = async (product, id) => {
    await fetch(url + id, {
        method: 'PUT',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const deleteProduct = async id => {
    await fetch(url + id, {
        method: 'DELETE',
    });
};

export const getProduct = async () => {
    const res = await fetch(url);
    const listData = await res.json();
    return listData;
};
