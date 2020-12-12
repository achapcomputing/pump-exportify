import React, { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';

const FilterSliders = () => {

  const [ energyValue, setEnergyValue ] = useState(7);
  const [ finalEnergyValue, setFinalEnergyValue ] = React.useState(energyValue);
  const [ danceValue, setDanceValue ] = useState(5);
  const [ finalDanceValue, setFinalDanceValue ] = React.useState(danceValue);
  const [ tempoValue, setTempoValue ] = useState(120);
  const [ finalTempoValue, setFinalTempoValue ] = React.useState(tempoValue);

  return (
    <div>

      <div>
        <RangeSlider
          value={energyValue}
          onChange={e => setEnergyValue(e.target.value)}
          onAfterChange={e => setFinalEnergyValue(e.target.value)}
          min={0}
          max={10}
          tooltip='off'
        />
        <div>Minimum Energy Rating: {finalEnergyValue / 10.0}</div>
      </div>

      <div>
        <RangeSlider
          value={danceValue}
          onChange={e => setDanceValue(e.target.value)}
          onAfterChange={e => setFinalDanceValue(e.target.value)}
          min={0}
          max={10}
          tooltip='off'
        />
        <div>Minimum Danceability Rating: {finalDanceValue / 10.0}</div>
      </div>

      <div>
        <RangeSlider
          value={tempoValue}
          onChange={e => setTempoValue(e.target.value)}
          onAfterChange={e => setFinalTempoValue(e.target.value)}
          min={0}
          max={200}
          tooltip='off'
        />
        <div>Minimum Tempo: {finalTempoValue} bpm</div>
      </div>

    </div>
  );

};

export default FilterSliders;