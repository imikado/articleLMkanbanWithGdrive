<?php

namespace App\Service;

use App\Domain\Entity\GDrive;
use Symfony\Component\HttpFoundation\Session\Session;

class SessionService
{

    const GSTATE = 'gDriveState';

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

    public function hasGdriveSessionState()
    {
        return $this->requestSession->has(self::GSTATE);
    }
    public function getGdriveSessionState()
    {
        return json_decode(base64_decode($this->requestSession->get(self::GSTATE)));
    }
    public function saveGdriveSessionState(object $gState)
    {
        return $this->requestSession->set(self::GSTATE, base64_encode(json_encode($gState)));
    }
    public function removeGdriveSessionState()
    {
        $this->requestSession->remove(self::GSTATE);
    }
}
