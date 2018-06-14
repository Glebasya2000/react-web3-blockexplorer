import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment, Header, Table, Image } from "semantic-ui-react";
import blockies from "ethereum-blockies-png";
import { getBlock } from "../actions/blocks";

const blockProps = [
  "Hash:",
  "Difficulty:",
  "Miner:",
  "Uncles:",
  "GasLimit:",
  "GasUsage:",
  "Time:",
  "Size:",
  "Extra:",
];

// Component which shows block information
class BlockInfoComponent extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.props.getBlock(this.props.match.params.block);
    this.state.loading = false;
  }

  componentWillUpdate({ match }) {
    const { block, match: prevMatch } = this.props;
    if (!block || prevMatch.params.block !== match.params.block) {
      this.state.loading = true;
    } else {
      this.state.loading = false;
    }
  }

  componentDidUpdate() {
    const { getBlock, match } = this.props;
    if (this.state.loading) {
      getBlock(match.params.block);
    }
  }

  render() {
    const { block } = this.props;
    return (
      <>
        <Segment
          loading={this.state.loading}
          style={{ overflow: "auto", maxHeight: 550 }}
        >
          <Header as="h2" textAlign="center">
            {block ? (
              <>
                <Image
                  inline
                  rounded
                  src={blockies.createDataURL({ seed: block.hash })}
                />
                Block #{block.number}
              </>
            ) : null}
          </Header>
          <Table compact size="small">
            <Table.Body>
              {Object.entries(block || {}).map(([key, value]) => (
                <Table.Row key={key}>
                  <Table.Cell>{key}:</Table.Cell>
                  <Table.Cell>
                    {Array.isArray(value) ? value.length : value}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Segment>
      </>
    );
  }
}

BlockInfoComponent.propTypes = {
  block: PropTypes.shape({
    hash: PropTypes.string.isRequired,
  }),
  getBlock: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      block: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(({ blocks }) => ({ block: blocks.selectedBlock }), {
  getBlock,
})(BlockInfoComponent);
