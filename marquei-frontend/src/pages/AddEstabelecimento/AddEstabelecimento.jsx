import "./styleAddEstabelecimento.css"
import { useEffect, useState, useRef } from "react"
import { supabase } from '../../lib/helper/supabaseClient'
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"
import BottomBar from "../components/BottomBar/BottomBar.jsx"
import TopBar from "../components/TopBar/TopBar.jsx"
import AddressInput from "../components/AdressInput/AdressInput.jsx"
import { Link } from "react-router-dom";

function loadGoogleMapsScript(callback) {
    const existingScript = document.getElementById('googleMaps');

    if (!existingScript) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.id = 'googleMaps';
        script.async = true;
        script.defer = true;
        script.onload = callback;
        document.body.appendChild(script);
    } else {
        callback();
    }
}

export function AddEstabelecimento() {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    const [nomeAdd, setNome] = useState('');
    const [endereco, setEndereco] = useState({ address: '', lat: null, lng: null });
    const [mapsLoaded, setMapsLoaded] = useState(false);

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

    useEffect(() => {
        loadGoogleMapsScript(() => setMapsLoaded(true));
    }, []);

    if (loading || !mapsLoaded) {
        return (
            <div className="loading-container">
                <div className="loading">Carregando...</div>
            </div>
        );
    }

    const handleAddEstabelecimento = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from('estabelecimento')
            .insert({
                nome: nomeAdd,
                endereco: endereco.address,
                lat: endereco.lat,
                long: endereco.lng,
            });

        if (error) {
            console.error(error);
        } else {
            window.alert('Estabelecimento adicionado!');
        }
    };

    return (
        <div class="">
            <Helmet>
                <title>Marquei - Home</title>
            </Helmet>
            {Object.keys(user).length !== 0 ?
                <>
                    <TopBar></TopBar>
                    <BottomBar></BottomBar>
                    <div className="form-container">
                        <div className="formProduto">
                            <form onSubmit={handleAddEstabelecimento}>
                                <div className="col">
                                    <div className="row-3">
                                        <div className="mb-3">
                                            <label htmlFor="InputNome" className="form-label">Nome</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="InputNome"
                                                placeholder="Digite o nome"
                                                value={nomeAdd}
                                                onChange={(e) => setNome(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="row-3">
                                        <div className="mb-3">
                                            <label htmlFor="InputEndereco" className="form-label">Endereço</label>
                                            <AddressInput setEndereco={setEndereco} />
                                        </div>
                                    </div>
                                    <div className="row-3" id="areaBotao">
                                        <button type="submit" className="mt-5 btn btn-primary" id="botaoSalvar">Salvar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
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

export default AddEstabelecimento