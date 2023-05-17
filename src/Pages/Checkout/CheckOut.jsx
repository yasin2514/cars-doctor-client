import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const CheckOut = () => {
    const service = useLoaderData();
    const { service_id, title, price, img } = service;
    const { user } = useContext(AuthContext)
    const handleBookService = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email || form.email.value;


        const order = {
            customerName: name,
            email,
            date,
            img,
            service: title,
            service_id,
            price
        }
        console.log(order)
        fetch(`https://car-doctor-server-lake-eta.vercel.app/bookings`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('order confirm successfully');
                    form.reset();
                }
            })

    }
    return (
        <div className="my-10">
            <h2 className="text-3xl font-bold text-center">Book Service for <span className="text-primary">{service?.title}</span></h2>

            <form onSubmit={handleBookService} className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="Name" className="input input-bordered" name="name" defaultValue={user?.displayName} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" placeholder="date" className="input input-bordered" name="date" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" placeholder="Your Email" className="input input-bordered" name="email" defaultValue={user?.email} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due Price</span>
                        </label>
                        <input type="text" placeholder="Due Price" className="input input-bordered" readOnly name="duePrice" defaultValue={`$ ${price}`} />
                    </div>

                </div>
                <div className="form-control mt-6">
                    <input type="submit" value="Order Confirm" className="btn" />
                </div>
            </form>

        </div>
    );
};

export default CheckOut;