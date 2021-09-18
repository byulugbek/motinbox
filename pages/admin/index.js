
import styled from 'styled-components';
import AdminLayer from '../../adminComponents/adminLayer';
import AHome from '../../adminComponents/aHome';

const Container = styled.div`

`

export default function AdminHome() {
    return (
        <AdminLayer>
            <AHome />
        </AdminLayer>
    )
}
