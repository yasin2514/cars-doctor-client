
const BookingsRow = ({ booking, bookings, setBookings, handleUpdateConfirm }) => {
    const { _id, customerName, date, img, price, service, status } = booking;

    const handleDelete = id => {
        const procced = confirm("Are you sure to want to delete?");
        if (procced) {
            fetch(`http://localhost:5000/bookings/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        alert('deleted successfully');
                        const remaining = bookings.filter(book => book._id !== id);
                        setBookings(remaining);
                    }
                })
        }
    }

    return (
        <tr>
            <th>
                <button onClick={() => handleDelete(_id)} className="btn btn-sm btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </th>
            <td>
                <div className="avatar">
                    <div className="w-24 rounded">
                        {img && <img src={img} />}
                    </div>
                </div>
            </td>
            <td>
                {customerName}
            </td>
            <td>{service}</td>
            <td>$ {price}</td>
            <td>{date}</td>
            <th>
                {
                    status === 'confirm' ?
                        <span className="text-primary font-bold">Confirmed</span> :
                        <button onClick={() => handleUpdateConfirm(_id)} className="btn btn-ghost btn-xs">Please Confirm</button>

                }
            </th>
        </tr>
    );
};

export default BookingsRow;