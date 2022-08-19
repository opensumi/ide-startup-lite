(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{1233:function(e){e.exports=JSON.parse('{"information_for_contributors":["This file has been converted from https://github.com/emilast/vscode-logfile-highlighter/blob/master/syntaxes/log.tmLanguage","If you want to provide a fix or improvement, please create a pull request against the original repository.","Once accepted there, we are happy to receive an update request."],"version":"https://github.com/emilast/vscode-logfile-highlighter/commit/19807c6a80d29b03ad69e02ffe39e5869a9ce107","name":"Log file","scopeName":"text.log","patterns":[{"match":"\\\\b(Trace)\\\\b:","name":"comment log.verbose"},{"match":"(?i)\\\\[(verbose|verb|vrb|vb|v)\\\\]","name":"comment log.verbose"},{"match":"(?<=^[\\\\s\\\\d\\\\p]*)\\\\bV\\\\b","name":"comment log.verbose"},{"match":"\\\\b(DEBUG|Debug)\\\\b|(?i)\\\\b(debug)\\\\:","name":"markup.changed log.debug"},{"match":"(?i)\\\\[(debug|dbug|dbg|de|d)\\\\]","name":"markup.changed log.debug"},{"match":"(?<=^[\\\\s\\\\d\\\\p]*)\\\\bD\\\\b","name":"markup.changed log.debug"},{"match":"\\\\b(HINT|INFO|INFORMATION|Info|NOTICE|II)\\\\b|(?i)\\\\b(info|information)\\\\:","name":"markup.inserted log.info"},{"match":"(?i)\\\\[(information|info|inf|in|i)\\\\]","name":"markup.inserted log.info"},{"match":"(?<=^[\\\\s\\\\d\\\\p]*)\\\\bI\\\\b","name":"markup.inserted log.info"},{"match":"\\\\b(WARNING|WARN|Warn|WW)\\\\b|(?i)\\\\b(warning)\\\\:","name":"markup.deleted log.warning"},{"match":"(?i)\\\\[(warning|warn|wrn|wn|w)\\\\]","name":"markup.deleted log.warning"},{"match":"(?<=^[\\\\s\\\\d\\\\p]*)\\\\bW\\\\b","name":"markup.deleted log.warning"},{"match":"\\\\b(ALERT|CRITICAL|EMERGENCY|ERROR|FAILURE|FAIL|Fatal|FATAL|Error|EE)\\\\b|(?i)\\\\b(error)\\\\:","name":"string.regexp, strong log.error"},{"match":"(?i)\\\\[(error|eror|err|er|e|fatal|fatl|ftl|fa|f)\\\\]","name":"string.regexp, strong log.error"},{"match":"(?<=^[\\\\s\\\\d\\\\p]*)\\\\bE\\\\b","name":"string.regexp, strong log.error"},{"match":"\\\\b\\\\d{4}-\\\\d{2}-\\\\d{2}(T|\\\\b)","name":"comment log.date"},{"match":"(?<=(^|\\\\s))\\\\d{2}[^\\\\w\\\\s]\\\\d{2}[^\\\\w\\\\s]\\\\d{4}\\\\b","name":"comment log.date"},{"match":"\\\\d{1,2}:\\\\d{2}(:\\\\d{2}([.,]\\\\d{1})?)?(Z| ?[+-]\\\\d{1,2}:\\\\d{2})?\\\\b","name":"comment log.date"},{"match":"\\\\b([0-9a-fA-F]{40}|[0-9a-fA-F]{10}|[0-9a-fA-F]{7})\\\\b","name":"constant.language"},{"match":"\\\\b[0-9a-fA-F]{8}[-]?([0-9a-fA-F]{4}[-]?){3}[0-9a-fA-F]{12}\\\\b","name":"constant.language log.constant"},{"match":"\\\\b([0-9a-fA-F]{2}[:-])+[0-9a-fA-F]{2}+\\\\b","name":"constant.language log.constant"},{"match":"\\\\b([0-9]+|true|false|null)\\\\b","name":"constant.language log.constant"},{"match":"\\"[^\\"]*\\"","name":"string log.string"},{"match":"(?<![\\\\w])\'[^\']*\'","name":"string log.string"},{"match":"\\\\b([a-zA-Z.]*Exception)\\\\b","name":"string.regexp, emphasis log.exceptiontype"},{"begin":"^[\\\\t ]*at","end":"$","name":"string.key, emphasis log.exception"},{"match":"\\\\b[a-z]+://\\\\S+\\\\b/?","name":"constant.language log.constant"},{"match":"(?<![\\\\w/\\\\\\\\])([\\\\w-]+\\\\.)+([\\\\w-])+(?![\\\\w/\\\\\\\\])","name":"constant.language log.constant"}]}')}}]);