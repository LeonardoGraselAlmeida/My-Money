import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { init, create, update, remove} from './billingCycleActions'

import BillingCycleList from './billingCycleList'
import BillingCycleForm from './BillingCycleForm'
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Tabs from '../common/tab/tabs'
import TabsHeader from '../common/tab/tabsHeader'
import TabsContent from '../common/tab/tabsContent'
import TabHeader from '../common/tab/tabHeader'
import TabContent from '../common/tab/tabContent'

class BillingCycle extends Component {
    componentWillMount() {
        this.props.init()
    }

    render() {
        return (
            <div>
                <ContentHeader title='Ciclo de Pagamento' subTitle='Cadastro' />
                <Content >
                    <Tabs>
                        <TabsHeader>
                            <TabHeader label='Listar' icon='bars' target='tabList' />
                            <TabHeader label='Incluir' icon='plus' target='tabCreate' />
                            <TabHeader label='Alterar' icon='pencil' target='tabUpdate' />
                            <TabHeader label='Excluir' icon='trash-o' target='tabDelete' />
                        </TabsHeader>
                        <TabsContent>
                            <TabContent id='tabList'>
                                <BillingCycleList/>
                            </TabContent>
                            <TabContent id='tabCreate'>
                                <BillingCycleForm submitClass='primary' submitLabel="Incluir" onSubmit={this.props.create} />
                            </TabContent>
                            <TabContent id='tabUpdate'>
                                 <BillingCycleForm submitClass='success' submitLabel="Salvar" onSubmit={this.props.update} />
                            </TabContent>
                            <TabContent id='tabDelete'>
                                <BillingCycleForm submitClass='danger' submitLabel="Excluir" onSubmit={this.props.remove} readOnly={true}/>
                            </TabContent>
                        </TabsContent>
                    </Tabs>
                </Content>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ init, create, update, remove}, dispatch)
export default connect(null, mapDispatchToProps)(BillingCycle)