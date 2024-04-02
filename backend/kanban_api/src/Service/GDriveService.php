<?php

namespace App\Service;

use App\Domain\Entity\GDriveFile;
use Google\Client;
use Google\Service\Drive;
use Google\Service\Drive\DriveFile;
use Symfony\Component\HttpFoundation\Request;

class GDriveService
{
    protected $client;
    protected $driveService;

    protected $redirectUri = 'https://dupot-kanban.com/api.php';

    protected $sessionService;

    public function __construct(Request $request)
    {

        $client = new Client();
        $client->setAuthConfig(__DIR__ . '/../../../gdrive/auth.json');
        $client->setRedirectUri($this->redirectUri);
        $client->addScope("https://www.googleapis.com/auth/drive");

        $this->sessionService = new SessionService($request->getSession());

        $this->client = $client;

        if ($this->sessionService->hasToken()) {
            $this->setAccessToken($this->sessionService->getToken());
        }
    }

    public function getInstallUrl()
    {
        $this->client->addScope("https://www.googleapis.com/auth/drive.install");
        $scopes = ["https://www.googleapis.com/auth/drive.install"];
        $authUrl = $this->client->createAuthUrl($scopes, ['enable_serial_consent' => 'true']);
        return $authUrl;
    }

    public function getSessionFileId()
    {
        return $this->sessionService->getFileId();
    }

    public function saveFileIdInSession($fileId)
    {
        $this->sessionService->saveFileId($fileId);
    }

    public function fetchAndSaveAccessTokenWithAuthCode($code)
    {
        $token = $this->client->fetchAccessTokenWithAuthCode($code);

        $this->setAccessToken($token);

        $this->sessionService->saveToken($token);
    }

    public function setAccessToken($token)
    {
        $this->client->setAccessToken($token);
    }

    public function getDriveService(): Drive
    {
        return new Drive($this->client);;
    }

    public function createFileInFolder($filename, $content, $folderId)
    {

        $fileMetadata = new Drive\DriveFile(array(
            'name' => $filename,
            'parents' => [$folderId]
        ));
        $file = $this->getDriveService()->files->create($fileMetadata, array(
            'data' => $content,
            'mimeType' => 'application/dupot.kanban',
            'uploadType' => 'multipart',
            'fields' => 'id',

        ));

        return $file;
    }

    public function updateFile($fileId, $content)
    {

        $driveFile = new DriveFile();


        return $this->getDriveService()->files->update($fileId, $driveFile, ['data' => $content]);
    }

    public function readFile($fileId): GDriveFile
    {

        $file =  $this->getDriveService()->files->get($fileId);


        $response =  $this->getDriveService()->files->get($fileId, ['alt' => 'media']);

        $content = $response->getBody()->getContents();


        return new GDriveFile($fileId, $file->name, $content); // (object)['id' => $fileId, 'name' => $file->name, 'content' => $content];
    }
}
