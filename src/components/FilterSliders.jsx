import React, { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';

const FilterSliders = () => {

  const [ energyValue, setEnergyValue ] = useState(7);
  const [ danceValue, setDanceValue ] = useState(5);
  const [ tempoValue, setTempoValue ] = useState(120);

  return (
    <div>

      <div>
        <RangeSlider
          value={energyValue}
          onChange={e => setEnergyValue(e.target.value)}
          min={0}
          max={10}
          tooltip='off'
        />
        <div>Minimum Energy Rating: {energyValue / 10.0}</div>
      </div>

      <div>
        <RangeSlider
          value={danceValue}
          onChange={e => setDanceValue(e.target.value)}
          min={0}
          max={10}
          tooltip='off'
        />
        <div>Minimum Danceability Rating: {danceValue / 10.0}</div>
      </div>

      <div>
        <RangeSlider
          value={tempoValue}
          onChange={e => setTempoValue(e.target.value)}
          min={0}
          max={200}
          tooltip='off'
        />
        <div>Minimum Tempo: {tempoValue} bpm</div>
      </div>

    </div>
  );

};

export default FilterSliders;