import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const namespaced = true;

const state = {
	mobile: false,
	network: "offline"
};

export default {
	namespaced,
	state,
	actions,
	getters,
	mutations
};
