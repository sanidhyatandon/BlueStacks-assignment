import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from '../Tab';
class Tabs extends Component {
  // Proptypes.
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired
  };

  constructor(props) {
    super(props);

    // Deconstruct 0th elemnt from children.
    const [activeChild] = this.props.children;

    const {
      props: { label }
    } = activeChild;

    this.state = {
      activeTab: label
    };
  }

  // on click Tab Handler.
  onClickTabItem = tab => {
    this.setState({ activeTab: tab });
  };

  render() {
    const {
      onClickTabItem,
      props: { children },
      state: { activeTab }
    } = this;

    return (
      <div className="tabs">
        <ol className="tab-list">
          {children.map((child, index) => {
            const { label, tabTitle } = child.props;

            return (
              <Tab
                activeTab={activeTab}
                key={`${label}-${index}`}
                label={label}
                tabTitle={tabTitle}
                onClick={onClickTabItem}
              />
            );
          })}
        </ol>
        <div className="tab-content">
          {children.map(child => {
            const {
              props: { label, children }
            } = child;
            if (label !== activeTab) return null;
            return children;
          })}
        </div>
      </div>
    );
  }
}

export default Tabs;
