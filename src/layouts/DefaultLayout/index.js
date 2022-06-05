import Sidebar from '~/layouts/components/Sidebar';
import Title from '~/layouts/components/Title';

function DefaultLayout({ children }) {
    return (
        <div>
            <Sidebar />
            <div>
                <Title />
                <div>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
