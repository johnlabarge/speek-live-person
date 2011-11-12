<?xml version="1.0"?>
<vxml version="2.1">
<form>
   <property name="timeout" value="4s"/>
  <property name="com.nuance.client.AllowBargeIn" value="false"/>
  <field name="voiceCapture">
  <grammar type="text/grxml" src="/speek-live-person/grammar/grxml"/>
    <prompt> ${message} </prompt>
    <catch event="nomatch">
        <block><prompt>does not match</prompt></block>
        <goto next="#hold"/>
    </catch>
    <catch event="noinput">
        <block><prompt>no input</prompt></block>
        <goto next="#hold"/>
    </catch>
    <filled>
        <assign name="voiceCapture" expr="voiceCapture$.interpretation"/>
        <submit next="/speek-live-person/vxml/voice?callerid=${callerid}" namelist="voiceCapture"/>
    </filled>
  </field>
</form>
<form id="hold">
          <block>
          <goto next="/speek-live-person/vxml/hold?callerid=${callerid}" fetchint="safe"/>
          </block>
</form>
</vxml>