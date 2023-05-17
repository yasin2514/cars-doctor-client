import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import BookingsRow from "./BookingsRow";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
    const { user, } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
    const url = `https://car-doctor-server-lake-eta.vercel.app/bookings?email=${user?.email}`;
    useEffect(() => {
        fetch(url, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem('car-access-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setBookings(data);
                }
                else {
                    // logout and then navigate

                    navigate('/')
                }
            })
    }, [url, navigate]);


    const handleUpdateConfirm = id => {
        fetch(`https://car-doctor-server-lake-eta.vercel.app/bookings/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({ status: "confirm" })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    const remaining = bookings.filter(book => book._id !== id);
                    const updated = bookings.find(book => book._id === id);
                    updated.status = "confirm";
                    setBookings([updated, ...remaining]);
                }
            })
    }
    return (
        <div className="my-20">
            <h2 className="text-center font-bold text-3xl mb-10">Your Bookings {bookings.length}</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Delete</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Service</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            bookings && bookings.map(booking => <BookingsRow
                                key={booking._id}
                                booking={booking}
                                bookings={bookings}
                                setBookings={setBookings}
                                handleUpdateConfirm={handleUpdateConfirm}

                            > </BookingsRow>)
                        }

                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default Bookings;