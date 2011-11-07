package speek.live.person

import com.speek.grammar.Meaning

class GrammarController
{

    def grxml = {

         ['meanings':Meaning.list()]
    }
}
