import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Textarea, Typography } from '@strapi/design-system';

const Input = ({
  attribute,
  error,
  name,
  onChange,
  value
}) => {
  const { formatMessage } = useIntl();
  const [arrayOfStrings, setArrayOfStrings] = useState(() => {
    return Array.isArray(value) ? value.join(',') : value;
  });

  const handleValueChange = (newValue) => {
    setArrayOfStrings(newValue);
    onChange({ target: { name, value: newValue, type: attribute.type } });
  }

  return (
    <>
      <Textarea
        placeholder="Individual strings divided by commas"
        label={name}
        name={name}
        onChange={(e) => handleValueChange(e.target.value)}
      >
        {arrayOfStrings}
      </Textarea>
      {error &&
        <Typography variant="pi" textColor="danger600">
          {formatMessage({ id: error, defaultMessage: error })}
        </Typography>
      }
    </>
  )
}

export default Input;
