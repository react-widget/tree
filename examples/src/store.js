import Store from 'simple-tree-store';
import data from './city';


export default new Store(data, {
	idField: 'label'	
})