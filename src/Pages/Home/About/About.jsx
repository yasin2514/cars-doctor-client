import person from '../../../assets/images/about_us/person.jpg';
import parts from '../../../assets/images/about_us/parts.jpg';
const About = () => {
    return (
        <div className="hero my-32">
            <div className="hero-content flex-col gap-14 lg:flex-row">
                <div className='lg:w-1/2 h-[450px] relative'>
                    <img src={person} className="w-3/4 h-full object-cover  rounded-lg shadow-2xl" />
                    <img src={parts} className="w-3/5 h-5/6 object-cover absolute right-0 top-1/2 border-8 border-white rounded-lg shadow-2xl" />
                </div>
                <div className='lg:w-1/2 space-y-7'>
                    <h5 className='text-primary text-xl font-bold'>About Us</h5>
                    <h1 className="text-5xl font-bold">We are qualified & of experience in this field</h1>
                    <p className="py-6">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                        <br /> <br />
                        the majority have suffered alteration in some form, by injected humour, or randomised words which don't  look even slightly believable.
                    </p>
                    <button className="btn btn-primary">Get More Info</button>
                </div>
            </div>
        </div>
    );
};

export default About;