import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'

import LabelAndInput from '../common/form/labelAndInput'
import { init } from './billingCycleActions'
import ItemList from "./itemList";
import SummaryList from './summaryList'

class BillingCycleForm extends Component {
	calculateSummary() {
		const sum = (t, v) => t + v
		return {
			sumOfCredits: this.props.credits.map(c => +c.value || 0).reduce(sum),
			sumOfDebts: this.props.debts.map(d => +d.value || 0).reduce(sum),
		}
	}
	render() {
		const { handleSubmit, readOnly, credits, debts } = this.props;
		const { sumOfDebts, sumOfCredits } = this.calculateSummary();
		return (
			<form role='form' onSubmit={handleSubmit}>
				<div className='box-body'>
					<Field name='name' component={LabelAndInput} readOnly={this.props.readOnly}
						label='Nome' cols='12 4' placeholder='Informe o nome' required={true}
						maxLength={30} />
					<Field name='month' component={LabelAndInput} type='number'
						readOnly={this.props.readOnly} required={true} label='Mês' cols='12 4'
						placeholder='Informe o mês' min={1} max={12} />
					<Field name='year' component={LabelAndInput} type='number'
						readOnly={this.props.readOnly} required={true} label='Ano' cols='12 4'
						placeholder='Informe o ano' min={1970} max={2100} />
					<SummaryList credit={sumOfCredits} debt={sumOfDebts} />
					<ItemList cols="12 6" readOnly={this.props.readOnly} list={credits} field="credits" legend="Créditos" />
					<ItemList cols="12 6" showStatus={true} readOnly={this.props.readOnly} list={debts} field="debts" legend="Débitos" />
				</div>
				<div className='box-footer'>
					<button type='submit' className={`btn btn-${this.props.submitClass}`}>{this.props.submitLabel}</button>
					<button type='button' className='btn btn-default' onClick={this.props.init}>Cancelar</button>
				</div>
			</form>
		)
	}
}

BillingCycleForm = reduxForm({ form: 'billingCycleForm', destroyOnUnmount: false })(BillingCycleForm);
const selector = formValueSelector('billingCycleForm');

const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch);
const mapStateToProps = state => ({ credits: selector(state, 'credits'), debts: selector(state, 'debts') });

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm)