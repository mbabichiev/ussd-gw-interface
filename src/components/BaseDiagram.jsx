import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import SctpLinkMonitoringService from '../API/SctpLinkMonitoringService';
import moment from 'moment';
import 'chartjs-adapter-moment';
import Loader from './UI/Loader/Loader';
import { UPDATE_GRAPH_STATES_LINKS_DALAY_tiME } from '../config';

const BaseDiagram = ({ link }) => {

    const TimeTypes = {
        LAST_TEN_MINUTES: "Last 10 minutes",
        LAST_HOUR: "Last hour",
        LAST_TWO_HOURS: "Last 2 hours",
        LAST_SIX_HOURS: "Last 6 hours",
        LAST_DAY: "Last day",
        LAST_WEEK: "Last week",
        LAST_MONTH: "Last month"
    };

    const [isLoading, setIsLoading] = useState(true);
    const [sctpLinkStates, setSctpLinkStates] = useState([]);
    const [typeTime, setTypeTime] = useState(TimeTypes.LAST_TEN_MINUTES);

    async function fetchData(showLoadingState) {
        try {
            if (showLoadingState) {
                setIsLoading(true);
            }
            let response;
            if (typeTime === TimeTypes.LAST_TEN_MINUTES) {
                response = await SctpLinkMonitoringService.getByIdAndMinutes(link.id, 10);
            } else if (typeTime === TimeTypes.LAST_HOUR) {
                response = await SctpLinkMonitoringService.getByIdAndHours(link.id, 1);
            } else if (typeTime === TimeTypes.LAST_TWO_HOURS) {
                response = await SctpLinkMonitoringService.getByIdAndHours(link.id, 2);
            } else if (typeTime === TimeTypes.LAST_SIX_HOURS) {
                response = await SctpLinkMonitoringService.getByIdAndHours(link.id, 6);
            } else if (typeTime === TimeTypes.LAST_DAY) {
                response = await SctpLinkMonitoringService.getByIdAndDays(link.id, 1);
            } else if (typeTime === TimeTypes.LAST_WEEK) {
                response = await SctpLinkMonitoringService.getByIdAndDays(link.id, 1);
            } else if (typeTime === TimeTypes.LAST_MONTH) {
                response = await SctpLinkMonitoringService.getByIdAndDays(link.id, 1);
            }
            const processedData = processStates(response);
            setSctpLinkStates(processedData);
            if (showLoadingState) {
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        fetchData(true);
        const intervalId = setInterval(() => fetchData(false), UPDATE_GRAPH_STATES_LINKS_DALAY_tiME);
        return () => clearInterval(intervalId);
    }, [typeTime, link.id]);


    const processStates = (states) => {
        let processed = [];
        states.forEach(state => {
            let currentTime = moment(state.startTime);
            const endTime = moment(state.endTime);
            processed.push({
                time: currentTime.toISOString(),
                status: state.status === 'ACTIVE' ? 1 : 0
            })
            processed.push({
                time: endTime.toISOString(),
                status: state.status === 'ACTIVE' ? 1 : 0
            })
        });
        return processed;
    };


    function getXParams() {
        let unit = "minute";
        let step = 10;

        if (typeTime === TimeTypes.LAST_TEN_MINUTES) {
            step = 1;
        } else if (typeTime === TimeTypes.LAST_TWO_HOURS) {
            step = 20;
        } else if (typeTime === TimeTypes.LAST_SIX_HOURS) {
            step = 30;
        } else if (typeTime === TimeTypes.LAST_DAY) {
            unit = "hour";
            step = 1;
        } else if (typeTime === TimeTypes.LAST_WEEK) {
            unit = "day";
            step = 1;
        } else if (typeTime === TimeTypes.LAST_MONTH) {
            unit = "day";
            step = 4;
        }

        return {
            type: 'time',
            time: {
                unit: unit
            },
            ticks: {
                stepSize: step,
                color: 'white'
            },
            grid: {
                color: 'rgba(255, 255, 255, 0.2)'
            }
        }
    }

    const data = {
        labels: sctpLinkStates.map(state => state.time),
        datasets: [
            {
                label: 'Link State',
                data: sctpLinkStates.map(state => state.status),
                borderColor: 'rgba(54, 162, 235, 0.6)',
                backgroundColor: 'rgba(54, 162, 235, 0.1)',
                steppedLine: true,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value, index, values) {
                        return value === 1 ? 'ACTIVE' : 'DOWN';
                    },
                    stepSize: 1,
                    color: function (context) {
                        if (context.tick.value === 1) {
                            return 'green'; // Зеленый цвет для ACTIVE
                        } else {
                            return 'red'; // Красный цвет для DOWN
                        }
                    },
                    min: 0,
                    max: 1,
                    autoSkip: false,
                    maxTicksLimit: 2
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)'
                }
            },
            x: getXParams()
        },
        plugins: {
            legend: {
                labels: {
                    color: 'white'
                }
            }
        }
    };


    if (isLoading) {
        return (
            <div class="text-center">
                <Loader />
            </div>
        )
    }

    return (
        <div>
            <select class="form-select text-center" id="type" value={typeTime} onChange={e => setTypeTime(e.target.value)}>
                <option>{TimeTypes.LAST_TEN_MINUTES}</option>
                <option>{TimeTypes.LAST_HOUR}</option>
                <option>{TimeTypes.LAST_TWO_HOURS}</option>
                <option>{TimeTypes.LAST_SIX_HOURS}</option>
                <option>{TimeTypes.LAST_DAY}</option>
                <option>{TimeTypes.LAST_WEEK}</option>
                <option>{TimeTypes.LAST_MONTH}</option>
            </select>
            <br />
            <Line data={data} options={options} />
        </div>
    );
};

export default BaseDiagram;
