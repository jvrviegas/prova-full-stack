import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const {
    fieldName,
    defaultValue,
    registerField,
    error,
    clearError,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      <input
        ref={inputRef}
        defaultValue={defaultValue}
        className={error ? 'has-error' : ''}
        onFocus={clearError}
        {...rest}
      />
      {error && (
        <span className="error" style={{ color: 'red' }}>
          {error}
        </span>
      )}
    </>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
};
