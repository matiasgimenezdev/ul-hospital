<?php 

namespace PAW\App\Controllers;
use PAW\Core\AbstractController;
use PAW\Core\Renderer;
use PAW\App\Controllers\NoticiasController;

class HomeController extends AbstractController {
    
    public function home() 
    {
        $noticiasController = new NoticiasController;
        $noticias = $noticiasController -> ultimasNoticias(3);
        $renderer = Renderer::getInstance();
        $templateLoader =  $renderer->getTemplateLoader();
        $template = $templateLoader->load('inicio.html');
        echo $template->render(['headerMenu' => $this -> headerMenu,'footerMenu' => $this -> footerMenu, 
            'title' => "Inicio", 'style' => "home", 'noticias' => $noticias]);
    }
}
?>