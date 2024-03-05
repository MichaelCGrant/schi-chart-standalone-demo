'use client';
import type { CSSProperties } from 'react';
import type { ISciChartSurfaceBase } from 'scichart';
import { useState, useEffect, useRef } from 'react';

let count = 0;

function generateGuid() {
  return ++count;
}

interface IChartComponentProps {
  initChart: (
    rootElementId: string
  ) => Promise<{ sciChartSurface: ISciChartSurfaceBase }>;
  className?: string;
  style?: CSSProperties;
}

export function SciChartComponent(props: IChartComponentProps) {
  const sciChartSurfaceRef = useRef<ISciChartSurfaceBase>();
  const [rootElementId] = useState(`chart-root-${generateGuid()}`);
  useEffect(() => {
    const chartInitializationPromise = props
      .initChart(rootElementId)
      .then((initResult: { sciChartSurface: any }) => {
        sciChartSurfaceRef.current = initResult.sciChartSurface;
        return initResult.sciChartSurface;
      });
    const performCleanup = () => {
      sciChartSurfaceRef.current.delete();
      sciChartSurfaceRef.current = undefined;
    };

    return () => {
      // check if chart is already initialized or wait init to finish before deleting it
      sciChartSurfaceRef.current
        ? performCleanup()
        : chartInitializationPromise.then(performCleanup);
    };
  }, [props, rootElementId]);
  return (
    <div
      id={rootElementId}
      className={props.className}
      style={props.style}
    />
  );
}

export default SciChartComponent;
