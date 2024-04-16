import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import Chart from './components/Chart';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spending, setSpending] = useState([]);
  const [newSpending, setNewSpending] = useState({
    title: '',
    amount: '',
    date: ''
  });

  useEffect(() => {
    const storedSpending = localStorage.getItem('spending');
    if (storedSpending) {
      setSpending(JSON.parse(storedSpending));
    }
  }, []); // Load data from local storage on component mount

  const saveToLocalStorage = (data) => {
    localStorage.setItem('spending', JSON.stringify(data));
  };

  const openModel = () => {
    setIsModalOpen(true)
  }

  const closeModel = () => {
    setIsModalOpen(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSpending({ ...newSpending, [name]: value });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const newSpendingItem = { ...newSpending };
    const updatedSpending = [...spending, newSpendingItem];
    setSpending(updatedSpending);
    saveToLocalStorage(updatedSpending);
    setNewSpending({ title: '', amount: '', date: '', time:'' }); // Reset form fields
    closeModel();
  };

  const handleDeleteTask = (index) => {
    const updatedSpending = [...spending];
    updatedSpending.splice(index, 1);
    setSpending(updatedSpending);
    saveToLocalStorage(updatedSpending); // Save data to local storage
  };

  return (
    <div className='flex flex-col justify-center items-center w-screen h-screen bg-lime-300'>
      <h1 className='mb-9 h-10 w-1/2 bg-white text-black-500 text-4xl text-center'>Daily Spend Tracker</h1>
      <main className=' h-96 w-11/12 flex justify-evenly items-center '>
        <Chart spendings={spending} />

        <div className='bg-red-100 my-20 border-x-2 border-y-2 rounded-lg flex h-64 w-2/6 justify-center items-center'>
          <Table spendings={spending} onDelete={handleDeleteTask} />
        </div>
      </main>

      <button onClick={openModel} className='mt-10 text-red-400 text-xl font-bold rounded-md bg-white border-rose-500 border-x-2 border-y-2 w-48 h-9'>Add Spending</button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal p-4 border-x-2 border-y-2 mt-9 rounded-lg border-black w-5/6">
          <div className="modal-content">

            <h2 className='flex justify-between text-xl'>Add Spends
              <span className="close " onClick={closeModel}>&times;</span>
            </h2>
            {/* Form for adding a task */}
            <form
              onSubmit={handleAddTask}
              className='flex justify-evenly mt-4'
            >
              {/* Important fields */}
              <input
                type="text"
                name="title"
                value={newSpending.title}
                placeholder="Title"
                onChange={handleInputChange}
                className=' border-black border-x-2 border-y-2 rounded-md'
              />
              <input
                type="number"
                name="amount"
                value={newSpending.amount}
                placeholder="Amount"
                onChange={handleInputChange}
                className=' border-black border-x-2 border-y-2 rounded-md'
              />
              <input
                type="text"
                name="date"
                value={newSpending.date}
                placeholder="YYYY-MM-DD"
                onChange={handleInputChange}
                className=' border-black border-x-2 border-y-2 mx-4 rounded-md'
              />
              <input
                type="text"
                name="time"
                value={newSpending.time}
                placeholder="HH:MM:SS"
                onChange={handleInputChange}
                className=' border-black border-x-2 border-y-2 mx-4 rounded-md'
              />
              <button
                type="submit"
                className='border-slate-100 bg-slate-200 w-1/6 border-4 rounded-md'
              >
                Add
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
