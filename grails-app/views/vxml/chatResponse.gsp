<?xml version="1.0"?>
<vxml version="2.1">


<form>
  <property name="timeout" value="3s"/>
  <property name="com.nuance.client.AllowBargeIn" value="false"/>
  <field name="dummy">
  <grammar type="text/gsl"> [ aoenrvaeonrvaoenv ] </grammar>
    <prompt> ${message} </prompt>
    <catch event="noinput nomatch">
        <goto next="#hold"/>
    </catch>
    <filled>
    <!-- this shouldn't happen, but just in case -->
        <goto next="#hold"/>
    </filled>
  </field>
</form>

     <form id="hold">

          <block>
          <goto next="/speek-live-person/vxml/hold?callerid=${callerid}" fetchint="safe"/>
          </block>
    </form>
</vxml>