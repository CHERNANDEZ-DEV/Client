import plus from '../../assets/Vectorplus.svg'
import { useNavigate } from 'react-router-dom';
import VisitCard from '../../components/VisitCard';


const MenuPermissions = () => {

    const navigate = useNavigate();


    const handleUnique = () => {
        navigate('/resident/UniqueP');
    }

    const handleMultiple = () => {
        navigate('/resident/MultipleP');
    }


    return (
        <div className="flex flex-col items-center font-roboto_mono">
            <h1 className="text-2xl text-[#6185A9] text-center  pt-6">Crear permisos de acceso</h1>
            <h2 className="text-center text-xl text-[#6185A9] pt-4 pb-4 mt-1">Seleccionar el tipo de acceso</h2>

            <div onClick={handleUnique} className="bg-[#F5CB50] bg-opacity-70 rounded-lg p-3 m-2 flex flex-row justify-between w-44">
                <p className='pr-3'>Único</p>
                <img className='w-4 h-4' src={plus} alt="añadir" />
            </div>
            <div onClick={handleMultiple} className="bg-[#F5CB50] bg-opacity-70 rounded-lg p-3 m-2 flex flex-row items-center justify-between w-44">
                <p className='pr-3'>Frecuente</p>
                <img className='w-4 h-4' src={plus} alt="añadir" />
            </div>
            <h2 className='text-center text-xl text-[#6185A9] pt-4 pb-4 mt-1'>Permisos creados</h2>
            <div className='overflow-y-auto h-96 mb-8'>
                <VisitCard></VisitCard>
                <VisitCard></VisitCard>
                <VisitCard></VisitCard>
                <VisitCard></VisitCard>
                <VisitCard></VisitCard>
                <VisitCard></VisitCard>
                <VisitCard></VisitCard>
                <VisitCard></VisitCard>
                <VisitCard></VisitCard>
            </div>
        </div>
    );
}

export default MenuPermissions;