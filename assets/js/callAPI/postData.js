export async function PostProduct(product) {
    const url = 'https://64a28223b45881cc0ae540aa.mockapi.io/ProductsList';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
