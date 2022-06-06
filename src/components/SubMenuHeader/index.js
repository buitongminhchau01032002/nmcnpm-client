import { useLocation } from 'react-router-dom';

function SubMenuHeader({ children, to, className, activeClass, ...props }) {
    let localtion = useLocation();
    let firstPath = localtion.pathname.split('/')[1];
    const classes = className + ' ' + (firstPath === to.slice(1, to.length) ? activeClass : '');
    return (
        <label className={classes} {...props}>
            {children}
        </label>
    );
}

export default SubMenuHeader;
