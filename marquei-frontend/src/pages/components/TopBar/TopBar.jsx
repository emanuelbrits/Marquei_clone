import "./styleTopBar.css"
import { supabase } from '../../../lib/helper/supabaseClient';
import { useNavigate } from 'react-router-dom';

export function TopBar() {
    const navigate = useNavigate();

    async function signOutUser() {
        const { error } = await supabase.auth.signOut();
        navigate("/login");
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top" id="TopBarGeral">
            <div class="navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav w-100" id="TopBar">
                    <div className="esquerda">
                        <div className="marquei">
                            <h1>Marquei</h1>
                        </div>
                    </div>
                    <div className="direita">
                        <div className="nomeUsuario">
                            <span>Ola, user</span>
                        </div>
                        <div className="botaoSair">
                            <button className="btn btn-danger" onClick={signOutUser} id="botaoSair">Sair</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default TopBar