import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch('https://car-doctor-server-lake-eta.vercel.app/services')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])
    return (
        <div className="mb-36">
            <div className="text-center pt-32 space-y-3 ">
                <h5 className='text-primary text-xl font-bold'>Service</h5>
                <h1 className="text-5xl font-bold">Our Service Area</h1>
                <p className="">the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which don't look even slightly believable.
                </p>
            </div>
            <div className="grid grid-cols-3 gap-10 mt-10">
                {
                    services && services.map(service => (
                        <ServiceCard
                            key={(service._id)}
                            service={service}
                        ></ServiceCard>
                    ))
                }
            </div>
        </div>
    );
};

export default Services;