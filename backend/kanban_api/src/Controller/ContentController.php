<?php

namespace App\Controller;

use App\Service\ContentService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ContentController extends AbstractController
{
    protected function getService(): ContentService
    {
        return new ContentService();
    }

    #[Route('/content', methods: ['GET', 'HEAD'])]
    public function index(): Response
    {

        $content = $this->getService()->getContent();

        return new JsonResponse($content);
    }

    #[Route('/saveContent', methods: ['POST', 'HEAD', 'GET'])]
    public function save(Request $request): Response
    {
        $contentObj = json_decode($request->getContent());

        $this->getService()->writeContent($contentObj);

        return new JsonResponse('OK');
    }
}
