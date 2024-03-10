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
    }

    private function getDriveService(): GDriveService
    {
        return $this->gdriveService;
    }


    private function getSessionFileId()
    {
        return $this->gdriveService->getSessionFileId();
    }

    public function getContent(): object
    {
        $gdriveFile = $this->getDriveService()->readFile($this->getSessionFileId());
        return json_decode($gdriveFile->content);
        //return json_decode(file_get_contents($this->path));
    }

    public function writeContent(object $contentObj)
    {
        return $this->getDriveService()->updateFile($this->getSessionFileId(), json_encode($contentObj));
    }
}
