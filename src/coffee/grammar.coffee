class window.MeaningList extends Backbone.Collection
  url  : '/speek-live-person/meaning'

  model: (attributes) ->
    return new Meaning(attributes);

  initialize: ->
    console.log this.model
    console.log this.url
    return this

  fetch: (options) ->
    super(options)


class window.PhraseList extends Backbone.Collection


   constructor: (@meaning) ->
     super([],{});
     console.log "PhraseList constructor"
     console.log @meaning


   model: (attributes) ->
     return new Phrase(attributes)

   url: =>
     return "/speek-live-person/phrase/#{@meaning.get('id')}"

   initialize: ->
     @resourceId = @meaning.id
     return this

   create: (attributes) ->
     phrase = new Phrase
     phrase.set 'text':attributes.text
     console.log(attributes)
     console.log(phrase)
     phrase.collection = this
     super(phrase)



class Meaning extends Backbone.Model

  url: ->
     return "/speek-live-person/meaning/#{this.get('id')}" if this.get('id')
     return "/speek-live-person/meaning" #otherwise

  initialize: =>
    console.log 'meaning initializer'
    @set 'text' : 'something meaningful'
#    @set 'phrases': new PhraseList
 #   @get('phrases').meaning = this
 #   console.log @get('phrases').meaning
 #   this.bind('change',this.fetch_success)

  createPhrase: (attributes)->
    console.log 'create phrase'
    phrase = new Phrase(attributes)
    console.log this
    phrase.collection = @get('phrases')
    phrase.set attributes
    console.log phrase
    @get('phrases').create(phrase)

  fetch_success: ->
    if (this.fetching)
       console.log "fetch_sucess"
       tempPhrases = new PhraseList(@get('phrases'))
       tempPhrases.meaning = this
       this.fetching = false
       @set('phrases',tempPhrases)

    return this

  fetch: (options)->
    this.fetching = true
    super options


class Phrase extends Backbone.Model
  url: ->
     return "/speek-live-person/phrase/#{this.get('id')}" if this.get('id')
     return "/speek-live-person/phrase/#{this.collection.resourceId}" #otherwise

  initialize: ->
    @set 'text' : 'something the user can say'

window.Meanings = new MeaningList
#window.Phrases = new PhraseList
console.log Meanings


class window.MeaningView extends Backbone.View

  tagName: "div"

  template: _.template($('#meaningView').html())
  events:
     "click div.delete"      : "deleteMeaning"
     "click"                 : "toggleSelected"

  meaningViews: new Array

  constructor: (args) ->
     super(args)
     this.meaningViews[this.meaningViews.length] = this;
     @selected = false;
     @phrasesView = null;


  initialize: =>
   #@model = meaning
   @model.bind 'change', @render
   @model.view = @
   return this

  toggleSelected: ->
   if (@selected)
     this.deselect()
   else
     this.select()

  render: =>
    $(this.el).html(this.template(this.model.toJSON()))
    $(this.el).addClass("meaningView")
    this.setContent()
    return this

  setContent: ->
   content = this.model.get('text');
   this.$('.meaningText').text(content);
   #this.input = this.$('.meaning-input');
   #this.input.bind('blur', this.close);
   #this.input.val(content);

  deleteMeaning: =>
   this.model.destroy

  select: ->
   this.deselectAll();
   $(this.el).addClass('selected')
   @selected = true;
   this.showPhrasesView()


  deselect: ->
   $(this.el).removeClass('selected')
   @selected = false;
   this.clearPhrasesView()

  showPhrasesView: =>
    @phrasesView = new PhrasesView({'model':new PhraseList(@model)})

  clearPhrasesView: =>
    @phrasesView.clear() if @phrasesView;
    @phrasesView = null;

  deselectAll: ->
    view.deselect() for view in MeaningView::meaningViews

class window.PhrasesView extends Backbone.View

  tagName: 'div'

  el: $("#phrasesPanel")

  newPhraseTemplate: _.template($('#newPhrase').html())

#  events:
#    "click .addPhrase" : "doCreate"

  constructor: (args) ->
   super(args)
   @phraseViews = new Array

  initialize: =>
    this.render()
    @phraseViews = new Array
    @model.bind('add', this.addOne)
    @model.bind('addAll',this.addAll)
    @model.bind('reset',this.addAll)
    @model.fetch();
    return this

  render: =>
    this.$('#newPhrasePanel').html(this.newPhraseTemplate())
    this.$('.addPhrase').bind('click',@doCreate)
    return this


  doCreate: =>
   console.log("######  phraseView doCreate #{@model.meaning.get("id")}")
   text = this.$("#phraseEditor").val()
   @model.create({'text':text})
   this.$("#phraseEditor").val("")

  addOne: (phrase) =>
   view = new PhraseView model:phrase
   @phraseViews = new Array if !@phraseViews
   @phraseViews[@phraseViews.length] = view
   $("#phrases").append(view.render().el)


  addAll: =>
    @model.each this.addOne

  clear: =>
    this.$("#newPhrasePanel").html('')
    this.$("#phrases").html('')
    this.$(".addPhrase").unbind('click')
#Phrase View
class window.PhraseView extends Backbone.View

  tagName: "div"

  template:_.template($('#phraseView').html())

  events:
    "click .phraseDelete"       : "deletePhrase"
    "dblclick .phraseText"       : "editPhrase"
    "mouseout .phraseEdit"       : "updatePhrase"


  initialize:  =>
    @model.bind 'change', @render

    @model.view = @

  deletePhrase: (e) =>
    @model.destroy
       success: (model, response) ->
         this.remove()

  editPhrase: (e) =>
    $(this.el).addClass(".textInputEdit")

  updatePhrase: (e) =>
    @model.set("text", $(this.el).val())

  render: =>
    $(this.el).html(this.template(this.model.toJSON()))
    $(this.el).addClass("phraseView")
    this.setContent()
    return this

  setContent: ->
   content = this.model.get('text')
   this.$('.phraseText').text(content)
   #this.input = this.$('.phraseEdit');
   #this.input.bind('blur', this.close);
   #this.input.val(content);

  close: ->
   this.model.save({text: this.input.val()});
   $(this.el).removeClass("editing");

  edit: ->
   $(this.el).addClass("editing");
   this.$("phraseInput").focus();

  updateOnEnter: ->
   this.close() if (e.keyCode == 13)

  remove: ->
   $(this.el).remove()

  clear: ->
   this.model.clear()


class window.GrammarView extends Backbone.View

  el: $("#newMeaningPanel")

  template: _.template($('#newMeaning').html())

  events:
    "keypress .meaningEditor"       : "input"

  initialize: =>
    Meanings.bind('add', this.addOne)
    Meanings.bind('addAll',this.addAll)
    Meanings.bind('reset',this.addAll)
    Meanings.fetch();
    this.views = new Array
    this.render()

  render: =>
    $(this.el).html(this.template(Meanings.toJSON()))
    return this

  input: (e) ->
    console.log(e.keyCode == 13)
    if (e.keyCode == 13)
      this.doCreate()

  doCreate: ->
   text = $(".meaningEditor").val()
   meaning = Meanings.create({"text":text});
   this.$(".meaningEditor").val("")

  addOne: (meaning) ->
    view = new MeaningView model:meaning
    $("#meanings").append(view.render().el)

  addAll: =>
    Meanings.each this.addOne



console.log 'coffescript loaded'
window.App = new GrammarView
window.App.views[0].toggleSelected()

