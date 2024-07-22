import { useEffect, useRef, useState } from "react"
import { supabase } from '../../lib/helper/supabaseClient'
import { Link, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"
import "./styleHomePage.css"
import BottomBar from "../components/BottomBar/BottomBar.jsx"

export function HomePage() {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});

    async function signOutUser() {
        const { error } = await supabase.auth.signOut();
        navigate("/login");
    }

    useEffect(() => {
        async function getUserData() {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
            }
            setLoading(false);
        }

        getUserData();
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading">Carregando...</div>
            </div>
        );
    }

    return (
        <div class="">
            <Helmet>
                <title>Marquei - Home</title>
            </Helmet>
            {Object.keys(user).length !== 0 ?
                <>
                    <BottomBar></BottomBar>
                    <div className="text-center">
                        <h1>Oi</h1>
                    </div>
                </> :
                <>
                    <div className="text-center">
                        <h1>Você não está logado</h1>
                        <button className="btn btn-success" onClick={() => { navigate("/login") }} id="botaoEntrar">Entrar</button>
                    </div>
                </>
            }
        </div>
    )
}

export default HomePage