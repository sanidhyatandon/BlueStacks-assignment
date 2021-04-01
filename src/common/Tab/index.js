import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  };

  render() {
    const {
      onClick,
      props: { activeTab, label, tabTitle }
    } = this;

    return (
      <li className={classnames('tab-list-item', activeTab === label && 'tab-list-active')} onClick={onClick}>
        {tabTitle}
      </li>
    );
  }
}

export default Tab;
