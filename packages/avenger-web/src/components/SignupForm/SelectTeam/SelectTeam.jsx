import React from 'react';
import {SelectableImage} from './Flag';
import {flags} from '../../assets/flags';
import './SelectTeam.css';
import QuestionMarkImage from '../../assets/question-mark.png'

export const SelectTeam = ({selected, handleChange}) => (
  <div className="select-team">
    <SelectableImage
        classes="team no-selection"
        image={QuestionMarkImage}
        alt={"no team selected"}
        value={""}
        selected={!selected}
        handleClick={handleChange}
      />
    {flags.map (flag => (
      <SelectableImage
        classes="team"
        image={flag.image}
        alt={flag.short}
        value={flag.short}
        selected={selected === flag.short}
        handleClick={handleChange}
      />
    ))}
  </div>
);
