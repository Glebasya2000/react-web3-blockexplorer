import React from "react";
import { hot } from "react-hot-loader";
import { Grid } from "semantic-ui-react";
import { Route, withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import BlocksComponent from "./BlocksComponent";
import BlockInfoComponent from "./BlockInfoComponent";
import TransactionsComponent from "./TransactionsComponent";
import TransactionInfoComponent from "./TransactionInfoComponent";

const App = () => (
  <>
    <Helmet>
      <title>REACT-WEB3-BLOCKEXPLORER</title>
    </Helmet>
    <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
      <Grid.Row>
        <BlocksComponent />
      </Grid.Row>
    </Grid>
    <Grid column="equal">
      <Grid.Row>
        <Route
          path="/:block"
          render={props => (
            <>
              <Grid.Column width={6}>
                <BlockInfoComponent {...props} />
              </Grid.Column>
              <Grid.Column width={5}>
                <TransactionsComponent {...props} />
              </Grid.Column>
            </>
          )}
        />
        <Grid.Column width={5}>
          <Route
            path="/:block/:transaction"
            component={TransactionInfoComponent}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </>
);

export default hot(module)(withRouter(App)); //eslint-disable-line
