import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
    const { img, price, title, _id } = service;
    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <div className="px-6 pt-10 w-full h-full">
                <img src={img} alt="Shoes" className="rounded-xl w-full h-full object-cover" />
            </div>
            <div className="card-body  space-y-4">
                <h2 className="card-title text-primary">{title}</h2>
                <div className="flex justify-between  w-full">
                    <p className="text-start">{price}</p>
                    <Link to={`/checkOut/${_id}`} className="btn btn-primary btn-sm">Book Now</Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;