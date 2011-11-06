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
      return MeaningList.__super__.fetch.call(this, options);
    };
    return MeaningList;
  })();
  window.PhraseList = (function() {
    __extends(PhraseList, Backbone.Collection);
    function PhraseList(meaning) {
      this.meaning = meaning;
      this.url = __bind(this.url, this);
      PhraseList.__super__.constructor.call(this, [], {});
      console.log("PhraseList constructor");
      console.log(this.meaning);
    }
    PhraseList.prototype.model = function(attributes) {
      return new Phrase(attributes);
    };
    PhraseList.prototype.url = function() {
      return "/speek-live-person/phrase/" + (this.meaning.get('id'));
    };
    PhraseList.prototype.initialize = function() {
      this.resourceId = this.meaning.id;
      return this;
    };
    PhraseList.prototype.create = function(attributes) {
      var phrase;
      phrase = new Phrase(attributes);
      console.log(attributes);
      console.log(phrase);
      phrase.collection = this;
      return PhraseList.__super__.create.call(this, phrase);
    };
    return PhraseList;
  })();
  Meaning = (function() {
    __extends(Meaning, Backbone.Model);
    function Meaning() {
      this.initialize = __bind(this.initialize, this);
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
      return this.set({
        'text': 'something meaningful'
      });
    };
    Meaning.prototype.createPhrase = function(attributes) {
      var phrase;
      console.log('create phrase');
      phrase = new Phrase(attributes);
      console.log(this);
      phrase.collection = this.get('phrases');
      phrase.set(attributes);
      console.log(phrase);
      return this.get('phrases').create(phrase);
    };
    Meaning.prototype.fetch_success = function() {
      var tempPhrases;
      if (this.fetching) {
        console.log("fetch_sucess");
        tempPhrases = new PhraseList(this.get('phrases'));
        tempPhrases.meaning = this;
        this.fetching = false;
        this.set('phrases', tempPhrases);
      }
      return this;
    };
    Meaning.prototype.fetch = function(options) {
      this.fetching = true;
      return Meaning.__super__.fetch.call(this, options);
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
      return "/speek-live-person/phrase/" + this.collection.resourceId;
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
    MeaningView.prototype.tagName = "div";
    MeaningView.prototype.template = _.template($('#meaningView').html());
    MeaningView.prototype.events = {
      "click div.delete": "deleteMeaning",
      "click": "toggleSelected"
    };
    MeaningView.prototype.meaningViews = new Array;
    function MeaningView(args) {
      this.clearPhrasesView = __bind(this.clearPhrasesView, this);
      this.showPhrasesView = __bind(this.showPhrasesView, this);
      this.deleteMeaning = __bind(this.deleteMeaning, this);
      this.render = __bind(this.render, this);
      this.initialize = __bind(this.initialize, this);      MeaningView.__super__.constructor.call(this, args);
      this.meaningViews[this.meaningViews.length] = this;
      this.selected = false;
      this.phrasesView = null;
    }
    MeaningView.prototype.initialize = function() {
      console.log("initializing MeaningView");
      console.log(this.model);
      this.model.bind('change', this.render);
      this.model.view = this;
      return this;
    };
    MeaningView.prototype.toggleSelected = function() {
      console.log("toggle selected");
      if (this.selected) {
        return this.deselect();
      } else {
        console.log("selecting...");
        return this.select();
      }
    };
    MeaningView.prototype.render = function() {
      $(this.el).html(this.template(this.model.toJSON()));
      $(this.el).addClass("meaningView");
      this.setContent();
      return this;
    };
    MeaningView.prototype.setContent = function() {
      var content;
      content = this.model.get('text');
      console.log("setting content " + content);
      return this.$('.meaningText').text(content);
    };
    MeaningView.prototype.deleteMeaning = function() {
      return this.model.destroy;
    };
    MeaningView.prototype.select = function() {
      console.log("selecting...");
      this.deselectAll();
      $(this.el).addClass('selected');
      this.selected = true;
      return this.showPhrasesView();
    };
    MeaningView.prototype.deselect = function() {
      $(this.el).removeClass('selected');
      this.selected = false;
      return this.clearPhrasesView();
    };
    MeaningView.prototype.showPhrasesView = function() {
      console.log("creating phrases view: for " + this.model);
      return this.phrasesView = new PhrasesView({
        'model': new PhraseList(this.model)
      });
    };
    MeaningView.prototype.clearPhrasesView = function() {
      if (this.phrasesView) {
        this.phrasesView.clear();
      }
      return this.phrasesView = null;
    };
    MeaningView.prototype.deselectAll = function() {
      var view, _i, _len, _ref, _results;
      _ref = MeaningView.prototype.meaningViews;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        view = _ref[_i];
        _results.push(view.deselect());
      }
      return _results;
    };
    return MeaningView;
  })();
  window.PhrasesView = (function() {
    __extends(PhrasesView, Backbone.View);
    PhrasesView.prototype.tagName = 'div';
    PhrasesView.prototype.el = $("#phrasesPanel");
    PhrasesView.prototype.newPhraseTemplate = _.template($('#newPhrase').html());
    PhrasesView.prototype.events = {
      "click .addPhrase": "doCreate"
    };
    function PhrasesView(args) {
      this.clear = __bind(this.clear, this);
      this.addAll = __bind(this.addAll, this);
      this.addOne = __bind(this.addOne, this);
      this.render = __bind(this.render, this);
      this.initialize = __bind(this.initialize, this);      PhrasesView.__super__.constructor.call(this, args);
      this.phraseViews = new Array;
    }
    PhrasesView.prototype.initialize = function() {
      this.render();
      this.phraseViews = new Array;
      this.model.bind('add', this.addOne);
      this.model.bind('addAll', this.addAll);
      this.model.bind('reset', this.addAll);
      this.model.fetch();
      return this;
    };
    PhrasesView.prototype.render = function() {
      console.log('phrases rendering');
      this.$('#newPhrasePanel').html(this.newPhraseTemplate());
      return this;
    };
    PhrasesView.prototype.doCreate = function() {
      var text;
      console.log("######  phraseView doCreate");
      text = this.$("#phraseEditor").val();
      this.model.create({
        'text': text
      });
      return this.$("#phraseEditor").val("");
    };
    PhrasesView.prototype.addOne = function(phrase) {
      var view;
      view = new PhraseView({
        model: phrase
      });
      console.log(view);
      if (!this.phraseViews) {
        this.phraseViews = new Array;
      }
      this.phraseViews[this.phraseViews.length] = view;
      return $("#phrases").append(view.render().el);
    };
    PhrasesView.prototype.addAll = function() {
      return this.model.each(this.addOne);
    };
    PhrasesView.prototype.clear = function() {
      this.$("#newPhrasePanel").html('');
      return this.$("#phrases").html('');
    };
    return PhrasesView;
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
    PhraseView.prototype.template = _.template($('#phraseView').html());
    PhraseView.prototype.events = {
      "click .phraseDelete": "deletePhrase",
      "dblclick .phraseText": "editPhrase",
      "mouseout .phraseEdit": "updatePhrase"
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
      $(this.el).html(this.template(this.model.toJSON()));
      $(this.el).addClass("phraseView");
      this.setContent();
      return this;
    };
    PhraseView.prototype.setContent = function() {
      var content;
      console.log("set content");
      content = this.model.get('text');
      console.log("content:" + content);
      return this.$('.phraseText').text(content);
    };
    PhraseView.prototype.close = function() {
      this.model.save({
        text: this.input.val()
      });
      return $(this.el).removeClass("editing");
    };
    PhraseView.prototype.edit = function() {
      $(this.el).addClass("editing");
      return this.$("phraseInput").focus();
    };
    PhraseView.prototype.updateOnEnter = function() {
      if (e.keyCode === 13) {
        return this.close();
      }
    };
    PhraseView.prototype.remove = function() {
      return $(this.el).remove();
    };
    PhraseView.prototype.clear = function() {
      return this.model.clear();
    };
    return PhraseView;
  })();
  window.GrammarView = (function() {
    __extends(GrammarView, Backbone.View);
    function GrammarView() {
      this.addAll = __bind(this.addAll, this);
      this.render = __bind(this.render, this);
      this.initialize = __bind(this.initialize, this);
      GrammarView.__super__.constructor.apply(this, arguments);
    }
    GrammarView.prototype.el = $("#newMeaningPanel");
    GrammarView.prototype.template = _.template($('#newMeaning').html());
    GrammarView.prototype.events = {
      "keypress .meaningEditor": "input"
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
      console.log('done calling hide Editor');
      return this;
    };
    GrammarView.prototype.input = function(e) {
      console.log(e.keyCode === 13);
      if (e.keyCode === 13) {
        console.log("calling this.createMeaning");
        this.doCreate();
        return console.log("done calling this.createMeaning");
      }
    };
    GrammarView.prototype.doCreate = function() {
      var meaning, text;
      text = $(".meaningEditor").val();
      console.log("do Create " + text);
      meaning = Meanings.create({
        "text": text
      });
      return this.$(".meaningEditor").val("");
    };
    GrammarView.prototype.addOne = function(meaning) {
      var view;
      console.log("addOne:");
      console.log(meaning);
      view = new MeaningView({
        model: meaning
      });
      console.log("new meaning");
      return $("#meanings").append(view.render().el);
    };
    GrammarView.prototype.addAll = function() {
      return Meanings.each(this.addOne);
    };
    return GrammarView;
  })();
  console.log('coffescript loaded');
  window.App = new GrammarView;
  window.App.views[0].toggleSelected();
}).call(this);
