import { setUI } from '../../app/controllers/Homepages/fnc_Homepage.js';
import event from '../../app/controllers/Homepages/event_Homepage.js';
import { getProduct } from './api.js';

const app = async () => {
    const data = await getProduct();
    await setUI(data);
    event(data);
};

app();
