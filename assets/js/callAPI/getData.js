const data = async() => {
    const url = 'https://64a28223b45881cc0ae540aa.mockapi.io/ProductsList';
    const response = await fetch(url);
    const data = await response.json();  
    return data;
}
export default data;