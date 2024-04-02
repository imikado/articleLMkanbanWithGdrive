<?php

namespace App\Controller;

ini_set('display_errors', 1);

use App\Domain\Entity\GDrive;
use App\Domain\Entity\KanbanFile;
use Google\Client;

use App\Service\ContentService;
use App\Service\GDriveService;
use App\Service\SessionService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GdriveController extends AbstractController
{

    const PARAM_CODE = 'code';
    const PARAM_ERROR = 'error';
    const PARAM_STATE = 'state';

    const PARAM_INSTALL = 'install';

    const STATE_ACTION_OPEN = 'open';
    const STATE_ACTION_CREATE = 'create';

    protected $gDriveService;

    protected $sessionService;

    #[Route('/')]
    public function gdrive(Request $request): Response
    {
        $gDriveService = new GDriveService($request);

        if ($request->query->has(self::PARAM_CODE)) {
            $gDriveService->fetchAndSaveAccessTokenWithAuthCode($request->query->get(self::PARAM_CODE));
        }

        if ($request->query->has(self::PARAM_ERROR)) {
            dd($request->query->get(self::PARAM_ERROR));
        }

        if ($request->query->has(self::PARAM_STATE)) {

            $state = json_decode(urldecode($request->query->get(self::PARAM_STATE)));

            if ($state->action == self::STATE_ACTION_OPEN) {

                $id = $state->ids[0];

                $gDriveService->saveFileIdInSession($id);

                return $this->redirect('index.html');
            } else if ($state->action == self::STATE_ACTION_CREATE) {

                $fileId = 'KanbanFile' . date('Y-m-d_Hi');

                $content = json_encode(new KanbanFile($fileId, 'Mon Kanban', json_decode('[{"id":"todo","name":"To do"},{"id":"running","name":"In progress"},{"id":"done","name":"Done"}]'), []));

                $response = $gDriveService->createFileInFolder($fileId . '.kanban', $content, $state->folderId);

                if (isset($response->id)) {
                    $gDriveService->saveFileIdInSession($response->id);

                    return $this->redirect('index.html');
                } else {
                    dd($response);
                }
            }
        } else if ($request->query->has(self::PARAM_INSTALL)) {
            return $this->redirect($gDriveService->getInstallUrl());

            // return new JsonResponse('OK');
        } else {
            return new JsonResponse('OK');
        }
    }
}
