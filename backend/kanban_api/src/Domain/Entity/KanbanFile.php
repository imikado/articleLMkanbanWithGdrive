<?php

namespace App\Domain\Entity;

class KanbanFile
{
    public $id;
    public $title;
    public $columnList;
    public $taskList;

    public function __construct($id, $title, $columnList = [], $taskList = [])
    {
        $this->id = $id;
        $this->title = $title;
        $this->columnList = $columnList;
        $this->taskList = $taskList;
    }
}
