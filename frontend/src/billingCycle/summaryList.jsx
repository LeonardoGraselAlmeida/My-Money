import React from 'react';

import Grid from '../common/layout/grid'
import Summary from '../common/widget/summary'


export default ({ credit, debt }) => (

    <Grid>
        <fieldset>
            <legend>Resumo</legend>
            <Summary credit={credit} debt={debt} />
        </fieldset>
    </Grid>

)