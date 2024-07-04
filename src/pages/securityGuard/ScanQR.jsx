import QrReader from 'react-qr-scanner'
import {useState} from 'react'
import { usePopup } from '../../components/PopupContext'

const ScanQR = () => {

    const { showPopup } = usePopup();

    const [result, setResult] = useState('')

    const handleError = (err) => {
        console.log(err)
    }

    const handleScan = (data) => {
        
        if (data != null){
            
            setResult(data.text)
            
            console.log(data.text)

            // Hacer aqui los fetch
            // result contiene el hash del QR

            // Mostrar esto cuando el QR sea validado por la API
            showPopup("QR validado", true)

            // Mostrar esto cuando el QR se escanee pero no sea correcto
            showPopup("QR incorrecto", false)
        }
        
    }
    
    return(
        <>
        <div class="max-w-4xl mx-auto mt-5 px-4">
            <h1 className="text-3xl font-roboto_mono mb-4 text-center mt-8  text-sky-700">Escanear QR</h1>
            
            <section className="bg-gray-300 shadow-md rounded p-6 mb-8 flex flex-col items-center">
                <QrReader 
                    delay={2000}
                    onError={handleError}
                    onScan={handleScan}
                    className="outline outline-4 outline-slate-600 rounded justify-center"

                /> 
                
            </section>
           
        </div>
        
        </>
    )
}

export default ScanQR