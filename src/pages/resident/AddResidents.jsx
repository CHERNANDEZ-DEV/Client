import image from '../../assets/profile.png'  
import { useState } from "react";
import VisitCard from '../../components/VisitCard';

const AddResidents = () => {

    const [checked, setChecked] = useState(false);

    const [formValues, setFormValues] = useState({
        email: '',
        dateVisit: ''
    })

    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleCheckboxChange = () => {
        setChecked(!checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulario enviado:', formValues);
    }
    

    return(
        <div className="flex  items-center h-screen flex-col  w-full font-roboto_mono ">
            <h1 className="text-2xl text-[#6185A9] text-center">Añadir residentes al hogar</h1>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mt-4 mb-4 width-auto">
                    <label className="text-lg mb-2">Correo electrónico:</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Correo electrónico"
                        className="border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={formValues.email} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="custom-checkbox"
                        checked={checked}
                        onChange={handleCheckboxChange}
                        className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <label htmlFor="custom-checkbox" className="ml-2 text-gray-700">
                        El residente es mayor de edad.
                    </label>
                </div>

                <div className=" flex flex-col mt-4 mb-4">
                    <label className="text-lg mb-2">Número de identificación:</label>
                    <input 
                        type="number" 
                        name="number" 
                        className="border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={formValues.date} 
                        onChange={handleChange} 
                    />
                </div>
            </form>

            <button className="p-3 rounded-md bg-[#F79E9E] w-30 mb-4">Buscar</button>
            
                <h1 className='text-2xl text-[#6185A9] text-center font-bold mb-4'>Residentes activos</h1>

                <div className='bg-[#D9D9D9] bg-opacity-52 p-2 rounded-md flex flex-col sm:flex-row justify-center items-center m-2 w-auto'>
                    <img className='w-10 h-10 sm:mr-5 m-1' src={image} alt="profile"/>
                    <div className='flex flex-col justify-center items-center sm:mr-5 m-1'>
                        <p className="pt-1 text-center">Carlos Hernández</p>
                        <p className="pt-1 text-center">00002721@uca.edu.sv</p>
                    </div>
                    <div className="flex justify-center items-center">
                    <button className='bg-[#F8BD0D] bg-opacity-70 p-2 m-1 rounded-md'>Eliminar</button>
                    </div>
                </div>  
                <div className='bg-[#D9D9D9] bg-opacity-52 p-2 rounded-md flex flex-col sm:flex-row justify-center items-center m-2 w-auto'>
                    <img className='w-10 h-10 sm:mr-5 m-1' src={image} alt="profile"/>
                    <div className='flex flex-col justify-center items-center sm:mr-5 m-1'>
                        <p className="pt-1 text-center">Carlos Hernández</p>
                        <p className="pt-1 text-center">00002721@uca.edu.sv</p>
                    </div>
                    <div className="flex justify-center items-center">
                    <button className='bg-[#F8BD0D] bg-opacity-70 p-2 m-1 rounded-md'>Eliminar</button>
                    </div>
                </div>  
        </div>
    );
}

export default AddResidents;