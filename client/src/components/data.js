import { useEffect, useState } from 'react';
import {
	Line,
	Pie ,measureTextWidth,
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
			tickCount: 10,
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
        color: 'green',
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

function donutChart(data, date, depense, fonds) {
	function renderStatistic(containerWidth, text, style) {
		const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
		const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

		let scale = 1;

		if (containerWidth < textWidth) {
		scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
		}

		const textStyleStr = `width:${containerWidth}px;`;
		return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
	}
	  const config = {
		appendPadding: 10,
		data,
		angleField: 'valeur',
		colorField: 'type',
		radius: 1,
		innerRadius: 0.6,
		meta: {
			value: {
				formatter: (v) => `${v} %`,
			},
		},
		label: {
			type: 'inner',
			offset: '-50%',
			style: {
				textAlign: 'center',
				fontSize: 14,
				fill: '#22272c',
			},
			autoRotate: false,
		},
		statistic: {
			title: {
				offsetY: -4,
				color: "#cad1d8",
				customHtml: (container, view, datum) => {
					const { width, height } = container.getBoundingClientRect();
					const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
					const text = datum ? datum.type : date;
					return renderStatistic(d, text, {
						fontSize: 25,
						fill: "#cad1d8",
					});
				},
			},
			content: {
				offsetY: 4,
				style: {
					fontSize: '25px',
					overflow: '',
					textOverflow: 'ellipsis',
					color: '#cad1d8',
					fontSize: 22,
				},
				customHtml: (container, view, datum, data) => {
				const { width } = container.getBoundingClientRect();
				const text = datum ? `${Math.round(depense * datum.valeur/100)} €` : `${depense} €`;
				return renderStatistic(width, text, {
					fontSize: 32,
				});
				},
			},
		},
		// 添加 中心统计文本 交互
		interactions: [
			{
				type: 'element-selected',
			},
			{
				type: 'element-active',
			},
			{
				type: 'pie-statistic-active',
			},
		],
		legend: {
			itemName: {
				style: {
					fontSize: 15,
					fill: '#cad1d8',
				},
				spacing: 2,
			},
		},
	};
	/*const config = {
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
			title: {
				offsetY: -4,
				customHtml: (container, view, datum) => {
				const { width, height } = container.getBoundingClientRect();
				const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
				const text = datum ? datum.type : '总计';
				return renderStatistic(d, text, {
					fontSize: 28,
				});
				},
			},
			content: {
				style: {
					whiteSpace: 'pre-wrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					color: 'white',
					fontSize: 22,
				},
				customHtml: (container, view, datum, data) => {
					const { width } = container.getBoundingClientRect();
					const text = datum ? `¥ ${datum.value}` : `¥ ${data.reduce((r, d) => r + d.value, 0)}`;
					return renderStatistic(width, text, {
						fontSize: 32,
					});
				},
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
	}; */
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
