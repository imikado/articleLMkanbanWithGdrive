<?php

namespace App\Domain\Entity;

class GDriveFile
{
    public $id;
    public $name;
    public $content;

    public function __construct($id, $name, $content)
    {
        $this->id = $id;
        $this->name = $name;
        $this->content = $content;
    }
}
