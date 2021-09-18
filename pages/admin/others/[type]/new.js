import AbilityScreen from "../../../../adminComponents/screens/abilityScreen";
import AdminLayer from "../../../../adminComponents/adminLayer";
import ErrorPage from 'next/error'
import { useRouter } from 'next/router';


export default function New() {
    const router = useRouter();
    const { type } = router.query;

    if (type !== 'abilities' && type !== 'socials')
        return <ErrorPage statusCode={404} />

    return (
        <AdminLayer>
            <AbilityScreen />
        </AdminLayer>
    )
}