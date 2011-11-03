<?xml version="1.0"?>
<vxml version="2.1">


<form>
  <property name="timeout" value="1s"/>
  <property name="bargein" value="off"/>
  <field name="dummy">
  <grammar type="text/gsl"> [ aoenrvaeonrvaoenv ] </grammar>
    <prompt> <break time="5s"/> </prompt>
    <catch event="noinput nomatch">
        <goto next="#deliverMessages"/>
    </catch>
    <filled>
    <!-- this shouldn't happen, but just in case -->
        <goto next="#deliverMessages"/>
    </filled>
  </field>
</form>

     <form id="deliverMessages">

          <block>
          <goto next="/speek-live-person/deliverchatmessage?callerid=${callerid}" fetchint="safe"/>
          </block>
    </form>
</vxml>