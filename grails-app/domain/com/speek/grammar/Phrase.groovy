package com.speek.grammar

class Phrase
{
    String text;

    static constraints = {
        meaning(nullable:false)
        text(blank:false, unique:true)
    }

    static belongsTo = [meaning:Meaning];




}
