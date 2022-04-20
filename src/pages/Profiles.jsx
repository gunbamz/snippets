import { useSelector } from "react-redux";
import { useEffect } from "react";
//import { useNavigate }  from "react-router-dom";

const Profiles = () => {
    const { users }  = useSelector((state) => state.user);

    useEffect(() => {    
    }, []);

    return (
        <article>
            <h2>Users List</h2>
            <ul>
                {users && users.map((user, i) => <li key={i}>{user?.userName}</li>)}
            </ul>
        </article>
    );
};

export default Profiles;