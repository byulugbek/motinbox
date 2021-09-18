import AdminLayer from "../../../../../adminComponents/adminLayer";
import AbilityScreen from '../../../../../adminComponents/screens/abilityScreen';

export default function Id({ ability }) {
    return (
        <AdminLayer>
            <AbilityScreen data={ability} />
        </AdminLayer>
    )
}

Id.getInitialProps = async (ctx) => {
    const { type, id } = ctx.query;

    if (type !== 'abilities' && type !== 'socials') {
        return {};
    };

    const res = await fetch(`http://localhost:3000/api/${type}/${id}`);

    const { data } = await res.json();


    return { ability: data };
}