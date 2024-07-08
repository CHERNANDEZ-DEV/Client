import { usePopup } from "./PopupContext";

const VisitCard = ({ email, fecha, hora }) => {
  const { showPopup } = usePopup();

  const handleRevoke = () => {
    // Aquí puedes agregar la lógica para revocar la visita
    // Después de completar la lógica, muestra el mensaje de éxito
    showPopup("Removido exitosamente", true);
  };

  return (
    <div className="bg-[#D9D9D9] bg-opacity-52 p-2 rounded-md flex flex-col justify-center items-center m-2 w-auto font-roboto_mono">
      <div className="flex flex-col justify-center items-center m-1">
        <p className="pt-1 text-center">{email}</p>
        <p className="pt-1 text-center">{fecha}</p>
        <p className="pt-1 text-center">{hora}</p>
      </div>
    </div>
  );
}

export default VisitCard;
