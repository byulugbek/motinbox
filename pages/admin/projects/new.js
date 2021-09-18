import AdminLayer from "../../../adminComponents/adminLayer";
import InputsContainer from '../../../adminComponents/screens/inputsContainer';


export default function New() {
    return (
        <AdminLayer>
            <InputsContainer
                header={'Добавление проекта в наши проекты'}
            />
        </AdminLayer>
    )
}
