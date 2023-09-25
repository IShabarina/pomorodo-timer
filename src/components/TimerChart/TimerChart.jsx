import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styles from './TimerChart.module.css';

// JUST FOR TEST -> IN PROCESS 

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
        },
        title: {
            display: true,
            text: 'Timer run time, min',
        },
    },
};

const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Work',
            data: [1000, 500, 10000],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Break',
            data: [500, 300, 100],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

const TimerChart = () => {
    return (
        <div className={styles.chartsSection}>
            <h2 className={styles.title}>TIMER ACTIVITY</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default TimerChart;