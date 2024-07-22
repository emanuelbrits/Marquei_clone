import { useEffect, useRef, useState } from "react"
import { supabase } from '../../lib/helper/supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { Link, useNavigate } from "react-router-dom"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { Helmet } from "react-helmet"
import "./styleLogin.css"

export function LoginPage() {
    const navigate = useNavigate()

    const [user, setUser] = useState(null)

    useEffect(() => {
        const session = supabase.auth.getSession();
        setUser(session?.user);
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            switch (event) {
                case "SIGNED_IN":
                    setUser(session?.user)
                    navigate("/")
                    break;
                case "SIGNED_OUT":
                    setUser(null)
                    break
                default:
            }
        })

        return () => {
            authListener.subscription.unsubscribe()
        }
    }, [])

    return (
        <div class="container text-center " id="login">
            <Helmet>
                <title>Marquei - Login</title>
            </Helmet>
            <div className="cardLogin">
                <h1>Marquei</h1>
                <Auth
                    supabaseClient={supabase}
                    localization={{
                        variables: {
                            sign_in: {
                                email_label: '',
                                email_input_placeholder: `Digite seu e-mail`,
                                password_input_placeholder: 'Digite sua senha',
                                password_label: '',
                                button_label: 'Entrar',
                                social_provider_text: "Entrar com Google",
                                loading_button_label: 'Entrando ...',
                                link_text: 'Entrar',
                            },
                            sign_up: {
                                email_label: '',
                                email_input_placeholder: 'Digite seu e-mail',
                                password_input_placeholder: 'Digite sua senha',
                                password_label: '',
                                button_label: 'Criar conta',
                                social_provider_text: "Entrar com Google",
                                loading_button_label: 'Entrando ...',
                                link_text: 'Criar conta'
                            },
                            forgotten_password: {
                                email_label: 'E-mail',
                                email_input_placeholder: 'Digite seu e-mail',
                                password_input_placeholder: 'Digite sua senha',
                                password_label: '',
                                button_label: 'Enviar instruções para recuperar conta',
                                link_text: 'Esqueceu sua senha ?'
                            }
                        },
                    }}
                    appearance={{
                        theme: ThemeSupa,
                        className: {
                            button: 'botaoLogin',
                        },
                        variables: {
                            default: {
                                colors: {
                                    brand: 'green',
                                    brandAccent: 'tomato',
                                },
                            },
                        },
                    }}
                    providers={["google"]}
                    showLinks={true}
                    
                />
            </div>
        </div>
    )
}

export default LoginPage