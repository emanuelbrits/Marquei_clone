import "./styleBottomBar.css"

export function BottomBar() {

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-bottom" id="bottomBarGeral">
            <div class="navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav w-100" id="bottomBar">
                    <div className="inicio">
                        <a class="nav-item nav-link" href="/"><i class="bi bi-house-door-fill" id="iconesBottomBar"></i></a>
                        <span>Início</span>
                    </div>
                    <div className="minhaAgenda">
                        <a class="nav-item nav-link ml-auto" href="#"><i class="bi bi-calendar-fill" id="iconesBottomBar"></i></a>
                        <span>Minha Agenda</span>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default BottomBar