import React from 'react'
import { Grid, Placeholder, Segment } from 'semantic-ui-react'

const Searchplaceholder = () => (
    <Grid.Column width="4" >
      <Segment raised>
        <Placeholder>
          <Placeholder.Header image>
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Paragraph>
            <Placeholder.Line length='medium' />
            <Placeholder.Line length='short' />
            <Placeholder.Line length='long'/>
            <Placeholder.Line length='very long' />
            <Placeholder.Line length='short' />

          </Placeholder.Paragraph>
        </Placeholder>
      </Segment>
      </Grid.Column>
)

export default Searchplaceholder
