import { useRouter } from "next/router";
import AdminLayer from "../../../../adminComponents/adminLayer";


export default function id() {

    return (
        <AdminLayer>
            <div>
                <h1>Изменение данных проекта</h1>
            </div>
        </AdminLayer>
    )
}