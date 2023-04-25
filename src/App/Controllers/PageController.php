<?php
namespace PAW\App\Controllers;

use PAW\Core\AbstractController;

class PageController extends AbstractController
{

    public function home()
    {
        $this->requireView("Inicio", "home", "home");
    }

    public function turnos()
    {
        $this->requireView("Turnos", "turnos", "turnos");
    }

    public function institucional()
    {
        $this->requireView("Institucional", "institucional", "institucional");
    }

    public function noticias()
    {
        $this->requireView("Noticias", "noticias", "noticias");
    }

    public function obrasSociales()
    {
        $this->requireView("Obras Sociales", "obras-sociales", "obras-sociales");
    }

    public function contacto()
    {
        $this->requireView("Contacto", "contacto", "contacto");
    }

    public function iniciarSesion()
    {
        $this->requireView("Iniciar Sesión", "iniciar-sesion", "iniciar-sesion");
    }

    public function registrarse()
    {
        $this->requireView("Registrarse", "registrarse", "registrarse");
    }

    private function requireView($title, $view, $style)
    {
        require $this->viewsDirectory . "{$view}.view.php";
    }
}

?>