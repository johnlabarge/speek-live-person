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
    this.each (meaning) ->
      meaning.get("phrases").fetch()
      return this;


class window.PhraseList extends Backbone.Collection

   model: (attributes) ->
     return new Phrase(attributes)

   url: =>
     return "/speek-live-person/phrase/"

  initialize: ->
    console.log this.model
    console.log this.url
    console.log this.meaningId

    return this



class Meaning extends Backbone.Model

  url: ->
     return "/speek-live-person/meaning/#{this.get('id')}" if this.get('id')
     return "/speek-live-person/meaning" #otherwise

  initialize: =>
    console.log 'meaning initializer'
    @set 'text' : 'something meaningful'
    @set 'phrases': new PhraseList
    @get('phrases').meaning = this
    console.log @get('phrases').meaning
    this.bind('change',this.fetch_success)

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
     return "/speek-live-person/phrase/#{this.collection.meaning.get("id")}" #otherwise

  initialize: ->
    @set 'text' : 'something the user can say'

window.Meanings = new MeaningList
#window.Phrases = new PhraseList
console.log Meanings


class window.MeaningView extends Backbone.View
  tagName: "div"

  template: _.template($('#meaning-view').html())
  events:
     "click .new-phrase"     : "newPhrase"
     "click div.delete"      : "deleteMeaning"

  initialize: =>
   console.log "initializing MeaningView"
   console.log @model
   #@model = meaning
   @model.bind 'change', @render
   @model.view = @
   @model.get('phrases').bind('add',this.addOne)
   @model.get('phrases').bind('addAll',this.addAll)
   return this

  render: =>
    $(this.el).html(this.template(this.model.toJSON()))
    $(this.el).addClass(".meaningEditor")
    this.setContent()
    return this

  setContent: ->
   content = this.model.get('text');
   this.$('.meaning-content').text(content);
   #this.input = this.$('.meaning-input');
   #this.input.bind('blur', this.close);
   #this.input.val(content);

  newPhrase: ->
    phraseText = this.$('.new-phrase-input').val()
    console.log @model.get('phrases').url()
    @model.createPhrase({'text':phraseText})

    return this;

  deleteMeaning: =>
   this.model.destroy


  addOne: (phrase) =>
    view = new PhraseView model:phrase
    console.log "new phrase"
    this.$('.phrases').append(view.render().el)

   addAll: ->
    this.model.get('phrases').each this.addOne


class window.PhraseView extends Backbone.View

  tagName: "div"
  template:_.template($('#phrase-view').html())

  events:
    "click div.delete" : "deletePhrase"
    "dblclick div.phrase-content" : "editPhrase"
    "mouseout div.phrase-input" : "updatePhrase"
    "keypress .phrase-input"      : "updatePhrase"

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
    console.log "render"
    $(this.el).html(this.template(this.model.toJSON()))
    this.setContent()
    return this

  setContent: ->
   console.log "set content"
   content = this.model.get('text')
   console.log "content:#{content}"
   this.$('.phrase_text').text(content)
   #this.input = this.$('.meaning-input');
   #this.input.bind('blur', this.close);
   #this.input.val(content);




class window.GrammarView   extends Backbone.View
  el: $("#grammarEditor")

  template: _.template($('#newMeaning').html())

  events:
    "click button.new-meaning" : "newMeaning"

  initialize: =>
     Meanings.bind('add', this.addOne)
     Meanings.bind('addAll',this.addAll)
     Meanings.bind('reset',this.addAll)
     Meanings.fetch();
     this.views = new Array
     this.render()

  render: =>
    console.log 'editor rendering'
    $(this.el).html(this.template(Meanings.toJSON()))
    return this

  newMeaning: =>
    console.log "new meaning"
    text = $(".newMeaningInput").val()
    console.log "meaning.text=#{text}"
    console.log "xalling Meanings.create url=#{Meanings.url}"
    meaning = Meanings.create({"text":text});

  addOne: (meaning) ->
    console.log "addOne:"
    console.log meaning
    view = new MeaningView model:meaning
    console.log "new meaning"
    $("#grammarEditor").append(view.render().el)

  addAll: =>
    Meanings.each this.addOne

console.log 'coffescript loaded'
window.App = new GrammarView

