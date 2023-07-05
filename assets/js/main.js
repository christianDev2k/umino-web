import * as f from '../../assets/js/handleFunction.js';
import event from '../../app/controllers/eventFunc.js';
import * as api from './call_API.js'

const data = await api.getProduct();
f.RenderDataList(data);
event();
