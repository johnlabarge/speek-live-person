package com.speek.grammar

class Meaning
{

    static constraints = {
    }
    static hasMany = [phrases:Phrase]
    String text;

    void deletePhrase(Phrase phrase) {
        phrases.remove(phrase);
        phrase.delete();
        save();
    }
}
