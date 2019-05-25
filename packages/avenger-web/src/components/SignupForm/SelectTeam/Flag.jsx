import React from 'react';

export const SelectableImage = ({
  image,
  alt,
  selected,
  value,
  classes,
  handleClick,
}) => (
  <img
    className={`${classes} ${selected ? 'selected' : ''}`}
    src={image}
    alt={alt}
    onClick={handleClick(value)}
  />
);
