import styles from './Home.module.css';
import {Link} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getMe} from "../services/auth.service.ts";

export default function Home() {
    const token = localStorage.getItem('token');

    const { data: user, isLoading, isError }: any = useQuery({
        queryKey: ['me'],
        queryFn: getMe,
        enabled: !!token
    });

    function Username() {
        if (isLoading) return <span>Loading...</span>;
        else if (!token || isError) return <span>Not logged in</span>;
        else return <span>{user.username}</span>;
    }

    return (
        <div className={styles.container}>
            <h1>Bienvenue sur MailerPro</h1>
            <p>Ceci est votre nouvelle page d'accueil vide.</p>
            <Link to="/login"><button>login</button></Link>
            <Link to="/register"><button>register</button></Link>
            <div>
                <button>
                    <Username />
                </button>
            </div>
        </div>
    );
}
