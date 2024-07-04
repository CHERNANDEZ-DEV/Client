import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';

const token = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJDYXJsb3MgQWxiZXJ0byBIZXJuw6FuZGV6IEd1ZXJyYSIsImlhdCI6MTcxODU5ODc4OCwiZXhwIjoxNzE5ODk0Nzg4fQ.MeuFhh2quofoDYGR1RD6ENCZHoNPUg4XQb2rN8Xpvc-ECLHhPI2d0XySoHrEFW-P";

const QrEntry = () => {

  const initialTime = 15;
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [qrString, setQrString] = useState('');

  const fetchQrString = async () => {
    try {
      const response = await axios.get('http://localhost:8080/qr/generate', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('QR string:', response.data);
      setQrString(response.data);
    } catch (error) {
      console.error('Error fetching QR string:', error);
    }
  };

  useEffect(() => {
    fetchQrString(); // Initial fetch
  }, []);

  useEffect(() => {
    if (timeRemaining <= 0) {
      setTimeRemaining(initialTime);
      fetchQrString(); // Fetch new QR string when timer resets
      return;
    }

    const timerId = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeRemaining]);

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className='bg-[#D9D9D9] bg-opacity-52 p-2 rounded-md flex flex-col justify-center items-center m-2 w-auto font-roboto_mono'>

        <div className="bg-white p-4 m-1">
          <QRCode value={qrString} size={175} />
        </div>

        <p className='text-2xl mt-4 mb-1'>{formatTime(timeRemaining)}</p>
        <p className='text-2xl text-center m-1'>Pedro Orellana</p>
        <p className='text-2xl text-center m-1'>Residente</p>
    </div>
  );
}

export default QrEntry;

