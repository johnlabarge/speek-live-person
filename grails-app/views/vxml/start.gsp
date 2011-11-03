<?xml version="1.0"?>
 <vxml version="2.1">
   <form>
     <block>
        <prompt> Finding an agent, will be with you shortly  </prompt>

       <goto next="/speek-live-person/vxml/hold?callerid=${callerid}"  method="get" fetchhint="safe"/>
       </block>
   </form>
</vxml>
