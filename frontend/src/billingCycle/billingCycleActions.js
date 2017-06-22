import axios from 'axios'
import {
    toastr
} from 'react-redux-toastr'
import {
    reset as resetForm,
    initialize
} from 'redux-form'
import {
    showTabs,
    selectTab
} from '../common/tab/tabActions'
import consts from '../consts'

const INITIAL_VALUES = {
    credits: [{}],
    debts: [{}]
}

export function getList() {
    const request = axios.get(`${consts.API_URL}/billingCycles`);
    return {
        type: 'BILLING_CYCLES_FETCHED',
        payload: request
    }
}

export function create(values) {
    return submit(values, 'post')
}

export function update(values) {
    return submit(values, 'put')
}

export function remove(values) {
    return submit(values, 'delete')
}

function submit(values, method) {
    return dispatch => {
        const id = values._id ? values._id : '';
        axios[method](`${consts.API_URL}/billingCycles/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada Com Sucesso.');
                dispatch(init());
            }).catch(error => {
                error.response.data.errors.forEach(e => {
                    toastr.error('Erro', e)
                });
            })
    }
}

export function showUpdate(billingCycle) {
    return showTab('Update', billingCycle)
}

export function showDelete(billingCycle) {
    return showTab('Delete', billingCycle)
}

function showTab(tab, billingCycle) {
    return [
        showTabs(`tab${tab}`),
        selectTab(`tab${tab}`),
        initialize('billingCycleForm', billingCycle)
    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('billingCycleForm', INITIAL_VALUES)
    ]
}