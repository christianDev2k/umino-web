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
    const res = await fetch(url + id, {
        method: 'PUT',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    return data;
};

export const deleteProduct = async id => {
    const res = await fetch(url + id, {
        method: 'DELETE',
    });
    const data = await res.json();
    return data;
};

export const getProduct = async (id = '') => {
    const res = await fetch(url + id);
    const data = await res.json();
    return data;
};
