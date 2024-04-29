<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\Request;

class ContentService
{

    protected $path;

    protected $gdriveService;
    protected $sessionService;

    public function __construct(Request $request)
    {
        $this->gdriveService = new GDriveService($request);
        $this->path = __DIR__ . '/assets/content.json';
    }

    private function getDriveService(): GDriveService
    {
        return $this->gdriveService;
    }


    private function getSessionFileId()
    {
        return $this->gdriveService->getSessionFileId();
    }

    public function getContent($fileId): object
    {
        //return json_decode(file_get_contents($this->path));
        $gdriveFile = $this->getDriveService()->readFile($fileId);
        return json_decode($gdriveFile->content);
    }

    public function writeContent($fileId, object $contentObj)
    {
        return $this->getDriveService()->updateFile($fileId, json_encode($contentObj));
    }
}
