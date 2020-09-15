import React from 'react'

export default function WorldStatistic() {
  return (
    <>
      <ul className="d-md-flex justify-content-between world_details_ul m-0" >
        <li><p>7.80 B</p><div>World Population</div></li>
        <li><p className="color_infect">29.28 M</p><div>Total Infected</div></li>
        <li><p className="color_infect">37.54</p><div>Total Infected <strong>BPS<sup>*</sup></strong></div></li>
        <li><p className="color_death">0.93 M</p><div>Total Mortality</div></li>
        <li><p className="color_death">3.18</p><div>Total Mortality %</div></li>
        <li><p className="color_rec">21.10 M</p><div>Total Recovered</div></li>
        <li><p className="color_rec">72.08</p><div>Recovery %</div></li>
      </ul>
    </>
  )
}
