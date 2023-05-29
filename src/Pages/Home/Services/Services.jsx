import { useEffect, useRef, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
    const [services, setServices] = useState([]);
    const [asc, setAsc] = useState(true);
    const searchRef = useRef();
    const [search, setSearch] = useState('');
    useEffect(() => {
        fetch(`http://localhost:5000/services?search=${search}&sort=${asc ? "asc" : "dsc"}`)
            .then(res => res.json())
            .then(data => setServices(data))
    }, [asc, search])

    const handleSearch = () => {
        setSearch(searchRef.current.value)
    }
    return (
        <div className="mb-36">
            <div className="text-center pt-32 space-y-3 ">
                <h5 className='text-primary text-xl font-bold'>Service</h5>
                <h1 className="text-5xl font-bold">Our Service Area</h1>
                <p className="">the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which don't look even slightly believable.
                </p>
                <button className="btn btn-sm" onClick={() => setAsc(!asc)}>{asc ? "Price High to Low" : "Price Low to High"}</button>
                {/* search bar */}
                <div className="form-control">
                    <div className="input-group">
                        <input type="text" ref={searchRef} placeholder="Search…" className="input input-bordered" />
                        <button onClick={handleSearch} className="btn btn-square">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
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