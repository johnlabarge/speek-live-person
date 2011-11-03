<?xml version= "1.0"?> 
<grammar xmlns="http://www.w3.org/2001/06/grammar" xml:lang="en-US" version="1.0" root="PERSONAL_OPTIONS_MENU" mode="voice" tag-format="semantics/1.0"> 
<rule id="phrases" scope="public">

    <one-of>
    <g:each in="${meanings}" var="meaning">
    <item>
        <one-of>
            <g:each in="${meaning.phrases}" var="phrase">
            <item> ${phrase.text}</item>
            </g:each>
        </one-of>
        <tag>out.value = "${meaning.text}"</tag>
    </item>
    </g:each>
   </one-of>
 </rule>
</grammar>
