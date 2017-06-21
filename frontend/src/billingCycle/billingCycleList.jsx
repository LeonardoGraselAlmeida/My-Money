import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getList, showUpdate, showDelete } from './billingCycleActions'

import IconButton from '../common/widget/iconButton'

class BillingCycleList extends Component {
    componentWillMount() {
        this.props.getList()
    }

    renderRows() {
        const list = this.props.list || []
        return list.map(e => (
            <tr key={e._id}>
                <td>{e.name}</td>
                <td>{e.month}</td>
                <td>{e.year}</td>
                <td>
                    <IconButton btn={'warning'} onClick={() => this.props.showUpdate(e)} icon={'pencil'} />
                    <IconButton btn={'danger'} onClick={() => this.props.showDelete(e)} icon={'trash-o'} />
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Mês</th>
                            <th>Ano</th>
                            <th className="table-actions">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({ list: state.billingCycle.list })
const mapDispatchToProps = dispatch => bindActionCreators({ getList, showUpdate, showDelete }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleList)