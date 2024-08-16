import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Line = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), { ssr: false });
const Pie = dynamic(() => import('react-chartjs-2').then(mod => mod.Pie), { ssr: false });

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ArcElement
} from 'chart.js';
import { text } from 'stream/consumers';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface Dataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
}

interface ChartDataResponse {
  labels: string[];
  datasets: Dataset[];
}

interface PieChartDataResponse {
    labels: string[];
    values: number[];
  }

const Dashboard = () => {
    const [chartData, setChartData] = useState<ChartData<'line'> | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [pieChartData, setPieChartData] = useState<ChartData<'pie'> | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('http://localhost:5000/graph-data');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: ChartDataResponse = await response.json();
                
                setChartData({
                    labels: data.labels,
                    datasets: data.datasets
                });
            } catch (error) {
                console.error('Error fetching chart data:', error);
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchChartData();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            // title: {
            //     display: true,
            //     text: 'Weekly Product Sales',
            // },
            
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Weeks'
                }
            },
            y: {
                title: {
                    display: true, 
                    text: 'Sales'
                }
            }
        }
    };

    useEffect(() => {
        const fetchPieChartData = async () => {
            try {
                const response = await fetch('http://localhost:5000/pie-data');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: PieChartDataResponse = await response.json();
                
                setPieChartData({
                    labels: data.labels,
                    datasets: [
                        {
                            label: 'Pie Chart Data',
                            data: data.values,
                            backgroundColor: [
                                'rgba(75, 192, 192, 0.2)', // Color for first sector
                                'rgba(255, 99, 132, 0.2)', // Color for second sector
                                'rgba(255, 206, 86, 0.2)', // Color for third sector
                                'rgba(54, 162, 235, 0.2)', // Color for fourth sector
                                'rgba(153, 102, 255, 0.2)', // Color for fifth sector
                            ],
                            borderColor: [
                                'rgb(75, 192, 192)', // Border color for first sector
                                'rgb(255, 99, 132)', // Border color for second sector
                                'rgb(255, 205, 86)', // Border color for third sector
                                'rgb(54, 162, 235)', // Border color for fourth sector
                                'rgb(153, 102, 255)', // Border color for fifth sector
                            ],
                            borderWidth: 2,
                        },
                    ],
                });
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPieChartData();
    }, []);

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem: any) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    }
                }
            }
        },
    };

    return (
        <div className="flex w-full min-h-screen bg-gray-100">
            <aside className="w-64 bg-blue-500 min-w-[250px] shadow-lg">
                <Sidebar />
            </aside>
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 p-6 bg-gray-50">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Dashboard</h1>
                    <div className="flex flex-row gap-2">
                        <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                            {isLoading && <p>Loading chart data...</p>}
                            {error && <p>Error: {error}</p>}
                            {chartData && (
                                <div style={{ height: '400px' }}>
                                    <Line options={options} data={chartData} />
                                </div>
                            )}
                            <h1 className="text-center font-semibold">Weekly Product Sales</h1>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            {pieChartData && (
                                <div style={{ width: '350px', height: '350px' }}>
                                    <Pie options={pieOptions} data={pieChartData} />
                                </div>
                            )}
                            <h1 className="text-center font-semibold mt-12">Category Demand</h1>
                        </div>
                    </div>
                    
                </main>
            </div>
        </div>
    );
}

export default Dashboard;