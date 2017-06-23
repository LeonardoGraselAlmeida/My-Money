import React from 'react';

import Row from '../layout/row'
import ValueBox from './valueBox'

export default ({ credit, debt }) => (
    <Row>
        <ValueBox cols='12 4' color='green' icon='bank' value={`R$ ${credit}`} text='Total de Créditos' />
        <ValueBox cols='12 4' color='red' icon='credit-card' value={`R$ ${debt}`} text='Total de Débitos' />
        <ValueBox cols='12 4' color='blue' icon='money' value={`R$ ${credit - debt}`} text='Total Consolidado' />
    </Row>
)
