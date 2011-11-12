<?xml version="1.0"?>
<vxml version="2.1">


<form>
  <property name="timeout" value="1s"/>
  <property name="bargein" value="on"/>
  <field name="voiceCapture">
    <grammar type="text/grxml" src="/speek-live-person/grammar/grxml"/>
    <prompt> <break time="5s"/> </prompt>
    <catch event="noinput nomatch">
        <goto next="#deliverMessages"/>
    </catch>
    <filled>
        <assign name="voiceCapture" expr="voiceCapture$.interpretation"/>
        <submit next="/speek-live-person/vxml/voice?callerid=${callerid}" namelist="voiceCapture"/>
    </filled>
  </field>
</form>

     <form id="deliverMessages">

          <block>
          <goto next="/speek-live-person/deliverchatmessage?callerid=${callerid}" fetchint="safe"/>
          </block>
    </form>
</vxml>