import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

const App = () => {
    const token = Cookies.get("token");
    console.log("token: ", token);

    const [viewCountAcc, setViewCountAcc] = useState([]);
    const [viewCountTsByStatus, setViewCountTsByStatus] = useState([]);
    const [viewCountTsBySellStatus, setViewCountTsBySellStatus] = useState([]);
    const [viewCountTransaction, setViewCountTransaction] = useState([]);

    // First endpoint to fetch data from
    const countAccount = 'https://timeshare-server-7qcr.onrender.com/api/users/statisticsAccount';
    // Second endpoint to fetch data from
    const countTsByStatus = 'https://timeshare-server-7qcr.onrender.com/api/timeshares/statisticByStatus';
    // Third endpoint to fetch data from
    const countTsBySellStatus = 'https://timeshare-server-7qcr.onrender.com/api/timeshares/statisticByTimeshareStatus';
    // Fourth endpoint to fetch data from
    const countTransaction = 'https://timeshare-server-7qcr.onrender.com/api/transactions/statisticTransactionByStatus';


    useEffect(() => {

        // Fetch data from first endpoint
        fetch(countAccount, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            }
        })
            .then((response) => response.json())
            .then((data1) => {
                console.log(data1);
                setViewCountAcc(data1);

                // Fetch data from second endpoint
                return fetch(countTsByStatus, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    }
                });
            })
            .then((response) => response.json())
            .then((data2) => {
                console.log(data2);
                setViewCountTsByStatus(data2);
                // Fetch data from third endpoint
                return fetch(countTsBySellStatus, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    }
                });
            })
            .then((response) => response.json())
            .then((data3) => {
                console.log(data3);
                setViewCountTsBySellStatus(data3);
                // Fetch data from fourth endpoint
                return fetch(countTransaction, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    }
                });
            })
            .then((response) => response.json())
            .then((data4) => {
                console.log(data4)
                setViewCountTransaction(data4);
            })

            .catch(error => console.error(error));
    }, [])
    const dataAccount = {
        labels: [`${viewCountAcc[0]?.key}`, `${viewCountAcc[1]?.key}`],
        datasets: [
            {
                label: 'Account',
                data: [`${viewCountAcc[0]?.value}`, `${viewCountAcc[1]?.value}`],
                backgroundColor: '#2ecc71',
                borderColor: 'black',
                borderWidth: 1,
            },


        ]
    }

    const dataStatus = {
        labels: [`${viewCountTsByStatus[0]?.key}`, `${viewCountTsByStatus[1]?.key}`, `${viewCountTsByStatus[2]?.key}`],
        datasets: [
            {
                label: 'Status',
                data: [`${viewCountTsByStatus[0]?.value}`, `${viewCountTsByStatus[1]?.value}`, `${viewCountTsByStatus[2]?.value}`],
                backgroundColor: '#34495e',
                borderColor: 'black',
                borderWidth: 1,
            },

        ]
    }

    const dataSellStatus = {
        labels: [`${viewCountTsBySellStatus[0]?.key}`, `${viewCountTsBySellStatus[1]?.key}`, `${viewCountTsBySellStatus[2]?.key}`],
        datasets: [
            {
                data: [`${viewCountTsBySellStatus[0]?.value}`, `${viewCountTsBySellStatus[1]?.value}`, `${viewCountTsBySellStatus[2]?.value}`],
                backgroundColor: ['#7f8fa6', '#273c75', '#353b48'],
                borderWidth: 1,
            }
        ]
    }

    const dataTransaction = {
        labels: [`${viewCountTransaction[0]?.key}`, `${viewCountTransaction[1]?.key}`, `${viewCountTransaction[2]?.key}`, `${viewCountTransaction[3]?.key}`, `${viewCountTransaction[4]?.key}`],
        datasets: [
            {
                data: [`${viewCountTransaction[0]?.value}`, `${viewCountTransaction[1]?.value}`, `${viewCountTransaction[2]?.value}`, `${viewCountTransaction[3]?.value}`, `${viewCountTransaction[4]?.value}`],
                backgroundColor: ['#0097e6', '#8c7ae6', '#e1b12c', '#44bd32', '#40739e'],
                borderWidth: 1,
            }
        ]
    }

    const options = {}
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={
                    { padding: '20px', width: '50%' }
                }>
                    <h2 style={{fontSize: '27px'}}>Statistic Account</h2>
                    <Bar
                        style={
                            { padding: '20px', width: '80%' }
                        }
                        data={dataAccount}
                        options={options}
                    />
                </div>

                <div style={
                    { padding: '20px', width: '50%' }
                }>
                    <h2 style={{fontSize: '27px'}}>Statistic Timeshare by Status</h2>
                    <Bar
                        style={
                            { padding: '20px', width: '80%' }
                        }
                        data={dataStatus}
                        options={options}
                    />
                </div>
            </div>

            <div style={{ display: 'flex' }}>
                <div
                    style={
                        { padding: '20px', width: '33%' }
                    }>
                    <h2 style={{fontSize: '27px'}}>Statistic Timeshare by Sell Status</h2>
                    <Pie
                        data={dataSellStatus}
                        options={options}
                    />
                </div>

                <div
                    style={
                        { padding: '20px', width: '33%', marginLeft:'210px' }
                    }>
                    <h2 style={{fontSize: '27px'}}>Statistic Transaction by Status</h2>
                    <Pie
                        data={dataTransaction}
                        options={options}
                    />
                </div>
            </div>


        </div>
    )
}

export default App;