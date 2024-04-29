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
    protected function getService(Request $request): ContentService
    {
        return new ContentService($request);
    }

    #[Route('/content', methods: ['GET', 'HEAD'])]
    public function index(Request $request): Response
    {
        $fileId = $request->get('fileId');

        $content = $this->getService($request)->getContent($fileId);

        return new JsonResponse($content);
    }


    #[Route('/saveContent', methods: ['POST', 'HEAD', 'GET'])]
    public function save(Request $request): Response
    {
        $contentObj = json_decode($request->getContent());
        $fileId = $contentObj->fileId;

        $this->getService($request)->writeContent($fileId, $contentObj);

        $objectResponse = (object)[
            'status' => 'OK',
            //'debug'=>$gdriveResponse
        ];

        return new JsonResponse($objectResponse);
    }
}
