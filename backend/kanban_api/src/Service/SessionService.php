<?php

namespace App\Service;

use App\Domain\Entity\GDrive;
use Symfony\Component\HttpFoundation\Session\Session;

class SessionService
{

    protected $requestSession;

    public function __construct(Session $requestSession)
    {
        $this->requestSession = $requestSession;
    }

    public function saveToken($token)
    {
        $this->requestSession->set(Gdrive::TOKEN, $token);
    }

    public function saveFileId($fileId)
    {
        $this->requestSession->set(Gdrive::FILE_ID, $fileId);
    }

    public function hasToken(): bool
    {
        return $this->requestSession->has(Gdrive::TOKEN);
    }

    public function getToken()
    {
        return $this->requestSession->get(Gdrive::TOKEN);
    }

    public function getFileId()
    {
        return $this->requestSession->get(Gdrive::FILE_ID);
    }
}
