#!/bin/bash
git:submodule:add(){
    git submodule add "$1" "$1"
    return $?
}