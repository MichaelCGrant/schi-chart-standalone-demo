'use client';
import * as SciChartValue from 'scichart/_wasm/scichart.browser.mjs';
import * as SciChartType from 'scichart';
import SciChartComponent from './SciChartComponent';
const SciChart = SciChartValue as typeof SciChartType;
const { SciChartSurface, NumericAxis } = SciChart;

const createChart = async (divElementId: string) => {
  const { sciChartSurface, wasmContext } = await SciChartSurface.create(
    divElementId
  );
  const xAxis = new NumericAxis(wasmContext);
  const yAxis = new NumericAxis(wasmContext);
  sciChartSurface.xAxes.add(xAxis);
  sciChartSurface.yAxes.add(yAxis);
  return { sciChartSurface };
};

export function Page() {

  return (
    <SciChartComponent initChart={createChart} style={{ width: 400, height: 300 }} className=''/>
  );
}


export default Page;