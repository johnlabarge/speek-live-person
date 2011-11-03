(function() {
  var Meaning, Phrase;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.MeaningList = (function() {
    __extends(MeaningList, Backbone.Collection);
    function MeaningList() {
      MeaningList.__super__.constructor.apply(this, arguments);
    }
    MeaningList.prototype.url = '/speek-live-person/meaning';
    MeaningList.prototype.model = function(attributes) {
      return new Meaning(attributes);
    };
    MeaningList.prototype.initialize = function() {
      console.log(this.model);
      console.log(this.url);
      return this;
    };
    MeaningList.prototype.fetch = function(options) {
      MeaningList.__super__.fetch.call(this, options);
      return this.each(function(meaning) {
        meaning.get("phrases").fetch();
        return this;
      });
    };
    return MeaningList;
  })();
  window.PhraseList = (function() {
    __extends(PhraseList, Backbone.Collection);
    function PhraseList() {
      this.url = __bind(this.url, this);
      PhraseList.__super__.constructor.apply(this, arguments);
    }
    PhraseList.prototype.meaning = {};
    PhraseList.prototype.model = function(attributes) {
      return new Phrase(attributes);
    };
    PhraseList.prototype.url = function() {
      return "/speek-live-person/phrase/}";
    };
    return PhraseList;
  })();
  ({
    initialize: function() {
      console.log(this.model);
      console.log(this.url);
      console.log(this.meaningId);
      return this;
    }
  });
  Meaning = (function() {
    __extends(Meaning, Backbone.Model);
    function Meaning() {
      Meaning.__super__.constructor.apply(this, arguments);
    }
    Meaning.prototype.url = function() {
      if (this.get('id')) {
        return "/speek-live-person/meaning/" + (this.get('id'));
      }
      return "/speek-live-person/meaning";
    };
    Meaning.prototype.initialize = function() {
      console.log('meaning initializer');
      this.set({
        'text': 'something meaningful'
      });
      this.set({
        'phrases': new PhraseList
      });
      this.get('phrases').meaning = this;
      return console.log(this.get('phrases').meaning);
    };
    Meaning.prototype.createPhrase = function(attributes) {
      var phrase;
      console.log('create phrase');
      phrase = new Phrase(attributes);
      phrase.collection = this.get('phrases');
      phrase.set(attributes);
      return this.get('phrases').create(phrase);
    };
    return Meaning;
  })();
  Phrase = (function() {
    __extends(Phrase, Backbone.Model);
    function Phrase() {
      Phrase.__super__.constructor.apply(this, arguments);
    }
    Phrase.prototype.url = function() {
      if (this.get('id')) {
        return "/speek-live-person/phrase/" + (this.get('id'));
      }
      return "/speek-live-person/phrase/" + (this.collection.meaning.get("id"));
    };
    Phrase.prototype.initialize = function() {
      return this.set({
        'text': 'something the user can say'
      });
    };
    return Phrase;
  })();
  window.Meanings = new MeaningList;
  console.log(Meanings);
  window.MeaningView = (function() {
    __extends(MeaningView, Backbone.View);
    function MeaningView() {
      this.addOne = __bind(this.addOne, this);
      this.deleteMeaning = __bind(this.deleteMeaning, this);
      this.render = __bind(this.render, this);
      this.initialize = __bind(this.initialize, this);
      MeaningView.__super__.constructor.apply(this, arguments);
    }
    MeaningView.prototype.tagName = "div";
    MeaningView.prototype.template = _.template($('#meaning-view').html());
    MeaningView.prototype.events = {
      "click .new-phrase": "newPhrase",
      "click div.delete": "deleteMeaning"
    };
    MeaningView.prototype.initialize = function() {
      console.log("initializing MeaningView");
      console.log(this.model);
      this.model.bind('change', this.render);
      this.model.view = this;
      this.model.get('phrases').bind('add', this.addOne);
      this.model.get('phrases').bind('addAll', this.addAll);
      return this;
    };
    MeaningView.prototype.render = function() {
      $(this.el).html(this.template(this.model.toJSON()));
      $(this.el).addClass(".meaningEditor");
      this.setContent();
      return this;
    };
    MeaningView.prototype.setContent = function() {
      var content;
      content = this.model.get('text');
      return this.$('.meaning-content').text(content);
    };
    MeaningView.prototype.newPhrase = function() {
      var phraseText;
      phraseText = this.$('.new-phrase-input').val();
      console.log(this.model.get('phrases').url());
      this.model.createPhrase({
        'text': phraseText
      });
      return this;
    };
    MeaningView.prototype.deleteMeaning = function() {
      return this.model.destroy;
    };
    MeaningView.prototype.addOne = function(phrase) {
      var view;
      view = new PhraseView({
        model: phrase
      });
      console.log("new phrase");
      return this.$('.phrases').append(view.render().el);
    };
    MeaningView.prototype.addAll = function() {
      return this.model.get('phrases').each(this.addOne);
    };
    return MeaningView;
  })();
  window.PhraseView = (function() {
    __extends(PhraseView, Backbone.View);
    function PhraseView() {
      this.render = __bind(this.render, this);
      this.updatePhrase = __bind(this.updatePhrase, this);
      this.editPhrase = __bind(this.editPhrase, this);
      this.deletePhrase = __bind(this.deletePhrase, this);
      this.initialize = __bind(this.initialize, this);
      PhraseView.__super__.constructor.apply(this, arguments);
    }
    PhraseView.prototype.tagName = "div";
    PhraseView.prototype.template = _.template($('#phrase-view').html());
    PhraseView.prototype.events = {
      "click div.delete": "deletePhrase",
      "dblclick div.phrase-content": "editPhrase",
      "mouseout div.phrase-input": "updatePhrase",
      "keypress .phrase-input": "updatePhrase"
    };
    PhraseView.prototype.initialize = function() {
      this.model.bind('change', this.render);
      return this.model.view = this;
    };
    PhraseView.prototype.deletePhrase = function(e) {
      return this.model.destroy({
        success: function(model, response) {
          return this.remove();
        }
      });
    };
    PhraseView.prototype.editPhrase = function(e) {
      return $(this.el).addClass(".textInputEdit");
    };
    PhraseView.prototype.updatePhrase = function(e) {
      return this.model.set("text", $(this.el).val());
    };
    PhraseView.prototype.render = function() {
      console.log("render");
      $(this.el).html(this.template(this.model.toJSON()));
      this.setContent();
      return this;
    };
    PhraseView.prototype.setContent = function() {
      var content;
      console.log("set content");
      content = this.model.get('text');
      console.log("content:" + content);
      return this.$('.phrase_text').text(content);
    };
    return PhraseView;
  })();
  window.GrammarView = (function() {
    __extends(GrammarView, Backbone.View);
    function GrammarView() {
      this.addAll = __bind(this.addAll, this);
      this.newMeaning = __bind(this.newMeaning, this);
      this.render = __bind(this.render, this);
      this.initialize = __bind(this.initialize, this);
      GrammarView.__super__.constructor.apply(this, arguments);
    }
    GrammarView.prototype.el = $("#grammarEditor");
    GrammarView.prototype.template = _.template($('#newMeaning').html());
    GrammarView.prototype.events = {
      "click button.new-meaning": "newMeaning"
    };
    GrammarView.prototype.initialize = function() {
      Meanings.bind('add', this.addOne);
      Meanings.bind('addAll', this.addAll);
      Meanings.bind('reset', this.addAll);
      Meanings.fetch();
      this.views = new Array;
      return this.render();
    };
    GrammarView.prototype.render = function() {
      console.log('editor rendering');
      $(this.el).html(this.template(Meanings.toJSON()));
      return this;
    };
    GrammarView.prototype.newMeaning = function() {
      var meaning, text;
      console.log("new meaning");
      text = $(".newMeaningInput").val();
      console.log("meaning.text=" + text);
      console.log("xalling Meanings.create url=" + Meanings.url);
      return meaning = Meanings.create({
        "text": text
      });
    };
    GrammarView.prototype.addOne = function(meaning) {
      var view;
      console.log("addOne:");
      console.log(meaning);
      view = new MeaningView({
        model: meaning
      });
      console.log("new meaning");
      return $("#grammarEditor").append(view.render().el);
    };
    GrammarView.prototype.addAll = function() {
      return Meanings.each(this.addOne);
    };
    return GrammarView;
  })();
  console.log('coffescript loaded');
  window.App = new GrammarView;
}).call(this);
