import React from 'react';

const TextInput = props => {
  const { classname, handleSearch } = props;
  return <input className={classname} type="text" onChange={handleSearch} />;
};

export default TextInput;
