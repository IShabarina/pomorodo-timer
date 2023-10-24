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
            labels: {
                backgroundColor: '#ECECEC',
            }
        },
    },
    scales: {
        y:
        {
            beginAtZero: true,
            position: 'right',
            title: {
                font: {
                    color: '#333',
                    size: 12,
                    style: "normal",
                    weight: 400,
                    lineHeight: 33,
                },
            },
            ticks: {
                stepSize: 1500,
                callback: function (value) {
                    // Функция для форматирования значения оси y (время)
                    const hours = Math.floor(value / 3600); // 1 час = 3600 секунд
                    const minutes = Math.round((value % 3600) / 60);
                    return (hours === 0) ? `${minutes}м` : `${hours}ч ${minutes}м`;
                }
            },
            grid: {
                display: true,
                drawBorder: false,
                color: '#333',
                opacity: 0.2,
            }
        }
        ,
        x:
        {
            grid: {
                display: false,
            }
        }

    },
    backgroundColor: "#F4F4F4"
};

const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];


const TimerChart = (dataWork) => {
    // Воскресенье - 0, Понедельник - 1, Вторник - 2, и так далее
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function getDayOfWeek(date) {
        return daysOfWeek[new Date(date).getDay()];
    }

    // Подсчитываем сумму workSec для каждого дня недели
    function getDataWorkSec() {
        const totalWorkSecByDayOfWeek = [0, 0, 0, 0, 0, 0, 0];
        console.log(dataWork.data);
        dataWork.data.forEach(item => {
            const dayOfWeek = getDayOfWeek(item.date);
            console.log(dayOfWeek)
            const dayIndex = daysOfWeek.indexOf(dayOfWeek);
            console.log(dayIndex);
            totalWorkSecByDayOfWeek[dayIndex] = item.workSec;
        });
        console.log(totalWorkSecByDayOfWeek);
        return totalWorkSecByDayOfWeek;
    }

    console.log(getDataWorkSec());

    //
    const data = {
        labels,
        datasets: [
            {
                label: false,
                data: getDataWorkSec(),
                backgroundColor: '#EA8A79',
            }
        ],
    };

    return (
        <div className={styles.chartsSection}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default TimerChart;