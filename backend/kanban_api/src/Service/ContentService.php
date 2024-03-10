<?php

namespace App\Service;

class ContentService
{

    protected $path;

    public function __construct()
    {
        $this->path = __DIR__ . '/assets/content.json';
    }

    public function getContent(): object
    {
        return json_decode(file_get_contents($this->path));
    }

    public function writeContent(object $contentObj)
    {
        file_put_contents($this->path, json_encode($contentObj));
    }
}
