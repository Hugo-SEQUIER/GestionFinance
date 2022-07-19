import { useEffect, useState } from 'react';
import {
	Line,
	Pie,
	Column,
	Area,
	Gauge,
	Histogram,
	Mix,
	G2,
} from '@ant-design/plots';

function lineChart(data) {
	// Default color of lines
    const config = {
		data,
		height: 80,
		padding: 'auto',
		xField: 'scale',
		yField: 'valeur',
		brush: {
			enabled: true,
			type: 'x-rect',
		},
		xAxis: {
			// type: 'timeCat',
			tickCount: 100,
			label: {
				style: {
					fill: 'white',
				},
			},
		},
		yAxis: {
			// type: 'timeCat',
			tickCount: 10,
			label: {
				style: {
					fill: 'white',
				},
			},
		},
		legend: {
			itemName: {
				style: {
					fontSize: 10,
					backgroundColor: 'red',
					fill: 'white',
				},
				spacing: 5,
			},
			position: 'top',
		},
		smooth: true,
		animation: {
			appear: {
				animation: 'path-in',
				duration: 5000,
			},
		},
        color: 'lightgreen',
        annotations: [
            {
                type: 'regionFilter',
                start: ['min', '-100000000000000000'],
                end: ['max', '-1'],
                color: 'red',
            },
        ],
	};
	return <Line {...config} />;
}

function areaChart(data) {
	let colorChart = [
		'lightblue',
		'lightgreen',
	];
    const config = {
		data: data,
		xField: 'scale',
		yField: 'valeur',
		seriesField: 'name',
		color: colorChart,
		line: {},
		meta: {
			time: {
				range: [0, 1],
			},
		},
		tooltip: {
	    	showCrosshairs: true,
		    shared: true,
		},
		legend: {
			itemName: {
				style: {
    				fontSize: 10,
					backgroundColor: 'red',
					fill: 'white',
				},
				spacing: 5,
			},
			position: 'top',
		},
		smooth: true,
		isStack: false,
	};
    return <Area {...config} />;    
}

function donutChart(data, title) {
	const config = {
		appendPadding: 10,
		data,
		angleField: 'valeur',
		colorField: 'type',
		radius: 1,
		innerRadius: 0.6,
        meta: {
            valeur: {
                formatter: (v) => `${v} %`,
            },
        },
		label: {
			type: 'inner',
			offset: '-50%',
			content: '{value}',
			style: {
				textAlign: 'center',
				fontSize: 14,
				fill: 'black',
			},
			autoRotate: false,
		},
		interactions: [
			{
				type: 'element-selected',
			},
			{
				type: 'element-active',
			},
		],
		statistic: {
			title: false,
			content: {
				style: {
					whiteSpace: 'pre-wrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					color: 'white',
					fontSize: 22,
				},
				content: title,
			},
		},
		legend: {
			itemName: {
				style: {
					fontSize: 15,
					backgroundColor: 'red',
					fill: 'white',
				},
				spacing: 2,
			},
		},
	};
	return <Pie {...config} />;
}

function pieChart(data) {
	const config = {
		appendPadding: 10,
		data,
		angleField: 'valeur',
		colorField: 'type',
		radius: 0.75,
        meta: {
            valeur: {
                formatter: (v) => `${v} %`,
            },
        },
		label: {
			type: 'spider',
			labelHeight: 28,
			style: {
				fontSize: 10,
				fill: 'white',
			},
		},
		interactions: [
			{
				type: 'element-selected',
			},
			{
				type: 'element-active',
			},
		],
		legend: {
			itemName: {
				style: {
					fontSize: 10,
					backgroundColor: 'red',
					fill: 'white',
				},
				spacing: 5,
			},
			position: 'top',
		},
	};
	return <Pie {...config} />;
}

function columnChart(data) {
	const config = {
		data,
		xField: 'scale',
		yField: 'valeur',
        seriesField : 'name',
		meta: {
			count: {
				alias: 'top2000 唱片总量',
				nice: true,
			},
			release: {
				tickInterval: 5,
				alias: '唱片发行年份',
			},
		},
		// Zoom
		brush: {
			enabled: true,
			type: 'x-rect',
		},

	};

	return <Column {...config} />;
}

export {
	donutChart,
	lineChart,
	columnChart,
	areaChart,
	pieChart,
};
