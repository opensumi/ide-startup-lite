(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{1248:function(e){e.exports=JSON.parse('{"information_for_contributors":["This file has been converted from https://github.com/atom/language-php/blob/master/grammars/html.cson","If you want to provide a fix or improvement, please create a pull request against the original repository.","Once accepted there, we are happy to receive an update request."],"version":"https://github.com/atom/language-php/commit/2bf736a814e1a58aa63470c1a29590bd02e924e7","name":"PHP","scopeName":"text.html.php","injections":{"text.html.php - (meta.embedded | meta.tag), L:((text.html.php meta.tag) - (meta.embedded.block.php | meta.embedded.line.php)), L:(source.js - (meta.embedded.block.php | meta.embedded.line.php)), L:(source.css - (meta.embedded.block.php | meta.embedded.line.php))":{"patterns":[{"include":"#php-tag"}]}},"patterns":[{"begin":"\\\\A#!","beginCaptures":{"0":{"name":"punctuation.definition.comment.php"}},"end":"$","name":"comment.line.shebang.php"},{"include":"text.html.derivative"}],"repository":{"php-tag":{"patterns":[{"begin":"<\\\\?(?i:php|=)?(?![^?]*\\\\?>)","beginCaptures":{"0":{"name":"punctuation.section.embedded.begin.php"}},"end":"(\\\\?)>","endCaptures":{"0":{"name":"punctuation.section.embedded.end.php"},"1":{"name":"source.php"}},"name":"meta.embedded.block.php","contentName":"source.php","patterns":[{"include":"source.php"}]},{"begin":"<\\\\?(?i:php|=)?","beginCaptures":{"0":{"name":"punctuation.section.embedded.begin.php"}},"end":"(\\\\?)>","endCaptures":{"0":{"name":"punctuation.section.embedded.end.php"},"1":{"name":"source.php"}},"name":"meta.embedded.line.php","contentName":"source.php","patterns":[{"include":"source.php"}]}]}}}')}}]);